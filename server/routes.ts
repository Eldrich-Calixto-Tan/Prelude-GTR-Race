
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed initial high scores if empty
  const scores = await storage.getHighScores();
  if (scores.length === 0) {
    await storage.createHighScore({ username: "DriftKing", carModel: "GTR R34", lapTime: 45000 });
    await storage.createHighScore({ username: "PreludeFan", carModel: "Prelude 2026", lapTime: 48500 });
    await storage.createHighScore({ username: "SpeedRacer", carModel: "GTR R34", lapTime: 44200 });
  }

  app.get(api.scores.list.path, async (req, res) => {
    const scores = await storage.getHighScores();
    res.json(scores);
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
      throw err;
    }
  });

  return httpServer;
}
