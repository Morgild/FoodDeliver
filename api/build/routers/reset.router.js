"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reset_controller_1 = require("../controllers/reset.controller");
const resetRouter = (0, express_1.Router)();
resetRouter.post("/sendEmail", reset_controller_1.sendEmail).post("/resetPassword", reset_controller_1.resetPassword);
exports.default = resetRouter;
