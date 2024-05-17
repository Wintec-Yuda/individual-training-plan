import { configureStore } from "@reduxjs/toolkit";
import courses from "./slices/courses";
import user from "./slices/user";
import employees from "./slices/employees";
import approves from "./slices/approves";
import audits from "./slices/audits";

export default configureStore({
  reducer: {
    courses,
    user,
    employees,
    approves,
    audits,
  },
});
