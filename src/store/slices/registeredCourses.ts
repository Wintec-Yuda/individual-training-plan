import { createSlice } from "@reduxjs/toolkit";

const registeredCoursesSlice = createSlice({
  name: "registeredCourses",
  initialState: {
    data: [],
  },
  reducers: {
    setRegisteredCourses: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setRegisteredCourses } = registeredCoursesSlice.actions;
export default registeredCoursesSlice.reducer;
