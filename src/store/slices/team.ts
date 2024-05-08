import { createSlice } from "@reduxjs/toolkit";

const teamSlice = createSlice({
  name: "team",
  initialState: {
    data: [],
  },
  reducers: {
    setTeam: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setTeam } = teamSlice.actions;
export default teamSlice.reducer;
