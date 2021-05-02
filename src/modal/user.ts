import mongoose from "mongoose";
import { IVegetable } from "./vegetable";

interface ICart {
    name: string,
    price: number,
    organic: boolean,
    img: string,
    count?: number,
    total?: number,
}

export interface IUser extends mongoose.Document {
    username: string,
    email: string,
    password: string,
    category: string,
    vegetables: IVegetable[],
    cart: ICart[]
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
    cart: [{
        name: String,
        price: Number,
        organic: Boolean,
        img: String,
        count: Number,
        total: Number,
    }],
    vegetables: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "vegetable"
    }]
});

export const User = mongoose.model<IUser>("user", userSchema);