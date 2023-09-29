import { Schema, model } from "mongoose";
import { v1 as uuid } from 'uuid';

const productSchema = new Schema({
    product_id : {
        type: String,
        default : () => uuid()
    },
    product_name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        // required:true
    },
    size:{
        type:String,
        // required:true
    },
    review:{
        type:Number,
        // required:true,
        min:1,
        max:5,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    image:{
        type:String,
        // required:true
    },
    color:{
        type:String,
        // required:true
    }
}, {timestamps:true})

export const Product = new model("product",productSchema)