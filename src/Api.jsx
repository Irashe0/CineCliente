import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

export const loginUser = (email, password) => api.post("/login", { email, password });

export const getUser = (token) =>
  api.get("/user", { headers: { Authorization: `Bearer ${token}` } });

export const setAuthToken = (token) => {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
