"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const food_controller_1 = require("../controllers/food.controller");
const foodRouter = (0, express_1.Router)();
foodRouter
    .get("/getFoods", food_controller_1.getFoods)
    .post("/postFood", food_controller_1.foodPost)
    .get("/getCategories", food_controller_1.getCategories)
    .post("/postCategory", food_controller_1.postCategory)
    .post("/deleteCategory", food_controller_1.deleteCategory)
    .post("/editCategory", food_controller_1.editCategory);
exports.default = foodRouter;
