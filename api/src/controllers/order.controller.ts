import { RequestHandler } from "express";
import { orderModel } from "../models/order.model";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import {} from "../models";

//Get order list
export const getOrders: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized1" });
    }
    const { id } = jwt.verify(authorization, "secret-key") as JwtPayload;

    const order = await orderModel.find({ userID: id });

    return res.json(order);
  } catch (err) {
    res.json(err);
  }
};

//Create new food order
export const postOrder: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized1" });
    }

    const { id } = jwt.verify(authorization, "secret-key") as JwtPayload;

    const { order, deliveryAddress } = req.body;
    console.log(order, deliveryAddress);
    const newOrder = await orderModel.create({
      userID: id,
      deliveryAddress,
      foods: order,
      deliveryStatus: "ordered",
      createdAt: new Date(),
    });

    return res.json({ message: "Шинэ захиалга амжилттай нэмэгдлээ" });
  } catch (err) {
    res.json(err);
  }
};
