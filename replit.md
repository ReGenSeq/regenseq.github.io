# RegenSeq Open Source Community

## Overview

RegenSeq is an NSF-funded open source ecosystem that repurposes decommissioned Illumina HiSeq 2500 DNA sequencers into flexible automation platforms for spatial biology research. The project provides Python-based control software and custom flow cell designs to transform obsolete scientific instruments into affordable, accessible tools for advanced single-cell assays and spatial transcriptomics/proteomics applications.

This is a full-stack web application serving as the community hub and documentation portal for the RegenSeq project, featuring information about the technology, team, resources, and community engagement opportunities.

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
- Snap-scrolling sections for enhanced UX on desktop
- Global scrolling background (BackgroundLayer component) with DNA sequencer image that shifts 150px per section using IntersectionObserver
- Scroll indicator navigation (ScrollIndicator component) with IntersectionObserver-based active section detection
- Mobile-responsive design with accessibility-first approach ensuring all content visible across 320px-1920px viewports

**Responsive Behavior** (October 2025 - Final Implementation):
- **Mobile (< 768px)**: 
  - Container allows natural document scrolling (no fixed height or overflow)
  - Sections use `min-h-screen` to expand with content, ensuring all text and footer are visible
  - `overflow-y-auto` on sections for vertical scrolling when content exceeds viewport
  - No snap scrolling for natural mobile experience
  - Section parallax transforms removed to prevent content clipping
  
- **Desktop (>= 768px)**: 
  - Container uses `md:h-screen md:overflow-y-scroll md:snap-y md:snap-proximity` for smooth scroll area with proximity-based snapping
  - Sections use `min-h-screen` (removed `md:h-screen` constraint) allowing content expansion
  - `overflow-y-auto` enables vertical scrolling within sections (removed `md:overflow-hidden`)
  - Sections use `md:snap-start md:snap-always` for snap points
  - Section parallax transforms removed (BackgroundLayer parallax still active)
  
- **Shared Hook**: All sections use `useIsMobile()` from `/client/src/hooks/use-mobile.tsx` for responsive detection (768px breakpoint, single matchMedia listener)
- **Typography**: All sections use centralized CSS utility classes (`.text-heading-main`, `.text-heading-sub`, etc.) with horizontal padding (`px-2`) to prevent edge clipping
- **Layout Pattern**: Sections use `items-start` with `md:pt-28 lg:pt-32 md:pb-[15vh]` padding (navbar spacing + generous 15vh bottom clearance)
- **Navigation Components**:
  - Fixed navbar at top with scroll detection and theme toggle
  - Scroll indicator dots (right side, desktop only) using IntersectionObserver for accurate active section detection
  - IntersectionObserver tracks all 8 sections with granular thresholds (0 to 1.0 in 0.1 increments)
  - Active dot determined by section with highest intersection ratio
  - Clicking dots scrolls smoothly to corresponding section

- **Critical Fixes (Oct 2025)**: 
  - Removed section-level parallax transforms that were causing titles to be hidden/clipped
  - Fixed navbar overlap by changing from vertical centering to top alignment with proper padding
  - Fixed scroll clipping: Changed snap-mandatory to snap-proximity, removed overflow-hidden, added 15vh bottom padding to ensure all cards/buttons fully visible
  - Fixed scroll indicator: Replaced scroll event listener with IntersectionObserver for reliable, performant section tracking

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

**Typography** (Centralized System - October 2025):
- Inter font family for headings and body text
- JetBrains Mono/Fira Code for technical content
- **CSS Custom Properties for Responsive Sizing:**
  - `--text-heading-main: clamp(1.5rem, 4vw, 2.5rem)` - Main headings (24-40px)
  - `--text-heading-sub: clamp(1.25rem, 3vw, 1.875rem)` - Subheadings (20-30px)
  - `--text-subtitle-lg: clamp(0.875rem, 2vw, 1.25rem)` - Large subtitles (14-20px)
  - `--text-subtitle: clamp(0.875rem, 2vw, 1.125rem)` - Standard subtitles (14-18px)
- **CSS Utility Classes:** `.text-heading-main`, `.text-heading-sub`, `.text-subtitle-lg`, `.text-subtitle`
- All sections use utility classes for consistent typography across all viewports

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