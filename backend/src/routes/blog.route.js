import express from "express";
import { addBlog, editBlog, getAllBlog, getBlog } from "../controllers/blog.controller.js";
const router = express.Router();

router.post("/add",addBlog);

router.put("/edit/:id",editBlog);

router.get("/get-all",getAllBlog);

router.get("/get/:id",getBlog);

export default router;