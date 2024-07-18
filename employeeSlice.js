import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import firebaseAPI from "./firebase";

// Async thunks for fetching and manipulating employees data
export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await firebaseAPI.get("/employees.json");
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "employees/addEmployee",
  async (employee) => {
    const response = await firebaseAPI.post("/employees.json", employee);
    return { id: response.data.name, ...employee };
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/updateEmployee",
  async ({ id, employee }) => {
    await firebaseAPI.put(`/employees/${id}.json`, employee);
    return { id, ...employee };
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployee",
  async (id) => {
    await firebaseAPI.delete(`/employees/${id}.json`);
    return id;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        return Object.keys(action.payload).map((key) => ({
          id: key,
          ...action.payload[key],
        }));
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.findIndex(
          (employee) => employee.id === action.payload.id
        );
        state[index] = action.payload;
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        return state.filter((employee) => employee.id !== action.payload);
      });
  },
});

export default employeeSlice.reducer;
