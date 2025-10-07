# PySeq Open Source Community

## Overview

PySeq is an NSF-funded open source ecosystem that repurposes decommissioned Illumina HiSeq 2500 DNA sequencers into flexible automation platforms for spatial biology research. The project provides Python-based control software and custom flow cell designs to transform obsolete scientific instruments into affordable, accessible tools for advanced single-cell assays and spatial transcriptomics/proteomics applications.

This is a full-stack web application serving as the community hub and documentation portal for the PySeq project, featuring information about the technology, team, resources, and community engagement opportunities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript using Vite as the build tool

**UI Component System**: 
- Built on shadcn/ui component library with Radix UI primitives
- Tailwind CSS for styling with custom design system
- Design follows "Open Source Science Aesthetic" emphasizing clarity, accessibility, and scientific credibility
- Supports light/dark mode theming with custom color palettes defined in CSS variables

**Routing**: Wouter for lightweight client-side routing

**State Management**:
- TanStack Query (React Query) for server state and data fetching
- React hooks for local component state
- Custom hooks in `/client/src/hooks` directory

**Key Design Patterns**:
- Component-based architecture with reusable UI components in `/client/src/components/ui`
- Feature components for major page sections (Hero, About, Features, Team, etc.)
- Parallax scrolling effects with snap-scrolling sections for enhanced UX
- Global scrolling background (BackgroundLayer component) with DNA sequencer image that shifts 150px per section using IntersectionObserver
- Mobile-responsive design with accessibility-first approach

### Backend Architecture

**Server Framework**: Express.js with TypeScript running on Node.js

**Development Setup**:
- Vite middleware integration for HMR in development
- Custom logging middleware for API request tracking
- Centralized error handling

**Data Layer**:
- Storage abstraction interface (`IStorage`) for CRUD operations
- In-memory storage implementation (`MemStorage`) as default
- Prepared for database integration via Drizzle ORM

**Build Process**:
- Frontend: Vite bundler outputting to `/dist/public`
- Backend: esbuild bundling server code to `/dist`
- ESM module format throughout the codebase

### Database Design

**ORM**: Drizzle ORM configured for PostgreSQL

**Schema** (`shared/schema.ts`):
- Users table with UUID primary keys, username/password fields
- Validation using Drizzle-Zod integration
- Migration files stored in `/migrations` directory

**Database Provider**: Configured for Neon serverless PostgreSQL (via `@neondatabase/serverless`)

**Note**: The application currently uses in-memory storage but is architected to easily swap to PostgreSQL by implementing the database storage interface.

### Authentication & Security

Currently minimal authentication infrastructure:
- User schema supports username/password authentication
- Session management prepared (connect-pg-simple for session store)
- No active auth routes implemented yet - designed for future expansion

### Styling & Design System

**Approach**: Custom design system based on scientific/open-source aesthetic

**Color System**:
- Light mode: Deep scientific blue primary, teal secondary, vibrant green accent
- Dark mode: Adapted lighter variants for dark backgrounds
- CSS custom properties for theme values
- Automatic border color computation for elevated surfaces

**Typography**:
- Inter font family for headings and body text
- JetBrains Mono/Fira Code for technical content
- Responsive text scales using Tailwind utilities

**Component Styling**:
- Custom elevation effects (hover-elevate, active-elevate-2 utilities)
- Consistent border radius values (lg: 9px, md: 6px, sm: 3px)
- Shadow system for depth and hierarchy

## External Dependencies

### Core Framework Dependencies
- **React 18+**: UI framework
- **Express.js**: Backend server framework
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety across the stack

### UI Component Libraries
- **Radix UI**: Headless component primitives (30+ components)
- **shadcn/ui**: Pre-styled component implementations
- **Tailwind CSS**: Utility-first styling
- **Lucide React**: Icon library

### State & Data Management
- **TanStack Query v5**: Server state management and data fetching
- **React Hook Form**: Form state management
- **Zod**: Schema validation

### Database & ORM
- **Drizzle ORM**: Type-safe SQL toolkit
- **Neon Serverless**: PostgreSQL database provider
- **connect-pg-simple**: PostgreSQL session store

### Development Tools
- **Wouter**: Lightweight routing
- **date-fns**: Date manipulation
- **class-variance-authority**: Component variant styling
- **clsx/tailwind-merge**: Conditional class composition

### Build & Bundling
- **esbuild**: Fast JavaScript bundler for server code
- **PostCSS**: CSS processing with Autoprefixer
- **Replit plugins**: Development tooling for Replit environment

### External Resources Referenced
- GitHub repository: `nygctech/PySeq2500`
- Scientific publications on Nature and bioRxiv
- Documentation at `pyseq2500.readthedocs.io`
- Protocol resources at `protocols.io/workspaces/regenseq`