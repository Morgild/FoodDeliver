import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRouter from "./routers/auth.router";
import usersRouter from "./routers/users.router";
import resetRouter from "./routers/reset.router";
import foodRouter from "./routers/food.router";
const app = express();
app.use(cors());
app.use(json());
app.use("/auth", authRouter);
app.use("/user", usersRouter);
app.use("/reset", resetRouter);
app.use("/food", foodRouter);

export default app;
