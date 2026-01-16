// Define car properties and asset paths
export type CarModel = 'Prelude 2026' | 'GTR R34';

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
  }
};
