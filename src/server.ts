import app from './app';
import { env } from './env/module';

app.listen(env.PORT, () => {
  console.log(`Server listening on: http://localhost:${env.PORT}`);
});
