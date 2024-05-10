import { createSlice } from "@reduxjs/toolkit";

const approvesSlice = createSlice({
  name: "approves",
  initialState: {
    data: [] as any[],
  },
  reducers: {
    setApproves: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setApproves } = approvesSlice.actions;
export default approvesSlice.reducer;
