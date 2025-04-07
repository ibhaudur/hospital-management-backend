import { Application } from "express";
import CreateAppointment from "../controllers/appointment/post.controller";

const appointmentRoutes = (app: Application) => {
    app.post('/appointment', CreateAppointment)
}

export default appointmentRoutes;