import { RequestHandler } from 'express';
import { z } from 'zod';

import { prisma } from '@/services';
import { comparePasswords, createJWT } from '@/lib';

export const signin: RequestHandler = async (req, res, next) => {
  const BodySchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
  });

  const result = BodySchema.safeParse(req.body);

  if (!result.success) {
    return next({ status: 400, message: 'Invalid request body' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: result.data.username,
      },
    });

    if (!user) {
      return next({ status: 404, message: 'User not found' });
    }

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      next({ status: 401, message: 'Invalid password' });
      return;
    }

    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    next({ unknownError: error });
  }
};
