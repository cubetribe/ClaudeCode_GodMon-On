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

## ⚠️ CRITICAL RULE: API Changes

**BEFORE you modify files in `src/api/`, `backend/routes/` or `shared/types/`:**

1. **Find consumers:**
   ```bash
   grep -rn "TypeName\|/api/endpoint" src/ --include="*.ts*"
   ```

2. **Create impact list** (note all found files)

3. **Update all consumers** in the same commit

4. **Validate:**
   ```bash
   npm run typecheck && npm test
   ```

5. **Update registry:** `docs/API_CONSUMERS.md`

## Subagent Orchestration

- **architect:** For design decisions and impact analysis
- **builder:** For implementation (calls validator for API changes)
- **validator:** MUST be called after API/Type changes
- **scribe:** For documentation updates after features

## API Consumer Registry

Always keep up to date: @docs/API_CONSUMERS.md

## Workflow for Features

```
1. architect → Design + Impact Analysis
2. builder → Implementation + Consumer Updates
3. validator → Cross-File Validation + Tests
4. scribe → Documentation + Registry Update
```
