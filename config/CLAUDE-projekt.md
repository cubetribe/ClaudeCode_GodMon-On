# CLAUDE.md - React/Node.js Project

## Project Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Prisma
- **Testing:** Vitest (Unit), Playwright (E2E)

## Directory Structure

```
src/
├── api/           # API Client and Services
├── components/    # React Components
├── hooks/         # Custom React Hooks
├── pages/         # Route Components
├── types/         # Frontend-specific Types
├── utils/         # Helper Functions

shared/
├── types/         # Shared TypeScript Types (Frontend + Backend)

backend/
├── routes/        # Express Routers
├── services/      # Business Logic
├── middleware/    # Express Middleware

docs/
├── API_CONSUMERS.md    # ⚠️ REQUIRED: Consumer Registry
├── architecture.md     # System Architecture
├── DEPENDENCY_GRAPH.md # Module Dependencies

Agents/
├── *-report.md    # Agent reports (created during workflow)
```

## Commands

```bash
npm run dev              # Start dev server
npm run build            # Production build
npm run typecheck        # Check TypeScript
npm run test             # Unit tests
npm run test:e2e         # E2E tests
npm run lint             # ESLint
npm run deps:graph       # Generate dependency graph
npm run generate:api-types  # OpenAPI → TypeScript
```

## Code Conventions

- Functional Components only (no Classes)
- Prefer Named Exports
- Strict TypeScript (`strict: true`)
- 2 Spaces Indentation
- Single Quotes for Strings

## Subagent Orchestration

### Available Agents

| Agent | Task | Called For |
|-------|------|------------|
| `@architect` | High-level design | New modules, tech decisions |
| `@api-guardian` | API lifecycle | ANY API/Type changes |
| `@builder` | Implementation | Code writing |
| `@validator` | Quality gate | Verification |
| `@scribe` | Documentation | Docs updates |

### Orchestration Rules

```
Rule 1: @architect BEFORE @builder for new features
Rule 2: @api-guardian BEFORE @builder for API changes
Rule 3: @validator AFTER every implementation
Rule 4: @scribe after feature completion
```

### Workflows

- **New Feature:** `@architect` → `@builder` → `@validator` → `@scribe`
- **Bug Fix:** `@builder` → `@validator`
- **API Change:** `@architect` → `@api-guardian` → `@builder` → `@validator` → `@scribe`
- **Refactoring:** `@architect` → `@builder` → `@validator`

## ⚠️ CRITICAL RULE: API Changes

**For ANY change to `src/api/`, `backend/routes/`, `shared/types/`, or `*.d.ts`:**

1. **STOP** - Hook will trigger automatically
2. **Call @api-guardian** for impact analysis
3. **Receive** consumer file list
4. **@builder** updates all consumers
5. **@validator** verifies changes
6. **@scribe** updates documentation

**You do NOT manually search for consumers - @api-guardian handles this!**

## API Consumer Registry

Always keep up to date: `docs/API_CONSUMERS.md`

The `@scribe` agent is responsible for updating this based on `@api-guardian`'s analysis.

## Automatic Hooks

The `check-api-impact.js` hook runs on every file change and:
- Detects API-relevant file changes
- Analyzes potential breaking changes
- Lists affected consumers
- Reminds to call `@api-guardian`
