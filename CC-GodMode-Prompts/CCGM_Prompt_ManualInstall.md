# Manuelle Installationsanleitung

> **Version:** 5.8.3
> Manuelle Schritt-für-Schritt-Installation von CC_GodMode

**Hinweis:** Für automatische Installation siehe [`CCGM_Prompt_Install.md`](./CCGM_Prompt_Install.md)

---

## Voraussetzungen

| Komponente | Version | Prüfen mit |
|------------|---------|------------|
| Node.js | 18+ | `node --version` |
| Claude Code CLI | Neueste | `claude --version` |
| Git | Beliebig | `git --version` |

---

## Installationsschritte

### Schritt 1: Verzeichnisse erstellen

**macOS / Linux:**
```bash
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/scripts
mkdir -p ~/.claude/templates
```

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\agents"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\scripts"
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\templates"
```

---

### Schritt 2: Repository klonen

**macOS / Linux:**
```bash
cd /tmp
git clone https://github.com/cubetribe/ClaudeCode_GodMode-On.git CC_GodMode
```

**Windows (PowerShell):**
```powershell
cd $env:TEMP
git clone https://github.com/cubetribe/ClaudeCode_GodMode-On.git CC_GodMode
```

---

### Schritt 3: Agenten installieren (7 Dateien)

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode/agents/*.md ~/.claude/agents/
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode\agents\*.md" "$env:USERPROFILE\.claude\agents\" -Force
```

**Erwartete Dateien:**
- `architect.md`
- `api-guardian.md`
- `builder.md`
- `validator.md`
- `tester.md`
- `scribe.md`
- `github-manager.md`

---

### Schritt 4: Scripts installieren

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode/scripts/*.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/*.js
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode\scripts\*.js" "$env:USERPROFILE\.claude\scripts\" -Force
```

---

### Schritt 5: Templates installieren

**macOS / Linux:**
```bash
cp /tmp/CC_GodMode/CCGM_Prompt_ProjectSetup.md ~/.claude/templates/
cp /tmp/CC_GodMode/CLAUDE.md ~/.claude/templates/CLAUDE-ORCHESTRATOR.md
```

**Windows (PowerShell):**
```powershell
Copy-Item "$env:TEMP\CC_GodMode\CCGM_Prompt_ProjectSetup.md" "$env:USERPROFILE\.claude\templates\" -Force
Copy-Item "$env:TEMP\CC_GodMode\CLAUDE.md" "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" -Force
```

---

### Schritt 6: Memory MCP Server installieren

```bash
claude mcp add memory -- npx -y @modelcontextprotocol/server-memory
```

**Verifizieren:**
```bash
claude mcp list
```

---

### Schritt 7: Zusätzliche MCP Server (empfohlen)

```bash
# Playwright (für @tester - Browser-Automatisierung)
claude mcp add playwright -- npx @playwright/mcp@latest

# Lighthouse (für @tester - Performance)
claude mcp add lighthouse -- npx lighthouse-mcp

# A11y (für @tester - Barrierefreiheit)
claude mcp add a11y -- npx a11y-mcp
```

**GitHub MCP (benötigt Token):**
```bash
export GITHUB_TOKEN="dein_token"
claude mcp add github \
  -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_TOKEN \
  -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN \
  ghcr.io/github/github-mcp-server
```

---

### Schritt 8: Hooks konfigurieren

Erstelle/bearbeite `~/.claude/settings.json` (macOS/Linux) oder `%USERPROFILE%\.claude\settings.json` (Windows):

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
    ]
  }
}
```

**Windows-Pfad in settings.json:**
```json
"command": "node \"%USERPROFILE%\\.claude\\scripts\\check-api-impact.js\" \"$CLAUDE_FILE_PATH\""
```

---

### Schritt 9: Aufräumen

**macOS / Linux:**
```bash
rm -rf /tmp/CC_GodMode
```

**Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force "$env:TEMP\CC_GodMode"
```

---

## Verifizierung

```bash
echo "=== Agenten ==="
ls ~/.claude/agents/

echo "=== Scripts ==="
ls ~/.claude/scripts/

echo "=== Templates ==="
ls ~/.claude/templates/

echo "=== MCP Server ==="
claude mcp list
```

**Erwartetes Ergebnis:**
- 7 Agenten-Dateien
- mindestens 1 Script (`check-api-impact.js`)
- 2 Templates (`CLAUDE-ORCHESTRATOR.md`, `CCGM_Prompt_ProjectSetup.md`)
- MCP: `memory`, optional: `playwright`, `github`, `lighthouse`, `a11y`

---

## Projekt aktivieren

Für jedes Projekt, in dem du CC_GodMode nutzen möchtest:

**macOS / Linux:**
```bash
cd dein-projekt
cp ~/.claude/templates/CLAUDE-ORCHESTRATOR.md ./CLAUDE.md
```

**Windows (PowerShell):**
```powershell
cd dein-projekt
Copy-Item "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" ".\CLAUDE.md"
```

Dann starte Claude:
```bash
claude
```

Die CLAUDE.md wird automatisch geladen und der Orchestrator ist aktiv!

---

## Was wird wohin installiert?

| Komponente | macOS/Linux | Windows |
|------------|-------------|---------|
| Agenten (7) | `~/.claude/agents/` | `%USERPROFILE%\.claude\agents\` |
| Scripts | `~/.claude/scripts/` | `%USERPROFILE%\.claude\scripts\` |
| Templates | `~/.claude/templates/` | `%USERPROFILE%\.claude\templates\` |
| Hooks | `~/.claude/settings.json` | `%USERPROFILE%\.claude\settings.json` |
| MCP Server | `~/.claude/mcp.json` | `%USERPROFILE%\.claude\mcp.json` |

---

## Deinstallation

**macOS / Linux:**
```bash
# Agenten entfernen
rm ~/.claude/agents/{architect,api-guardian,builder,validator,tester,scribe,github-manager}.md

# Scripts entfernen
rm ~/.claude/scripts/check-*.js

# Templates entfernen
rm -rf ~/.claude/templates/

# MCP Server entfernen
claude mcp remove memory
claude mcp remove playwright
claude mcp remove github
claude mcp remove lighthouse
claude mcp remove a11y

# Hooks: Manuell aus ~/.claude/settings.json entfernen
```

**Windows (PowerShell):**
```powershell
# Agenten entfernen
Remove-Item "$env:USERPROFILE\.claude\agents\*.md"

# Scripts entfernen
Remove-Item "$env:USERPROFILE\.claude\scripts\*.js"

# Templates entfernen
Remove-Item -Recurse "$env:USERPROFILE\.claude\templates\"

# MCP Server entfernen
claude mcp remove memory
claude mcp remove playwright
claude mcp remove github
claude mcp remove lighthouse
claude mcp remove a11y

# Hooks: Manuell aus settings.json entfernen
```

---

## Fehlerbehebung

### Agenten werden nicht erkannt
```bash
ls ~/.claude/agents/  # Sind die Dateien vorhanden?
```

### Hook läuft nicht
```bash
cat ~/.claude/settings.json | grep -A 10 "hooks"  # Ist die Konfiguration korrekt?
```

### MCP Server Fehler
```bash
claude mcp list  # Welche sind installiert?
claude mcp logs memory  # Fehler-Logs anzeigen
```

### Berechtigung verweigert (macOS/Linux)
```bash
chmod +x ~/.claude/scripts/*.js
```

---

## Version

CC_GodMode **v5.0**

Siehe [CHANGELOG.md](./CHANGELOG.md) für Details.

---

*Für automatische Installation: [`CCGM_Prompt_Install.md`](./CCGM_Prompt_Install.md)*
