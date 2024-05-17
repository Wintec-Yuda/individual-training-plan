import { createSlice } from "@reduxjs/toolkit";

const auditsSlice = createSlice({
  name: "audits",
  initialState: {
    data: [] as any,
  },
  reducers: {
    setAudits: (state, action) => {
      state.data = action.payload;
    },

    addAudit: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const { setAudits, addAudit } = auditsSlice.actions;
export default auditsSlice.reducer;
