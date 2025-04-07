import { Application } from "express";
import CreateAppointment from "../controllers/appointment/post.controller";
import authMiddlewareJWT from "../middleware/authJwt.middleware";

const appointmentRoutes = (app: Application) => {
    app.post('/appointment', authMiddlewareJWT, CreateAppointment)
}

export default appointmentRoutes;