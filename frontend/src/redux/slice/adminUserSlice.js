import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("userToken")}`,
});

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/admin/users`, {
        headers: getAuthHeaders(),
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to fetch users" });
    }
  }
);

export const createAdminUser = createAsyncThunk(
  "adminUsers/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/admin/users`, userData, {
        headers: getAuthHeaders(),
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to create user" });
    }
  }
);

export const updateAdminUser = createAsyncThunk(
  "adminUsers/updateUser",
  async ({ id, updates }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/admin/users/${id}`, updates, {
        headers: getAuthHeaders(),
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to update user" });
    }
  }
);

export const deleteAdminUser = createAsyncThunk(
  "adminUsers/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/admin/users/${id}`, {
        headers: getAuthHeaders(),
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: "Failed to delete user" });
    }
  }
);

const adminUserSlice = createSlice({
  name: "adminUsers",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch users";
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        if (action.payload) state.users.push(action.payload);
      })
      .addCase(createAdminUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to create user";
      })
      .addCase(updateAdminUser.fulfilled, (state, action) => {
        const updated = action.payload;
        if (!updated) return;
        const idx = state.users.findIndex((u) => u._id === updated._id);
        if (idx !== -1) {
          state.users[idx] = updated;
        }
      })
      .addCase(updateAdminUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update user";
      })
      .addCase(deleteAdminUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(deleteAdminUser.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete user";
      });
  },
});

export default adminUserSlice.reducer;
