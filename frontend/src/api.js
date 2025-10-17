import axios from "axios";

// Create a reusable axios instance with your backend base URL
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000",
  withCredentials: false, // set to true if you ever use cookies for auth
});

// Automatically attach JWT token if it exists
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Optional: global error handler
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default API;
