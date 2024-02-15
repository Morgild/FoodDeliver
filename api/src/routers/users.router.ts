import { Router } from "express";
import { getUser, getUsers, updateUser } from "../controllers/user.controller";

const usersRouter = Router();

usersRouter
  .get("/", getUsers)
  .get("/getUser", getUser)
  .post("/updateUser", updateUser);

export default usersRouter;
