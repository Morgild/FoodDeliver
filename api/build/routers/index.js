"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_router_1 = __importDefault(require("./auth.router"));
const users_router_1 = __importDefault(require("./users.router"));
exports.default = {
    authRouter: auth_router_1.default,
    usersRouter: users_router_1.default
};
