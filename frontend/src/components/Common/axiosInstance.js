import axios from "axios";
import store from "../../redux/store";
import { logout } from "../../redux/slice/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});

// 🔥 REQUEST INTERCEPTOR - Add token to headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 RESPONSE INTERCEPTOR - Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired / invalid / not authorized
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      
      // Dispatch logout action to clear Redux state
      store.dispatch(logout());
      
      // Redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;
