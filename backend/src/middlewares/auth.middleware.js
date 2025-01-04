import User from "../models/user.js";
import jwt from "jsonwebtoken";

const protectRoute = async(req,res,next)=>{
    try{
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized - No token"});
        }
        const decodeToken = await jwt.verify(token,process.env.JWT_SECRET_KEY);
        if(!decodeToken){
            return res.status(401).json({message:"Unauthorized - Invalid credentials"})
        }
        const user = await User.findById(decodeToken.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"User not found!"})
        }
        req.user = user;
        next();
    }catch(error){
        console.log("Error in signup process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export default protectRoute;