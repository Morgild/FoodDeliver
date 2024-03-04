import { Router } from "express";
import {
  deleteCategory,
  editCategory,
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
  .post("/postCategory", postCategory)
  .post("/deleteCategory", deleteCategory)
  .post("/editCategory", editCategory);
export default foodRouter;
