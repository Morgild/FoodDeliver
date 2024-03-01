"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const usersRouter = (0, express_1.Router)();
usersRouter
    .get("/", user_controller_1.getUsers)
    .get("/getUser", user_controller_1.getUser)
    .post("/updateUser", user_controller_1.updateUser);
exports.default = usersRouter;
