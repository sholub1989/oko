import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "../trpc/router.js";
import type { Context } from "../trpc/context.js";
import { applyMiddleware } from "./middleware.js";
import { registerChatRoutes } from "./routes/chat.js";
import { mountStaticFiles } from "./static.js";

export function createApp(context: Context) {
  const app = new Hono();

  applyMiddleware(app);

  app.get("/health", (c) => c.json({ status: "ok" }));

  registerChatRoutes(app, context);

  app.use(
    "/api/trpc/*",
    trpcServer({
      endpoint: "/api/trpc",
      router: appRouter,
      createContext: () => context as unknown as Record<string, unknown>,
    }),
  );

  mountStaticFiles(app);

  return app;
}
