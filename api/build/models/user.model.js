"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        required: true,
        defaultValue: "88088722",
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
        required: true,
        defaultValue: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
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
    role: {
        type: String,
        required: true,
    },
});
exports.UserModel = (0, mongoose_1.model)("user", userSchema);
