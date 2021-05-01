import mongoose from "mongoose";

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    organic: {
        type: Boolean,
        required: true
    }
});