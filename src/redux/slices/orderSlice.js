import { createSlice } from "@reduxjs/toolkit";
import { doOrder, fetchOrders } from "../asyncThunks";

const initialState = {
  limit: 20,
  offset: 0,

  items: [],
  isLoading: false,
  error: "",
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.error = action.payload.error;
        state.isLoading = false;
      })
      .addCase(doOrder.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(doOrder.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isLoading = false;
      })
      .addCase(doOrder.rejected, (state, action) => {
        console.log(action);
        state.error = action.payload.error;
        state.isLoading = false;
      }),
});

export default ordersSlice.reducer;
