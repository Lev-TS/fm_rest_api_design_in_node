import { z } from 'zod';
import { SignInReqBodySchema } from './schema';
import { RequestHandler } from 'express';

interface SignUpResBody {
  token: string;
}

type SignUpReqBody = z.infer<typeof SignInReqBodySchema>;

export type HandleSignIn = RequestHandler<undefined, SignUpResBody, SignUpReqBody>;
