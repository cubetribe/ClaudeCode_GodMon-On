# CC_GodMode Installations-Prompt

> **Version:** 5.8.3
> **Typ:** Selbstinstallierendes System
> **One-Shot:** Kopiere diesen gesamten Prompt in Claude Code und es wird alles automatisch eingerichtet.

---

## Was ist neu in v5.8.2

### Neue Features

**Auto-Update System**
- Automatische Versionsprüfung gegen GitHub
- Update-Benachrichtigungen beim Session-Start
- Einfacher Ein-Befehl-Update-Prozess

**Erweiterte Hooks**
- UserPromptSubmit: Intelligente Aufgabentyp-Erkennung und Komplexitätsbewertung
- SessionStart: Umfassende MCP Health Checks und System-Diagnostik
- SubagentStop: Agenten-Output-Validierung und Qualitätsbewertung

**Domain-spezifische Konfiguration**
- Domain-Config-Schema für spezialisierte Projektsetups
- Domain-Pack-Loader für konsistente Konfigurationen
- ADR-Templates für Architektur-Entscheidungsdokumentation

**Verbesserte Scripts**
- Escalation Handler für komplexes Task-Routing
- Erweiterte Prompt-Analyse mit Workflow-Vorschlägen
- Parallel Quality Gates für schnellere Validierung

### System-Anforderungen

- Node.js 18+ (erforderlich)
- Claude Code CLI (neueste Version empfohlen)
- Git (für Installation)
- 100MB freier Speicherplatz
- Internetverbindung für MCP-Server-Installation

---

## Bevor du startest: Claude richtig starten!

**WICHTIG:** Starte Claude Code mit diesem Flag, damit die Installation automatisch läuft:

```bash
claude --dangerously-skip-permissions
```

**Warum?**
- Die Installation führt 30+ Befehle aus (mkdir, cp, git clone, etc.)
- Ohne dieses Flag musst du JEDEN einzelnen Befehl manuell bestätigen
- Mit dem Flag läuft alles automatisch

**Sicherheitshinweis:**
- Nutze diesen Modus nur für die Installation
- Danach kannst du Claude normal starten (ohne das Flag)
- Dieses Flag gibt Claude volle Berechtigungen - nur mit vertrauenswürdigen Prompts nutzen!

---

## Schnellinstallation (Copy & Paste)

Nachdem du Claude mit `--dangerously-skip-permissions` gestartet hast, kopiere alles unterhalb der Linie und füge es ein:

---

Du installierst jetzt **CC_GodMode** - ein selbstorchestrierendes Multi-Agenten-System für Claude Code.

## ERSTE AKTION: Begrüßung und Erklärung

Bevor du irgendetwas ausführst, gib dem Benutzer folgende Nachricht:

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   🚀 CC_GodMode Installation                                              ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║   Hallo! Ich werde jetzt dein System für CC_GodMode einrichten.          ║
║                                                                           ║
║   Was ich für dich tun werde:                                            ║
║                                                                           ║
║   1. 📦 CC_GodMode Repository von GitHub herunterladen                    ║
║   2. 🤖 7 spezialisierte KI-Agenten installieren                          ║
║   3. 🔧 10 Hook-Scripts einrichten (automatische Quality Checks & Analyse)║
║   4. 📋 Config-Dateien und Templates installieren                         ║
║   5. 🧠 Memory MCP Server installieren (für persistentes Wissen)          ║
║   6. ⚙️  4 automatische Hooks konfigurieren                               ║
║   7. 🚀 Auto-Update-System einrichten                                     ║
║   8. ✅ Alles verifizieren und aufräumen                                  ║
║                                                                           ║
║   ⏱️  Dies wird ca. 3-7 Minuten dauern.                                   ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║   ⚠️  WICHTIG: Während der Installation werde ich dich mehrfach um       ║
║   Berechtigung bitten, Befehle auszuführen und Dateien zu schreiben.     ║
║                                                                           ║
║   Bitte erlaube diese Aktionen, sonst kann ich nicht fortfahren!         ║
║                                                                           ║
║   Du kannst auch "Ja, nicht mehr nachfragen" wählen, um den Prozess zu   ║
║   beschleunigen.                                                          ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

