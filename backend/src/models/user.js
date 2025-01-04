import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname:{
            type:String,
            unique:true,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            unique:true,
            required:true
        },
    },
    {timestamps:true}
);

const User = mongoose.model("user",userSchema);

export default User;