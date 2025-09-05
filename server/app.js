import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/dbconnection.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database", error);
  });
