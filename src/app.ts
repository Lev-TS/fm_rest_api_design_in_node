import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { env } from '@/modules';
import { apiRouter, authRouter } from '@/routers';
import { protect } from '@/middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'nothing on the root' });
});

app.use('/api', protect, apiRouter);
app.use('/auth', protect, authRouter);

app.listen(env.PORT, () => {
  console.log(`server started at: http://localhost:${env.PORT}`);
});
