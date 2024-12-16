import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB ${conn.connection.host}`);
    } catch(err) {
        console.log("Failed top connect to MongoDB", err);
        process.exit(1);
    }
}