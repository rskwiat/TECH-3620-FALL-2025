import type { Context } from "hono";
import createApp from "./lib/create-app.js";
import { initializeDatabase } from "./db/database.js";

const app = createApp();
initializeDatabase();

app.get('/', (c: Context) => {
  return c.text('hello');
})

export default app;
