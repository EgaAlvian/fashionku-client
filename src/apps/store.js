import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/userSlice.js";
import productsReducer from "../reducers/productSlice.js";

const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
  },
});

export default store;
