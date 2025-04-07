import mongoose, { Schema } from "mongoose";
import { ISpecialization } from "../types/hospital.interface";


const specialization : Schema = new Schema({
    name: {type: String, require: true, unique: true}
})

const SpecializationModel = mongoose.model<ISpecialization>('specialization',specialization);
export default SpecializationModel