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
exports.resetPassword = exports.sendEmail = void 0;
const models_1 = require("../models");
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const user = yield models_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Хэрэглэгч олдсонгүй, и-мэйлээ дахин шалгана уу",
            });
        }
        const otp = Math.floor(Math.random() * 1000000);
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: "morgild@gmail.com", pass: "rcdxbzdydfabwvzc" },
        });
        const mailOptions = {
            from: "morgild@gmail.com",
            to: email,
            subject: "Hello from Food Delivery Web",
            text: `Нэг удаагийн нэвтрэх нууц үг:${otp}`,
        };
        yield transporter.sendMail(mailOptions);
        const updateUser = yield models_1.UserModel.findOneAndUpdate({ _id: user._id }, {
            updatedAt: new Date(),
            otp: otp,
            otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
        });
        res.json({ otp, message: "Нэг удаагийн код и-мэйл рүү илгээгдсэн" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.sendEmail = sendEmail;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, otp } = req.body;
        const user = yield models_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Хэрэглэгч олдсонгүй, и-мэйлээ дахин шалгана уу!",
            });
        }
        const userOTP = user === null || user === void 0 ? void 0 : user.otp;
        if (userOTP != otp) {
            return res.status(401).json({
                message: "Нэг удаагийн код буруу байна.",
            });
        }
        yield models_1.UserModel.findOneAndUpdate({ _id: user._id }, {
            password: password,
            updatedAt: new Date(),
        });
        res.json({ message: "Хэрэглэгчийн нууц үг шинэчлэгдсэн" });
    }
    catch (err) {
        res.json(err);
    }
});
exports.resetPassword = resetPassword;
