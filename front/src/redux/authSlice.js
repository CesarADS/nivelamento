import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    usuario: null,
    role: null,
    id: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token; 
      state.usuario = action.payload.usuario;
      state.role = action.payload.role;
      state.id = action.payload.id;
    },
    logout: (state) => {
      state.token = null;
      state.usuario = null;
      state.role = null;
      state.id = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;