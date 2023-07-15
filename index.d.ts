import { Express } from 'express-serve-static-core';
// import { z } from 'zod';
// import { EnvSchema } from './env/schema';

// declare module 'express-serve-static-core' {
//   interface Request {
//     context?: {
//       user?: {
//         id: string;
//         username: string;
//       };
//     };
//   }
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof EnvSchema> {}
  }
  namespace Express {
    interface Request {
      context?: {
        user?: {
          id: string;
          username: string;
        };
      };
    }
  }
}
