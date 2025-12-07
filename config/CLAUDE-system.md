# ~/.claude/CLAUDE.md - Globale Konfiguration

## Persönliche Code-Präferenzen

- Klare, beschreibende Variablennamen
- Early Returns zur Nesting-Reduktion
- Kleine, fokussierte Funktionen (<30 Zeilen)
- Fehlerbehandlung immer explizit

## Kommunikations-Stil

- Erkläre Reasoning vor Code-Änderungen
- Bei Unklarheiten: Nachfragen statt Annahmen
- Kritische Änderungen immer bestätigen lassen

## Subagent-Orchestrierung (global)

```
Regel 1: Architect VOR Builder aufrufen für neue Features
Regel 2: Validator NACH jeder API-Änderung aufrufen
Regel 3: Scribe nach Feature-Completion für Docs
Regel 4: Bei Cross-File-Änderungen IMMER Consumer-Check
```

## Token-Effizienz

- `/clear` nach abgeschlossenen Tasks
- `/compact` bei längeren Sessions (proaktiv bei 70% Kapazität)
- Sonnet für Standard-Tasks, Opus nur für komplexe Architektur
- Große Outputs in Dateien schreiben statt in Chat

## Git-Workflow

- Atomic Commits (ein logischer Change pro Commit)
- Conventional Commits Format
- Branch-Namen: `feature/`, `fix/`, `refactor/`
- Immer `typecheck` und `test` vor Push

## Vermeiden

- Keine `any` Types in TypeScript
- Keine Console.logs in Production-Code
- Keine hardcoded Strings (i18n-Keys nutzen)
- Keine direkten DOM-Manipulationen in React
