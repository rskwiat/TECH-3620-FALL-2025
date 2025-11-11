import createApp from "./lib/create-app.js";
import { cors } from "hono/cors";
import { validateUser } from './middlewares/validators.js';
import { authJWT } from "./middlewares/auth.js";

import { healthCheck } from "./routes/healthcheck.js";
import { getAllUsers, registerUser, loginUser, requestPasswordReset } from "./routes/auth.js";
import { getUserJournals, createUserJournal } from "./routes/journals.js";
import * as routes from './constants/routes.js';

const app = createApp();

app.use('*', cors({
  origin: ['http://localhost:3000', 
    'http://localhost:8000',
  ],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.get(routes.HEALTHCHECK, healthCheck);
app.get('/users', getAllUsers);
app.post(routes.REGSISTER, validateUser, registerUser);
app.post(routes.LOGIN, validateUser, loginUser);
app.post(routes.REQUEST_PASSWORD, requestPasswordReset);

app.get(routes.JOURNALS, authJWT, getUserJournals);
app.post(routes.JOURNALS, authJWT, createUserJournal);

export default app;
