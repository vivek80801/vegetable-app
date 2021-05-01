import mongoose from "mongoose";

const vegetableSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    organic: {
        type: Boolean,
        required: true
    }
})