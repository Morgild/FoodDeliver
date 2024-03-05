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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editCategory = exports.deleteCategory = exports.postCategory = exports.getCategories = exports.foodPost = exports.getFoods = void 0;
const food_model_1 = require("../models/food.model");
const category_model_1 = require("../models/category.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//return All food list
const getFoods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const food = yield food_model_1.foodModel.find({});
    return res.json(food);
});
exports.getFoods = getFoods;
//Create new food
const foodPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { foodName, foodCategory, foodIngredients, foodPrice, discount, foodPic, editFood, } = req.body;
        const foodExist = yield food_model_1.foodModel.findOne({ foodName });
        if (editFood) {
            if (foodExist) {
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
        else {
            const food = yield food_model_1.foodModel.findOneAndUpdate({ foodName }, { foodCategory, foodIngredients, foodPrice, foodPic });
            return res.json({ message: "Хоол амжилттай шинэчлэгдлээ" });
        }
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
//delete category
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res
                .status(401)
                .json({ message: "Бүртгэлтэй хэрэглэгч биш байна." });
        }
        const { id, role } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        if (role != "admin") {
            return res
                .status(401)
                .json({ message: "Админ ангилал өөрчлөх боломжтой." });
        }
        const { deleteCategory } = req.body;
        const category = yield category_model_1.categoryModel.findOne({
            foodCategory: deleteCategory,
        });
        if (!category) {
            return res.status(401).json({
                message: `Ангилал олдсонгүй`,
            });
        }
        const food = yield category_model_1.categoryModel.findByIdAndDelete(category._id);
        return res.json({
            message: `${category === null || category === void 0 ? void 0 : category.foodCategory} ангилал устгагдлаа`,
        });
    }
    catch (err) {
        res.json(err);
    }
});
exports.deleteCategory = deleteCategory;
//edit category
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res
                .status(401)
                .json({ message: "Бүртгэлтэй хэрэглэгч биш байна." });
        }
        const { id, role } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        if (role != "admin") {
            return res
                .status(401)
                .json({ message: "Зөвхөн админ ангилал өөрчлөх боломжтой." });
        }
        const { editCategory, newCategory } = req.body;
        const category = yield category_model_1.categoryModel.findOne({
            foodCategory: editCategory,
        });
        if (!category) {
            return res.status(401).json({
                message: `Ангилал олдсонгүй`,
            });
        }
        const cat = yield category_model_1.categoryModel.findOneAndUpdate({ _id: category._id }, { foodCategory: newCategory });
        return res.json({
            message: `${category === null || category === void 0 ? void 0 : category.foodCategory} ангилал шинэчлэгдлэж ${newCategory} боллоо.`,
        });
    }
    catch (err) {
        res.json(err);
    }
});
exports.editCategory = editCategory;
