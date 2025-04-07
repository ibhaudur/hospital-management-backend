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

    
    let patientId = role === "admin" ? "" : _id;

    page = parseInt(page as string);
    limit = parseInt(limit as string);

    const query = patientId === "" ? {} : { patientId };

    const totalAppointments = await Appointment.countDocuments(query);
    const totalPages = Math.ceil(totalAppointments / limit);
    const appointments = await Appointment
      .find(query)
      .populate("patientId")
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    response.status(200).send({
        status: true,
        message: "Appointments Fetched Successfully",
        data: appointments,
        totalAppointments,
        totalPages,
        currentPage: page,
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
    response
      .status(500)
      .json({ status: false, message: "Server Error" });
      console.log(error);
      
    logger.info("Server Error");
  }
};