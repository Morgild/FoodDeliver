"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("../controllers/order.controller");
const orderRouter = (0, express_1.Router)();
orderRouter
    .get("/getAllOrders", order_controller_1.getAllOrders)
    .get("/getOrderList", order_controller_1.getOrders)
    .post("/postOrder", order_controller_1.postOrder)
    .post("/changeOrderStatus", order_controller_1.changeOrderStatus);
exports.default = orderRouter;
