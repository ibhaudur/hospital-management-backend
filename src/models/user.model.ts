import mongoose, { Schema } from "mongoose";
import { Patient } from "../types/hospital.interface";

const userSchema : Schema = new Schema({
    fullName: {
        type: String,
        require: true
    },
    emailId: {
        type: String,
        require: true,
        unique: true
    },
    userType: {
        type: String,
        require: true
    },
    specialization: {
        type: String,
        require : false
    },
    password:{
        type: String,
        require: true
    },
    dob: {
        type: Date,
        require: true
    },
    contactNumber: {
        type: Number,
        require: true,
        unique: true
    },
    bloodGroup: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    permission: {
        type: Array,
        require: true
    }
},{ timestamps: true })

const userModel = mongoose.model<Partial<Patient>>('users',userSchema);

export default userModel;