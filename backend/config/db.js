import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URI || "mongodb+srv://mikky:fOhG7nh13WSTliXw@cluster0.u1z3xfi.mongodb.net/fooddel"
        );
        console.log("DB Connected");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1);
    }
};

