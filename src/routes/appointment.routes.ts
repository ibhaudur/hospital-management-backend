import { Application } from "express";
import CreateAppointment from "../controllers/appointment/post.controller";
import authMiddlewareJWT from "../middleware/authJwt.middleware";
import { getAllAppointments } from "../controllers/appointment/get.controller";

const appointmentRoutes = (app: Application) => {
    app.post('/appointment', authMiddlewareJWT, CreateAppointment);
    app.get("/appointment", authMiddlewareJWT, getAllAppointments);
}

export default appointmentRoutes;
