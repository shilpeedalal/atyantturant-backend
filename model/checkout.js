import { Schema, model } from "mongoose";

const checkoutSchema = new Schema({
    userId:{
        type: Number,
        required: true
    },
    total_amount:{
        type:Number,
        required:true
    },
    deliveryCharge:{
        type: Number,
        required:true
    },
    payment_status:{
        type:String,
        required:true
    }
    
},{timestamps:true})

export const Checkout = new model("checkout",checkoutSchema)