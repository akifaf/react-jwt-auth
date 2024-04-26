import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const refreshAuthToken = createAsyncThunk(
  "auth/refreshAuthToken",
  async (refreshToken, { rejectWithValue }) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/token/refresh/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (!response.ok) {
        throw new Error("Token refresh failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    authToken: null,
    loading: true,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.authToken = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("authTokens");
    },
    updateUser:(state,action)=>{
        state.user=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = jwtDecode(action.payload.access);
        state.authToken = action.payload;
        state.loading = false;
        state.error = null;
        localStorage.setItem("authTokens", JSON.stringify(action.payload));
      })
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.authToken = action.payload;
        state.user = jwtDecode(action.payload.access);
        state.loading = false;
        state.error = null;
        localStorage.setItem("authTokens", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(refreshAuthToken.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        localStorage.removeItem("authTokens");
      });
  },
});

export const { logoutUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
