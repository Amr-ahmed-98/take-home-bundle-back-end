import { app } from "./app";
import { env } from "./config/env";
import { connectDB } from "./config/db";
import { logger } from "./lib/logger";

async function start() {
  await connectDB();
  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
  });
}

start().catch((err) => {
  logger.error("Failed to start server", err);
  process.exit(1);
});
