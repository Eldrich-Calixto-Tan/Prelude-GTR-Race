// Define car properties and asset paths
export type CarModel = 'Prelude 2026' | 'GTR R34' | 'Supra MK4' | 'Jesko' | 'Chiron' | 'Gemera' | 'AMG One' | '911 Turbo S' | 'SF90 Stradale' | '765LT' | 'Utopia' | 'Valkyrie';

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
  },
  'AMG One': {
    id: 'AMG One',
    name: 'Mercedes-Benz AMG One',
    image: '/images/amg_one.png',
    acceleration: 9.9,
    topSpeed: 9.8,
    handling: 9.5,
    color: '#94a3b8', // Slate-400
    
    accelFactor: 0.32,
    maxSpeed: 25,
    turnSpeed: 0.06,
    driftFactor: 0.93
  },
  '911 Turbo S': {
    id: '911 Turbo S',
    name: 'Porsche 911 Turbo S',
    image: '/images/porsche_911.png',
    acceleration: 10.0,
    topSpeed: 9.0,
    handling: 10.0,
    color: '#facc15', // Yellow-400
    
    accelFactor: 0.35,
    maxSpeed: 21,
    turnSpeed: 0.065,
    driftFactor: 0.92
  },
  'SF90 Stradale': {
    id: 'SF90 Stradale',
    name: 'Ferrari SF90 Stradale',
    image: '/images/ferrari_sf90.png',
    acceleration: 10.0,
    topSpeed: 9.6,
    handling: 9.2,
    color: '#dc2626',

    accelFactor: 0.34,
    maxSpeed: 23,
    turnSpeed: 0.061,
    driftFactor: 0.93
  },
  '765LT': {
    id: '765LT',
    name: 'McLaren 765LT',
    image: '/images/mclaren_765lt.png',
    acceleration: 9.4,
    topSpeed: 9.3,
    handling: 9.8,
    color: '#f97316',

    accelFactor: 0.3,
    maxSpeed: 22,
    turnSpeed: 0.068,
    driftFactor: 0.91
  },
  'Utopia': {
    id: 'Utopia',
    name: 'Pagani Utopia',
    image: '/images/pagani_utopia.png',
    acceleration: 9.8,
    topSpeed: 9.7,
    handling: 9.6,
    color: '#a855f7',

    accelFactor: 0.36,
    maxSpeed: 24,
    turnSpeed: 0.067,
    driftFactor: 0.91
  },
  'Valkyrie': {
    id: 'Valkyrie',
    name: 'Aston Martin Valkyrie',
    image: '/images/valkyrie.png',
    acceleration: 10.0,
    topSpeed: 10.0,
    handling: 9.7,
    color: '#10b981',

    accelFactor: 0.38,
    maxSpeed: 25,
    turnSpeed: 0.064,
    driftFactor: 0.9
  }
};

export type TrackId = 'nurburgring';

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
  nurburgring: {
    id: 'nurburgring',
    name: 'Apex Labyrinth',
    path: [
      { x: 150, y: 300 },
      { x: 180, y: 220 },
      { x: 260, y: 170 },
      { x: 360, y: 190 },
      { x: 420, y: 120 },
      { x: 540, y: 110 },
      { x: 620, y: 170 },
      { x: 700, y: 120 },
      { x: 820, y: 160 },
      { x: 900, y: 260 },
      { x: 860, y: 340 },
      { x: 900, y: 450 },
      { x: 820, y: 470 },
      { x: 760, y: 560 },
      { x: 800, y: 650 },
      { x: 660, y: 700 },
      { x: 560, y: 620 },
      { x: 470, y: 700 },
      { x: 340, y: 660 },
      { x: 280, y: 560 },
      { x: 170, y: 610 },
      { x: 100, y: 500 },
      { x: 140, y: 410 },
      { x: 100, y: 350 },
    ],
    width: 78,
    grassColor: "#11152e",
    asphaltColor: "#24283a",
    curbColor1: "#d946ef",
    curbColor2: "#22d3ee",
    backgroundImage: "/images/apex_labyrinth_background.png",
  }
};
