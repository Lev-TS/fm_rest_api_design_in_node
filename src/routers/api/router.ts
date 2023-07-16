import {
  ProductRequestBodySchema,
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from '@/handlers';
import { validateBody } from '@/validators';
import { Router } from 'express';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.put('/product/:id', validateBody(ProductRequestBodySchema), updateProduct);
router.post('/product', validateBody(ProductRequestBodySchema), createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */

router.get('/update', () => {});
router.get('/update:id', () => {});
router.put('/update:id', () => {});
router.post('/update', () => {});
router.delete('/update', () => {});

/**
 * UpdatePoints
 */

router.get('/update_points', () => {});
router.get('/update_points:id', () => {});
router.put('/update_points:id', () => {});
router.post('/update_points', () => {});
router.delete('/update_points', () => {});

export { router as apiRouter };
