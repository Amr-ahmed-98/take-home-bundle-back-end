import { app } from "./app.js";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { logger } from "./lib/logger.js";

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
