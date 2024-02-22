import { RequestHandler } from "express";
import { UserModel } from "../models";
import jwt, { JwtPayload } from "jsonwebtoken";

//return All user list
export const getUsers: RequestHandler = async (req, res) => {
  const user = await UserModel.find({});
  return res.json(user);
};

//return one user
export const getUser: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized1" });
    }
    const { id: userId } = jwt.verify(
      authorization,
      "secret-key"
    ) as JwtPayload;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    return res.json(user);
  } catch (err) {
    res.json(err);
  }
};

//update user data
export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { profilePic, name, phone, email } = req.body;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized1" });
    }
    const { id: userId } = jwt.verify(
      authorization,
      "secret-key"
    ) as JwtPayload;

    const user = await UserModel.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
    }
    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        profilePic,
        name,
        phone,
        email,
        updatedAt: new Date(),
      }
    );
    return res.json({
      message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
    });
  } catch (err) {
    res.json(err);
  }
};
