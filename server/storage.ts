import { highScores, type HighScore, type InsertHighScore } from "@shared/schema";
import { db } from "./db";
import { asc } from "drizzle-orm";

export interface IStorage {
  getHighScores(): Promise<HighScore[]>;
  createHighScore(score: InsertHighScore): Promise<HighScore>;
}

export class DatabaseStorage implements IStorage {
  async getHighScores(): Promise<HighScore[]> {
    return await db.select()
      .from(highScores)
      .orderBy(asc(highScores.lapTime));
  }

  async createHighScore(insertScore: InsertHighScore): Promise<HighScore> {
    const [score] = await db
      .insert(highScores)
      .values(insertScore)
      .returning();
    return score;
  }
}

export const storage = new DatabaseStorage();
