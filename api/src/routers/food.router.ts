import { Router } from "express";
import { getFoods } from "../controllers/food.controller";

const foodRouter = Router();

foodRouter.get("/getFoods", getFoods);
export default foodRouter;
