import { configureStore } from "@reduxjs/toolkit";
import courses from "./slices/courses";
import team from "./slices/team";
import user from "./slices/user";
import employees from "./slices/employees";
import registeredCourses from "./slices/registeredCourses";
import approves from "./slices/approves";

export default configureStore({
  reducer: {
    courses,
    team,
    user,
    employees,
    registeredCourses,
    approves,
  },
});
