import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { authenticate, login, register } from "../asyncThunks";

const initialState = {
  isLoggedIn: false,
  token: JSON.parse(localStorage.getItem("apikoToken")),
  account: {
    id: null,
    fullName: null,
    createdAt: null,
    updatedAt: null,
    email: null,
    phone: null,
    country: null,
    city: null,
    address: null,
  },
  isLoading: false,
  error: "",
};

export const accountSlice = createSlice({
  name: "account",
  initialState: initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      localStorage.removeItem("apikoToken");
      state.isLoggedIn = false;
      state.token = null;
      state.account = {
        id: null,
        fullName: null,
        createdAt: null,
        updatedAt: null,
        email: null,
        phone: null,
        country: null,
        city: null,
        address: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.account = action.payload;
        state.isLoggedIn = true;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(login.pending, register.pending, authenticate.pending),
        (state) => {
          state.isLoading = true;
          state.error = "";
        }
      )
      .addMatcher(
        isAnyOf(login.fulfilled, register.fulfilled),
        (state, action) => {
          state.token = action.payload.token;
          state.account = action.payload.account;
          state.isLoggedIn = true;
          state.isLoading = false;

          localStorage.setItem(
            "apikoToken",
            JSON.stringify(action.payload.token)
          );
        }
      )
      .addMatcher(
        isAnyOf(login.rejected, register.rejected, authenticate.rejected),
        (state, action) => {
          state.error = action.payload.error;
          state.isLoading = false;
        }
      );
  },
});

export const { setToken, logOut } = accountSlice.actions;

export default accountSlice.reducer;
