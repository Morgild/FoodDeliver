import { Schema, model } from "mongoose";

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodCategory: {
    type: String,
    required: true,
  },
  foodIngredients: {
    type: String,
    required: true,
  },
  foodPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  foodPic: {
    type: String,
    required: true,
  },
  updatedAt: Date,
  createdAt: Date,
});
export const foodModel = model("food", foodSchema);
