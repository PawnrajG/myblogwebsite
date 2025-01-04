import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        blogId: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
        text: { type: String, required: true },
        author: { type: String, required: true },
    },
    {timestamps:true}
);

const Comment = mongoose.model("comment",commentSchema);
export default Comment;