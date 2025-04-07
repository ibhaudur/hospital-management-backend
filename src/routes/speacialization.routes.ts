import { Application } from "express";
import authMiddlewareJWT from "../middleware/authJwt.middleware";
import createSpecialization from "../controllers/specialization/post.controller";
import getSpecialization from "../controllers/specialization/get.controller";


const specializationRoutes = (app: Application) => {
    app.post('/specialization',authMiddlewareJWT,createSpecialization);
    app.get('/specialization',authMiddlewareJWT,getSpecialization);
}
export default specializationRoutes