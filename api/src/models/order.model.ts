import mongoose, { Mongoose, Schema, model } from "mongoose";

const orderSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
  },
  deliveryAddress: [
    {
      district: String,
      khoroo: String,
      bair: String,
      additional: String,
      phone: String,
      paymentMethod: String,
    },
  ],
  foods: [
    {
      foodName: String,
      foodCategory: String,
      foodIngredients: String,
      foodPrice: Number,
      discount: Number,
      foodPic: String,
      foodCount: Number,
    },
  ],

  deliveryStatus: {
    type: String,
    required: true,
  },

  createdAt: Date,
  deliveredAt: {
    type: Date,
    required: false,
  },
});
export const orderModel = model("order", orderSchema);
