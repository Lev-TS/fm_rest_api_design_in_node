import { ErrorRequestHandler } from 'express';

export const handleError: ErrorRequestHandler = (error, _, res, next) => {
  if (!error) {
    return next();
  }

  if (!error.isKnown) {
    return res.status(500).json({ message: 'Internal server error' });
  }

  return res.status(error.status).json({ message: error.message });
};
