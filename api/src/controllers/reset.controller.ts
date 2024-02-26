import { RequestHandler } from "express";
import { UserModel } from "../models";
import nodemailer from "nodemailer";

export const sendEmail: RequestHandler = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Хэрэглэгч олдсонгүй, и-мэйлээ дахин шалгана уу",
      });
    }
    const otp = Math.floor(Math.random() * 1000000);

    const transporter = nodemailer.createTransport({
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

    await transporter.sendMail(mailOptions);

    const updateUser = await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        updatedAt: new Date(),
        otp: otp,
        otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
      }
    );
    res.json({ otp, message: "Нэг удаагийн код и-мэйл рүү илгээгдсэн" });
  } catch (err) {
    res.json(err);
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Хэрэглэгч олдсонгүй, и-мэйлээ дахин шалгана уу!",
      });
    }

    const userOTP = user?.otp;

    if (userOTP != otp) {
      return res.status(401).json({
        message: "Нэг удаагийн код буруу байна.",
      });
    }

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        password: password,
        updatedAt: new Date(),
      }
    );
    res.json({ message: "Хэрэглэгчийн нууц үг шинэчлэгдсэн" });
  } catch (err) {
    res.json(err);
  }
};
