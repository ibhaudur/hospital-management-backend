import { Application, Request, Response } from "express";
import timeslot from "../utils/timeSlotData";
import authMiddlewareJWT from "../middleware/authJwt.middleware";

const timeslotRoute = (app: Application) => {
    app.get('/timeslots', authMiddlewareJWT, (req: Request, res: Response) => {
        res.json(timeslot);
    })
}

export default timeslotRoute;