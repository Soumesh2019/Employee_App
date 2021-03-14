import { configureStore } from "@reduxjs/toolkit";
import Employeereducer from "../features/employeeSlice";

export default configureStore({
  reducer: {
    employees: Employeereducer,
  },
});
