import express, { type Request, type Response, type NextFunction } from "express";
import { registerRoutes } from "../server/routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routesReady = registerRoutes(app);

app.use(
  (error: any, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(error);
    }

    const status = error.status || error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ message });
  },
);

export default async function handler(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    await routesReady;
    app(req, res);
  } catch (error) {
    console.error("Failed to initialize the API", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
