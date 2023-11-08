import express from "express";
import cors from "cors";
import morgan from "morgan";
import { corsOptions } from "./cors";
import { bookRoutes } from "../routes";
import { errorHandler } from "../utils/error-handler";

const app = express();

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const API_VERSION = process.env.API_VERSION ?? 1;

app.get(`/api/v${API_VERSION}`, (_req, res) => {
  res.json({
    data: "It Works!",
  });
});

app.use(`/api/v${API_VERSION}/books`, bookRoutes);

app.use(errorHandler);

export default app;
