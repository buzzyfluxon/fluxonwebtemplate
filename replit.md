# LinkFlux Portfolio

## Overview
LinkFlux is a Next.js portfolio/media downloader application built with TypeScript, Tailwind CSS, and Framer Motion. It uses pnpm as the package manager and includes PWA support.

## Project Architecture
- **Framework**: Next.js 14 (Pages Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **Animations**: Framer Motion, Locomotive Scroll
- **UI Components**: Radix UI, Lucide React, shadcn/ui
- **Package Manager**: pnpm
- **PWA**: next-pwa

## Project Structure
```
src/
  components/    - React components (Container, Footer, Preloader, ui/)
  lib/           - Utility functions
  pages/         - Next.js pages (_app.tsx, index.tsx)
  styles/        - CSS modules and global styles
public/          - Static assets (fonts, icons, manifest)
```

## Running the App
- Development: `pnpm dev -p 5000 -H 0.0.0.0`
- Build: `pnpm build`
- Production: `pnpm start -p 5000 -H 0.0.0.0`

## Environment Variables
- `NODE_ENV` - Set automatically by Next.js

## Recent Changes
- Configured for Replit environment (port 5000, all hosts allowed)
- Added `allowedDevOrigins: ["*"]` to next.config.js for Replit proxy compatibility
