import { prisma } from '@/services';
import { comparePasswords, createJWT, raiseKnownError, raiseUnknownError } from '@/lib';
import { HandleSignIn } from './types';
import { SignInReqBodySchema } from './schema';

export const handleSignIn: HandleSignIn = async (req, res, next) => {
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

export { SignInReqBodySchema };
