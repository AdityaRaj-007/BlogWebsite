import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database conbected successfully!");
  } catch (err) {
    console.log("Error while connecting to database", err);
  }
};
