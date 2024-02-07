import { Router } from "express";
import { getUser, login, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter
  .post("/signUp", signUp)
  .post("/login", login)
  .get("/getUser", getUser);

export default authRouter;
