import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api"
});

// 🔥 Automatically attach role + logged-in user
api.interceptors.request.use((config) => {
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  if (role) {
    config.headers["x-role"] = role;
  }

  if (username) {
    config.headers["x-user"] = username;
  }

  return config;
});
