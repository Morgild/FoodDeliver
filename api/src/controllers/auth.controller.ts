import { RequestHandler } from "express";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    const userExist = await UserModel.find({ email });

    if (userExist.length) {
      return res.status(401).json({
        message: "User already exist",
      });
    }
    // return res.json("test");
    const user = await UserModel.create({
      name,
      email,
      address,
      password,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    return res.json({ message: "User successfully created" });
  } catch (err) {
    res.json(err);
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }
    const id = user._id;
    const token = jwt.sign({ id }, "secret-key");
    return res.json({ token, message: "Logged in successfully" });
  } catch (err) {
    res.json(err);
  }
};
