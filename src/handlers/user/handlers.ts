import { prisma, hashPassword, createJWT, comparePasswords } from '@/modules';
import { RequestHandler } from 'express';
import { z } from 'zod';

const createNewUser: RequestHandler = async (req, res) => {
  console.log('test');

  const BodySchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
  });

  const result = BodySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  try {
    const data = {
      username: result.data.username,
      password: await hashPassword(result.data.password),
    };
    const user = await prisma.user.create({ data });
    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: 'Server failed' });
  }
};

const signin: RequestHandler = async (req, res) => {
  const BodySchema = z.object({
    username: z.string().min(1),
    password: z.string().min(6),
  });

  const result = BodySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Invalid request body' });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      res.status(404).json({ message: 'Invalid username' });
      return;
    }

    const isValid = await comparePasswords(req.body.password, user?.password);

    if (!isValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    res.status(200).json({ token: createJWT(user) });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: 'Server failed' });
  }
};

export { createNewUser, signin };
