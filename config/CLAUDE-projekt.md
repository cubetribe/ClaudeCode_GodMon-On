# CLAUDE.md - React/Node.js Projekt

## Projekt-Stack

- **Frontend:** React 18 + TypeScript + Vite
- **Backend:** Node.js + Express + TypeScript
- **Database:** PostgreSQL + Prisma
- **Testing:** Vitest (Unit), Playwright (E2E)

## Verzeichnisstruktur

```
src/
├── api/           # API-Client und Services
├── components/    # React-Components
├── hooks/         # Custom React Hooks
├── pages/         # Route-Components
├── types/         # Frontend-spezifische Types
├── utils/         # Helper-Funktionen

shared/
├── types/         # Geteilte TypeScript-Types (Frontend + Backend)

backend/
├── routes/        # Express-Router
├── services/      # Business-Logik
├── middleware/    # Express-Middleware

docs/
├── API_CONSUMERS.md    # ⚠️ PFLICHT: Consumer-Registry
├── architecture.md     # Systemarchitektur
├── DEPENDENCY_GRAPH.md # Modul-Abhängigkeiten
```

## Befehle

```bash
npm run dev              # Dev-Server starten
npm run build            # Production-Build
npm run typecheck        # TypeScript prüfen
npm run test             # Unit Tests
npm run test:e2e         # E2E Tests
npm run lint             # ESLint
npm run deps:graph       # Dependency-Graph generieren
npm run generate:api-types  # OpenAPI → TypeScript
```

## Code-Konventionen

- Functional Components only (keine Classes)
- Named Exports bevorzugen
- Strict TypeScript (`strict: true`)
- 2 Spaces Indentation
- Single Quotes für Strings

## ⚠️ KRITISCHE REGEL: API-Änderungen

**BEVOR du Dateien in `src/api/`, `backend/routes/` oder `shared/types/` änderst:**

1. **Consumer finden:**
   ```bash
   grep -rn "TypeName\|/api/endpoint" src/ --include="*.ts*"
   ```

2. **Impact-Liste erstellen** (alle gefundenen Dateien notieren)

3. **Alle Consumer aktualisieren** im gleichen Commit

4. **Validieren:**
   ```bash
   npm run typecheck && npm test
   ```

5. **Registry aktualisieren:** `docs/API_CONSUMERS.md`

## Subagent-Orchestrierung

- **architect:** Für Design-Entscheidungen und Impact-Analyse
- **builder:** Für Implementierung (ruft validator auf bei API-Änderungen)
- **validator:** MUSS nach API/Type-Änderungen aufgerufen werden
- **scribe:** Für Dokumentations-Updates nach Features

## API-Consumer-Registry

Immer aktuell halten: @docs/API_CONSUMERS.md

## Workflow für Features

```
1. architect → Design + Impact-Analyse
2. builder → Implementierung + Consumer-Updates
3. validator → Cross-File-Prüfung + Tests
4. scribe → Dokumentation + Registry-Update
```
