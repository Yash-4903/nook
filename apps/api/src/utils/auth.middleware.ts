import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
    userId: string
}

export const authMiddleware = (req: Request, res:Response, next:NextFunction) =>{
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authentication token required'
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = decoded;
        next();
    } catch {
        return res.status(401).json({
            message: 'Failed to authenticate'
        })
    }
}