import { RequestHandler } from "express";
import { UserModel } from "../models";

export const getUsers: RequestHandler = async (req, res) => {
  const user = await UserModel.find({});
  return res.json(user);
};
