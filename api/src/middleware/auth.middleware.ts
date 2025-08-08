import { auth } from "@/lib/auth";
import { createMiddleware } from "hono/factory";
import { HonoEnv } from "@/types";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  console.log(c.req.raw.headers);
  console.log("Session: ", session);

  if (!session) {
    /* c.set("user", null);
    c.set("session", null);
    return next(); */
    return c.json(
      {
        success: false,
        message: "Unauthorized",
        error: "No valid session found",
      },
      401
    );
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});
