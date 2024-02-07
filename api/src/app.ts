import express from "express";
import cors from "cors";
import { json } from "body-parser";
import authRouter from "./routers/auth.router";
import usersRouter from "./routers/users.router";
import resetRouter from "./routers/reset.router";
const app = express();
app.use(cors());
app.use(json());
app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/reset", resetRouter);

export default app;
