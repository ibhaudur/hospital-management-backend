import { Response } from "express";
import { CustomRequest } from "../../types/hospital.types";
import userModel from "../../models/user.model";
import logger from "../../utils/logger";

export const getAllDoctors = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let { page = 1, limit = 5 } = request.query;

    page = parseInt(page as string);
    limit = parseInt(limit as string);

    const totalDoctors = await userModel.countDocuments({ role: "doctor" });
    const totalPages = Math.ceil(totalDoctors / limit);

    const doctors = await userModel
      .find({ role: "doctor" })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    response.status(200).send({
      data: {
        status: true,
        message: "Doctors Fectched Successfully",
        data: doctors,
        totalDoctors,
        totalPages,
        currentPage: page,
      },
    });
    logger.info({
      status: true,
      message: "Doctors Fectched Successfully",
      data: doctors,
      totalDoctors,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    response.status(500).json({ status: false, message: "Server Error" });
    logger.error("Server Error");
  }
};

export const getAllPatients = async (
  request: CustomRequest,
  response: Response
) => {
  try {
    let { page = 1, limit = 5 } = request.query;

    page = parseInt(page as string);
    limit = parseInt(limit as string);

    const totalPatients = await userModel.countDocuments({ role: "patient" });
    const totalPages = Math.ceil(totalPatients / limit);
    const patients = await userModel.find({ role: "patient" });
    if (!patients) {
      response.status(400).json({ message: "No patients found" });
    }
    response.status(200).send({
      data: {
        status: true,
        message: "Patients fecthed successfully",
        data: patients,
        totalPatients,
        totalPages,
        currentPage: page,
      },
    });
    logger.info({
      status: true,
      message: "Patients fecthed successfully",
      data: patients,
      totalPatients,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    response.status(500).json({ status: false, message: "Server Error" });
    logger.error("Server Error");
  }
};
