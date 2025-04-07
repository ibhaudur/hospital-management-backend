import { NextFunction, Request, Response } from "express";
import Jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { CustomRequest } from "../types/hospital.interface";

dotenv.config();

const authMiddlewareJWT = (req: CustomRequest , res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send({ message: 'Unauthorized' });
        return;
    }

    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
        res.status(500).send({ message: 'Internal Server Error' });
        return;
    }

    Jwt.verify(token, secret, (err, user) => {
        if (err) {
            res.sendStatus(401);
            return;
        }else if(user){
           req.user = user;
        }
        next();
    });
};

export default authMiddlewareJWT;
