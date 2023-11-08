import { createServer } from "http";
import expressApp from "./express";

export const server = createServer(expressApp);
