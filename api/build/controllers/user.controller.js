"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUser = exports.getUsers = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//return All user list
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield models_1.UserModel.find({});
    return res.json(user);
});
exports.getUsers = getUsers;
//return one user
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized1" });
        }
        const { id: userId } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        const user = yield models_1.UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        return res.json(user);
    }
    catch (err) {
        res.json(err);
    }
});
exports.getUser = getUser;
//update user data
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const { profilePic, name, phone, email } = req.body;
        if (!authorization) {
            return res.status(401).json({ message: "Unauthorized1" });
        }
        const { id: userId } = jsonwebtoken_1.default.verify(authorization, "secret-key");
        const user = yield models_1.UserModel.findOne({ _id: userId });
        if (!user) {
            return res.status(401).json({ message: "Хэрэглэгч олдсонгүй" });
        }
        const updateUser = yield models_1.UserModel.findOneAndUpdate({ _id: user._id }, {
            profilePic,
            name,
            phone,
            email,
            updatedAt: new Date(),
        });
        return res.json({
            message: "Хэрэглэгчийн мэдээлэл амжилттай шинэчлэгдлээ",
        });
    }
    catch (err) {
        res.json(err);
    }
});
exports.updateUser = updateUser;
