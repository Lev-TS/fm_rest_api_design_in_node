import { prisma } from '@/services';
import { type NextFunction, Request, Response } from 'express';
import { raiseKnownError, raiseUnknownError } from '@/lib';
import { ProductRequestBodySchema } from './schema';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.context.user.id,
      },
      include: {
        products: true,
      },
    });

    res.status(200).json({ data: user.products });
  } catch (error) {
    next(raiseUnknownError(error));
  }
};

export const getOneProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  console.log('here');
  try {
    const product = await prisma.product.findUniqueOrThrow({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.context.user.id,
        },
      },
    });

    res.status(200).json({ data: product });
  } catch (error) {
    if (error?.code == 'P2025') {
      return next(raiseKnownError('PRODUCT_NOT_FOUND'));
    }

    next(raiseUnknownError(error));
  }
};

export const updateProduct = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const updateProduct = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.context.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });

    res.status(200).json({ data: updateProduct });
  } catch (error) {
    if (error?.code == 'P2025') {
      return next(raiseKnownError('PRODUCT_NOT_FOUND'));
    }
    next(raiseUnknownError(error));
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.context.user.id,
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
          belongsToId: req.context.user.id,
        },
      },
    });

    res.status(200).json({ data: deletedProduct });
  } catch (error) {
    if (error?.code == 'P2025') {
      return next(raiseKnownError('PRODUCT_NOT_FOUND'));
    }
    next(raiseUnknownError(error));
  }
};

export { ProductRequestBodySchema };
