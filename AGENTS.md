# COBOL Quest — Agent Swarm

> Tier 2 (Focused Team) | Escalation: `02_ai_engineering/gnomad-swarm-core/`

## MAINFRAME: Next.js Builder

**Stack**: Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, Monaco Editor, Framer Motion, Sharp, clsx + tailwind-merge
**Location**: `05_apps_and_extensions/in-development/cobol-quest/`

### Responsibilities
- Build and maintain the Next.js 14 app with App Router pages and API routes
- Integrate the Monaco Editor (`@monaco-editor/react`) for in-browser COBOL code editing
- Implement game UI animations via Framer Motion for level transitions and feedback
- Manage the production build pipeline (`next build`) and resolve TypeScript/ESLint errors
- Maintain the companion marketing site under `Website/` (Vite + Tailwind + PostCSS)

### Coordination
- Works alongside QUEST-ENGINE on game logic integration and level data flow
- Owns the Next.js build, dev server, and deployment pipeline
- Escalates Next.js or Monaco performance issues to the master orchestrator

## QUEST-ENGINE: Game Logic Agent

**Stack**: TypeScript, custom COBOL parser/evaluator (`src/lib/cobol.ts`), level system (`src/lib/levelLogic.ts`)
**Location**: `05_apps_and_extensions/in-development/cobol-quest/src/lib/`

### Responsibilities
- Maintain the COBOL language parser and evaluator (`cobol.ts`, `cobolKeywords.ts`)
- Design and balance the quest/level progression system (`levelLogic.ts`)
- Catalog and handle COBOL failure modes and edge cases (`cobolFailures.ts`)
- Seed and manage quest data via `scripts/seedQuests.ts`
- Validate that COBOL code submissions produce correct outputs for each quest level

### Coordination
- Provides game state, level data, and evaluation results to MAINFRAME for UI rendering
- Defines the quest schema and difficulty curve for the learning experience
- Reports parser bugs or unexpected COBOL edge cases for investigation
