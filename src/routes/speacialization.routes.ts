import { Application } from "express";
import authMiddlewareJWT from "../middleware/authJwt.middleware";
import createSpecialization from "../controllers/specialization/post.controller";
import getSpecialization from "../controllers/specialization/get.controller";
import getWithoutPagiSpecialization from "../controllers/specialization/getWithoutPagi.controller";


const specializationRoutes = (app: Application) => {
    app.post('/specialization',authMiddlewareJWT,createSpecialization);
    app.get('/specialization',authMiddlewareJWT,getSpecialization);
    app.get('/specializationWithoutPagination',getWithoutPagiSpecialization);
}
export default specializationRoutes