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
exports.login = exports.signUp = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, address, password } = req.body;
        const userExist = yield models_1.UserModel.find({ email });
        if (userExist.length) {
            return res.status(401).json({
                message: `${email} и-мэйлтэй хэрэглэгч өмнө бүртгэгдсэн байна`,
            });
        }
        const defaultRole = "user";
        const defaultPhone = "88888888";
        const defaultImg = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        const user = yield models_1.UserModel.create({
            name,
            email,
            phone: defaultPhone,
            address,
            password,
            profilePic: defaultImg,
            updatedAt: new Date(),
            createdAt: new Date(),
            role: defaultRole,
        });
        return res.json({ message: "Шинэ хэрэглэгч амжилттай үүслээ" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield models_1.UserModel.findOne({ email, password });
        if (!user) {
            return res.status(401).json({
                message: "Бүртгэлтэй хэрэглэгч олдсонгүй",
            });
        }
        const id = user._id;
        const role = user.role;
        const token = jsonwebtoken_1.default.sign({ id, role }, "secret-key");
        return res.json({ user, token, message: "Амжилттай нэвтэрлээ" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.login = login;
