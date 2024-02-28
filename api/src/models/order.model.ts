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
    },
  ],
  paymentMethod: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    required: true,
  },
  foods: [
    {
      foodName: String,
      foodPrice: Number,
      discount: Number,
      foodCount: Number,
    },
  ],
  createdAt: Date,
  deliveredAt: Date,
});
export const orderModel = model("order", orderSchema);
