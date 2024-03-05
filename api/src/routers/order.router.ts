import { Router } from "express";
import {
  changeOrderStatus,
  getAllOrders,
  getOrders,
  postOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter
  .get("/getAllOrders", getAllOrders)
  .get("/getOrderList", getOrders)
  .post("/postOrder", postOrder)
  .post("/changeOrderStatus", changeOrderStatus);
export default orderRouter;
