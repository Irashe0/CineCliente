import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const loginUser = async (email, password) => {
    return api.post("/login", { email, password });
};

export const getUser = async (token) => {
    return api.get("/user", { headers: { Authorization: `Bearer ${token}` } });
};
