import { Request } from "express";
import mongoose from "mongoose";

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  timeslot: string;
  status: string;
}

export interface CustomRequest extends Request {
    user?: any;
  }