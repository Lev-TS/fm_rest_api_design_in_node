import { z } from 'zod';
import { SignUpReqBodySchema } from './schema';
import { RequestHandler } from 'express';

interface SignUpResBody {
  token: string;
}

type SignUpReqBody = z.infer<typeof SignUpReqBodySchema>;

export type HandleSignUp = RequestHandler<undefined, SignUpResBody, SignUpReqBody>;
