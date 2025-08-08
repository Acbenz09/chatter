/* import app from "@/app";
import { ProcessEnv } from "@/schemas/env-schema";

const server = Bun.serve({
  port: ProcessEnv.PORT,
  hostname: "0.0.0.0",
  fetch: app.fetch,
});

console.log(`Server is running on PORT: ${server.port}`);
console.log(
  `Access Better-Auth OpenAPI docs: http://localhost:${server.port}/api/auth/reference`
);
 */

import app from "@/app";
import { ProcessEnv } from "@/schemas/env-schema";
import { prisma } from "@/lib/prisma";

// Simple logger
const log = (message: string) => {
  console.log(`[${new Date().toISOString()}] ${message}`);
};

// Validate critical env variables at boot
if (!ProcessEnv.PORT) {
  log("Missing required environment variable: PORT");
  process.exit(1);
}

// Create server instance
const server = Bun.serve({
  port: ProcessEnv.PORT,
  hostname: "0.0.0.0", // Explicit binding for container/K8s support
  fetch: app.fetch,
  error(error: Error) {
    log(`Server Error: ${error.message}`);
    return new Response("Internal Server Error", { status: 500 });
  },
});

// Startup logs
log(`Server is running on http://localhost:${server.port}`);
log(
  `Better Auth OpenAPI docs available at: http://localhost:${server.port}/api/auth/reference`
);

// Graceful shutdown
const shutdown = async (signal: string) => {
  log(`Received ${signal}. Shutting down...`);
  // Closing DB or external connections
  await prisma.$disconnect();
  server.stop(true);
  log("Server stopped.");
  process.exit(0);
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
