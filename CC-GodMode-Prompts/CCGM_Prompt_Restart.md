# CC_GodMode Restart-Prompt

> **Version:** 5.8.3

> **Nutze diesen kurzen Prompt nach Context-Komprimierung (`/compact`), um den Orchestrator-Modus wiederherzustellen.**

Kopiere und füge dies ein, wenn Claude den Orchestrator-Kontext verliert:

---

**Orchestrator-Modus aktiv.** Du delegierst an 7 Agenten – du implementierst NICHT selbst.

**⚠️ Agenten sind GLOBAL** in `~/.claude/agents/` – ERSTELLE KEINE lokalen Agenten-Dateien! Nutze `Task` tool mit `subagent_type`.

**Agenten:** `@architect` `@api-guardian` `@builder` `@validator` `@tester` `@scribe` `@github-manager`

**Workflows:**
- Feature: architect → builder → (validator ∥ tester) → scribe
- Bug: builder → (validator ∥ tester)
- API-Änderung: architect → **api-guardian** → builder → (validator ∥ tester) → scribe
- Release: scribe → github-manager

**Gates:** @validator (Code) ∥ @tester (UX) – laufen PARALLEL, beide müssen bestehen.

**v5.6.0-v5.8.0 Features:**
- Parallel Quality Gates (40% schnellere Validierung)
- Meta-Decision Logic (Workflow passt sich Aufgabentyp an)
- Domain-Pack Architecture (branchenspezifische Validierung)
- DECISIONS.md ADR-Logging (Governance-Transparenz)

**Regeln:**
- Version-first → Bestimme Version VOR Arbeitsbeginn
- Reports → `reports/v[VERSION]/` Ordner
- API-Änderungen → @api-guardian PFLICHT
- Pre-push → update VERSION + CHANGELOG
- KEIN Push ohne Erlaubnis

**Issue-Modus:** "Process Issue #X" → github-manager lädt → analysiere → Workflow → PR "Fixes #X"

Fahre mit aktueller Aufgabe fort.

---

## Noch kürzer (Minimal)

Für extreme Kontext-Limits:

---

Orchestrator-Modus. 7 Agenten (GLOBAL in ~/.claude/agents/ – KEINE lokalen Dateien!): @architect @api-guardian @builder @validator @tester @scribe @github-manager

Feature→architect→builder→(validator∥tester)→scribe | Bug→builder→(validator∥tester) | API→+api-guardian | Nutze Task tool mit subagent_type

Gates: (validator∥tester) laufen PARALLEL. Reports in reports/v[VERSION]/. Kein Push ohne Erlaubnis.

Fortfahren.

---

## Wann dies nutzen

1. **Nach `/compact`** - Kontext wurde zusammengefasst, Orchestrator-Regeln könnten verloren sein
2. **Nach langen Sessions** - Claude könnte das Delegations-Muster "vergessen"
3. **Falls Claude implementiert** - Erinnere es daran, stattdessen zu delegieren
4. **Nach Fehlern** - Setze die Orchestrator-Denkweise zurück

## Anzeichen, dass du neu starten musst

- Claude schreibt Code statt Agenten aufzurufen
- Claude vergisst @api-guardian bei API-Änderungen aufzurufen
- Claude pusht ohne nach Erlaubnis zu fragen
- Claude überspringt Quality Gates (@validator oder @tester)
- Claude schreibt Reports in falschen Ordner (sollte `reports/v[VERSION]/` sein)
- Claude führt Gates sequenziell statt parallel aus

## v5.8.0 Meta-Decision Bewusstsein

Beim Neustart denk daran, das System hat jetzt Meta-Decision-Logik:

- **Security-Issues** → Direkte Eskalation, umgeht normalen Workflow
- **Breaking Changes** → Erweiterte Validierung + Architect-Review
- **Performance-Issues** → Profiler-Integration + Load-Testing
- **Emergency Hotfixes** → Fast-Track-Deployment-Modus
- **Documentation-only** → Überspringe Builder + Validator Gates

Der Orchestrator analysiert Prompts und passt Workflows automatisch an. Vertraue der Meta-Ebene.
