import express from "express";
import { addBlog, editBlog, getAllBlog, getBlog } from "../controllers/blog.controller.js";
import multer from "multer";


const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post("/add",upload.single("image"),addBlog);

router.put("/edit/:id",editBlog);

router.get("/get-all",getAllBlog);

router.get("/get/:id",getBlog);

export default router;