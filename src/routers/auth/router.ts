import { Router } from 'express';

import { signin, signup } from '@/handlers';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);

export { router as authRouter };
