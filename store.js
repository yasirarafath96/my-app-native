import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";

const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

export default store;
