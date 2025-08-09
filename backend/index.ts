import { serve } from '@hono/node-server';
import { config } from 'dotenv';
import { app } from './src/app';

const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env';

config({
  path: envFile
});

const { PORT } = process.env || 4000;

console.log(
  `Server is running on port http://localhost:${PORT}`
);

serve({
  fetch: app.fetch,
  port: PORT,
});
