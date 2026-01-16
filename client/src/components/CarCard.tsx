import { CarStats } from "@/game/assets";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CarCardProps {
  car: CarStats;
  selected: boolean;
  onSelect: () => void;
}

export function CarCard({ car, selected, onSelect }: CarCardProps) {
  return (
    <motion.div
      onClick={onSelect}
      className={cn(
        "cursor-pointer relative overflow-hidden rounded-xl border-2 p-6 transition-all duration-300",
        "bg-card/80 backdrop-blur-md",
        selected 
          ? "border-primary shadow-[0_0_30px_rgba(236,72,153,0.3)] scale-105 z-10" 
          : "border-border hover:border-primary/50 opacity-70 hover:opacity-100"
      )}
      whileHover={{ y: -5 }}
    >
      <div className="aspect-[16/9] mb-4 relative flex items-center justify-center bg-black/20 rounded-lg overflow-hidden">
        {/* Placeholder image visualization since we are mocking the assets */}
        <div 
          className="w-32 h-48 rounded shadow-lg transition-transform duration-500"
          style={{ 
            backgroundColor: car.color,
            boxShadow: `0 0 20px ${car.color}40`,
            transform: selected ? 'scale(1.1)' : 'scale(1)'
          }} 
        >
          {/* Simple CSS representation of car if image fails */}
          <div className="w-full h-full relative">
            <div className="absolute top-4 left-2 right-2 h-12 bg-black/30 rounded-sm"></div>
            <div className="absolute bottom-4 left-2 right-2 h-8 bg-black/30 rounded-sm"></div>
          </div>
        </div>
        
        {/* Actual Image Tag - would be used if assets were real */}
        {/* <img src={car.image} alt={car.name} className="absolute inset-0 w-full h-full object-contain" /> */}
      </div>

      <h3 className={cn(
        "text-xl font-bold mb-4 font-display",
        selected ? "text-primary neon-text" : "text-foreground"
      )}>
        {car.name}
      </h3>

      <div className="space-y-3 font-body">
        <StatBar label="Speed" value={car.topSpeed} color="bg-cyan-400" />
        <StatBar label="Accel" value={car.acceleration} color="bg-pink-500" />
        <StatBar label="Handling" value={car.handling} color="bg-purple-500" />
      </div>
    </motion.div>
  );
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span className="w-16 text-muted-foreground font-semibold">{label}</span>
      <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 10}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn("h-full shadow-[0_0_10px_currentColor]", color)}
        />
      </div>
    </div>
  );
}
