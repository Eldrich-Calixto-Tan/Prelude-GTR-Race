
import type { Express } from "express";
import { storage } from "./storage.js";
import { DatabaseConfigurationError } from "./db.js";
import { api } from "../shared/routes.js";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<void> {
  app.get(api.scores.list.path, async (_req, res) => {
    try {
      const scores = await storage.getHighScores();
      res.json(scores);
    } catch (error) {
      console.error("Failed to load leaderboard scores", error);
      const status = error instanceof DatabaseConfigurationError ? 503 : 500;
      const message =
        status === 503
          ? "Leaderboard database is not configured."
          : "Unable to load leaderboard scores.";
      res.status(status).json({ message });
    }
  });

  app.post(api.scores.create.path, async (req, res) => {
    try {
      const input = api.scores.create.input.parse(req.body);
      const score = await storage.createHighScore(input);
      res.status(201).json(score);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      console.error("Failed to save leaderboard score", err);
      const status = err instanceof DatabaseConfigurationError ? 503 : 500;
      const message =
        status === 503
          ? "Leaderboard database is not configured."
          : "Unable to save leaderboard score.";
      res.status(status).json({ message });
    }
  });
}
