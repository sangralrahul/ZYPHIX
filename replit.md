# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains the ZYPHIX super-local app frontend.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### ZYPHIX — India's SuperLocal App (`artifacts/zyphix/`)
- **Type**: React + Vite + TypeScript
- **Preview path**: `/`
- **Framework**: React 18 + Vite, Tailwind CSS, Framer Motion, Lucide React, Wouter routing
- **Theme**: Dark-only, custom color palette:
  - Background: `#0A0E1A`
  - Card/navbar: `#0F1B35`
  - Teal accent (CTA): `#00C9A7`
  - Gold accent (Eats): `#F5A623`
  - Orange accent (Book): `#FF6B35`
  - Brand blue: `#1E4FC2`
  - Borders: `#1E3A6E`
- **Pages**:
  - `/` — Home (hero cards, categories, trending products, restaurants, services)
  - `/now` — ZyphixNow (grocery delivery with filter pills and store sections)
  - `/eats` — ZyphixEats (food delivery from dhabas and restaurants)
  - `/book` — ZyphixBook (appointment booking for barbers, garages, doctors)
  - `/map` — Kirana Near Me (store map with sidebar list)
  - `/offers` — Offers & promo codes
- **Data**: Frontend-only, all data in `src/data/mockData.ts`
- **Location**: Jammu & Kashmir, India (Tier 2 city focus)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/zyphix run dev` — run ZYPHIX frontend

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
