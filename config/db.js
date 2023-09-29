import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

export const dbconnect = async(req,res)=>{
    await mongoose.connect(process.env.Connection_string)
    .then(()=>{
        console.log("Database connected");
    })
    .catch((error)=>{
        console.log("Database connection failed", error);
    })
}

dbconnect();