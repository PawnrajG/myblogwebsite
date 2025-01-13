import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import blogRoutes from "./routes/blog.route.js";
import commentRoutes from "./routes/comment.route.js";
import connectMongoDB from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

//configurations
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth",authRoutes);
app.use("/api/blog",blogRoutes);
app.use("/api/comment",commentRoutes);

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server is running on PORT: "+ PORT);
})
connectMongoDB();