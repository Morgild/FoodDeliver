import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    defaultValue: "John Doe",
  },
  email: {
    type: String,
    required: true,
    defaultValue: "test@email.com",
  },
  phone: {
    type: String,
    required: false,
    defaultValue:"88088722"
  },
  address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: false,
    defaultValue:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  },
  updatedAt: Date,
  createdAt: Date,
  otp: {
    type: Number,
    required: false,
  },
  otpExpiresAt: {
    type: Date,
    required: false,
  },
});
export const UserModel = model("user", userSchema);
