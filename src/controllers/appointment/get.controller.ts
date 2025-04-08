import { Response } from "express";
import { Appointment } from "../../models/appointment.model";
import { CustomRequest } from "../../types/hospital.types";
import logger from "../../utils/logger";

export const getAllAppointments = async (
  request: CustomRequest,
  response: Response
): Promise<void> => {
  try {
    let { page = 1, limit = 5, status } = request.query;
    const { _id, role } = request?.user?._doc;

    page = parseInt(page as string);
    limit = parseInt(limit as string);

    const query =
      role === "admin"
        ? {}
        : role === "patient"
        ? { patientId: _id }
        : { doctorId: _id };

    console.log(query);

    console.log(role);
    

    const totalAppointments = await Appointment.countDocuments(query);
    const totalPages = Math.ceil(totalAppointments / limit);
    const appointments = await Appointment.find(query)
      .populate("patientId")
      .populate("doctorId")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    response.status(200).send({
      data: {
        status: true,
        message: "Appointments Fetched Successfully",
        data: appointments,
        totalAppointments,
        totalPages,
        currentPage: page,
      },
    });
    logger.info({
      status: true,
      message: "Appointments Fetched Successfully",
      data: appointments,
      totalAppointments,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    response.status(500).json({ status: false, message: "Server Error" });

    logger.error("Server Error");
  }
};
