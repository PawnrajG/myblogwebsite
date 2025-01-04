import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async()=>{
    try{
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected to : ${connect.connection.host}`);
    }catch(error){
        console.log("Oops! something went wrong in connection.");
        console.log(error.message);
    }
}

export default connectMongoDB;