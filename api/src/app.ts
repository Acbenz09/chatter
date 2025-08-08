import { Hono } from "hono";
import { cors } from "hono/cors";

import { auth } from "./lib/auth";
import helloRoute from "./modules/hello/hello.route";
import { logger } from "hono/logger";

const app = new Hono();

app.use(logger());
app.use(
  "*", // or replace with "*" to enable cors for all routes
  cors({
    origin: "*", // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app
  .on(["POST", "GET"], "/api/auth/**", (c) => {
    return auth.handler(c.req.raw);
  })
  .basePath("/api/v1")
  .route("/", helloRoute);

export default app;
