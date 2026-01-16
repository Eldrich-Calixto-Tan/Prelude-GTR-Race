import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";
import { CARS, type CarModel } from "@/game/assets";
import { NeonButton } from "@/components/NeonButton";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, ArrowLeft, RefreshCw } from "lucide-react";

// Game Constants
const FPS = 60;
const DT = 1 / FPS;
const TRACK_WIDTH = 120;
const CANVAS_WIDTH = 1024;
const CANVAS_HEIGHT = 768;

// Track Path Definition (Simple loop)
const TRACK_PATH = [
  { x: 100, y: 100 },
  { x: 500, y: 100 },
  { x: 900, y: 300 },
  { x: 900, y: 600 },
  { x: 500, y: 700 },
  { x: 100, y: 500 },
];

interface GameState {
  playing: boolean;
  finished: boolean;
  startTime: number | null;
  currentTime: number;
  bestLap: number | null;
  lapCount: number;
  checkpointsPassed: number[];
}

export default function Game() {
  const [location, setLocation] = useLocation();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [params] = useState(() => new URLSearchParams(window.location.search));
  const carId = (params.get("car") as CarModel) || "Prelude 2026";
  const carStats = CARS[carId];

  // Game Logic State
  const [gameState, setGameState] = useState<GameState>({
    playing: false,
    finished: false,
    startTime: null,
    currentTime: 0,
    bestLap: null,
    lapCount: 0,
    checkpointsPassed: []
  });

  const gameStateRef = useRef(gameState); // Ref for loop access
  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);

  // Car Physics State
  const carRef = useRef({
    x: 150,
    y: 300,
    angle: -Math.PI / 2, // Facing up
    speed: 0,
    drift: 0,
    inputs: { up: false, down: false, left: false, right: false }
  });

  // Start Game
  useEffect(() => {
    // Input Handling
    const handleKeyDown = (e: KeyboardEvent) => {
      switch(e.key) {
        case "ArrowUp": case "w": case "W": carRef.current.inputs.up = true; break;
        case "ArrowDown": case "s": case "S": carRef.current.inputs.down = true; break;
        case "ArrowLeft": case "a": case "A": carRef.current.inputs.left = true; break;
        case "ArrowRight": case "d": case "D": carRef.current.inputs.right = true; break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch(e.key) {
        case "ArrowUp": case "w": case "W": carRef.current.inputs.up = false; break;
        case "ArrowDown": case "s": case "S": carRef.current.inputs.down = false; break;
        case "ArrowLeft": case "a": case "A": carRef.current.inputs.left = false; break;
        case "ArrowRight": case "d": case "D": carRef.current.inputs.right = false; break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Start Timer
    setGameState(prev => ({ ...prev, playing: true, startTime: Date.now() }));

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const renderTrack = (ctx: CanvasRenderingContext2D) => {
      // Grass Background
      ctx.fillStyle = "#064e3b"; // emerald-900
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Grid Pattern
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < CANVAS_WIDTH; x += 40) { ctx.moveTo(x, 0); ctx.lineTo(x, CANVAS_HEIGHT); }
      for (let y = 0; y < CANVAS_HEIGHT; y += 40) { ctx.moveTo(0, y); ctx.lineTo(CANVAS_WIDTH, y); }
      ctx.stroke();

      // Asphalt Track
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // Border
      ctx.beginPath();
      ctx.moveTo(TRACK_PATH[0].x, TRACK_PATH[0].y);
      for (let i = 1; i < TRACK_PATH.length; i++) ctx.lineTo(TRACK_PATH[i].x, TRACK_PATH[i].y);
      ctx.closePath();
      ctx.lineWidth = TRACK_WIDTH + 20;
      ctx.strokeStyle = "#ef4444"; // Curb red
      ctx.setLineDash([20, 20]);
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      ctx.lineWidth = TRACK_WIDTH + 20;
      ctx.strokeStyle = "#ffffff"; // Curb white
      ctx.stroke();

      // Road Surface
      ctx.lineWidth = TRACK_WIDTH;
      ctx.strokeStyle = "#334155"; // slate-700
      ctx.stroke();

      // Start Line
      ctx.save();
      ctx.translate(150, 300); 
      ctx.rotate(-Math.PI/2);
      ctx.fillStyle = "white";
      for(let i=0; i<8; i++) {
        for(let j=0; j<2; j++) {
           if ((i+j)%2 === 0) ctx.fillRect(i*15 - 60, j*15 - 15, 15, 15);
        }
      }
      ctx.restore();
    };

    const updatePhysics = () => {
      if (gameStateRef.current.finished) return;

      const car = carRef.current;
      
      // Acceleration
      if (car.inputs.up) car.speed += carStats.accelFactor;
      if (car.inputs.down) car.speed -= carStats.accelFactor;
      
      // Friction
      car.speed *= 0.98;

      // Max Speed Check
      if (car.speed > carStats.maxSpeed) car.speed = carStats.maxSpeed;
      if (car.speed < -carStats.maxSpeed / 2) car.speed = -carStats.maxSpeed / 2;

      // Turning
      if (Math.abs(car.speed) > 0.5) {
        const turnDir = car.speed > 0 ? 1 : -1;
        if (car.inputs.left) car.angle -= carStats.turnSpeed * turnDir;
        if (car.inputs.right) car.angle += carStats.turnSpeed * turnDir;
      }

      // Movement
      car.x += Math.cos(car.angle) * car.speed;
      car.y += Math.sin(car.angle) * car.speed;

      // Track Collision Detection (Simple)
      // Check distance to any track segment
      let onTrack = false;
      const p = { x: car.x, y: car.y };
      
      for (let i = 0; i < TRACK_PATH.length; i++) {
        const p1 = TRACK_PATH[i];
        const p2 = TRACK_PATH[(i + 1) % TRACK_PATH.length];
        
        // Distance from point to line segment
        const l2 = Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
        if (l2 === 0) continue;
        
        let t = ((p.x - p1.x) * (p2.x - p1.x) + (p.y - p1.y) * (p2.y - p1.y)) / l2;
        t = Math.max(0, Math.min(1, t));
        
        const projX = p1.x + t * (p2.x - p1.x);
        const projY = p1.y + t * (p2.y - p1.y);
        
        const dist = Math.sqrt(Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2));
        
        if (dist < TRACK_WIDTH / 2) {
          onTrack = true;
          break;
        }
      }

      // Off-road penalty
      if (!onTrack) {
        car.speed *= 0.9;
      }

      // Checkpoints & Lap Logic
      // Checkpoint 1 (Start/Finish): Near (150, 300)
      // Checkpoint 2 (Mid): Near (900, 450)
      const distStart = Math.sqrt(Math.pow(car.x - 150, 2) + Math.pow(car.y - 300, 2));
      const distMid = Math.sqrt(Math.pow(car.x - 900, 2) + Math.pow(car.y - 450, 2));
      
      const passed = gameStateRef.current.checkpointsPassed;
      
      if (distMid < 100 && !passed.includes(1)) {
        setGameState(prev => ({ ...prev, checkpointsPassed: [...prev.checkpointsPassed, 1] }));
      }
      
      if (distStart < 100 && passed.includes(1)) {
        // Lap Completed
        const lapTime = Date.now() - (gameStateRef.current.startTime || 0);
        setGameState(prev => ({ 
          ...prev, 
          finished: true, 
          currentTime: lapTime,
          playing: false
        }));
        // Navigate to results
        setTimeout(() => setLocation(`/results?time=${lapTime}&car=${encodeURIComponent(carId)}`), 1000);
      }
    };

    const drawCar = (ctx: CanvasRenderingContext2D) => {
      const car = carRef.current;
      
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle);
      
      // Car Body
      ctx.fillStyle = carStats.color;
      ctx.shadowColor = "black";
      ctx.shadowBlur = 10;
      ctx.fillRect(-20, -10, 40, 20); // Simple rect car
      
      // Windshield
      ctx.fillStyle = "#93c5fd"; // blue-300
      ctx.fillRect(0, -8, 10, 16);
      
      // Headlights
      ctx.fillStyle = "#fef08a"; // yellow-200
      ctx.shadowColor = "#fef08a";
      ctx.shadowBlur = 15;
      ctx.fillRect(18, -9, 4, 4);
      ctx.fillRect(18, 5, 4, 4);
      
      ctx.restore();
    };

    const loop = () => {
      updatePhysics();
      
      // Update Timer UI State
      if (gameStateRef.current.playing && gameStateRef.current.startTime) {
        setGameState(prev => ({
          ...prev,
          currentTime: Date.now() - (prev.startTime || 0)
        }));
      }

      // Clear
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      
      // Render
      renderTrack(ctx);
      drawCar(ctx);
      
      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [carStats, carId, setLocation]);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 scanline pointer-events-none" />
      
      {/* HUD */}
      <div className="absolute top-8 left-8 z-10 flex flex-col gap-2 font-display text-white">
        <div className="bg-black/50 backdrop-blur border border-primary/50 p-4 rounded-lg neon-border">
          <div className="text-sm text-primary uppercase">Current Lap</div>
          <div className="text-4xl font-mono text-cyan-400">
            {(gameState.currentTime / 1000).toFixed(2)}s
          </div>
        </div>
        
        <div className="bg-black/50 backdrop-blur border border-secondary/50 p-4 rounded-lg">
          <div className="text-sm text-secondary uppercase">Car</div>
          <div className="text-xl">{carStats.name}</div>
        </div>
      </div>

      <div className="absolute top-8 right-8 z-10">
         <NeonButton variant="secondary" onClick={() => setLocation("/")} className="flex items-center gap-2">
           <ArrowLeft size={16} /> Exit Race
         </NeonButton>
      </div>

      <canvas 
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        className="max-w-full max-h-full aspect-[4/3] rounded shadow-2xl cursor-none"
      />
      
      {gameState.finished && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
        >
          <div className="text-6xl font-display text-primary neon-text uppercase text-center">
            Finish Line!
            <div className="text-4xl text-white mt-4 font-mono">
              {(gameState.currentTime / 1000).toFixed(2)}s
            </div>
          </div>
        </motion.div>
      )}

      {/* Controls Hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 font-display text-sm">
        Use Arrow Keys or WASD to Drive
      </div>
    </div>
  );
}
