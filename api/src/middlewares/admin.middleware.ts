import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models";

type Payload = {
  role: string;
};

export const adminMiddleware: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  try {
    const { role } = jwt.verify(authorization, "secret-key") as Payload;

    const isAdmin = await UserModel.find({ role: role });
    if (!isAdmin.length) {
      return res.json({ message: "Unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid",
    });
  }
};
