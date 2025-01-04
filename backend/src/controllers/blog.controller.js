import Blog from "../models/blog.js";

export const addBlog = async(req,res)=>{
    try{
        const {title,content,author,image} = req.body;
        if(!title | !content | !author | !image){
            return res.status(400).json({message: "Invalid data"});
        }
        const blog = new Blog({
            title,
            content,
            author,
            image
        });
        const data = await blog.save();
        return res.status(200).json({
            message:"Blog is published",
            data
        });
    }catch(error){
        console.log("Error in adding blog "+error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const editBlog = async(req,res)=>{
    try{
        const id = req.params.id;
        const {title,content,author,image} = req.body;
        const blogToUpdate = await Blog.findByIdAndUpdate(id,{
            title,
            content,
            author,
            image
        },{new:true});
        if(!blogToUpdate){
            return res.status(404).json({message: "Invalid data"});
        }
        return res.status(200).json({
            message:"Blog is updated",
            blogToUpdate
        });
    }catch(error){
        console.log("Error in adding blog "+error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getAllBlog = async(req,res)=>{
    try{
        const Blogs = await Blog.find({},"-password"); //get all blogs data without passwords
        return res.status(200).json({Blogs});
    }catch(error){
        console.log("Error in getting all blogs "+error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getBlog = async(req,res)=>{
    try{
        const id = req.params.id;
        const blog = await Blog.findById(id); //get all blogs data without passwords
        return res.status(200).json(blog);
    }catch(error){
        console.log("Error in getting blog "+error.message);
        return res.status(500).json({message:"Internal server error"});
    }
}