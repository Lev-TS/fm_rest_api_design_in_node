import { Router } from 'express';

import { handleSignIn, handleSignUp, SignUpReqBodySchema, SignInReqBodySchema } from '@/handlers';
import { validateBody } from '@/handlers/validators/body/module';

const router = Router();

router.post('/signup', validateBody(SignUpReqBodySchema), handleSignUp);
router.post('/signin', validateBody(SignInReqBodySchema), handleSignIn);

export { router as authRouter };
