import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const res = await fetch("https://serene-shelf-91637.herokuapp.com/");
    const data = await res.json();

    return data;
  }
);

export const createEmp = createAsyncThunk(
  "employees/CreateEmployee",
  async ({ name, phone, email, salary, picture, job }) => {
    const res = await fetch("https://serene-shelf-91637.herokuapp.com/send", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, salary, picture, job }),
    });

    const data = await res.json();

    return data;
  }
);

export const editEmp = createAsyncThunk(
  "employees/editEmp",
  async ({ name, phone, email, salary, job, _id }) => {
    const res = await fetch("https://serene-shelf-91637.herokuapp.com/update", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, phone, email, salary, job, _id }),
    });
    const data = await res.json();

    return data;
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    loading: false,
    data: [],
  },
  reducers: {},
  extraReducers: {
    [fetchEmployees.pending]: (state) => {
      state.loading = true;
    },
    [fetchEmployees.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
    },

    [createEmp.pending]: (state) => {
      state.loading = true;
    },

    [createEmp.fulfilled]: (state) => {
      state.loading = false;
    },
    [editEmp.pending]: (state) => {
      state.loading = true;
    },
    [editEmp.fulfilled]: (state) => {
      state.loading = false;
    },
  },
});

export default employeeSlice.reducer;

export const employeeSelector = (state) => state.employees;
