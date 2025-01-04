import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        content:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        image: {
            data: Buffer,
            contentType: String,
        }
    },
    {timestamps:true}
);

const Blog = mongoose.model("blog",blogSchema);

export default Blog;