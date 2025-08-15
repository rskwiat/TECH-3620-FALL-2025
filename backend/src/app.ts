import createApp from "./lib/create-app.js";
import { cors } from "hono/cors";
import { initializeDatabase } from "./db/database.js";
import { validateUser } from './middlewares/validators.js';

import { healthCheck } from "./routes/healthcheck.js";
import { loginUser, registerUser, requestPasswordReset, resetPassword } from "./routes/auth.js";
import * as routes from './constants/routes.js';

const app = createApp();
initializeDatabase();

app.use('*', cors({
  origin: ['http://localhost:3000', 
    'http://localhost:8000',// Allow local network IPs
  ], // Add your React Native dev server
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get(routes.HEALTHCHECK, healthCheck);
app.post(routes.REGSISTER, validateUser, registerUser);
app.post(routes.LOGIN, validateUser, loginUser);
app.post(routes.REQUEST_PASSWORD, requestPasswordReset);
app.post(routes.RESET_PASSWORD, validateUser, resetPassword);

// @todo if a route is authorized have access to the public folder of images


export default app;
