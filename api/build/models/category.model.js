"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
    foodCategory: {
        type: String,
        required: true,
    },
    updatedAt: Date,
    createdAt: Date,
});
exports.categoryModel = (0, mongoose_1.model)("category", categorySchema);
