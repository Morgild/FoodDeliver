"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foodModel = void 0;
const mongoose_1 = require("mongoose");
const foodSchema = new mongoose_1.Schema({
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
exports.foodModel = (0, mongoose_1.model)("food", foodSchema);
