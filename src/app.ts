import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { routes } from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { setupSwagger } from "./config/swagger.js";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

setupSwagger(app);

app.use("/api", routes);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorHandler);
