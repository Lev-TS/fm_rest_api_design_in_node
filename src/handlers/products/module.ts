import { prisma } from '@/services';
import { type NextFunction, Request, Response } from 'express';
import { raiseKnownError, raiseUnknownError } from '@/lib';
import { ProductRequestBodySchema } from './schema';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.protectedRouteContext.user.id,
      },
      include: {
        products: true,
      },
    });

    if (!user) {
      return next(raiseKnownError('USER_NOT_FOUND'));
    }

    res.status(200).json({ data: user.products });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const getOneProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  console.log('here');
  try {
    const product = await prisma.product.findUnique({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.protectedRouteContext.user.id,
        },
      },
    });

    if (!product) {
      return next(raiseKnownError('PRODUCT_NOT_FOUND'));
    }

    res.status(200).json({ data: product });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.protectedRouteContext.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200).json({ data: updateProduct });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.protectedRouteContext.user.id,
      },
    });

    res.status(200).json({ data: newProduct });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.protectedRouteContext.user.id,
        },
      },
    });

    res.status(200).json({ data: deletedProduct });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export { ProductRequestBodySchema };
