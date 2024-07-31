import { createSlice } from "@reduxjs/toolkit";
import { fetchCountries } from "../asyncThunks";

const items = JSON.parse(localStorage.getItem("apikoCart"));

const initialState = {
  items: items ? items : [],
  isLoading: false,
  error: "",
  countries: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    increment: (state, action) => {
      state.items.forEach((item) =>
        item.productId === action.payload ? (item.quantity += 1) : item
      );
      localStorage.setItem("apikoCart", JSON.stringify(state.items));
    },
    decrement: (state, action) => {
      state.items.forEach((item) =>
        item.productId === action.payload ? (item.quantity -= 1) : item
      );
      localStorage.setItem("apikoCart", JSON.stringify(state.items));
    },
    addCartItem: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("apikoCart", JSON.stringify(state.items));
    },
    deleteCartItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.id
      );
      localStorage.setItem("apikoCart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("apikoCart");
    },
  },
  extraReducers: (builder) =>
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.countries = action.payload;
    }),
});

export const { addCartItem, deleteCartItem, increment, decrement, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
