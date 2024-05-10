import { createSlice } from "@reduxjs/toolkit";

const realizationCoursesSlice = createSlice({
  name: "realizationCourses",
  initialState: {
    data: [],
  },
  reducers: {
    setRealizationCourses: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRealizationCourses } = realizationCoursesSlice.actions;
export default realizationCoursesSlice.reducer;
