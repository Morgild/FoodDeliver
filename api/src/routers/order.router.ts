import { Router } from "express";
import { getOrders, postOrder } from "../controllers/order.controller";

const orderRouter = Router();

orderRouter.get("/getOrderList", getOrders).post("/postOrder", postOrder);
export default orderRouter;
