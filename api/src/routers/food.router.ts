import { Router } from "express";
import {
  foodPost,
  getCategories,
  getFoods,
  postCategory,
} from "../controllers/food.controller";

const foodRouter = Router();

foodRouter
  .get("/getFoods", getFoods)
  .post("/postFood", foodPost)
  .get("/getCategories", getCategories)
  .post("/postCategory", postCategory);
export default foodRouter;
