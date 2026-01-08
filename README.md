<div align="center">

# CC_GodMode

### *"Was passiert, wenn ein KI-System genutzt wird, um sich selbst zu verbessern?"*

**Du betrachtest die Antwort.**

[![Version](https://img.shields.io/badge/Version-5.8.0-blue)](./CHANGELOG.md)
[![State of the Art](https://img.shields.io/badge/2026%20Compliance-93%25-green)](./reports/)
[![Agents](https://img.shields.io/badge/Agents-7%20Specialists-purple)](./agents/)
[![Self-Improving](https://img.shields.io/badge/Self--Improving-Yes%2C%20Really-red)](./CHANGELOG.md)

</div>

---

## Die Geschichte

Es begann einfach: Ein Entwickler, massiver Schlafmangel und eine Vision.

**Phase 1:** Manuelle Arbeit. Best Practices recherchieren. Dokumentation lesen. Prompts testen. Scheitern. Iterieren. Agent nach Agent bauen. Workflow nach Workflow. Woche für Woche.

**Phase 2:** Das System funktioniert. 7 spezialisierte KI-Agenten orchestrieren sich selbst. Features werden gebaut. Bugs werden gefixt. Dokumentation schreibt sich selbst. *"Das ist ziemlich gut,"* dachte ich.

**Phase 3:** 6. Januar 2026. Ein Gedanke: *"Was wäre, wenn ich das System nutze... um das System zu verbessern?"*

Ich gab ihm einen Prompt. Der Orchestrator delegierte an das Research-Team. Analysierte seine eigene Architektur. Fand Ineffizienzen. Schlug Verbesserungen vor. Implementierte sie. Validierte sich selbst. Dokumentierte die Änderungen.

**Der Kreis schloss sich.**

**Phase 4:** Du liest dieses README. Eine KI hat Teile davon geschrieben. Eine KI wird es verbessern. Das Experiment geht weiter.

---

## Was ist das?

**CC_GodMode** verwandelt Claude Code in ein selbst-orchestrierendes Entwicklungsteam.

**Du sagst WAS. Die KI findet heraus WIE.**

```
Du: "Ich brauche Benutzer-Authentifizierung mit JWT"

Orchestrator:
  → Analysiert Anfrage
  → Bestimmt Version (5.5.0)
  → Erstellt Report-Ordner
  → Delegiert an @architect für Design
  → Delegiert an @api-guardian für API-Impact
  → Delegiert an @builder für Implementierung
  → @validator prüft Code-Qualität
  → @tester prüft UX-Qualität
  → @scribe dokumentiert alles
  → @github-manager erstellt PR

Du: *trinkt Kaffee*
```

Der Unterschied?

| Ohne CC_GodMode | Mit CC_GodMode |
|:---|:---|
| Du: "Designe das Feature" | Du: "Baue Feature X" |
| Du: "Jetzt implementiere es" | ☕ |
| Du: "Prüfe die Typen" | ☕ |
| Du: "Update die Consumer" | ☕ |
| Du: "Schreibe die Docs" | ☕ |
| Du: "Habe ich etwas vergessen?" | KI: "Fertig. Hier ist der Bericht." |

---

## Die Agenten

7 Spezialisten. Jeder mit eigener Expertise. Jeder weiß genau, was er tut—und was nicht.

| Agent | Rolle | Spezialgebiet |
|:------|:-----|:----------|
| `@architect` | System Architekt | High-Level-Design, Modulstruktur, Tech-Entscheidungen |
| `@api-guardian` | API-Lifecycle-Experte | Breaking Changes, Consumer-Impact, Contract-Validierung |
| `@builder` | Senior Entwickler | Implementierung nach @architects Spezifikationen |
| `@validator` | Code Quality Gate | TypeScript, Unit-Tests, Sicherheit, Consumer-Verifikation |
| `@tester` | UX Quality Gate | E2E-Tests, Visual Regression, Accessibility, Performance |
| `@scribe` | Technical Writer | Dokumentation, Changelog, Versions-Management |
| `@github-manager` | GitHub Manager | Issues, PRs, Releases, CI/CD-Orchestrierung |

**Dual Quality Gates:**

```
                    @builder fertig
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
    ┌─────────────┐                 ┌─────────────┐
    │ @validator  │                 │  @tester    │
    │ Code Quality│                 │ UX Quality  │
    ├─────────────┤                 ├─────────────┤
    │ ✓ TypeScript│                 │ ✓ E2E Tests │
    │ ✓ Unit Tests│                 │ ✓ Visuals   │
    │ ✓ Security  │                 │ ✓ A11y      │
    │ ✓ Consumers │                 │ ✓ Perf      │
    └──────┬──────┘                 └──────┬──────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
                   Beide Gates bestanden?
                   → Weiter zu @scribe
```

---

## Die Architektur

```
~/.claude/                          ← RUNTIME (Was Claude lädt)
├── agents/                         ← 7 Agenten, global verfügbar
│   ├── architect.md
│   ├── api-guardian.md
│   ├── builder.md
│   ├── validator.md
│   ├── tester.md
│   ├── scribe.md
│   └── github-manager.md
├── scripts/                        ← Hook-Scripts
│   └── check-api-impact.js
├── templates/                      ← Projekt-Templates
│   ├── CLAUDE-ORCHESTRATOR.md
│   └── CC-GodMode-Prompts/CCGM_Prompt_ProjectSetup.md
└── settings.json                   ← Hooks-Konfiguration
```

```
your-project/                       ← DEIN PROJEKT
├── CLAUDE.md                       ← Orchestrator (wird automatisch geladen!)
├── VERSION                         ← Single Source of Truth
├── CHANGELOG.md                    ← Versions-Historie
└── reports/                        ← Agenten-Outputs
    └── v5.1.0/                     ← Gruppiert nach Version
        ├── 00-architect-report.md
        └── ...
```

**Der Trick:** `CLAUDE.md` wird automatisch von Claude Code geladen. Kein Copy-Paste. Keine Aktivierung. Funktioniert einfach.

---

## Agenten-Architektur

CC_GodMode nutzt ein **Dual-Location-Modell** für Agenten:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AGENT DUAL-LOCATION MODEL                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   GitHub Repository                    Dein System                   │
│   ════════════════                    ════════════                   │
│                                                                      │
│   CC_GodMode/                         ~/.claude/                     │
│   └── agents/           ──INSTALL──►  └── agents/                   │
│       ├── architect.md                    ├── architect.md          │
│       ├── builder.md                      ├── builder.md            │
│       ├── validator.md                    ├── validator.md          │
│       └── ...                             └── ...                   │
│                                                                      │
│   📦 SOURCE                            🚀 RUNTIME                    │
│   • Versionskontrolliert              • Wird tatsächlich von Claude │
│   • Templates für Git                    geladen                    │
│   • Hier updaten, dann neu             • Systemweit verfügbar       │
│     installieren                       • Während Workflows genutzt  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Warum dieses Design?**
- **Source** (`/agents/`): Im Git getrackt, teilbar, updatebar
- **Runtime** (`~/.claude/agents/`): Wo Claude Code tatsächlich nach Agenten sucht

**Update-Flow:**
1. Agent in `/agents/` modifizieren (Source)
2. Installations-Script ausführen
3. Änderungen nach `~/.claude/agents/` kopiert (Runtime)
4. Claude Code nutzt aktualisierte Agenten

---

## Die Workflows

Der Orchestrator wählt automatisch den richtigen Workflow:

**Neues Feature:**
```
@architect → @builder → (@validator ∥ @tester) → @scribe
```

**Bug Fix:**
```
@builder → (@validator ∥ @tester)
```

**API-Änderung (Kritisch!):**
```
@architect → @api-guardian → @builder → (@validator ∥ @tester) → @scribe
```

**Refactoring:**
```
@architect → @builder → (@validator ∥ @tester)
```

**Hinweis:** Seit v5.6.0 laufen Quality Gates PARALLEL (∥ Symbol) für 40% schnellere Validierung.

**Release:**
```
@scribe → @github-manager
```

---

## Der Hook

Die Geheimzutat: Ein PostToolUse-Hook, der nach jeder Dateiänderung läuft.

```
Entwickler ändert: shared/types/User.ts
                          │
                          ▼
              ┌───────────────────────┐
              │  check-api-impact.js  │  ← AUTOMATISCH
              │                       │
              │  • Erkennt API-Änderung│
              │  • Analysiert Diff     │
              │  • Findet Consumer     │
              │  • Warnt vor Breaks    │
              └───────────────────────┘
                          │
                          ▼
╔═══════════════════════════════════════════════════════════╗
║  ⚠️  API/TYPE FILE CHANGE DETECTED                         ║
║                                                            ║
║  📁 Datei: shared/types/User.ts                            ║
║  🔴 BREAKING: Feld 'email' entfernt                        ║
║  📍 5 Consumer gefunden                                    ║
║                                                            ║
║  ⚡ @api-guardian MUSS aufgerufen werden!                  ║
╚═══════════════════════════════════════════════════════════╝
```

Nichts wird vergessen. Der Hook erinnert für dich.

---

## Installation

### One-Shot Install (Empfohlen)

> Ein Prompt. Claude installiert alles.

**Schritt 1:** Starte Claude mit Berechtigungen:
```bash
claude --dangerously-skip-permissions
```

**Schritt 2:** Kopiere den gesamten Inhalt aus [`CC-GodMode-Prompts/CCGM_Prompt_Install.md`](./CC-GodMode-Prompts/CCGM_Prompt_Install.md) und füge ihn ein.

**Schritt 3:** Zusehen. Claude wird:
- Das Repository klonen
- 7 Agenten global installieren
- Hook-Scripts einrichten
- Memory MCP Server installieren
- Konfigurieren und verifizieren

**Warum `--dangerously-skip-permissions`?** 30+ Dateioperationen. Ohne würdest du jede einzelne manuell bestätigen.

### Manuelle Installation

Siehe [`CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md`](./CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md) für Schritt-für-Schritt-Anleitung.

---

## Prompt-Dateien

CC_GodMode enthält sofort nutzbare Prompts für verschiedene Szenarien:

| Prompt-Datei | Zweck | Wann verwenden |
|-------------|---------|-------------|
| [`CCGM_Prompt_Install.md`](./CC-GodMode-Prompts/CCGM_Prompt_Install.md) | One-Shot-Installation | Erstmaliges Setup mit `--dangerously-skip-permissions` |
| [`CCGM_Prompt_ManualInstall.md`](./CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md) | Schritt-für-Schritt-Installation | Wenn du manuelle Kontrolle bevorzugst |
| [`CCGM_Prompt_ProjectSetup.md`](./CC-GodMode-Prompts/CCGM_Prompt_ProjectSetup.md) | Orchestrator in Projekt einfügen | CC_GodMode zu bestehendem Projekt hinzufügen |
| [`CCGM_Prompt_Restart.md`](./CC-GodMode-Prompts/CCGM_Prompt_Restart.md) | **KRITISCH** Kontext-Wiederherstellung | Nach `/compact`, langen Sessions oder **jeder neuen Session** |

### Wann welchen Prompt verwenden

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROMPT DECISION TREE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Ist CC_GodMode global installiert (~/.claude/)?                            │
│     │                                                                       │
│     ├── NEIN → Nutze CCGM_Prompt_Install.md (einmalig)                     │
│     │                                                                       │
│     └── JA → Hat dein Projekt CLAUDE.md?                                   │
│                  │                                                          │
│                  ├── NEIN → Kopiere CCGM_Prompt_ProjectSetup.md in         │
│                  │           CLAUDE.md                                      │
│                  │                                                          │
│                  └── JA → Ist dies eine neue/frische Session?              │
│                              │                                              │
│                              └── JA → Nutze CCGM_Prompt_Restart.md         │
│                                        (KRITISCH - JEDES MAL machen!)      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### KRITISCH: Der Restart-Prompt

**Warum ist `CCGM_Prompt_Restart.md` so wichtig?**

Claude Code erinnert sich NICHT automatisch an den Orchestrator-Modus zwischen Sessions. Auch wenn:
- CC_GodMode global installiert ist
- Dein Projekt CLAUDE.md konfiguriert hat
- Gestern alles perfekt funktionierte

**Du MUSST den Restart-Prompt nutzen wenn:**
1. Du eine **neue/frische Claude Code Session** startest
2. Nach Nutzung von **`/compact`** (Kontext-Zusammenfassung)
3. Nach **langen Sessions**, wo Claude zu "vergessen" scheint
4. Wenn Claude **implementiert statt zu delegieren**

**Anzeichen dass du den Restart-Prompt brauchst:**
- Claude schreibt Code statt Agenten aufzurufen
- Claude vergisst @api-guardian für API-Änderungen aufzurufen
- Claude überspringt Quality Gates (@validator oder @tester)
- Claude pusht ohne zu fragen
- Claude schreibt Reports in falschen Ordner (sollte `reports/v[VERSION]/` sein)

### Kurzreferenz

| Szenario | Aktion |
|----------|--------|
| **Erstmals überhaupt** | `CCGM_Prompt_Install.md` |
| **Neues Projekt (CC_GodMode bereits installiert)** | Kopiere `CCGM_Prompt_ProjectSetup.md` in CLAUDE.md |
| **Jede neue Session** | Füge `CCGM_Prompt_Restart.md` ein |
| **Nach /compact** | Füge `CCGM_Prompt_Restart.md` ein |
| **Claude wirkt verwirrt** | Füge `CCGM_Prompt_Restart.md` ein |

**TL;DR:** Einmal installieren, jede Session neu starten.

---

## In deinem Projekt aktivieren

Nach der Installation für jedes Projekt:

**macOS / Linux:**
```bash
cd your-project
cp ~/.claude/templates/CLAUDE-ORCHESTRATOR.md ./CLAUDE.md
claude
```

**Windows:**
```powershell
cd your-project
Copy-Item "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" ".\CLAUDE.md"
claude
```

Die CLAUDE.md wird automatisch geladen. Orchestrator-Modus ist aktiv.

---

## MCP Server

Erweiterte Fähigkeiten durch Model Context Protocol:

| Server | Agent | Zweck | Erforderlich? |
|:-------|:------|:--------|:----------|
| **memory** | Alle | Persistentes Wissen | ✅ Installiert |
| **playwright** | @tester | Browser-Automation, E2E | Empfohlen |
| **github** | @github-manager | Issues, PRs, Releases | Empfohlen |
| **lighthouse** | @tester | Performance-Audits | Optional |
| **a11y** | @tester | Accessibility-Testing | Optional |

```bash
# Empfohlene MCPs installieren
claude mcp add playwright -- npx @playwright/mcp@latest
claude mcp add lighthouse -- npx lighthouse-mcp
claude mcp add a11y -- npx a11y-mcp

# GitHub MCP (benötigt Token)
export GITHUB_TOKEN="your_token"
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_TOKEN \
  -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN \
  ghcr.io/github/github-mcp-server
```

---

## Die Regeln

1. **Version-First** — Version bestimmen BEVOR Arbeit beginnt
2. **@architect ist das Gate** — Kein Feature startet ohne Design
3. **@api-guardian ist PFLICHT** — Für jede API-Änderung
4. **Dual Quality Gates** — Sowohl @validator ALS AUCH @tester müssen bestehen
5. **Kein Überspringen** — Jeder Agent im Workflow wird ausgeführt
6. **Reports in reports/vX.X.X/** — Nach Version organisiert
7. **NIEMALS pushen ohne Berechtigung** — Gilt für ALLE Agenten

---

## Dokumentation

CC_GodMode enthält umfassende Dokumentation zum Verständnis und zur Erweiterung des Systems:

### Kern-Dokumentation
- **[CHANGELOG.md](./CHANGELOG.md)** - Vollständige Versions-Historie und Evolution des Systems
- **[AGENT_ARCHITECTURE.md](./docs/AGENT_ARCHITECTURE.md)** - Verständnis des Dual-Location-Modells
- **[AGENT_MODEL_SELECTION.md](./docs/AGENT_MODEL_SELECTION.md)** - Kostenoptimierung und ROI-Analyse

### Policy-Dokumente (NEU in v5.7.0)
- **[REPORT_TEMPLATES.md](./docs/templates/REPORT_TEMPLATES.md)** - Standardisierte Formate für alle 7 Agenten
- **[CONTEXT_SCOPE_POLICY.md](./docs/policies/CONTEXT_SCOPE_POLICY.md)** - Agenten-Grenzen und Verantwortlichkeiten
- **[SECURITY_TOOLING_POLICY.md](./docs/policies/SECURITY_TOOLING_POLICY.md)** - Tool-Zugriffskontroll-Matrix

Diese Dokumente verwandeln implizites Wissen in explizite Verträge und machen das System wartbarer und vorhersagbarer.

---

## Kontext-Wiederherstellung

Claude Codes `/compact` kann Gedächtnisverlust verursachen. Wenn der Orchestrator anfängt zu implementieren statt zu delegieren:

1. Öffne [`CC-GodMode-Prompts/CCGM_Prompt_Restart.md`](./CC-GodMode-Prompts/CCGM_Prompt_Restart.md)
2. Kopiere den Restart-Prompt
3. Füge in Chat ein
4. Orchestrator-Modus wiederhergestellt

**Anzeichen dass du Restart brauchst:**
- Claude schreibt Code statt Agenten aufzurufen
- Claude vergisst @api-guardian für API-Änderungen
- Claude überspringt Quality Gates (@validator oder @tester)
- Claude pusht ohne Berechtigung
- Claude schreibt Reports in falschen Ordner (sollte `reports/v[VERSION]/` sein)

---

## FAQ

**F: Warum 7 Agenten?**
A: Separation of Concerns. Jeder Agent hat EINEN Job. Keine Überschneidungen. Keine Verwirrung.

**F: Was ist der Unterschied zwischen @validator und @tester?**
A: @validator = Code-Qualität (TypeScript, Tests, Sicherheit). @tester = UX-Qualität (E2E, Visual, A11y, Perf).

**F: Kann ich @tester überspringen?**
A: Für reine Backend-Änderungen, ja. Für alles UI-bezogene, nein.

**F: Können Agenten ohne meine Berechtigung pushen?**
A: Nein. "NIEMALS git push ohne Berechtigung" ist über alle Agenten hinweg durchgesetzt.

**F: Ist das einfach nur... KI verbessert KI?**
A: Ja. Das ist der beunruhigende Teil. Und der faszinierende Teil. Eigentlich dasselbe.

---

## Das Meta

Dieses README wurde teilweise von einer KI geschrieben.
Das System, das es geschrieben hat, wird es verbessern.
Der Kreis geht weiter.

---

## Version

**CC_GodMode v5.8.0**

- Meta-Decision-Logik für intelligente Workflow-Anpassung
- Governance-Features (DECISIONS.md ADR-Log, RARE-Matrix)
- Domain-Pack-Architektur für branchenspezifische Validierung
- Dreistufiger Eskalations-Mechanismus für Fehler-Recovery
- State-of-the-Art 2026 Compliance: 93%
- 7 spezialisierte Agenten mit klaren Grenzen
- Dual Quality Gates (40% schneller seit v5.6.0)
- Hook-basierte API-Erkennung
- Version-First-Workflow

Siehe [CHANGELOG.md](./CHANGELOG.md) für die vollständige Geschichte.

---

## Credits

**Dennis Westermann** ([www.dennis-westermann.de](https://www.dennis-westermann.de))
*Jahre des Leidens, destilliert in dieses Repo. Jetzt verbessert sich das Repo selbst. War es das wert?*

---

## Lizenz

**Proprietary License** — Private Nutzung erlaubt. Kommerzielle Nutzung erfordert Berechtigung.

Copyright (c) 2025 Dennis Westermann

---

<div align="center">

**Erstellt mit massivem Schlafmangel**

*Das Experiment geht weiter.*

⭐ Star wenn du nicht zu beunruhigt bist ⭐

</div>
