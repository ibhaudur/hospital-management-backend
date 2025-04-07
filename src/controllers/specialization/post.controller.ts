import { Request, Response } from "express";
import { decrypt, encrypt } from "../../security/AES";
import SpecializationModel from "../../models/specialization.model";


const createSpecialization = async (req: Request, res: Response) => {
    const data = decrypt(req.body.data)

    try{
        await SpecializationModel.create(data);
        res.status(200).send({data: encrypt({status: true, message: "Added Successfully!"})})
    }catch (err){
        res.status(500).json({message:"Server Error!"})
    }
}

export default createSpecialization;