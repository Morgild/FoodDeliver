import { RequestHandler } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { foodModel } from "../models/food.model";

//return All food list
export const getFoods: RequestHandler = async (req, res) => {
  const food = await foodModel.find({});
  return res.json(food);
};

export const foodPost: RequestHandler = async (req, res) => {
  try {
    const { foodName, foodPrice, discount, foodCategory, foodPic } = req.body;

    const foodExist = await foodModel.find({ foodName });

    if (foodExist.length) {
      return res.status(401).json({
        message: `${foodName} хоол өмнө нь бүртгэгдсэн байна`,
      });
    }

    const food = await foodModel.create({
      foodName,
      foodPrice,
      foodCategory,
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
