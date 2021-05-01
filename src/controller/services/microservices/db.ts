import mongoose from "mongoose";

const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/vegetable-app";

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`database is connected on ${mongoURI}`);
    } catch (error) {
        console.log(error);
    }
};