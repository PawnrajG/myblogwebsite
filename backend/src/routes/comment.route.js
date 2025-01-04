import express from "express";
import { addComment, editComment, getComment,deleteComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/post/:id",addComment);
router.put("/edit/:id",editComment);
router.delete("/delete/:id",deleteComment);
router.get("/get/:id",getComment);

export default router;