import { useState } from "react";
import { useLocation } from "wouter";
import { NeonButton } from "@/components/NeonButton";
import { Leaderboard } from "@/components/Leaderboard";
import { useSubmitScore } from "@/hooks/use-scores";
import { Trophy, Home, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export default function Results() {
  const [location, setLocation] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const time = parseInt(params.get("time") || "0");
  const carId = params.get("car") || "Prelude 2026";
  const trackId = "nurburgring";
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitScore = useSubmitScore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    submitScore.mutate({
      username,
      carModel: carId,
      trackId: trackId,
      lapTime: time,
    }, {
      onSuccess: () => setSubmitted(true)
    });
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4 flex flex-col items-center justify-start overflow-y-auto">
      <div className="scanline" />
      
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-7xl font-display text-primary neon-text mb-4 italic">
          RACE COMPLETE
        </h1>
        <div className="text-3xl font-mono text-cyan-400">
          TIME: {(time / 1000).toFixed(2)}s
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl w-full">
        {/* Submit Form */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card/50 backdrop-blur border border-primary/30 p-8 rounded-2xl shadow-xl h-fit"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-2xl font-display text-white mb-2">Save Your Record</div>
              <p className="text-muted-foreground mb-6">Enter your driver handle to join the eternal leaderboard.</p>
              
              <div className="space-y-2">
                <label className="text-sm font-bold uppercase text-primary tracking-wider">Driver Name</label>
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/50 border-2 border-primary/30 rounded-lg px-4 py-3 text-xl font-display text-white focus:border-primary focus:outline-none focus:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                  placeholder="AAA"
                  maxLength={10}
                  autoFocus
                />
              </div>

              <NeonButton 
                type="submit" 
                className="w-full"
                disabled={submitScore.isPending}
              >
                {submitScore.isPending ? "SAVING..." : "SUBMIT SCORE"}
              </NeonButton>
            </form>
          ) : (
            <div className="text-center py-12 space-y-4">
              <Trophy className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-display text-white">Score Submitted!</h3>
              <p className="text-muted-foreground">You are now a legend.</p>
            </div>
          )}
        </motion.div>

        {/* Leaderboard */}
        <motion.div
           initial={{ x: 50, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           transition={{ delay: 0.4 }}
        >
          <Leaderboard />
        </motion.div>
      </div>

      {/* Actions */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex gap-6 mt-12"
      >
        <NeonButton variant="secondary" onClick={() => setLocation("/")}>
          <Home className="mr-2" /> Main Menu
        </NeonButton>
        <NeonButton onClick={() => setLocation(`/game?car=${encodeURIComponent(carId)}&track=${trackId}`)}>
          <RotateCcw className="mr-2" /> Race Again
        </NeonButton>
      </motion.div>
    </div>
  );
}
