import { comparePasswords, createJWT, hashPassword, raiseKnownError, raiseUnknownError } from '@/lib';
import { prisma } from '@/services';
import { NextFunction, Request, Response } from 'express';
import { AuthRequestBodySchema } from './schema';

export const handleSignIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return next(raiseKnownError('USER_NOT_FOUND'));
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      return next(raiseKnownError('INVALID_PASSWORD'));
    }

    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const handleSignUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });
    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    if (error?.code == 'P2002') {
      return next(raiseKnownError('USER_EXISTS'));
    }

    next(raiseUnknownError(error));
  }
};

export { AuthRequestBodySchema };
