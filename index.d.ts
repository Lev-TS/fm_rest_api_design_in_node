import { Express } from 'express-serve-static-core';

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
  namespace Express {
    interface Request {
      protectedRouteContext: {
        user: {
          id: string;
          username: string;
        };
      };
    }
  }
}
