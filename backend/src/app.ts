import createApp from "./lib/create-app.js";
import { cors } from "hono/cors";
import { initializeDatabase } from "./db/database.js";
import { validateUser } from './middlewares/validators.js';
import { authJWT } from "./middlewares/auth.js";

import { healthCheck } from "./routes/healthcheck.js";
import { loginUser, registerUser, requestPasswordReset, resetPassword } from "./routes/auth.js";
import { getUserJournals, createUserJournal } from "./routes/journals.js";
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

// @todo create a new table for journal entries with title date, new entries can only be created with valid logined users

app.get(routes.JOURNALS, authJWT, getUserJournals);
app.post(routes.JOURNALS, authJWT, createUserJournal);

export default app;
