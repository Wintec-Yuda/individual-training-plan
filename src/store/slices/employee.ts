import { createSlice } from "@reduxjs/toolkit";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    data: [],
  },
  reducers: {
    setEmployee: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
