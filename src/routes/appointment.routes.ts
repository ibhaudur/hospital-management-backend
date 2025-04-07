import { Application } from "express";
import { getAllAppointments } from "../controllers/appointment/get.controller";

const appointmentRoutes = (app: Application) => {
  app.get("/appointment", getAllAppointments);
};
export default appointmentRoutes;
