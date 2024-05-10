import { createSlice } from "@reduxjs/toolkit";

const approvalsSlice = createSlice({
  name: "approvals",
  initialState: {
    data: [],
  },
  reducers: {
    setApprovals: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setApprovals } = approvalsSlice.actions;
export default approvalsSlice.reducer;
