import { prisma } from '@/services';
import { createJWT, raiseKnownError, hashPassword, raiseUnknownError } from '@/lib';

import { HandleSignUp } from './types';
import { SignUpReqBodySchema } from './schema';

export const handleSignUp: HandleSignUp = async (req, res, next) => {
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

export { SignUpReqBodySchema };
