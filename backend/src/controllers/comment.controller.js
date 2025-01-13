import Comment from "../models/comment.js";

export const addComment = async(req,res)=>{
    try{
        const id = req.params.id;
        const {author,text} = req.body;
        const userComment = new Comment({
            blogId : id,
            author,
            text
        });
        if(!userComment){
            return res.status(400).json({message:"Provide comment"});
        }
        await userComment.save();
        return res.status(201).json({message: "Comment is added",data:userComment});
    }catch(error){
        console.log("Error in commenting process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const editComment = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const {id,author,text} = req.body;
        const updatedComment = await Comment.findOne({_id:id,blogId});
        if(!updatedComment){
            return res.status(404).json({message:"Comment not found!"});
        }
        if(updatedComment.author!==author){
            return res.status(403).json({ message: "You can only edit your comments!" });
        }
        updatedComment.text=text;
        await updatedComment.save();
        return res.status(200).json({message:"Comment updated.",data:updatedComment});
    }catch(error){
        console.log("Error in edit comment process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const getComment = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const comments = await Comment.find({blogId});
        if(!comments){
            return res.status(404).json({message:"Comment not found!"});
        }
        return res.status(200).json(comments);
    }catch(error){
        console.log("Error in getting comment process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const deleteComment = async(req,res)=>{
    try{
        const blogId = req.params.id;
        const {id,author,text} = req.body;
        const commentToDelete = await Comment.findOne({_id:id,blogId});
        if(commentToDelete.author!==author){
            return res.status(403).json({ message: "You can only delete your own comments" });
        }
        await Comment.deleteOne(commentToDelete);
        return res.status(200).json({message:"Comment deleted."});
    }catch(error){
        console.log("Error in deleting comment: "+ error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}