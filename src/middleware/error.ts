import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({ message: 'Not authenticated' });
  } else if (err.name === 'NotFoundError') {
    res.status(404).send({ message: 'Route not found' });
  } else {
    res.status(500).send({ message: 'An unexpected error occurred' });
  }
};
