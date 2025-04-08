import { Response } from "express";
import { Appointment } from "../../models/appointment.model";
import userModel from "../../models/user.model";
import { CustomRequest } from "../../types/hospital.types";
import logger from "../../utils/logger";

export const getDashboardData = async (req: CustomRequest, res: Response) => {
  try {
    const { _id, role } = req?.user?._doc;

    let totalPatients;
    let totalDoctors;
    let totalAppointments;

    if (role === "admin") {
      totalPatients = await userModel.countDocuments({ role: "patient" });
      totalDoctors = await userModel.countDocuments({ role: "doctor" });
      totalAppointments = await Appointment.countDocuments();
    } else if (role === "doctor") {
      totalPatients = await userModel.countDocuments({
        role: "patient",
        doctorId: _id,
      });
      totalDoctors = 1; // The logged-in doctor
      totalAppointments = await Appointment.countDocuments({
        doctorId: _id,
      });
    } else if (role === "patient") {
      totalPatients = 1; // The logged-in patient
      totalDoctors = await userModel.countDocuments({ role: "doctor" });
      totalAppointments = await Appointment.countDocuments({
        patientId: _id,
      });
    }

    res.status(200).send({
      data: {
        status: true,
        message: "Dashboard data fetched successfully",
        data: {
          totalPatients,
          totalDoctors,
          totalAppointments,
        },
      },
    });
    logger.info({
      status: true,
      message: "Dashboard data fetched successfully",
      data: {
        totalPatients,
        totalDoctors,
        totalAppointments,
      },
    });
  } catch (error) {
    res.status(500).json({ status: false, message: "Server Error" });
  }
};
