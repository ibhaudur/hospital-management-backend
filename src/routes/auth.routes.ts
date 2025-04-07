import { Application } from "express";
import authLoginUser from "../controllers/auth/login.controller";
import authRegister from "../controllers/auth/register.controller";


const authRoutes = (app: Application) => {
    app.post('/login', authLoginUser);
    app.post('/register', authRegister);
}
export default authRoutes;