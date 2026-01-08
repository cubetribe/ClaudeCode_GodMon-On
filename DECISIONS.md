# Architecture Decision Records (ADR)

> **Dokumentation wichtiger architektonischer und Design-Entscheidungen für CC_GodMode**

Dieses Dokument erfasst bedeutende Entscheidungen die während der Entwicklung von CC_GodMode getroffen wurden. Jede Entscheidung wird im ADR-Format (Architecture Decision Record) dokumentiert um Kontext, Begründung und Konsequenzen bereitzustellen.

---

## Entscheidungs-Index

| ADR | Titel | Status | Version | Datum |
|-----|-------|--------|---------|------|
| [ADR-001](#adr-001-parallel-quality-gates) | Parallel Quality Gates | AKZEPTIERT | v5.6.0 | 2025-01-07 |
| [ADR-002](#adr-002-mcp-health-check-tiers) | MCP Health Check Tiers | AKZEPTIERT | v5.6.0 | 2025-01-07 |
| [ADR-003](#adr-003-phase-2-governance-features) | Phase 2 Governance Features | AKZEPTIERT | v5.8.0 | 2025-01-08 |

---

## ADR-001: Parallel Quality Gates

### Status

**AKZEPTIERT**

- **Datum:** 2025-01-07
- **Entscheidungsträger:** Orchestrator, basierend auf Performance-Analyse
- **Version eingeführt:** v5.6.0

### Kontext

Vor v5.6.0 lief der Quality-Validierungs-Workflow sequenziell @validator und @tester:
- @builder fertig
- @validator läuft (4-6 Minuten)
- @tester läuft (4-6 Minuten)
- Gesamt: 8-12 Minuten

Dieser sequenzielle Ansatz war einfach, erzeugte aber einen Flaschenhals im Entwicklungs-Workflow. Analyse zeigte dass @validator (Code-Qualität) und @tester (UX-Qualität) keine Abhängigkeiten voneinander haben - beide hängen nur von @builders Output ab.

### Entscheidung

**Wir werden @validator und @tester parallel nach @builders Fertigstellung ausführen.**

**Implementierung:**
- Nutze parallele Task Tool Calls um beide Agenten gleichzeitig zu starten
- Implementiere einen Sync Point der wartet bis beide fertig sind
- Nutze Decision Matrix zur Koordination der Ergebnisse
- Biete sequenziellen Fallback falls parallele Ausführung fehlschlägt

**Decision Matrix:**

| @validator | @tester | Aktion |
|------------|---------|--------|
| APPROVED | APPROVED | Weiter zu @scribe |
| APPROVED | BLOCKED | Zurück zu @builder (Tester-Bedenken) |
| BLOCKED | APPROVED | Zurück zu @builder (Code-Bedenken) |
| BLOCKED | BLOCKED | Zurück zu @builder (zusammengeführtes Feedback) |

### Konsequenzen

#### Positiv

- **40% schnellere Quality-Validierung** (8-12min reduziert auf 5-7min)
- Keine Änderung der Qualitätsstandards - beide Gates müssen weiterhin bestehen
- Bessere Entwickler-Erfahrung mit schnellerem Feedback
- Parallele Ausführung ist effizientere Ressourcen-Nutzung

#### Negativ

- Etwas komplexere Orchestrierungs-Logik
- Zusammengeführtes Feedback wenn beide fehlschlagen erfordert sorgfältige Koordination
- Sequenzieller Fallback erhöht Wartungsaufwand

#### Neutral

- Gesamt-Workflow-Struktur unverändert
- Individuelle Agenten-Logik unverändert
- Report-Format unverändert

### Erwogene Alternativen

#### Alternative 1: Sequenzielle Ausführung beibehalten

**Beschreibung:** Beibehalten des bestehenden sequenziellen @validator -> @tester Flows.

**Warum abgelehnt:** Performance-Analyse zeigte konsistente 40% Zeitverschwendung durch unnötiges sequenzielles Warten.

#### Alternative 2: Einzelner kombinierter Agent

**Beschreibung:** @validator und @tester zu einem "quality" Agent zusammenführen.

**Warum abgelehnt:** Verletzt Separation of Concerns. Code-Qualität (TypeScript, Tests, Sicherheit) und UX-Qualität (E2E, Visual, A11y, Performance) sind unterschiedliche Domänen die unterschiedliche Expertise erfordern.

### Implementierung

**Betroffene Komponenten:**
- Orchestrator Workflow-Koordination
- Quality Gate Entscheidungs-Logik
- Report-Aggregation

**Geänderte Dateien:**
- `CLAUDE.md` (Workflow-Dokumentation)
- `scripts/parallel-quality-gates.js` (neu)

### Verwandte Entscheidungen

- [ADR-002: MCP Health Check Tiers](#adr-002-mcp-health-check-tiers)

### Notizen

Script-Location: `scripts/parallel-quality-gates.js`

Performance-Metriken gesammelt:
- Sequenzielle Baseline: 8-12 Minuten Durchschnitt
- Parallele Ausführung: 5-7 Minuten Durchschnitt
- Zeitersparnis pro Workflow: 3-5 Minuten

---

## ADR-002: MCP Health Check Tiers

### Status

**AKZEPTIERT**

- **Datum:** 2025-01-07
- **Entscheidungsträger:** Orchestrator, basierend auf Fehler-Analyse
- **Version eingeführt:** v5.6.0

### Kontext

MCP (Model Context Protocol) Server sind externe Abhängigkeiten auf die Agenten angewiesen sind:
- @tester benötigt: Playwright, Lighthouse (optional), A11y (optional)
- @github-manager benötigt: GitHub MCP

Vor v5.6.0 wurden MCP-Fehler mitten im Workflow entdeckt, was verursachte:
- Verschwendete Agenten-Ausführungszeit
- Unvollständige Workflows die Neustart erfordern
- Schlechte Entwickler-Erfahrung
- Keine graceful Degradation für optionale MCPs

### Entscheidung

**Wir werden ein dreistufiges MCP-Health-Check-System implementieren.**

**Tier 1: Startup Health Check**
- Läuft bei Session-Start via SessionStart Hook
- Prüft alle in Konfiguration definierten MCPs
- Meldet Status und bietet Frühwarnung
- Non-blocking (nur informativ)

**Tier 2: Pre-Workflow Check**
- Läuft vor jedem Workflow-Start
- Prüft MCPs die vom gewählten Workflow benötigt werden
- BLOCKING für erforderliche MCPs (Workflow kann nicht fortfahren)
- WARNING für optionale MCPs (Workflow läuft mit degradierter Funktionalität)

**Tier 3: Agent-Level Check**
- Jeder Agent prüft seine benötigten MCPs vor Ausführung
- Schnelle Validierung (Health bereits in Tier 2 verifiziert)
- Bietet agenten-spezifische Fehlermeldungen

**MCP-Klassifizierung:**
| MCP | Klassifizierung | Genutzt von |
|-----|----------------|---------|
| playwright | ERFORDERLICH | @tester |
| github | ERFORDERLICH | @github-manager |
| lighthouse | OPTIONAL | @tester |
| a11y | OPTIONAL | @tester |

### Konsequenzen

#### Positiv

- **95% Reduktion von Mid-Workflow-MCP-Fehlern**
- Früherkennung von Konfigurationsproblemen
- Graceful Degradation für optionale Features
- Klare Fehlermeldungen zum richtigen Zeitpunkt
- Bessere Entwickler-Erfahrung

#### Negativ

- Fügt ~8 Sekunden zum Session-Start hinzu (einmalige Kosten)
- Zusätzliche Komplexität in Health-Check-Logik
- Erfordert Pflege der MCP-Klassifizierungs-Matrix

#### Neutral

- Agenten weiterhin verantwortlich für MCP-Interaktion
- Optionale MCP-Features können nicht verfügbar sein
- Health-Check-Ergebnisse für Debugging geloggt

### Erwogene Alternativen

#### Alternative 1: Keine Health Checks

**Beschreibung:** MCPs natürlich während Agenten-Ausführung fehlschlagen lassen.

**Warum abgelehnt:** Schlechte Entwickler-Erfahrung. Mid-Workflow-Fehler verschwenden Zeit und erfordern Neustart.

#### Alternative 2: Nur Startup Check

**Beschreibung:** Alle MCPs beim Start prüfen, blockieren wenn einer fehlschlägt.

**Warum abgelehnt:** Zu aggressiv. Optionale MCPs sollten nicht die gesamte Session blockieren.

#### Alternative 3: Nur Agent-Level

**Beschreibung:** Jeder Agent prüft seine MCPs direkt vor Nutzung.

**Warum abgelehnt:** Entdeckt Probleme zu spät. Besser vorher zu wissen bevor man einen 20-Minuten-Workflow startet.

### Implementierung

**Betroffene Komponenten:**
- SessionStart Hook
- Orchestrator Workflow-Initialisierung
- Agenten MCP-Validierung

**Geänderte Dateien:**
- `scripts/mcp-health-check.js` (neu)
- `scripts/session-start.js` (erweitert)
- Agenten-Dateien (Health-Check-Integration)

### Verwandte Entscheidungen

- [ADR-001: Parallel Quality Gates](#adr-001-parallel-quality-gates)

### Notizen

Script-Location: `scripts/mcp-health-check.js`

Health-Check-Befehl: `claude mcp list`

Timeout-Konfiguration:
- Individueller MCP-Check: 5 Sekunden
- Vollständiger Health Check: maximal 30 Sekunden

---

## ADR-003: Phase 2 Governance Features

### Status

**AKZEPTIERT**

- **Datum:** 2025-01-08
- **Entscheidungsträger:** Orchestrator, basierend auf CLAUDE.md Compliance-Analyse
- **Version eingeführt:** v5.8.0

### Kontext

CC_GodMode v5.6.0 erreichte 93% CLAUDE.md Compliance. Analyse identifizierte Governance-Lücken:
- Keine formale Entscheidungs-Dokumentation (Entscheidungen getroffen aber nicht aufgezeichnet)
- Keine klare Verantwortlichkeits-Matrix (wer entscheidet was?)
- Keine Meta-Decision-Logik (wann Standard-Workflows überschreiben)

Diese Lücken erzeugen Mehrdeutigkeit in Multi-Agenten-Orchestrierung und machen es schwerer zu verstehen warum Entscheidungen getroffen wurden.

### Entscheidung

**Wir werden drei Governance-Features in Phase 2 implementieren.**

**Feature #1: Meta-Decision-Logik**
- Erweitere `analyze-prompt.js` mit Override-Regeln
- 5 Meta-Decision-Regeln für Spezialfälle
- Integration mit bestehendem Workflow-Vorschlags-System

**Feature #3: DECISIONS.md Logging**
- Erstelle ADR-Template für konsistente Entscheidungs-Aufzeichnung
- Pflege DECISIONS.md mit wichtigen architektonischen Entscheidungen
- Verlinke Entscheidungen mit Versionen und betroffenen Komponenten

**Feature #7: RARE Matrix**
- Definiere klare Verantwortlichkeits-Zuweisungen für alle Agenten
- RARE = Responsible / Accountable / Recommends / Executes
- Dokumentiere Entscheidungstypen und wer sie behandelt

### Konsequenzen

#### Positiv

- **Klarer Audit-Trail** für architektonische Entscheidungen
- **Explizite Verantwortlichkeits-Zuweisungen** reduzieren Verwirrung
- **Meta-Decision-Logik** behandelt Edge Cases automatisch
- Besseres Onboarding für neue Beitragende
- Verbesserte Compliance mit Dokumentations-Standards

#### Negativ

- Zusätzlicher Dokumentations-Wartungsaufwand
- Meta-Decision-Regeln könnten Feintuning benötigen
- RARE Matrix benötigt Updates wenn Agenten sich ändern

#### Neutral

- Kern-Workflow unverändert
- Agenten-Logik unverändert
- Performance unverändert

### Erwogene Alternativen

#### Alternative 1: Keine Governance-Dokumentation

**Beschreibung:** Weiter mit informeller Entscheidungsfindung.

**Warum abgelehnt:** Reduziert Transparenz und macht Debugging schwerer.

#### Alternative 2: Externes Governance-Tool

**Beschreibung:** Separates Tool/System für Entscheidungs-Tracking nutzen.

**Warum abgelehnt:** Fügt Komplexität und externe Abhängigkeit hinzu. Markdown-basierter Ansatz ist einfacher und versionskontrolliert.

#### Alternative 3: Vollständige RACI Matrix

**Beschreibung:** Traditionelles RACI statt RARE nutzen.

**Warum abgelehnt:** RACIs "Consulted/Informed" Unterscheidung weniger relevant für Agenten-Orchestrierung. RAREs "Recommends/Executes" passt besser zu Agenten-Rollen.

### Implementierung

**Betroffene Komponenten:**
- Dokumentations-Struktur
- analyze-prompt.js Script
- Agenten-Verantwortlichkeits-Definitionen

**Geänderte Dateien:**
- `templates/adr-template.md` (neu)
- `DECISIONS.md` (neu)
- `docs/policies/RARE_MATRIX.md` (neu)
- `scripts/analyze-prompt.js` (erweitert)

### Verwandte Entscheidungen

- [ADR-001: Parallel Quality Gates](#adr-001-parallel-quality-gates)
- [ADR-002: MCP Health Check Tiers](#adr-002-mcp-health-check-tiers)

### Notizen

Phase 2 ist Teil des v5.8.0 Release mit Fokus auf Governance und Compliance-Verbesserungen.

Implementierte Meta-Decision-Regeln:
1. Security Override
2. Breaking Change Escalation
3. Performance Critical Path
4. Emergency Hotfix
5. Documentation-Only Optimization

---

## Neue Entscheidungen hinzufügen

Beim Treffen einer bedeutenden architektonischen oder Design-Entscheidung:

1. Kopiere das Template aus `templates/adr-template.md`
2. Weise die nächste ADR-Nummer zu
3. Fülle alle Abschnitte aus
4. Füge Eintrag zur Entscheidungs-Index-Tabelle hinzu
5. Verlinke zu verwandten Entscheidungen falls zutreffend

**Was qualifiziert als ADR-würdige Entscheidung:**
- Änderungen an Workflow-Struktur
- Neue Agenten-Verantwortlichkeiten
- Performance-Optimierungen mit Trade-offs
- Breaking Changes an Interfaces
- Neue Feature-Architekturen
- Deprecation existierender Features

---

*Dokument-Version: 1.0.0 (v5.8.0)*
