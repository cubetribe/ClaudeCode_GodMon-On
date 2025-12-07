# CC_GodMode 🚀⚡

> **Years of trial, error, and mass prompt engineering - distilled into one glorious package.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Subagents](https://img.shields.io/badge/Subagents-4%20Specialists-green)](./agents/)
[![YOLO Mode](https://img.shields.io/badge/YOLO%20Mode-Available-red)](./INSTALLATION.md)

---

## Was ist das hier? 🤔

Du kennst das: Du sitzt vor deinem AI-Coding-Assistant, tippst wild drauf los, und nach 3 Stunden merkst du, dass du vergessen hast die API-Consumer zu updaten. Dein TypeScript schreit. Deine Tests weinen. Dein Tech Lead schaut dich komisch an.

**CC_GodMode** ist das Ergebnis von Jahren des Leidens, Experimentierens und "ach scheiße, das hab ich vergessen"-Momenten. Es ist ein **Subagent-Orchestrierungs-System** für AI-gestütztes Coding, das dich vor dir selbst beschützt.

### Die Philosophie

```
                    👑 DU (der Orchestrator)
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   @architect       @builder        @validator
   "Denk nach"      "Bau das"       "Check das"
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                    @scribe
                 "Schreib's auf"
```

**Du schreibst weniger Code.** Du delegierst wie ein Boss.

---

## Features 🎯

### 🤖 4 Spezialisierte Subagenten

| Agent | Superkraft | Wann aufrufen? |
|-------|------------|----------------|
| `@architect` | Denkt nach bevor Code geschrieben wird | Vor jedem Feature |
| `@builder` | Implementiert nach Spec | Wenn's ans Coden geht |
| `@validator` | Findet alle Stellen die du vergessen hast | **IMMER** nach API-Änderungen |
| `@scribe` | Dokumentiert damit du's nicht vergisst | Nach jedem Feature |

### 🪝 Automatische Hooks

Der `check-api-impact.js` Hook läuft **automatisch** bei jedem Write/Edit und schreit dich an wenn du API-Dateien änderst:

```
⚠️  API/TYPE-DATEI GEÄNDERT!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📁 Datei: src/api/userService.ts
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 Potenzielle Consumer gefunden:

src/hooks/useUsers.ts:15: import { UserService }
src/components/UserList.tsx:23: const users = await UserService.getAll()
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔴 AKTION ERFORDERLICH:
   1. Prüfe und aktualisiere alle Consumer!
   2. Führe aus: npm run typecheck
   3. Rufe @validator auf für Cross-File-Check
```

### 📋 API Consumer Registry

Eine zentrale Datei die ALLE Consumer deiner APIs trackt. Nie wieder "wo wird das eigentlich benutzt?".

### 🎭 Orchestrator-Modus

Du wirst zum Dirigenten. Claude wird zum Orchester. Du sagst "Feature X", Claude's Subagenten machen den Rest.

---

## Installation 🛠️

### Option A: YOLO Mode 🚀💀

> *"Ich vertraue Claude mit meinem ganzen System. Was soll schon schiefgehen?"*

```bash
# 1. Repo klonen
git clone https://github.com/DEIN-USERNAME/CC_GodMode.git
cd CC_GodMode

# 2. Claude Code im YOLO Mode starten
claude --dangerously-skip-permissions

# 3. Diesen Prompt eingeben:
```

```
Führe die Installation aus INSTALLATION.md durch.
Du hast vollen Zugriff. Installiere alles global in ~/.claude/
Ich vertraue dir. YOLO.
```

**Was passiert:**
- Claude liest INSTALLATION.md
- Kopiert alle Agenten nach `~/.claude/agents/`
- Richtet Hooks ein in `~/.claude/settings.json`
- Erstellt Templates
- Du lehnst dich zurück und genießt

**Warnung:** Claude hat vollen Zugriff auf dein System. Nur für Leute die wissen was sie tun. Oder für Leute die gerne leben.

---

### Option B: Safe Mode 🛡️

> *"Ich möchte jeden Schritt einzeln bestätigen wie ein normaler Mensch."*

```bash
# 1. Repo klonen
git clone https://github.com/DEIN-USERNAME/CC_GodMode.git
cd CC_GodMode

# 2. Claude Code normal starten
claude

# 3. Diesen Prompt eingeben:
```

```
Ich möchte CC_GodMode installieren.
Zeige mir jeden Schritt und frage vor jeder Dateiänderung um Erlaubnis.
Lies INSTALLATION.md und führe mich durch.
```

**Was passiert:**
- Claude erklärt jeden Schritt
- Du bestätigst jede Datei einzeln
- Du behältst die volle Kontrolle
- Dauert länger, aber du weißt was passiert

---

### Option C: Manuell 📝

> *"Ich vertraue niemandem, nicht mal mir selbst."*

Siehe [INSTALLATION.md](./INSTALLATION.md) für die manuelle Schritt-für-Schritt Anleitung.

---

## Quick Start 🏃‍♂️

Nach der Installation:

### 1. Neues Projekt starten

```bash
cd dein-projekt
claude
```

### 2. Orchestrator-Prompt eingeben

```
Du bist der Orchestrator. Delegiere an: @architect @builder @validator @scribe
Kein eigener Code. API-Änderungen → Validator Pflicht. Reports in Agents/. Los.
```

### 3. Feature bauen

```
User: Ich brauche eine User-Authentifizierung

Claude: *ruft @architect auf*
        → Gibt Design-Spec zurück

        *ruft @builder auf*
        → Implementiert Code

        *ruft @validator auf*
        → Prüft Cross-File-Konsistenz

        *ruft @scribe auf*
        → Aktualisiert Docs

User: *trinkt Kaffee*
```

---

## Workflows 🔄

### Neues Feature
```
@architect → @builder → @validator → @scribe
```

### Bug Fix
```
@builder → @validator
```

### API-Änderung (KRITISCH!)
```
@architect → @builder → @validator (PFLICHT!) → @scribe
```

### Refactoring
```
@architect → @builder → @validator
```

---

## Projektstruktur 📁

```
CC_GodMode/
├── README.md                 # Du bist hier 👋
├── INSTALLATION.md           # Setup-Anleitung
├── ORCHESTRATOR-PROMPT.md    # Copy-Paste Prompts
│
├── agents/                   # Die Subagenten
│   ├── architect.md          # Der Denker
│   ├── builder.md            # Der Macher
│   ├── validator.md          # Der Checker
│   └── scribe.md             # Der Schreiber
│
├── templates/                # Projekt-Templates
│   ├── API_CONSUMERS.md      # API-Registry Vorlage
│   ├── settings.local.json   # Projekt-Settings Vorlage
│   └── check-api-impact.js   # Hook-Script Vorlage
│
├── scripts/
│   └── check-api-impact.js   # Automatischer Consumer-Finder
│
└── config/
    ├── CLAUDE-system.md      # Globale Config
    ├── CLAUDE-projekt.md     # Projekt Config
    └── claude-settings.json  # Hook-Konfiguration
```

---

## Warum? 🤷‍♂️

### Das Problem

Claude Code ist mächtig. Aber mit großer Macht kommt große Verantwortung - und große Möglichkeiten, Mist zu bauen:

- ❌ API geändert aber Consumer vergessen
- ❌ TypeScript Types nicht synchron
- ❌ Dokumentation veraltet
- ❌ "Das hat doch gestern noch funktioniert"
- ❌ *weint in Production*

### Die Lösung

**Spezialisierung + Automatisierung + Paranoia**

- ✅ Jeder Agent hat EINE Aufgabe
- ✅ Hooks warnen automatisch bei Gefahren
- ✅ Cross-File-Checks sind PFLICHT
- ✅ Dokumentation wird automatisch aktualisiert
- ✅ *lacht in CI/CD*

---

## FAQ ❓

### Q: Brauche ich das wirklich?

**A:** Hast du schon mal vergessen, einen API-Consumer zu updaten? Dann ja.

### Q: Ist das sicher?

**A:** Der YOLO Mode gibt Claude vollen Zugriff. Der Safe Mode nicht. Wähle weise.

### Q: Funktioniert das mit meinem Projekt?

**A:** Wenn dein Projekt TypeScript/JavaScript nutzt und eine halbwegs normale Struktur hat, ja. Die Pfade im Hook-Script sind anpassbar.

### Q: Was wenn ich einen Agenten nicht brauche?

**A:** Dann ruf ihn nicht auf. Die sind optional (außer @validator nach API-Änderungen - der ist Pflicht. Seriously.)

### Q: Kann ich eigene Agenten hinzufügen?

**A:** Klar! Erstelle eine `.md` Datei in `~/.claude/agents/` mit dem gleichen Format.

---

## Beitragen 🤝

Found a bug? Feature-Idee?

1. Fork it
2. Branch it (`git checkout -b feature/amazing-feature`)
3. Commit it (`git commit -m 'feat: Add amazing feature'`)
4. Push it (`git push origin feature/amazing-feature`)
5. PR it

Oder öffne einfach ein Issue. Ich beiße nicht.

---

## Credits 🙏

- **Dennis Westermann** ([www.dennis-westermann.de](https://www.dennis-westermann.de)) - Für Jahre des Leidens und Lernens
- **Kaffee** - Für die Motivation
- **Stackoverflow** - Für... naja, du weißt schon
- **Die 3 AM Debugging Sessions** - Für die Erkenntnisse die zu diesem Projekt führten

---

## Lizenz 📄

MIT - Mach damit was du willst. Aber wenn's explodiert, war ich's nicht.

---

<div align="center">

**Made with 🧠 and mass sleep deprivation**

*"It's not a bug, it's a feature we haven't documented yet."*

⭐ Star this repo if it saved your sanity ⭐

</div>
