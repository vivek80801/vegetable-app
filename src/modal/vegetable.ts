import mongoose from "mongoose";

interface IVegetable extends mongoose.Document {
    name: string;
    price: number;
    organic: boolean;
}

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
    },
    img:{
        type:String,
        required: true
    }
});

export const Vegetable = mongoose.model<IVegetable>("vegetables", vegetableSchema);