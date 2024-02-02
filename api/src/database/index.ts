import mongoose from "mongoose";
export const connect = async () => {
  try {
    await mongoose.connect("mongodb+srv://morgild:Bodybodi1220@cluster1.1tebnln.mongodb.net/FoodDelivery?retryWrites=true&w=majority");
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};
