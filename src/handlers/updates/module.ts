import { NextFunction, Request, Response } from 'express';

import { raiseKnownError, raiseUnknownError } from '@/lib';
import { prisma } from '@/services';

import { UpdateRequestBodySchema } from './schema';
import { z } from 'zod';
import { Update } from '@prisma/client';

export const getOneUpdate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    if (!update) {
      return next(raiseKnownError('UPDATE_NOT_FOUND'));
    }

    res.status(200).json({ data: update });
  } catch (error) {
    raiseUnknownError(error);
  }
};

export const getUpdates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await prisma.product.findMany({
      where: { belongsToId: req.protectedRouteContext.user.id },
      include: { updates: true },
    });

    const updates = products.reduce((allUpdates: Update[], product) => [...allUpdates, ...product.updates], []);
    res.status(200).json({ data: updates });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const createUpdate = async (
  req: Request<unknown, unknown, z.infer<typeof UpdateRequestBodySchema>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, title, body, ...rest } = req.body;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      return next(raiseKnownError('PRODUCT_NOT_FOUND'));
    }

    const update = await prisma.update.create({
      data: {
        productId: product.id,
        title,
        body,
        ...rest,
      },
    });

    res.status(200).json({ data: update });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const updateUpdate = async (
  req: Request<{ id: string }, unknown, z.infer<typeof UpdateRequestBodySchema>>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: belongsToId } = req.protectedRouteContext.user;
    const products = await prisma.product.findMany({
      where: {
        belongsToId,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce((allUpdates: Update[], product) => [...allUpdates, ...product.updates], []);
    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      return next(raiseKnownError('UPDATE_NOT_FOUND'));
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.status(200).json({ data: updatedUpdate });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const deleteUpdate = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { id: belongsToId } = req.protectedRouteContext.user;
    const products = await prisma.product.findMany({
      where: {
        belongsToId,
      },
      include: {
        updates: true,
      },
    });
    const updates = products.reduce((allUpdates: Update[], product) => [...allUpdates, ...product.updates], []);
    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      return next(raiseKnownError('UPDATE_NOT_FOUND'));
    }

    const deletedUpdate = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({ data: deletedUpdate });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export { UpdateRequestBodySchema };
