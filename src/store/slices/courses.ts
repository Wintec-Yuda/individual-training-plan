import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    data: [] as any[],
  },
  reducers: {
    setCourses: (state, action) => {
      state.data = action.payload;
    },
    addCourse: (state, action) => {
      state.data.push(action.payload);
    },
    editCourse: (state, action) => {
      const index = state.data.findIndex((course) => course.code === action.payload.code);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    registerCourses: (state, action) => {
      const { codes, employee } = action.payload;
      codes.map((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          if (state.data[courseIndex].employees) {
            state.data[courseIndex].employees.push(employee);
          } else {
            state.data[courseIndex].employees = [employee];
          }
        }
      });
    },
    submitCourses: (state, action) => {
      const { codes, nik } = action.payload;
      codes.map((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees.map((employee: any) => {
            if (employee.nik === nik) employee.isSubmit = true;
          });
        }
      });
    },
    unregisterCourses: (state, action) => {
      const { codes, nik } = action.payload;
      codes.map((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees.map((employee: any, index: number) => {
            if (employee.nik === nik) state.data[courseIndex].employees.splice(index, 1);
          });
        }
      });
    },
    approveCourses: (state, action) => {
      const { codes, nikApproves } = action.payload;
      for (let i = 0; i < nikApproves.length; i++) {
        const courseIndex = state.data.findIndex((course) => course.code === codes[i]);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees.map((employee: any) => {
            if (employee.nik === nikApproves[i]) {
              if (["1", "2", "3"].includes(employee.golongan) && employee.approve === 2) {
                employee.approve += 2;
              } else {
                employee.approve += 1;
              }
            }
          });
        }
      }
    },
    realizationCourses: (state, action) => {
      const { codes, nikApproves, year } = action.payload;
      for (let i = 0; i < nikApproves.length; i++) {
        const courseIndex = state.data.findIndex((course) => course.code === codes[i]);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees.map((employee: any) => {
            if (employee.nik === nikApproves[i]) {
              employee.yearRealization = year;
            }
          });
        }
      }
    },
  },
});

export const { setCourses, addCourse, editCourse, registerCourses, submitCourses, approveCourses, unregisterCourses, realizationCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
