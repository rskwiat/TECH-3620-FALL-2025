import type { Context } from "hono";
import createApp from "./lib/create-app.js";

const app = createApp();

app.get('/', (c: Context) => {
  return c.text('hello');
})

export default app;
