import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";

type Payload = {
  id: string;
};

export const authMiddleware: RequestHandler = async (req, res, next) => {
  if (req.path === "/auth") next();

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  try {
    const { id } = jwt.verify(authorization, "secret-key") as Payload;

    const user = await UserModel.find({ _id: id });
    if (!user.length) {
      return res.json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid",
    });
  }
};
