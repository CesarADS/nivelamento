import axios from "axios";
import store from "../redux/store";

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});

api.interceptors.request.use((config) => {
    
    const token = store.getState().auth.token;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

});

export default api;
