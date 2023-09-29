import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type: Number,
        required: true
    },
    product: {
        type: Array,
        default: []
    },
    quantity:{
        type:Number,
        required:true,
        default:0
    },
    total_amount:{
        type: Number,
        required:true
    },
    
},{timestamps:true})

export const Cart = new model("cart",cartSchema)