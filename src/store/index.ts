import { configureStore } from "@reduxjs/toolkit";
import courses from "./slices/courses";
import team from "./slices/team";
import user from "./slices/user";
import employees from "./slices/employees";

export default configureStore({
  reducer: {
    courses,
    team,
    user,
    employees,
  },
});
