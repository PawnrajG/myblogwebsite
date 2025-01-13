import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production"
        ? "/api"  // Production backend URL
        : "http://localhost:5000/api",  // Development backend URL
    withCredentials: true,  // Allow credentials like cookies
});
