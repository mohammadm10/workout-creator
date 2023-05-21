import { NextFunction, Request, Response } from "express";

export const NotFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({ message: 'Route not found' });
};
