import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    usuario: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.usuario = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.usuario = null;
    },
  },
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;