Ich starte jetzt die Installation...
```

Warte kurz (2 Sekunden) und fahre dann mit den Installationsschritten fort.

---

## INSTALLATIONSSCHRITTE

### Schritt 0: Betriebssystem erkennen

Erkenne zuerst das Betriebssystem und setze Variablen entsprechend:

```bash
# OS erkennen
node -e "console.log(process.platform)"
```

**Ergebnis auswerten:**
- `darwin` → macOS
- `win32` → Windows
- `linux` → Linux

Merke dir das OS für die folgenden Schritte!

---

### Schritt 1: Voraussetzungen prüfen

Führe diese Prüfungen aus und melde alle Fehler:

```bash
# Node.js Version prüfen (benötigt 18+)
node --version

# Claude CLI prüfen
claude --version

# Git prüfen
git --version
```

**Falls eine Prüfung fehlschlägt:** Stoppe und liefere Installationsanweisungen für die fehlende Komponente.

---

### Schritt 2: Verzeichnisstruktur erstellen

**macOS / Linux:**
```bash
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/scripts
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\scripts"
```

---

### Schritt 3: Repository klonen

**macOS / Linux:**
```bash
cd /tmp
rm -rf CC_GodMode_install
git clone https://github.com/cubetribe/ClaudeCode_GodMode-On.git CC_GodMode_install
```

**Windows (PowerShell):**
```powershell
cd $env:TEMP
if (Test-Path "CC_GodMode_install") { Remove-Item -Recurse -Force "CC_GodMode_install" }
git clone https://github.com/cubetribe/ClaudeCode_GodMode-On.git CC_GodMode_install
```

**Falls Klonen fehlschlägt:** Das Repo könnte privat sein oder umbenannt. Melde den Fehler.

---

### Schritt 4: Agenten installieren (Global)

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode_install/agents/*.md ~/.claude/agents/
ls -la ~/.claude/agents/
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode_install\agents\*.md" "$env:USERPROFILE\.claude\agents\" -Force
Get-ChildItem "$env:USERPROFILE\.claude\agents\"
```

**Erwartete Agenten (7 Dateien):**
- `architect.md`
- `api-guardian.md`
- `builder.md`
- `validator.md`
- `tester.md`
- `scribe.md`
- `github-manager.md`

---

