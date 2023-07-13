import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import router from './router';
import { protect, env } from '@/modules';
import { createNewUser, signin } from '@/handlers';

const app = express();

app.use(cors()); // allows only access from the same server
app.use(morgan('dev')); // logger
app.use(express.json()); // simplifies parsing json
app.use(express.urlencoded({ extended: true })); // simplifies parsing query params and strings

app.get('/', (req, res) => {
  res.status(200).json({ message: 'hello' });
});

app.use('/api', protect, router);
app.post('/user', createNewUser);
app.post('/signin', signin);

app.listen(env.PORT, () => {
  console.log(`server started at: http://localhost:${env.PORT}`);
});
