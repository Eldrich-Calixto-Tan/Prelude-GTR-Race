// Define car properties and asset paths
export type CarModel = 'Prelude 2026' | 'GTR R34' | 'Supra MK4' | 'Jesko' | 'Chiron' | 'Gemera';

export interface CarStats {
  id: CarModel;
  name: string;
  image: string;
  acceleration: number; // 0-10 scale relative
  topSpeed: number;     // 0-10 scale relative
  handling: number;     // 0-10 scale relative
  color: string;
  
  // Physics constants
  accelFactor: number;
  maxSpeed: number;
  turnSpeed: number;
  driftFactor: number;
}

export const CARS: Record<CarModel, CarStats> = {
  'Prelude 2026': {
    id: 'Prelude 2026',
    name: 'Honda Prelude 2026',
    image: '/images/prelude_2026.png',
    acceleration: 8.5,
    topSpeed: 7.0,
    handling: 9.0,
    color: '#ef4444', // Red-500
    
    accelFactor: 0.2,
    maxSpeed: 16,
    turnSpeed: 0.05,
    driftFactor: 0.96
  },
  'GTR R34': {
    id: 'GTR R34',
    name: 'Nissan GTR R34',
    image: '/images/gtr_r34.png',
    acceleration: 7.0,
    topSpeed: 9.5,
    handling: 6.5,
    color: '#94a3b8', // Slate-400
    
    accelFactor: 0.15,
    maxSpeed: 19,
    turnSpeed: 0.04,
    driftFactor: 0.98
  },
  'Supra MK4': {
    id: 'Supra MK4',
    name: 'Toyota Supra MK4',
    image: '/images/supra_mk4.png',
    acceleration: 7.5,
    topSpeed: 8.5,
    handling: 7.5,
    color: '#f97316', // Orange-500
    
    accelFactor: 0.18,
    maxSpeed: 17.5,
    turnSpeed: 0.045,
    driftFactor: 0.97
  },
  'Jesko': {
    id: 'Jesko',
    name: 'Koenigsegg Jesko',
    image: '/images/jesko.png',
    acceleration: 9.5,
    topSpeed: 10.0,
    handling: 8.0,
    color: '#f8fafc', // Slate-50
    
    accelFactor: 0.25,
    maxSpeed: 24,
    turnSpeed: 0.055,
    driftFactor: 0.95
  },
  'Chiron': {
    id: 'Chiron',
    name: 'Bugatti Chiron',
    image: '/images/chiron.png',
    acceleration: 9.0,
    topSpeed: 10.0,
    handling: 7.5,
    color: '#1d4ed8', // Blue-700
    
    accelFactor: 0.22,
    maxSpeed: 26,
    turnSpeed: 0.048,
    driftFactor: 0.96
  },
  'Gemera': {
    id: 'Gemera',
    name: 'Koenigsegg Gemera',
    image: '/images/gemera.png',
    acceleration: 9.8,
    topSpeed: 9.2,
    handling: 8.5,
    color: '#64748b', // Slate-500
    
    accelFactor: 0.28,
    maxSpeed: 22,
    turnSpeed: 0.052,
    driftFactor: 0.94
  }
};

export type TrackId = 'forest' | 'desert' | 'city';

export interface TrackData {
  id: TrackId;
  name: string;
  path: { x: number; y: number }[];
  width: number;
  grassColor: string;
  asphaltColor: string;
  curbColor1: string;
  curbColor2: string;
  backgroundImage?: string;
}

export const TRACKS: Record<TrackId, TrackData> = {
  forest: {
    id: 'forest',
    name: 'Forest Track',
    path: [
      { x: 100, y: 100 },
      { x: 500, y: 100 },
      { x: 900, y: 300 },
      { x: 900, y: 600 },
      { x: 500, y: 700 },
      { x: 100, y: 500 },
    ],
    width: 120,
    grassColor: "#064e3b",
    asphaltColor: "#334155",
    curbColor1: "#ef4444",
    curbColor2: "#ffffff",
  },
  desert: {
    id: 'desert',
    name: 'Desert Dunes',
    path: [
      { x: 150, y: 150 },
      { x: 850, y: 150 },
      { x: 850, y: 600 },
      { x: 500, y: 500 },
      { x: 150, y: 600 },
    ],
    width: 140,
    grassColor: "#78350f", // sand-900
    asphaltColor: "#475569", // slate-600
    curbColor1: "#eab308", // yellow-500
    curbColor2: "#ffffff",
    backgroundImage: "/images/track_desert.png"
  },
  city: {
    id: 'city',
    name: 'Neon City',
    path: [
      { x: 100, y: 100 },
      { x: 900, y: 100 },
      { x: 900, y: 700 },
      { x: 100, y: 700 },
    ],
    width: 160,
    grassColor: "#020617", // slate-950
    asphaltColor: "#1e293b", // slate-800
    curbColor1: "#3b82f6", // blue-500
    curbColor2: "#ffffff",
    backgroundImage: "/images/track_city.png"
  }
};
