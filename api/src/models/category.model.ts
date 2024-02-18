import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  foodCategory: {
    type: String,
    required: true,
  },
  updatedAt: Date,
  createdAt: Date,
});
export const categoryModel = model("category", categorySchema);
