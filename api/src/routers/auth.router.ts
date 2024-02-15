import { Router } from "express";
import { login, signUp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/signUp", signUp).post("/login", login);

export default authRouter;
