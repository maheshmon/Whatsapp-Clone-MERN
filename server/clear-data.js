import mongoose from "mongoose";
import dotenv from "dotenv";
import { getMongoURL } from "./database/db.js";

dotenv.config();

const clearChatsOnly = process.argv.includes("--all") ? false : true;

async function run() {
  try {
    const url = getMongoURL();
    console.log("Connecting to MongoDB:", url);
    await mongoose.connect(url);
    console.log("Connected successfully.");

    const db = mongoose.connection.db;

    // Delete messages
    const msgResult = await db.collection("messages").deleteMany({});
    console.log(`Deleted ${msgResult.deletedCount} messages.`);

    // Delete conversations
    const convResult = await db.collection("conversations").deleteMany({});
    console.log(`Deleted ${convResult.deletedCount} conversations.`);

    if (!clearChatsOnly) {
      // Also delete users
      const userResult = await db.collection("users").deleteMany({});
      console.log(`Deleted ${userResult.deletedCount} users.`);
    }

    console.log("Database cleanup finished!");
    process.exit(0);
  } catch (err) {
    console.error("Cleanup error:", err);
    process.exit(1);
  }
}

run();
