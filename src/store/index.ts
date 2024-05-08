import { configureStore } from "@reduxjs/toolkit";
import course from "./slices/course";
import team from "./slices/team";
import user from "./slices/user";

export default configureStore({
  reducer: {
    course,
    team,
    user,
  },
});
