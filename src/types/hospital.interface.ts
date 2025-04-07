import { Document } from "mongoose";
import { Request } from "express";

export interface Patient extends Document {
    fullname: string;
    emailId: string;
    password: string;
    userType: string;
    specialization: string;
    dob: Date;
    contactNumber: number;
    bloodGroup: string;
    gender: string;
    address: string;
    role: "admin" | "doctor" | "patient";
    permission: string[];
  }
   export interface CustomRequest extends Request {
      user?: any;
    }