import createApp from "./lib/create-app.js";
import { initializeDatabase } from "./db/database.js";
import { healthCheck } from "./routes/healthcheck.js";

const app = createApp();
initializeDatabase();

app.get('/healthcheck', healthCheck);

export default app;
