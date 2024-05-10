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
    registerCourses: (state, action) => {
      const { codes, employees } = action.payload;
      codes.forEach((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees = employees;
        }
      });
    },
    submitCourses: (state, action) => {
      const { codes, nik } = action.payload;
      codes.forEach((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          state.data[courseIndex].employees[nik].isSubmit = true;
        }
      });
    },
    approveCourses: (state, action) => {
      const { codes, nikApproves } = action.payload;
      let i = 0;
      codes.forEach((code: string) => {
        const courseIndex = state.data.findIndex((course) => course.code === code);
        if (courseIndex !== -1) {
          if (["1", "2", "3"].includes(state.data[courseIndex].employees[nikApproves[i]].golongan) && state.data[courseIndex].employees[nikApproves[i]].approve === 2) {
            state.data[courseIndex].employees[nikApproves[i]].approve = (state.data[courseIndex].employees[nikApproves[i]].approve || 0) + 2;
          } else {
            state.data[courseIndex].employees[nikApproves[i]].approve = (state.data[courseIndex].employees[nikApproves[i]].approve || 0) + 1;
          }
          i++;
        }
      });
    },
  },
});

export const { setCourses, registerCourses, submitCourses, approveCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
