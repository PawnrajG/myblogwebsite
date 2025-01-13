import axios from "axios";

export const axiosInstance = axios.create({
    //baseURL: "http://localhost:5000/api",   // Development backend URL
    baseURL: "https://myblogsite-uvve.onrender.com/api",
    withCredentials: true,  // Allow credentials like cookies
});
