import { Schema, model } from "mongoose";

const userSchema = new Schema({
    userId: {
        type: Number,
        default: 1
    },
    userName: {
        type: String
    }

},{timestamps:true})

export const User = new model("user",userSchema)