import mongoose from "mongoose";
import { IVegetable } from "./vegetable";

export interface IUser extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    category: string,
    vegetables: IVegetable[],
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    vegetables: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vegetable"
    }]
});

export const User = mongoose.model<IUser>("user", userSchema);