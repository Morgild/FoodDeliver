"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCategory = exports.getCategories = exports.foodPost = exports.getFoods = void 0;
const food_model_1 = require("../models/food.model");
const category_model_1 = require("../models/category.model");
//return All food list
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield food_model_1.foodModel.find({});
    return res.json(food);
});
exports.getFoods = getFoods;
//Create new food
const foodPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodName, foodCategory, foodIngredients, foodPrice, discount, foodPic, } = req.body;
        const foodExist = yield food_model_1.foodModel.find({ foodName });
        if (foodExist.length) {
            return res.status(401).json({
                message: `${foodName} хоол өмнө нь бүртгэгдсэн байна`,
            });
        }
        const food = yield food_model_1.foodModel.create({
            foodName,
            foodCategory,
            foodIngredients,
            foodPrice,
            discount,
            foodPic,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        return res.json({ message: "Шинэ хоол амжилттай нэмэгдлээ" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.foodPost = foodPost;
//get food categories
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.categoryModel.find({});
    return res.json(categories);
});
exports.getCategories = getCategories;
//Create new category
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodCategory } = req.body;
        const categoryExist = yield category_model_1.categoryModel.find({ foodCategory });
        if (categoryExist.length) {
            return res.status(401).json({
                message: `${foodCategory} ангилал өмнө нь бүртгэгдсэн байна`,
            });
        }
        const food = yield category_model_1.categoryModel.create({
            foodCategory,
            updatedAt: new Date(),
            createdAt: new Date(),
        });
        return res.json({ message: "Шинэ ангилал амжилттай нэмэгдлээ" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.postCategory = postCategory;
