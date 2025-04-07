import { Request, Response } from "express";
import SpecializationModel from "../../models/specialization.model";
import { encrypt } from "../../security/AES";

const getWithoutPagiSpecialization = async (req: Request, res: Response) => {
  try {
    const response = await SpecializationModel.find();
    res
      .status(200)
      .send({ 
        data: encrypt({
          status: true,
          message: "Listed Successfully!",
          data: response
        },
      )});
  } catch (err) {
    res.status(500).json({ message: "Server Error!" });
  }
};

export default getWithoutPagiSpecialization;
