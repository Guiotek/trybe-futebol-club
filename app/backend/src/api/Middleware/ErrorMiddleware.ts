import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = async (error, req, res, _next) => {
  console.log(error);
  res.status(error.status).json({ message: error.message });
};

export default errorMiddleware;
