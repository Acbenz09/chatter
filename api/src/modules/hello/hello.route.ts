import { authMiddleware } from "@/middleware/auth.middleware";
import { HonoEnv } from "@/types";
import { Hono } from "hono";

const helloRoute = new Hono<HonoEnv>();

helloRoute.use(authMiddleware);
helloRoute.get("/hello", async (c) => {
  return c.json({
    message: "Hello World",
  });
});

export default helloRoute;
