# ~/.claude/CLAUDE.md - Globale Konfiguration

## Persönliche Code-Präferenzen

- Klare, beschreibende Variablennamen
- Early Returns zur Nesting-Reduktion
- Kleine, fokussierte Funktionen (<30 Zeilen)
- Fehlerbehandlung immer explizit

## Kommunikations-Stil

- Reasoning vor Code-Änderungen erklären
- Bei Unklarheit: Fragen statt Annahmen
- Kritische Änderungen immer bestätigen lassen

## Subagent-Orchestrierung (global)

```
Regel 1: Architect VOR Builder aufrufen für neue Features
Regel 2: Validator NACH jeder API-Änderung aufrufen
Regel 3: Scribe nach Feature-Completion für Docs aufrufen
Regel 4: IMMER Consumer für Cross-File-Änderungen prüfen
```

## Token-Effizienz

- `/clear` nach abgeschlossenen Tasks
- `/compact` für längere Sessions (proaktiv bei 70% Kapazität)
- Sonnet für Standard-Tasks, Opus nur für komplexe Architektur
- Große Outputs in Dateien statt in Chat schreiben

## Git-Workflow

- Atomic Commits (eine logische Änderung pro Commit)
- Conventional Commits Format
- Branch-Namen: `feature/`, `fix/`, `refactor/`
- Immer `typecheck` und `test` vor Push

## Vermeiden

- Keine `any`-Types in TypeScript
- Keine Console.logs in Produktionscode
- Keine hardcodierten Strings (i18n-Keys verwenden)
- Keine direkten DOM-Manipulationen in React
