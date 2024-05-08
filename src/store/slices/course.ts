import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",
  initialState: {
    data: [],
  },
  reducers: {
    setCourse: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setCourse } = courseSlice.actions;
export default courseSlice.reducer;
