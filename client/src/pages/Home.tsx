import { useState } from "react";
import { useLocation } from "wouter";
import { CarCard } from "@/components/CarCard";
import { NeonButton } from "@/components/NeonButton";
import { CARS, type CarModel } from "@/game/assets";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [, setLocation] = useLocation();
  const [selectedCar, setSelectedCar] = useState<CarModel>("Prelude 2026");

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="scanline" />
      
      {/* Dynamic background effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-background to-background -z-10" />

      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center z-10">
        
        {/* Title Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 space-y-2"
        >
          <h2 className="text-xl md:text-2xl text-cyan-400 font-display tracking-[0.5em] neon-text-cyan">
            TURBO CHARGED
          </h2>
          <h1 className="text-6xl md:text-8xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-secondary drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] italic">
            NEON RACER
          </h1>
          <div className="h-1 w-32 mx-auto bg-primary shadow-[0_0_10px_#ec4899] mt-6" />
        </motion.div>

        {/* Car Selection */}
        <div className="w-full max-w-4xl mb-12">
          <h3 className="text-center text-white/60 mb-8 font-display uppercase tracking-widest text-sm">Select Your Machine</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {(Object.keys(CARS) as CarModel[]).map((carKey, index) => (
              <motion.div
                key={carKey}
                initial={{ x: index === 0 ? -100 : 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + (index * 0.2) }}
              >
                <CarCard 
                  car={CARS[carKey]} 
                  selected={selectedCar === carKey}
                  onSelect={() => setSelectedCar(carKey)}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Start Button */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <NeonButton 
            className="text-2xl px-12 py-6 flex items-center gap-4 animate-pulse"
            onClick={() => setLocation(`/game?car=${encodeURIComponent(selectedCar)}`)}
          >
            START ENGINE <Play fill="currentColor" />
          </NeonButton>
        </motion.div>

      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-white/20 font-display text-xs uppercase tracking-widest">
        v1.0.0 • React • Canvas • Wouter
      </footer>
    </div>
  );
}
