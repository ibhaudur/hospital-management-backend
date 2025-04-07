import { Request, Response } from "express";
import SpecializationModel from "../../models/specialization.model";
import { encrypt } from "../../security/AES";

const getSpecialization = async (req: Request, res: Response) => {
  let { page = 1, limit = 5 } = req.query;
  page = parseInt(page as string);
  limit = parseInt(limit as string);

  try {
    const totalSpecialization = await SpecializationModel.countDocuments();
    const totalPages = Math.ceil(totalSpecialization / limit);
    const response = await SpecializationModel.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res
      .status(200)
      .send({ 
        data: encrypt({
          status: true,
          message: "Listed Successfully!",
          data: response,
          totalPages,
          currentPage: page,
        },
      )});
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export default getSpecialization;
