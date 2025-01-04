import User from "../models/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../lib/utils.js";

export const signup = async(req,res)=>{
    try{
        const { fullname, email, password } = req.body;
        if(!fullname || !email || !password){
            return res.status(400).json({message: "Fill all the fields!"});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 characters"});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "Email already exists!"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            fullname,
            email,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
            });
        }else{
            return res.status(400).json({message: "Invalid user data"});
        }
    }catch(error){
        console.log("Error in signup process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message: "Fill all the fields!"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "Invalid credentials!"});
        }
        const PasswordMatch = await bcrypt.compare(password,user.password);
        if(!PasswordMatch){
            return res.status(400).json({message: "Invalid credentials!"});
        }
        generateToken(user._id,res);
        return res.status(201).json({
            _id: user._id,
            fullname:user.fullname,
            email: user.email
        })
    }catch(error){
        console.log("Error in login process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const logout = async(req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully!"});
    }catch(error){
        console.log("Error in logout process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}

export const checkAuth = async(req,res)=>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth process: "+error.message);
        return res.status(500).json({message: "Internal server error"});
    }
}