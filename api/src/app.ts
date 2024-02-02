import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRouter from "./routers/auth.router";
import usersRouter from "./routers/users.router";
const app = express();
app.use(cors());
app.use(json());
app.use("/", authRouter);
app.use("/users", usersRouter);

export default app;
