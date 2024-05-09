import { configureStore } from "@reduxjs/toolkit";
import course from "./slices/course";
import team from "./slices/team";
import user from "./slices/user";
import employee from "./slices/employee";

export default configureStore({
  reducer: {
    course,
    team,
    user,
    employee,
  },
});
