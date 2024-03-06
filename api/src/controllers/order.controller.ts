import { RequestHandler } from "express";
import { orderModel } from "../models/order.model";
import jwt, { JwtPayload } from "jsonwebtoken";
import nodemailer from "nodemailer";
import { UserModel } from "../models";

//Get All Order
export const getAllOrders: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: "Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлээд дахин оролдоно уу",
      });
    }
    const { id, role } = jwt.verify(authorization, "secret-key") as JwtPayload;

    if (role != "admin") {
      return res.status(401).json({
        message:
          "Захиалгын жагсаалтуудыг харахын тулд админ эрхээр нэвтэрнэ үү",
      });
    }

    const order = await orderModel.find({});

    return res.json(order);
  } catch (err) {
    res.json(err);
  }
};

//Get order list
export const getOrders: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({
        message: "Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлээд дахин оролдоно уу",
      });
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
      return res
        .status(401)
        .json({ message: "Нэвтэрсний дараа хоол захиалах боломжтой." });
    }

    const { id } = jwt.verify(authorization, "secret-key") as JwtPayload;

    const { order, deliveryAddress } = req.body;

    const newOrder = await orderModel.create({
      userID: id,
      deliveryAddress,
      foods: order,
      deliveryStatus: "Хүлээгдэж буй",
      createdAt: new Date(),
    });

    return res.json({ message: "Шинэ захиалга амжилттай нэмэгдлээ" });
  } catch (err) {
    res.json(err);
  }
};

//Change order status
export const changeOrderStatus: RequestHandler = async (req, res) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res
        .status(401)
        .json({ message: "Нэвтэрсний дараа өөрчлөлт хийх боломжтой." });
    }

    const { id } = jwt.verify(authorization, "secret-key") as JwtPayload;

    const { selectedOrderID, newStatus, userID } = req.body;

    const orderExist = await orderModel.findOne({ _id: selectedOrderID });

    if (!orderExist) {
      {
        return res
          .status(401)
          .json({ message: "Өөрчлөлт хийх захиалга олдсонгүй" });
      }
    }

    const newOrder = await orderModel.findOneAndUpdate(
      {
        _id: selectedOrderID,
      },
      { deliveryStatus: newStatus }
    );

    const user = await UserModel.findOne({ _id: userID });

    if (!user) {
      {
        return res
          .status(401)
          .json({ message: "Захиалга хийсэн хэрэглэгчийн мэдээлэл олдсонгүй" });
      }
    }

    const userEmail = user.email;

    if (newStatus == "Амжилттай") {
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: "morgild@gmail.com", pass: "rcdxbzdydfabwvzc" },
      });
      const mailOptions = {
        from: "morgild@gmail.com",
        to: userEmail,
        subject: "Food Delivery Status Update",
        text: `Таны ${selectedOrderID} дугаартай захиалга амжилттай хүргэгдлээ:`,
      };

      await transporter.sendMail(mailOptions);
    }

    return res.json({ message: "Захиалгын төлөв өөрчлөгдлөө" });
  } catch (err) {
    res.json(err);
  }
};
