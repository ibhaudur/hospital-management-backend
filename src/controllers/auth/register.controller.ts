import { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import logger from "../../utils/logger";
import userModel from "../../models/user.model";

const authRegister = async (req: Request, res: Response): Promise<void> => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  const data = req.body.data;
  const { password, ...rest } = data;

  try {
    const existingUser = await userModel.findOne({ emailId: data.emailId });
    if (existingUser) {
      res.status(400).send({ message: "Email already exists!" });
      return;
    }
    const existingContact = await userModel.findOne({
      contactNumber: data.contactNumber,
    });
    if (existingContact) {
      res.status(400).send({ message: "Contact number already exists!" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password || "123456", 10);
    const user = {
      _id: new mongoose.Types.ObjectId(),
      ...rest,
      password: hashedPassword,
      date: new Date(),
      role: data?.userType === "patient" ? "patient" : "doctor",
      permission:
        data?.userType === "patient"
          ? ["dashboard", "appointmentManagement",]
          : ["dashboard", "doctorManagement", "appointmentManagement","usersManagement"],
    };

    await userModel.create(user);
    res
      .status(201)
      .send({
        data: {
          status: true,
          message: password
            ? "Registered Successfully!!"
            : "User Added Successfully!",
        },
      });
    logger.info({
      message: password
        ? "Registered Successfully!!"
        : "User Added Successfully!",
    });
  } catch (error) {
    res.status(500).send({ message: "Server error!" });
    logger.error("Server error!", error);
  }
};

export default authRegister;
