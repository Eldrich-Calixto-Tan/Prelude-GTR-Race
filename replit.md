# Turbo Racing Game

## Overview

A retro arcade-style 2D racing game built with React and TypeScript. Players select from different cars with unique handling characteristics and compete on tracks to achieve the fastest lap times. The game features a neon-themed UI, HTML5 Canvas rendering for gameplay, and a persistent leaderboard backed by PostgreSQL.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing with three main pages (Home, Game, Results)
- **State Management**: TanStack React Query for server state and React's built-in hooks for local state
- **UI Components**: shadcn/ui component library built on Radix UI primitives with Tailwind CSS
- **Animations**: Framer Motion for UI transitions and game HUD animations
- **Game Engine**: Custom HTML5 Canvas-based renderer at 60 FPS with physics simulation for car movement

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful endpoints defined in shared routes file with Zod schema validation
- **Development**: Vite dev server with HMR proxied through Express in development mode

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema**: Single `high_scores` table storing username, car model, lap time (milliseconds), and timestamp
- **Migrations**: Drizzle Kit for schema push and migration management

### Project Structure
```
client/           # React frontend application
  src/
    components/   # Reusable UI components
    pages/        # Route page components
    game/         # Game engine and asset definitions
    hooks/        # Custom React hooks
    lib/          # Utility functions
server/           # Express backend
  routes.ts       # API endpoint handlers
  storage.ts      # Database access layer
  db.ts           # Database connection
shared/           # Code shared between client and server
  schema.ts       # Drizzle database schema
  routes.ts       # API route definitions with Zod types
```

### Key Design Decisions
- **Monorepo Structure**: Client and server share TypeScript types through the `shared/` directory, ensuring API contract consistency
- **Canvas Rendering**: Game uses HTML5 Canvas API rather than a game framework for lightweight performance and full control over rendering
- **Physics Model**: Cars have acceleration, max speed, turn rate, and drift factor properties defined per vehicle for varied gameplay
- **Track Collision**: Implemented using geometric distance checks from track center spline

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference
- **connect-pg-simple**: Session storage (available but sessions not currently implemented)

### Frontend Libraries
- **Radix UI**: Accessible component primitives (dialogs, menus, tooltips, etc.)
- **Tailwind CSS**: Utility-first styling with custom neon arcade theme
- **Lucide React**: Icon library

### Build Tools
- **Vite**: Frontend bundling with React plugin and HMR
- **esbuild**: Server bundling for production builds
- **TSX**: TypeScript execution for development server

### Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Error overlay in development
- **@replit/vite-plugin-cartographer**: Development tooling
- **@replit/vite-plugin-dev-banner**: Development environment indicator