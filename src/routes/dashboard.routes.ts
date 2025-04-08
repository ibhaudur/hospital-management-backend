import { Application } from "express";
import authMiddlewareJWT from "../middleware/authJwt.middleware";
import { getDashboardData } from "../controllers/Dashboard/get.controller";

const dashBoardRoutes = (app: Application) => {
  app.get("/dashboard", authMiddlewareJWT, getDashboardData);
};

export default dashBoardRoutes;