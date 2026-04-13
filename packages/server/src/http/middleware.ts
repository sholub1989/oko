import type { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { CONFIG } from "../config.js";

export function applyMiddleware(app: Hono): void {
  app.use("*", logger((msg: string, ...rest: string[]) => {
    console.log(decodeURIComponent(msg), ...rest);
  }));
  app.use("*", cors({ origin: CONFIG.corsOrigin ?? `http://localhost:${CONFIG.port}` }));
}
