import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (error, req, res, _next) => {
  res.status(error.status).json({ message: error.message });
};

export default errorMiddleware;
