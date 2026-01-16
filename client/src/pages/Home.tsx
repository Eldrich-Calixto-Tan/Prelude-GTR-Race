import { useState } from "react";
import { useLocation } from "wouter";
import { CarCard } from "@/components/CarCard";
import { NeonButton } from "@/components/NeonButton";
import { CARS, TRACKS, type CarModel, type TrackId } from "@/game/assets";
import { Play, Lock, Map as MapIcon, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCar, setSelectedCar] = useState<CarModel>("Prelude 2026");
  const [selectedTrack, setSelectedTrack] = useState<TrackId>("forest");

  const { data: scores } = useQuery({
    queryKey: [api.scores.list.path],
  });

  const fastLapsCount = (scores as any[])?.filter(s => s.lapTime < 20000).length || 0;
  const eliteLapsCount = (scores as any[])?.filter(s => s.lapTime < 15000).length || 0;
  const ultimateLapsCount = (scores as any[])?.filter(s => s.lapTime < 10000).length || 0;
  
  const isUnlocked = fastLapsCount >= 3;
  const isEliteUnlocked = eliteLapsCount >= 10;
  const isUltimateUnlocked = ultimateLapsCount >= 15;

  const isCarLocked = (carId: CarModel) => {
    if (carId === 'Jesko' || carId === 'Supra MK4') return !isUnlocked;
    if (carId === 'Chiron' || carId === 'Gemera') return !isEliteUnlocked;
    if (carId === 'AMG One' || carId === '911 Turbo S') return !isUltimateUnlocked;
    return false;
  };

  const handleStart = () => {
    if (isCarLocked(selectedCar)) return;
    setLocation(`/game?car=${encodeURIComponent(selectedCar)}&track=${selectedTrack}`);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="scanline" />
      
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-background to-background -z-10" />

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 space-y-2"
        >
          <h2 className="text-xl md:text-2xl text-cyan-400 font-display tracking-[0.5em] neon-text-cyan">
            TURBO CHARGED
          </h2>
          <h1 className="text-6xl md:text-7xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] italic">
            NEON RACER
          </h1>
          <div className="flex flex-col gap-1 items-center">
            <div className="text-white/40 font-display text-xs uppercase">
              Unlock secret cars: 3 laps under 20s ({fastLapsCount}/3)
            </div>
            <div className="text-cyan-400/60 font-display text-xs uppercase">
              Unlock Elite hypercars: 10 laps under 15s ({eliteLapsCount}/10)
            </div>
            <div className="text-yellow-400/60 font-display text-xs uppercase">
              Unlock Ultimate Legends: 15 laps under 10s ({ultimateLapsCount}/15)
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 w-full max-w-6xl">
          {/* Car Selection */}
          <div>
            <h3 className="text-white/60 mb-6 font-display uppercase tracking-widest text-sm flex items-center gap-2">
              <Gauge size={16} /> Select Your Machine
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {(Object.keys(CARS) as CarModel[]).map((carKey, index) => {
                const locked = isCarLocked(carKey);
                return (
                  <motion.div
                    key={carKey}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative"
                  >
                    <CarCard 
                      car={CARS[carKey]} 
                      selected={selectedCar === carKey}
                      onSelect={() => !locked && setSelectedCar(carKey)}
                      // @ts-ignore - className is used in CarCard but not in props definition
                      className={locked ? "opacity-50 grayscale cursor-not-allowed" : ""}
                    />
                    {locked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                        <Lock className="text-white/60" size={32} />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-white/60 mb-6 font-display uppercase tracking-widest text-sm flex items-center gap-2">
              <MapIcon size={16} /> Select Track
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {(Object.keys(TRACKS) as TrackId[]).map((trackKey, index) => (
                <motion.div
                  key={trackKey}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <button
                    onClick={() => setSelectedTrack(trackKey)}
                    className={`w-full p-4 rounded-lg border transition-all text-left flex items-center justify-between ${
                      selectedTrack === trackKey 
                        ? "bg-primary/20 border-primary shadow-[0_0_15px_rgba(236,72,153,0.3)]" 
                        : "bg-black/40 border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div>
                      <div className="text-white font-display uppercase truncate max-w-[150px]">{TRACKS[trackKey].name}</div>
                      <div className="text-white/40 text-xs">Width: {TRACKS[trackKey].width}px</div>
                    </div>
                    {selectedTrack === trackKey && <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <NeonButton 
            className={`text-2xl px-12 py-6 flex items-center gap-4 ${isCarLocked(selectedCar) ? "opacity-50 cursor-not-allowed" : "animate-pulse"}`}
            onClick={handleStart}
            disabled={isCarLocked(selectedCar)}
          >
            {isCarLocked(selectedCar) ? "LOCKED" : "START ENGINE"} <Play fill="currentColor" />
          </NeonButton>
        </motion.div>

      </main>

      <footer className="py-6 text-center text-white/20 font-display text-xs uppercase tracking-widest">
        v1.1.0 • Multi-Track Update
      </footer>
    </div>
  );
}
