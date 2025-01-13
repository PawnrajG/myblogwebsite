import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "development"
        ? "http://localhost:5000/api"  // Production backend URL
        : "/api",  // Development backend URL
    withCredentials: true,  // Allow credentials like cookies
});
