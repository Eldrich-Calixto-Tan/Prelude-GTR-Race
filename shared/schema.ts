
import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const highScores = pgTable("high_scores", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  carModel: text("car_model").notNull(), // 'Prelude 2026' or 'GTR R34'
  trackId: text("track_id").notNull().default('forest'),
  lapTime: integer("lap_time").notNull(), // in milliseconds
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertHighScoreSchema = createInsertSchema(highScores).omit({ 
  id: true, 
  createdAt: true 
});

export type HighScore = typeof highScores.$inferSelect;
export type InsertHighScore = z.infer<typeof insertHighScoreSchema>;
