import mongoose from "mongoose";
import {IUser} from "./user"

export interface IVegetable extends mongoose.Document {
    name: string;
    price: number;
    organic: boolean;
    owner: IUser;
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
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
});

export const Vegetable = mongoose.model<IVegetable>("vegetable", vegetableSchema);