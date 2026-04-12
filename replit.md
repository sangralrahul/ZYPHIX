# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the ZYPHIX superlocal app — India's SuperLocal App for Jammu, J&K. Frontend-only React + Vite + TypeScript + Tailwind, built by Clavix Technologies Pvt. Ltd.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Build**: Vite

## Artifacts

### ZYPHIX — India's SuperLocal App (`artifacts/zyphix/`)
- **Type**: React + Vite + TypeScript
- **Preview path**: `/`
- **Framework**: React 18 + Vite, Tailwind CSS v4, Framer Motion, Lucide React, Wouter routing
- **Design**: Dark premium theme (world-class redesign, Zepto/Blinkit 2024 quality):
  - BG `#060B12`, BG2 `#0A1222`, CARD `#0F1A2E`, CARD2 `#152035`
  - G (green) `#00D97E`, G2 `#00B368`, ORG (Eats accent) `#FF6435`
  - T1 `#FFFFFF`, T2 `rgba(255,255,255,0.6)`, T3 `rgba(255,255,255,0.32)`, BD `rgba(255,255,255,0.07)`
  - Old light theme (`#F8F9FA`) preserved in HomeSections.tsx and git history
- **Company**: Clavix Technologies Pvt. Ltd.
- **Pages**:
  - `/` — Home (hero waitlist, services, savings calculator, live counter, kirana quotes, app preview)
  - `/about` — About page
  - `/privacy` — Privacy policy
  - `/terms` — Terms of service
  - `/contact` — Contact page
  - `/merchant-setup` — Merchant waitlist signup (grouped area dropdowns by district)
  - `/delivery-setup` — Delivery partner signup (grouped area dropdowns by district)
  - `/restaurant-setup` — Restaurant partner signup (grouped area dropdowns by district)
  - `/splash-video` — 5-scene brand splash video (framer-motion, auto-advances)
- **Components**: HomeSections.tsx (all Home sub-sections), ZyphixLogo.tsx (animated), Navbar.tsx (logo replay on route change)
- **Key features**:
  - WhatsApp fixed button (wa.me/919682394363)
  - Area dropdowns with AREAS_BY_DISTRICT (Jammu ~35, Samba 12, Kathua 13 localities) and `<optgroup>` labels
  - Logo animation: icon spring, `//` fade, ZYPH/IX word-slide; replays on every route via `key={location}`
  - Splash video images in `public/images/` (groceries, food, scooter, jammu-bg)
- **Data**: Frontend-only, waitlist stored in `localStorage` key `zyphix_waitlist`, base count 500

### API Server (`artifacts/api-server/`)
- Express 5 backend (minimal, not used by frontend)

### Canvas / Mockup Sandbox (`artifacts/mockup-sandbox/`)
- Vite dev server for component previews on the canvas board

## Key Commands

- `pnpm --filter @workspace/zyphix run dev` — run ZYPHIX frontend
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
