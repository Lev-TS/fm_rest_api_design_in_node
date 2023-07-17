import {
  ProductRequestBodySchema,
  UpdateRequestBodySchema,
  createProduct,
  createUpdate,
  deleteProduct,
  deleteUpdate,
  getOneProduct,
  getOneUpdate,
  getProducts,
  getUpdates,
  updateProduct,
  updateUpdate,
} from '@/handlers';
import { validateBody } from '@/validators';
import { Router } from 'express';

const router = Router();

/**
 * Product
 */

router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', validateBody(ProductRequestBodySchema), updateProduct);
router.post('/product', validateBody(ProductRequestBodySchema), createProduct);

/**
 * Update
 */

router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);
router.delete('/update/:id', deleteUpdate);
router.put('/update/:id', validateBody(UpdateRequestBodySchema), updateUpdate);
router.post('/update', validateBody(UpdateRequestBodySchema), createUpdate);

/**
 * UpdatePoints
 */

router.get('/update_points', () => {});
router.get('/update_points/:id', () => {});
router.put('/update_points/:id', () => {});
router.post('/update_points', () => {});
router.delete('/update_points/:id', () => {});

export { router as apiRouter };
