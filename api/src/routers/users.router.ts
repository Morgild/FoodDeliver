import { Router } from "express";
import { getUsers } from "../controllers/user.controller";

const usersRouter = Router();

usersRouter.get("/", getUsers);

export default usersRouter;
