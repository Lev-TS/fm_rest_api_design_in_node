import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { User } from '@prisma/client';
import { env } from '@/env/module';

export const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

export const hashPassword = (password: string, salt = 5) => bcrypt.hash(password, salt);

export const createJWT = ({ id, username }: User) => jwt.sign({ id, username }, env.JTW_SECRET);

export const verifyJWT = (token: string) => jwt.verify(token, env.JTW_SECRET);
