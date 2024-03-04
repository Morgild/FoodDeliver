import { RequestHandler } from "express";
import { foodModel } from "../models/food.model";
import { categoryModel } from "../models/category.model";
import jwt, { JwtPayload } from "jsonwebtoken";

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
      editFood,
    } = req.body;

    const foodExist = await foodModel.findOne({ foodName });

    if (editFood) {
      if (foodExist) {
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
    } else {
      const food = await foodModel.findOneAndUpdate(
        { foodName },
        { foodCategory, foodIngredients, foodPrice, foodPic }
      );
      return res.json({ message: "Хоол амжилттай шинэчлэгдлээ" });
    }
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

//delete category
export const deleteCategory: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Бүртгэлтэй хэрэглэгч биш байна." });
    }

    const { id, role } = jwt.verify(authorization, "secret-key") as JwtPayload;

    if (role != "admin") {
      return res
        .status(401)
        .json({ message: "Админ ангилал өөрчлөх боломжтой." });
    }
    const { deleteCategory } = req.body;
    const category = await categoryModel.findOne({
      foodCategory: deleteCategory,
    });
    if (!category) {
      return res.status(401).json({
        message: `Ангилал олдсонгүй`,
      });
    }

    const food = await categoryModel.findByIdAndDelete(category._id);
    return res.json({
      message: `${category?.foodCategory} ангилал устгагдлаа`,
    });
  } catch (err) {
    res.json(err);
  }
};

//edit category
export const editCategory: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Бүртгэлтэй хэрэглэгч биш байна." });
    }

    const { id, role } = jwt.verify(authorization, "secret-key") as JwtPayload;

    if (role != "admin") {
      return res
        .status(401)
        .json({ message: "Админ ангилал өөрчлөх боломжтой." });
    }
    const { editCategory, newCategory } = req.body;

    const category = await categoryModel.findOne({
      foodCategory: editCategory,
    });
    if (!category) {
      return res.status(401).json({
        message: `Ангилал олдсонгүй`,
      });
    }

    const cat = await categoryModel.findOneAndUpdate(
      { _id: category._id },
      { foodCategory: newCategory }
    );
    return res.json({
      message: `${category?.foodCategory} ангилал шинэчлэгдлэж ${newCategory} боллоо.`,
    });
  } catch (err) {
    res.json(err);
  }
};
