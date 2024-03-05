import { Router } from "express";
import {
  getAllOrders,
  getOrders,
  postOrder,
} from "../controllers/order.controller";

const orderRouter = Router();

orderRouter
  .get("/getAllOrders", getAllOrders)
  .get("/getOrderList", getOrders)
  .post("/postOrder", postOrder);
export default orderRouter;
