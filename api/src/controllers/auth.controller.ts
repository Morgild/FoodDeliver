import { RequestHandler } from "express";
import { UserModel } from "../models";
import jwt from "jsonwebtoken";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    const userExist = await UserModel.find({ email });

    if (userExist.length) {
      return res.status(401).json({
        message: `${email} и-мэйлтэй хэрэглэгч өмнө бүртгэгдсэн байна`,
      });
    }
    const defaultRole = "user";
    const defaultPhone = "88888888";
    const defaultImg =
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
    const user = await UserModel.create({
      name,
      email,
      phone: defaultPhone,
      address,
      password,
      profilePic: defaultImg,
      updatedAt: new Date(),
      createdAt: new Date(),
      role: defaultRole,
    });

    return res.json({ message: "Шинэ хэрэглэгч амжилттай үүслээ" });
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
        message: "Бүртгэлтэй хэрэглэгч олдсонгүй",
      });
    }
    const id = user._id;
    const role = user.role;
    const token = jwt.sign({ id, role }, "secret-key");
    return res.json({ user, token, message: "Амжилттай нэвтэрлээ" });
  } catch (err) {
    res.json(err);
  }
};
