import { Router } from "express";
import { resetPassword, sendEmail } from "../controllers/reset.controller";

const resetRouter = Router();

resetRouter.post("/sendEmail", sendEmail).post("/resetPassword", resetPassword);

export default resetRouter;
