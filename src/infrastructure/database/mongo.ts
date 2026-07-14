import mongoose from 'mongoose'

export const connectMongo = async () => {
  const mongoUrl = process.env.MONGODB_URL;

  if (!mongoUrl) {
    throw new Error("MONGODB_URL is missing");
  }

  await mongoose.connect(mongoUrl);
};