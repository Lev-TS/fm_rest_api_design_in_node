import { Router } from 'express';

import { AuthRequestBodySchema, handleSignIn, handleSignUp } from '@/handlers';
import { validateBody } from '@/validators';

const router = Router();

router.post('/signup', validateBody(AuthRequestBodySchema), handleSignUp);
router.post('/signin', validateBody(AuthRequestBodySchema), handleSignIn);

export { router as authRouter };
