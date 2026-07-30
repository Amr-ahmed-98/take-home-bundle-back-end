import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  if (!env.mongoUri) {
    throw new Error("MONGO_URI environment variable is missing.");
  }
  await mongoose.connect(env.mongoUri);
  console.log("MongoDB connected");
}

