import { Application } from "express";
import authMiddlewareJWT from "../middleware/authJwt.middleware";
import {
  getAllDoctors,
  getAllPatients,
} from "../controllers/user/get.controller";

const userRoutes = (app: Application) => {
  app.get("/doctors", authMiddlewareJWT, getAllDoctors);
  app.get("/patients", authMiddlewareJWT, getAllPatients);
};
export default userRoutes;
