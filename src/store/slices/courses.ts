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
      })
    },
  },
});

export const { setCourses, registerCourses, submitCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
