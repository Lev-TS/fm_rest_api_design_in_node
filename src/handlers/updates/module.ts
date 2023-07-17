import { NextFunction, Request, Response } from 'express';

import { raiseKnownError, raiseUnknownError } from '@/lib';
import { prisma } from '@/services';

import { UpdateRequestBodySchema } from './schema';

export const getOneUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = await prisma.update.findUniqueOrThrow({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ data: update });
  } catch (error) {
    if (error?.code == 'P2025') {
      return next(raiseKnownError('UPDATE_NOT_FOUND'));
    }

    raiseUnknownError(error);
  }
};

export const getUpdates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.context.user.id,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce((allUpdates, product) => [...allUpdates, ...product.updates], []);
    res.status(200).json({ data: updates });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const createUpdate = async (req: Request, res: Response, next: NextFunction) => {};
export const updateUpdate = async (req: Request, res: Response, next: NextFunction) => {};
export const deleteUpdate = async (req: Request, res: Response, next: NextFunction) => {};

export { UpdateRequestBodySchema };
