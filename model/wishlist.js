import { Schema, model } from "mongoose";

const wishlistSchema = new Schema({
    userId:{
        type: String
    },
    product_id:{
        type: String,
    },
    
},{timestamps:true})

export const Wishlist = new model("wishlist",wishlistSchema)