import { RequestHandler } from "express";
import { foodModel } from "../models/food.model";
import { categoryModel } from "../models/category.model";

//return All food list
export const getFoods: RequestHandler = async (req, res) => {
  const food = await foodModel.find({});
  return res.json(food);
};

//Create new food
export const foodPost: RequestHandler = async (req, res) => {
  try {
    const {
      foodName,
      foodCategory,
      foodIngredients,
      foodPrice,
      discount,
      foodPic,
    } = req.body;

    const foodExist = await foodModel.find({ foodName });

    if (foodExist.length) {
      return res.status(401).json({
        message: `${foodName} хоол өмнө нь бүртгэгдсэн байна`,
      });
    }

    const food = await foodModel.create({
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
  } catch (err) {
    res.json(err);
  }
};

//get food categories
export const getCategories: RequestHandler = async (req, res) => {
  const categories = await categoryModel.find({});
  return res.json(categories);
};

//Create new category
export const postCategory: RequestHandler = async (req, res) => {
  try {
    const { foodCategory } = req.body;

    const categoryExist = await categoryModel.find({ foodCategory });

    if (categoryExist.length) {
      return res.status(401).json({
        message: `${foodCategory} ангилал өмнө нь бүртгэгдсэн байна`,
      });
    }
    const food = await categoryModel.create({
      foodCategory,
      updatedAt: new Date(),
      createdAt: new Date(),
    });
    return res.json({ message: "Шинэ ангилал амжилттай нэмэгдлээ" });
  } catch (err) {
    res.json(err);
  }
};
