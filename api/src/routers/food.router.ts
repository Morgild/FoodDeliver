import { Router } from "express";
import {
  foodPost,
  getCategories,
  getFoods,
  postCategory,
  postOrder,
} from "../controllers/food.controller";

const foodRouter = Router();

foodRouter
  .get("/getFoods", getFoods)
  .post("/postFood", foodPost)
  .get("/getCategories", getCategories)
  .post("/postCategory", postCategory)
  .post("/postOrder", postOrder);
export default foodRouter;
