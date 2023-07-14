import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { apiRouter, authRouter, homeRouter } from './routers';
import { protect } from './handlers';
import { handleError } from './handlers';
import { env } from './env/module';
import { validateBody } from './handlers/validators/body/module';
import { z } from 'zod';

const app = express().use([
  cors(),
  morgan(env.NODE_ENV === 'development' ? 'dev' : 'tiny'),
  express.json(),
  express.urlencoded({ extended: true }),
]);

app.use(homeRouter);
app.use('/api', protect, apiRouter);
app.use('/auth', authRouter);
app.use(handleError);

export default app;
