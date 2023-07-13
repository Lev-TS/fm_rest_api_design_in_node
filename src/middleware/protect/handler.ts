import { type RequestHandler } from 'express';

import { verifyJWT } from '@/modules';

import type { ProtectedRouteRequest } from './types';

const protect: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'not authorized' });
    return;
  }

  try {
    const payload = verifyJWT(token);

    if (typeof payload === 'string' || typeof payload?.username !== 'string' || typeof payload?.id !== 'string') {
      throw new Error('Invalid payload');
    }

    (req as ProtectedRouteRequest).user = { id: payload.id, username: payload.username };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'invalid token' });
    return;
  }
};

export { type ProtectedRouteRequest, protect };
