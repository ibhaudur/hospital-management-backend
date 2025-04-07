import { Response } from "express";
import { Appointment } from "../../models/appointment.model";
import { CustomRequest } from "../../types/hospital.interface";

const CreateAppointment = async(req: CustomRequest, res: Response): Promise<any> => {
try{
   
    if(!req.body){
        res.send({message:'appointmnet request content cannot be empty'}).status(400);
        return;
    }
    const {doctorId, date, timeslot, status} = req.body.data;

    let user;
    console.log('req.user._doc---', req?.user._doc);
    if(req?.user._doc){
        user = req?.user._doc;
    }

    const patientId = user._id;

    const appointmentPayload = {
        patientId: patientId,
        doctorId: doctorId,
        date: date,
        timeslot: timeslot,
        status: status
    }
    
    const response = await Appointment.create(appointmentPayload);
    if(!response){
        res.send({message:"Won't be able to create appointment!!" }).status(400);
        return;
    }
    res.send({message:'Appointment schedule successfully'}).status(200);
    return;
}catch (error){
    res.send({message:'server error while creating appointment!!'}).status(500);
    return;
}
}

export default CreateAppointment;