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
├── components/    # React-Komponenten
├── hooks/         # Custom React Hooks
├── pages/         # Route-Komponenten
├── types/         # Frontend-spezifische Types
├── utils/         # Helper-Funktionen

shared/
├── types/         # Geteilte TypeScript-Types (Frontend + Backend)

backend/
├── routes/        # Express-Router
├── services/      # Business-Logik
├── middleware/    # Express-Middleware

docs/
├── API_CONSUMERS.md    # ⚠️ ERFORDERLICH: Consumer-Registry
├── architecture.md     # System-Architektur
├── DEPENDENCY_GRAPH.md # Modul-Abhängigkeiten

reports/
├── *-report.md    # Agenten-Reports (erstellt während Workflow)
```

## Befehle

```bash
npm run dev              # Dev-Server starten
npm run build            # Production-Build
npm run typecheck        # TypeScript prüfen
npm run test             # Unit-Tests
npm run test:e2e         # E2E-Tests
npm run lint             # ESLint
npm run deps:graph       # Dependency-Graph generieren
npm run generate:api-types  # OpenAPI → TypeScript
```

## Code-Konventionen

- Nur Functional Components (keine Klassen)
- Named Exports bevorzugen
- Strict TypeScript (`strict: true`)
- 2 Spaces Einrückung
- Single Quotes für Strings

## Subagent-Orchestrierung

### Verfügbare Agenten

| Agent | Aufgabe | Aufgerufen für |
|-------|------|------------|
| `@architect` | High-Level-Design | Neue Module, Tech-Entscheidungen |
| `@api-guardian` | API-Lifecycle | JEDE API-/Type-Änderung |
| `@builder` | Implementierung | Code schreiben |
| `@validator` | Code-Quality-Gate | TypeScript, Unit-Tests, Security |
| `@tester` | UX-Quality-Gate | E2E, Visual Regression, A11y, Performance |
| `@scribe` | Dokumentation | Docs-Updates |
| `@github-manager` | Projektmanagement | Issues, PRs, Releases |

### Orchestrierungs-Regeln

```
Regel 1: @architect VOR @builder für neue Features
Regel 2: @api-guardian VOR @builder für API-Änderungen
Regel 3: @validator NACH jeder Implementierung (Code-Qualität)
Regel 4: @tester NACH @validator für UI-Änderungen (UX-Qualität)
Regel 5: @scribe nach Feature-Completion
Regel 6: @github-manager für Issues, PRs, Releases
```

### Workflows

- **Neues Feature:** `@architect` → `@builder` → `@validator` → `@tester` → `@scribe`
- **Bug Fix:** `@builder` → `@validator` → `@tester`
- **API-Änderung:** `@architect` → `@api-guardian` → `@builder` → `@validator` → `@tester` → `@scribe`
- **Refactoring:** `@architect` → `@builder` → `@validator` → `@tester`
- **Release:** `@scribe` → `@github-manager`

## ⚠️ KRITISCHE REGEL: API-Änderungen

**Für JEDE Änderung an `src/api/`, `backend/routes/`, `shared/types/` oder `*.d.ts`:**

1. **STOPP** - Hook triggert automatisch
2. **@api-guardian aufrufen** für Impact-Analyse
3. **EMPFANGEN** Consumer-Datei-Liste
4. **@builder** aktualisiert alle Consumer
5. **@validator** verifiziert Code-Qualität
6. **@tester** verifiziert UX-Qualität (falls UI betroffen)
7. **@scribe** aktualisiert Dokumentation

**Sie suchen NICHT manuell nach Consumern - @api-guardian erledigt das!**

## API-Consumer-Registry

Immer aktuell halten: `docs/API_CONSUMERS.md`

Der `@scribe`-Agent ist verantwortlich für die Aktualisierung basierend auf @api-guardian's Analyse.

## Automatische Hooks

Der `check-api-impact.js`-Hook läuft bei jeder Dateiänderung und:
- Erkennt API-relevante Dateiänderungen
- Analysiert potenzielle Breaking Changes
- Listet betroffene Consumer auf
- Erinnert daran, `@api-guardian` aufzurufen
