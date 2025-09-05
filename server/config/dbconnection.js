import mongoose from "mongoose";
import { DB_name } from "../constants.js";

const connectDb = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_name}`
    );

    console.log(`MongoDB connected: ${connectInstance.connection.host}`);
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
    process.exit(1);
  }
};

export default connectDb;
