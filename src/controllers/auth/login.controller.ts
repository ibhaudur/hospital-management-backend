import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import logger from "../../utils/logger";
import userModel from "../../models/user.model";

const authLoginUser = async (req: Request, res: Response): Promise<void> => {
  const { emailId, password } = req.body.data;

  if (!emailId || !password) {
    res.status(400).send({ message: "Email and password are required!" });
    return;
  }

  try {
    const user = await userModel.findOne({emailId});
    if (!user) {
      res.status(404).send({ message: "User not found!" });
      return;
    }
    if(!user.password){
      res.status(404).send({ message: "Please enter correct password!" });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(404).send({ message: "Invalid password!" });
      return;
    }
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      res.status(500).send({ message: "Internal Server Error" });
      return;
    }

    const token = jwt.sign({ ...user }, secret, {
      expiresIn: "1h",
    });
    const { password: _, ...rest } = user.toObject();
    res.status(200).send({data: {
      status: true,
      message: "Login successful!",
      data: rest,
      accessToken: token,
    }});
    logger.info({message: "Logged in Successfully!",data: rest})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
    logger.error("Login Failed!",error)
  }
};

export default authLoginUser;
