import mongoose from "mongoose";

export const connectDatabase = async () => {
    await mongoose.connect(process.env.DB)
    console.log("Database connected Successfully")
}