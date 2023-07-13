import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { RequestHandler } from 'express';

import { JwtPayloadSchema } from './schema';
import type { ProtectedRouteRequest, User } from './types';
import { env } from '../env/module';

const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

const hashPassword = (password: string, salt = 5) => bcrypt.hash(password, salt);

const createJWT = ({ id, username }: User) => jwt.sign({ id, username }, env.JTW_SECRET);

const protect: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.replace('Bearer ', '');

  if (!token) {
    res.status(401).json({ message: 'not authorized' });
    return;
  }

  console.log('token', token);

  try {
    const payload = JwtPayloadSchema.parse(jwt.verify(token, env.JTW_SECRET));
    console.log('payload', payload);

    if (typeof payload === 'string') {
      throw new Error();
    }

    (req as ProtectedRouteRequest).user = payload;

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'invalid token' });
    return;
  }
};

export { ProtectedRouteRequest, comparePasswords, createJWT, hashPassword, protect };
