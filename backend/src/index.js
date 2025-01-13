import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import commentRoutes from "./routes/comment.route.js";
import connectMongoDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
// import path from 'path';

const app = express();

//configurations
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const allowedOrigin = process.env.NODE_ENV === "production"
    ? "https://myblogsite-uvve.onrender.com"  // Production frontend URL
    : "http://localhost:5173";  // Development URL for local testing

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/comment",commentRoutes);

// if(process.env.NODE_ENV==="production"){
//     app.use(express.static(path.join(__dirname, "../frontend/dist")));
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
//     });
// }

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is running on PORT: "+ PORT);
})
connectMongoDB();