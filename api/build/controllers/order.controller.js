"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeOrderStatus = exports.postOrder = exports.getOrders = exports.getAllOrders = void 0;
const order_model_1 = require("../models/order.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Get All Order
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                message: "Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлээд дахин оролдоно уу",
            });
        }
        const { id, role } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        if (role != "admin") {
            return res.status(401).json({
                message: "Захиалгын жагсаалтуудыг харахын тулд админ эрхээр нэвтэрнэ үү",
            });
        }
        const order = yield order_model_1.orderModel.find({});
        return res.json(order);
    }
    catch (err) {
        res.json(err);
    }
});
exports.getAllOrders = getAllOrders;
//Get order list
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({
                message: "Бүртгэлгүй хэрэглэгч байна. Та бүртгүүлээд дахин оролдоно уу",
            });
        }
        const { id } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        const order = yield order_model_1.orderModel.find({ userID: id });
        return res.json(order);
    }
    catch (err) {
        res.json(err);
    }
});
exports.getOrders = getOrders;
//Create new food order
const postOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res
                .status(401)
                .json({ message: "Нэвтэрсний дараа хоол захиалах боломжтой." });
        }
        const { id } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        const { order, deliveryAddress } = req.body;
        const newOrder = yield order_model_1.orderModel.create({
            userID: id,
            deliveryAddress,
            foods: order,
            deliveryStatus: "Хүлээгдэж буй",
            createdAt: new Date(),
        });
        return res.json({ message: "Шинэ захиалга амжилттай нэмэгдлээ" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.postOrder = postOrder;
//Change order status
const changeOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res
                .status(401)
                .json({ message: "Нэвтэрсний дараа өөрчлөлт хийх боломжтой." });
        }
        const { id } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        const { selectedOrderID, newStatus } = req.body;
        const orderExist = yield order_model_1.orderModel.findOne({ _id: selectedOrderID });
        if (!orderExist) {
            {
                return res
                    .status(401)
                    .json({ message: "Өөрчлөлт хийх захиалга олдсонгүй" });
            }
        }
        const newOrder = yield order_model_1.orderModel.findOneAndUpdate({
            _id: selectedOrderID,
        }, { deliveryStatus: newStatus });
        return res.json({ message: "Захиалгын төлөв өөрчлөгдлөө" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.changeOrderStatus = changeOrderStatus;
