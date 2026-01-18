import { useScores } from "@/hooks/use-scores";
import { motion } from "framer-motion";
import { Trophy, Clock, User } from "lucide-react";

export function Leaderboard() {
  const { data: scores, isLoading } = useScores();

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${seconds}.${milliseconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="w-full max-w-md mx-auto p-8 text-center text-primary animate-pulse font-display">
        LOADING DATA...
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-black/40 border border-primary/30 rounded-xl p-6 backdrop-blur-sm">
      <h3 className="text-2xl font-display text-primary mb-6 flex items-center gap-3">
        <Trophy className="w-6 h-6" /> Top Drivers
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between text-xs uppercase tracking-widest text-muted-foreground px-4 mb-2 font-display">
          <span>Rank</span>
          <span className="flex-1 ml-8">Driver</span>
          <span>Car</span>
          <span className="w-20 text-right">Time</span>
        </div>

        {scores && scores.length > 0 ? (
          scores.slice(0, 10).map((score, index) => (
            <motion.div
              key={score.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                flex items-center px-4 py-3 rounded-lg border border-transparent
                ${index === 0 ? 'bg-primary/20 border-primary/50 shadow-[0_0_15px_rgba(236,72,153,0.15)]' : 'bg-white/5 hover:bg-white/10'}
              `}
            >
              <span className={`
                w-8 font-display font-bold text-lg
                ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-300' : index === 2 ? 'text-amber-600' : 'text-muted-foreground'}
              `}>
                #{index + 1}
              </span>
              
              <div className="flex-1 ml-4 flex flex-col">
                <span className="font-bold text-foreground font-display">{score.username}</span>
              </div>

              <span className="text-xs text-muted-foreground mr-4 font-mono">{score.carModel}</span>
              
              <span className="w-20 text-right font-mono text-cyan-400 font-bold">
                {formatTime(score.lapTime)}s
              </span>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No records yet. Be the first!
          </div>
        )}
      </div>
    </div>
  );
}
