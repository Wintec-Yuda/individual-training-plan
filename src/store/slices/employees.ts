import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    data: [],
  },
  reducers: {
    setEmployees: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
