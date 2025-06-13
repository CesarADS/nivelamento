import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; // Importa o reducer combinado
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Usa o reducer completo (que gerencia token e usuario)
    cart: cartReducer
  },
});

export default store;