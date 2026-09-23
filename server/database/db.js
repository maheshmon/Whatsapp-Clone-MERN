import dotenv from "dotenv";
import mongoose from "mongoose";

// Load environment variables
dotenv.config();

export const getMongoURL = () => {
  if (process.env.MONGO_URI) return process.env.MONGO_URI;
  if (process.env.DB_URL) return process.env.DB_URL;
  if (process.env.DB_USERNAME && process.env.DB_PASSWORD) {
    return process.env.DOCKER_ENV
      ? `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@mongodb:27017/?authSource=admin`
      : `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:27017/?authSource=admin`;
  }
  return "mongodb://127.0.0.1:27017/whatsapp-clone";
};

const Connection = async () => {
  const URL = getMongoURL();
  console.log("Connecting to MongoDB with URL:", URL);

  try {
    await mongoose.connect(URL);
    console.log("MongoDB connection established successfully");

    // // Connection event listeners
    // mongoose.connection.on("connected", () => {
    //   console.log("MongoDB connection established successfully");
    // });

    // mongoose.connection.on("error", (err) => {
    //   console.error("MongoDB connection error:", err);
    // });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB connection disconnected");
    });

    // Handle application termination
    process.on("SIGINT", async () => {
      try {
        await mongoose.connection.close();
        console.log("MongoDB connection closed through app termination");
        process.exit(0);
      } catch (err) {
        console.error("Error closing MongoDB connection:", err);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("Error while connecting to database:", error.message);
    process.exit(1);
  }
};

export default Connection;