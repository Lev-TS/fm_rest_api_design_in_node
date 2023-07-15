import { z } from 'zod';
import { SignInReqBodySchema } from './schema';
import { RequestHandler } from 'express';

interface SignInResBody {
  token: string;
}

type SignInReqBody = z.infer<typeof SignInReqBodySchema>;

export type HandleSignIn = RequestHandler<undefined, SignInResBody, SignInReqBody>;
