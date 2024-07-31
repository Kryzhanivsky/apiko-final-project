import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./slices/accountSlice";
import catalogReducer from "./slices/catalogSlice";
import modalReducer from "./slices/modalSlice";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import ordersReducer from "./slices/orderSlice";

export default configureStore({
  reducer: {
    account: accountReducer,
    catalog: catalogReducer,
    modal: modalReducer,
    favorite: favoriteReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});
