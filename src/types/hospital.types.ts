import mongoose from "mongoose";

export interface IAppointment extends Document {
  patient: mongoose.Types.ObjectId;
  doctor: mongoose.Types.ObjectId;
  date: Date;
  timeslot: string;
  status: string;
}