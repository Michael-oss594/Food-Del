import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://olydev:33858627@cluster0.8pvkoeb.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}