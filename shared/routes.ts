
import { z } from 'zod';
import { insertHighScoreSchema, highScores } from './schema';

export const api = {
  scores: {
    list: {
      method: 'GET' as const,
      path: '/api/scores',
      responses: {
        200: z.array(z.custom<typeof highScores.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/scores',
      input: insertHighScoreSchema,
      responses: {
        201: z.custom<typeof highScores.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
};
