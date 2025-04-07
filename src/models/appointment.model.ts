import mongoose, { Schema, Document } from "mongoose";
import { IAppointment } from "../types/hospital.types";


const AppointmentSchema:Schema = new Schema({
  patientId: { type: mongoose.Types.ObjectId, ref: "Patient", required: true },
  doctorId: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
  date: { type: Date, required: true },
  timeslot: { type: String, required: true },
  status: {
    type: String,
    enum: ["Scheduled", "Waiting", "Cancelled", "Completed"],
    required: true,
  },
});

export const Appointment = mongoose.model<IAppointment>("Appointment", AppointmentSchema);
