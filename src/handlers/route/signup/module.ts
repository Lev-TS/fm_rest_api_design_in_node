import { RequestHandler } from 'express';
import { z } from 'zod';

import { prisma } from '@/services';
import { createJWT, raiseKnownError, hashPassword } from '@/lib';

export const signup: RequestHandler = async (req, res, next) => {
  const BodySchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
  });

  const result = BodySchema.safeParse(req.body);

  if (!result.success) {
    return next(raiseKnownError('INVALID_BODY'));
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: result.data.username,
        password: await hashPassword(result.data.password),
      },
    });
    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    if (error?.code == 'P2002') {
      return next(raiseKnownError('INVALID_BODY'));
    }

    next(error);
  }
};
