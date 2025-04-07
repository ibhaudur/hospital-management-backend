import { Application } from "express";
import { getAllAppointments } from "../controllers/appointment/get.controller";
import authMiddlewareJWT from "../middleware/authJwt.middleware";

const appointmentRoutes = (app: Application) => {
  app.get("/appointment", authMiddlewareJWT, getAllAppointments);
};
export default appointmentRoutes;
