import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import type { User } from '@prisma/client';

import { env } from '../env/module';

const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

const hashPassword = (password: string, salt = 5) => bcrypt.hash(password, salt);

const createJWT = ({ id, username }: User) => jwt.sign({ id, username }, env.JTW_SECRET);

const verifyJWT = (token: string) => jwt.verify(token, env.JTW_SECRET);

export { comparePasswords, createJWT, hashPassword, verifyJWT };