### Schritt 5: Scripts installieren (Global)

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode_install/scripts/*.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/*.js
ls -la ~/.claude/scripts/
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode_install\scripts\*.js" "$env:USERPROFILE\.claude\scripts\" -Force
Get-ChildItem "$env:USERPROFILE\.claude\scripts\"
```

**Hinweis:** Unter Windows ist `chmod` nicht notwendig.

**Erwartete Scripts:**
- `check-api-impact.js`
- `parallel-quality-gates.js`
- `mcp-health-check.js`
- `analyze-prompt.js`
- `escalation-handler.js`
- `domain-pack-loader.js`
- `validate-agent-output.js`
- `auto-update.js`
- `session-start.js`
- `test-phase2-integration.js`

---

### Schritt 6: Config-Dateien installieren

**macOS / Linux:**
```bash
mkdir -p ~/.claude/config
cp /tmp/CC_GodMode_install/config/domain-config.schema.json ~/.claude/config/
ls -la ~/.claude/config/
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\config"
Copy-Item "$env:TEMP\CC_GodMode_install\config\domain-config.schema.json" "$env:USERPROFILE\.claude\config\" -Force
Get-ChildItem "$env:USERPROFILE\.claude\config\"
```

---

### Schritt 7: Orchestrator-Template und Prompts installieren

Kopiere das Orchestrator-Template und die Prompt-Dateien für Projekte:

**macOS / Linux:**
```bash
mkdir -p ~/.claude/templates
mkdir -p ~/.claude/CC-GodMode-Prompts
cp /tmp/CC_GodMode_install/CLAUDE.md ~/.claude/templates/CLAUDE-ORCHESTRATOR.md
cp /tmp/CC_GodMode_install/templates/adr-template.md ~/.claude/templates/
cp /tmp/CC_GodMode_install/UPDATE-CHECK.md ~/.claude/templates/
cp /tmp/CC_GodMode_install/CC-GodMode-Prompts/*.md ~/.claude/CC-GodMode-Prompts/
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\templates"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\CC-GodMode-Prompts"
Copy-Item "$env:TEMP\CC_GodMode_install\CLAUDE.md" "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" -Force
Copy-Item "$env:TEMP\CC_GodMode_install\templates\adr-template.md" "$env:USERPROFILE\.claude\templates\" -Force
Copy-Item "$env:TEMP\CC_GodMode_install\UPDATE-CHECK.md" "$env:USERPROFILE\.claude\templates\" -Force
Copy-Item "$env:TEMP\CC_GodMode_install\CC-GodMode-Prompts\*.md" "$env:USERPROFILE\.claude\CC-GodMode-Prompts\" -Force
```

**Wichtig:** Diese Templates werden später in jedes Projekt kopiert!

**Erwartete Templates:**
- `CLAUDE-ORCHESTRATOR.md` - Haupt-Orchestrator-Konfiguration
- `adr-template.md` - Architecture Decision Records Template
- `UPDATE-CHECK.md` - Auto-Update-Benachrichtigungs-Template

**Erwartete Prompts (in CC-GodMode-Prompts/):**
- `CCGM_Prompt_Install.md` - Installations-Prompt
- `CCGM_Prompt_ProjectSetup.md` - Projekt-Setup-Guide
- `CCGM_Prompt_Restart.md` - Restart/Restore-Prompt
- `CCGM_Prompt_ManualInstall.md` - Manuelle Installationsanleitung

---

### Schritt 8: Auto-Update-System installieren

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode_install/scripts/auto-update.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/auto-update.js
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode_install\scripts\auto-update.js" "$env:USERPROFILE\.claude\scripts\" -Force
```

**Hinweis:** Das Auto-Update-System prüft auf neue Versionen auf GitHub und benachrichtigt dich.

---

### Schritt 9: Memory MCP Server installieren

Dieser Befehl ist auf allen Plattformen gleich:

```bash
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory
```

**Installation verifizieren:**
```bash
claude mcp list
```

**Erwartete Ausgabe sollte enthalten:** `memory`

---

### Schritt 10: Hooks konfigurieren

**macOS / Linux** - Erstelle/aktualisiere `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/scripts/check-api-impact.js \"$CLAUDE_FILE_PATH\""
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "node ~/.claude/scripts/analyze-prompt.js \"$CLAUDE_USER_PROMPT\""
      }
    ],
    "SessionStart": [
      {
        "type": "command",
        "command": "node ~/.claude/scripts/session-start.js"
      }
    ],
    "SubagentStop": [
      {
        "type": "command",
        "command": "node ~/.claude/scripts/validate-agent-output.js \"$CLAUDE_SUBAGENT_TYPE\" \"$CLAUDE_SUBAGENT_OUTPUT\""
      }
    ]
  }
}
```

**Windows** - Erstelle/aktualisiere `%USERPROFILE%\.claude\settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node \"%USERPROFILE%\\.claude\\scripts\\check-api-impact.js\" \"$CLAUDE_FILE_PATH\""
          }
        ]
      }
    ],
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "node \"%USERPROFILE%\\.claude\\scripts\\analyze-prompt.js\" \"$CLAUDE_USER_PROMPT\""
      }
    ],
    "SessionStart": [
      {
        "type": "command",
        "command": "node \"%USERPROFILE%\\.claude\\scripts\\session-start.js\""
      }
    ],
    "SubagentStop": [
      {
        "type": "command",
        "command": "node \"%USERPROFILE%\\.claude\\scripts\\validate-agent-output.js\" \"$CLAUDE_SUBAGENT_TYPE\" \"$CLAUDE_SUBAGENT_OUTPUT\""
      }
    ]
  }
}
```

**Hinweis:** Falls die Datei bereits existiert, füge die Hooks-Sektion vorsichtig zusammen.

**Hook-Erklärungen:**
- **PostToolUse (Write|Edit)**: Prüft auf API-Impact nach Dateiänderungen
- **UserPromptSubmit**: Analysiert Benutzer-Prompts auf Aufgabentyp, Komplexität und Workflow-Vorschläge
- **SessionStart**: MCP Health Checks und System-Diagnostik
- **SubagentStop**: Validiert Agenten-Output-Qualität und Vollständigkeit

---

### Schritt 11: Installation verifizieren

**macOS / Linux:**
```bash
echo "=== Version ==="
cat /tmp/CC_GodMode_install/VERSION

echo "=== Agenten ==="
ls ~/.claude/agents/

echo "=== Scripts ==="
ls ~/.claude/scripts/

echo "=== Config ==="
ls ~/.claude/config/

echo "=== Templates ==="
ls ~/.claude/templates/

echo "=== MCP Server ==="
claude mcp list

echo "=== Hooks ==="
cat ~/.claude/settings.json | grep -A 5 "hooks"
```

**Windows (PowerShell):**
```powershell
Write-Host "=== Version ==="
Get-Content "$env:TEMP\CC_GodMode_install\VERSION"

Write-Host "=== Agenten ==="
Get-ChildItem "$env:USERPROFILE\.claude\agents\"

Write-Host "=== Scripts ==="
Get-ChildItem "$env:USERPROFILE\.claude\scripts\"

Write-Host "=== Config ==="
Get-ChildItem "$env:USERPROFILE\.claude\config\"

Write-Host "=== Templates ==="
Get-ChildItem "$env:USERPROFILE\.claude\templates\"

Write-Host "=== MCP Server ==="
claude mcp list

Write-Host "=== Hooks ==="
Get-Content "$env:USERPROFILE\.claude\settings.json" | Select-String -Pattern "hooks" -Context 0,5
```

---

### Schritt 12: Aufräumen

**macOS / Linux:**
```bash
rm -rf /tmp/CC_GodMode_install
```

**Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force "$env:TEMP\CC_GodMode_install"
```

---

### Schritt 13: Orchestrator-Modus testen

Nach der Installation teste mit:

```
Du bist der Orchestrator. Liste deine verfügbaren Agenten auf.
```

Das System sollte alle 7 Agenten erkennen.

---

## INSTALLATIONSBERICHT

Nach Abschluss aller Schritte gib dem Benutzer diese Zusammenfassung:

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║   ✅ CC_GodMode Installation erfolgreich!                                 ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║   📊 INSTALLATIONSBERICHT                                                 ║
║                                                                           ║
║   Version:      5.8.3                                                     ║
║   Agenten:      [X]/7 installiert                                         ║
║   Scripts:      [X]/10 installiert                                        ║
║   Config:       [X]/1 installiert                                         ║
║   Templates:    [X]/4 installiert                                         ║
║   MCP Server:   memory [✅ OK / ❌ FEHLER]                                 ║
║   Hooks:        [✅ 4 Konfiguriert / ⏭️ Übersprungen]                     ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║   🎯 WIE EIN PROJEKT AKTIVIERT WIRD                                       ║
║                                                                           ║
║   Für JEDES Projekt, in dem du CC_GodMode nutzen möchtest:               ║
║                                                                           ║
║   macOS/Linux:                                                            ║
║   ┌─────────────────────────────────────────────────────────────────────┐ ║
║   │  cd dein-projekt                                                    │ ║
║   │  cp ~/.claude/templates/CLAUDE-ORCHESTRATOR.md ./CLAUDE.md          │ ║
║   └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
║   Windows (PowerShell):                                                   ║
║   ┌─────────────────────────────────────────────────────────────────────┐ ║
║   │  cd dein-projekt                                                    │ ║
║   │  Copy-Item "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" ".\CLAUDE.md" ║
║   └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
║   Die CLAUDE.md wird automatisch von Claude Code geladen!                ║
║                                                                           ║
║   Dann starte Claude in diesem Projekt:                                  ║
║   ┌─────────────────────────────────────────────────────────────────────┐ ║
║   │  claude                                                             │ ║
║   │  > "New Feature: Benutzer-Authentifizierung mit JWT"                │ ║
║   └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
║   📂 Report-Struktur (Versionsbasiert)                                   ║
║   ┌─────────────────────────────────────────────────────────────────────┐ ║
║   │  reports/                                                           │ ║
║   │  └── vX.X.X/                   ← Versionsbasierte Ordner           │ ║
║   │      ├── 00-architect-report.md                                    │ ║
║   │      ├── 01-api-guardian-report.md                                 │ ║
║   │      ├── 02-builder-report.md                                      │ ║
║   │      ├── 03-validator-report.md                                    │ ║
║   │      ├── 04-tester-report.md                                       │ ║
║   │      └── 05-scribe-report.md                                       │ ║
║   └─────────────────────────────────────────────────────────────────────┘ ║
║                                                                           ║
╠═══════════════════════════════════════════════════════════════════════════╣
║                                                                           ║
║   📚 DOKUMENTATION                                                        ║
║                                                                           ║
║   Die vollständige Dokumentation findest du auf GitHub:                  ║
║   https://github.com/cubetribe/ClaudeCode_GodMode-On                      ║
║                                                                           ║
║   Für Fragen: https://github.com/cubetribe/ClaudeCode_GodMode-On/issues  ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝

Viel Erfolg mit CC_GodMode! 🚀
```

---

## Fehlerbehebung

### MCP Server Installation fehlgeschlagen

Falls `claude mcp add` fehlschlägt:

```bash
# Manuelle Installation (alle Plattformen)
npm install -g @modelcontextprotocol/server-memory

# Dann manuell zu Claude hinzufügen durch Bearbeiten der mcp.json Datei
# macOS/Linux: ~/.claude/mcp.json
# Windows: %USERPROFILE%\.claude\mcp.json
```

### Berechtigung verweigert (nur macOS/Linux)

Falls Scripts nicht ausgeführt werden können:

```bash
chmod +x ~/.claude/scripts/*.js
```

### Agenten nicht gefunden

**macOS / Linux:**
```bash
ls ~/.claude/agents/
ls -la ~/.claude/agents/*.md
```

**Windows (PowerShell):**
```powershell
Get-ChildItem "$env:USERPROFILE\.claude\agents\"
```

### Repository nicht gefunden

Das Repository könnte umgezogen sein. Prüfe:
- https://github.com/cubetribe/ClaudeCode_GodMode-On

### Windows: PowerShell Execution Policy

Falls PowerShell-Scripts blockiert werden:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Was wird installiert

| Komponente | macOS/Linux | Windows | Anzahl |
|-----------|-------------|---------|--------|
| Agenten-Dateien | `~/.claude/agents/` | `%USERPROFILE%\.claude\agents\` | 7 |
| Hook-Scripts | `~/.claude/scripts/` | `%USERPROFILE%\.claude\scripts\` | 10 |
| Config-Dateien | `~/.claude/config/` | `%USERPROFILE%\.claude\config\` | 1 |
| Templates | `~/.claude/templates/` | `%USERPROFILE%\.claude\templates\` | 4 |
| Memory MCP | Claude MCP Registry | Claude MCP Registry | 1 |
| Settings | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` | 1 |

**Details:**

**Agenten (7):**
- architect.md
- api-guardian.md
- builder.md
- validator.md
- tester.md
- scribe.md
- github-manager.md

**Scripts (10):**
- check-api-impact.js
- parallel-quality-gates.js
- mcp-health-check.js
- analyze-prompt.js
- escalation-handler.js
- domain-pack-loader.js
- validate-agent-output.js
- auto-update.js
- session-start.js
- test-phase2-integration.js

**Config (1):**
- domain-config.schema.json

**Templates (3):**
- CLAUDE-ORCHESTRATOR.md
- adr-template.md
- UPDATE-CHECK.md

**Hooks (4):**
- PostToolUse (Write|Edit) - API Impact Check
- UserPromptSubmit - Prompt-Analyse
- SessionStart - MCP Health & Diagnostik
- SubagentStop - Agenten-Output-Validierung

---

## Deinstallation

**macOS / Linux:**
```bash
# Agenten entfernen
rm ~/.claude/agents/{architect,api-guardian,builder,validator,tester,scribe,github-manager}.md

# Scripts entfernen
rm ~/.claude/scripts/check-api-impact.js
rm ~/.claude/scripts/parallel-quality-gates.js
rm ~/.claude/scripts/mcp-health-check.js
rm ~/.claude/scripts/analyze-prompt.js
rm ~/.claude/scripts/escalation-handler.js
rm ~/.claude/scripts/domain-pack-loader.js
rm ~/.claude/scripts/validate-agent-output.js
rm ~/.claude/scripts/auto-update.js
rm ~/.claude/scripts/session-start.js
rm ~/.claude/scripts/test-phase2-integration.js

# Config entfernen
rm ~/.claude/config/domain-config.schema.json

# Templates entfernen
rm ~/.claude/templates/CLAUDE-ORCHESTRATOR.md
rm ~/.claude/templates/adr-template.md
rm ~/.claude/templates/UPDATE-CHECK.md

# Prompts entfernen
rm -rf ~/.claude/CC-GodMode-Prompts

# MCP Server entfernen
claude mcp remove memory

# Hinweis: Bearbeite ~/.claude/settings.json manuell, um Hooks zu entfernen
```

**Windows (PowerShell):**
```powershell
# Agenten entfernen
Remove-Item "$env:USERPROFILE\.claude\agents\architect.md"
Remove-Item "$env:USERPROFILE\.claude\agents\api-guardian.md"
Remove-Item "$env:USERPROFILE\.claude\agents\builder.md"
Remove-Item "$env:USERPROFILE\.claude\agents\validator.md"
Remove-Item "$env:USERPROFILE\.claude\agents\tester.md"
Remove-Item "$env:USERPROFILE\.claude\agents\scribe.md"
Remove-Item "$env:USERPROFILE\.claude\agents\github-manager.md"

# Scripts entfernen
Remove-Item "$env:USERPROFILE\.claude\scripts\check-api-impact.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\parallel-quality-gates.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\mcp-health-check.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\analyze-prompt.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\escalation-handler.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\domain-pack-loader.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\validate-agent-output.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\auto-update.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\session-start.js"
Remove-Item "$env:USERPROFILE\.claude\scripts\test-phase2-integration.js"

# Config entfernen
Remove-Item "$env:USERPROFILE\.claude\config\domain-config.schema.json"

# Templates entfernen
Remove-Item "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md"
Remove-Item "$env:USERPROFILE\.claude\templates\adr-template.md"
Remove-Item "$env:USERPROFILE\.claude\templates\UPDATE-CHECK.md"

# Prompts entfernen
Remove-Item -Recurse -Force "$env:USERPROFILE\.claude\CC-GodMode-Prompts"

# MCP Server entfernen
claude mcp remove memory

# Hinweis: Bearbeite %USERPROFILE%\.claude\settings.json manuell, um Hooks zu entfernen
```

---

## Lizenz

Copyright (c) 2025 Dennis Westermann
www.dennis-westermann.de

Privatnutzung erlaubt. Kommerzielle Nutzung erfordert Genehmigung.
