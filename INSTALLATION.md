# Installation Guide 🛠️

> *Wähle dein Abenteuer*

---

## 🚀 Option A: YOLO Mode (Empfohlen für Mutige)

**Voraussetzungen:**
- Claude Code CLI installiert
- Nerven aus Stahl
- Grundvertrauen in KI

### Schritt 1: Repo klonen

```bash
git clone https://github.com/DEIN-USERNAME/CC_GodMode.git
cd CC_GodMode
```

### Schritt 2: Claude im God Mode starten

```bash
claude --dangerously-skip-permissions
```

### Schritt 3: Den magischen Prompt eingeben

```
Führe die komplette CC_GodMode Installation durch.
Du hast vollen Zugriff auf mein System.

Installiere:
1. Alle Agenten (architect, builder, validator, scribe) nach ~/.claude/agents/
2. Das Hook-Script nach ~/.claude/scripts/
3. Erweitere ~/.claude/settings.json mit den Hooks
4. Erstelle die Templates

Lies diese Datei und führe alle Schritte automatisch aus.
Bestätige am Ende was du gemacht hast.
YOLO.
```

### Schritt 4: Zurücklehnen

Claude macht den Rest. Du bekommst am Ende eine Zusammenfassung.

---

## 🛡️ Option B: Safe Mode (Für die Vorsichtigen)

**Voraussetzungen:**
- Claude Code CLI installiert
- Geduld
- Lesefähigkeit

### Schritt 1: Repo klonen

```bash
git clone https://github.com/DEIN-USERNAME/CC_GodMode.git
cd CC_GodMode
```

### Schritt 2: Claude normal starten

```bash
claude
```

### Schritt 3: Den vorsichtigen Prompt eingeben

```
Ich möchte CC_GodMode Schritt für Schritt installieren.
Lies INSTALLATION.md und führe mich durch jeden Schritt.
Frage vor JEDER Dateiänderung um Erlaubnis.
Erkläre was du tust.
```

### Schritt 4: Jeden Schritt bestätigen

Claude zeigt dir jeden Befehl und fragt nach Erlaubnis.

---

## 📝 Option C: Manuelle Installation (Für die Kontrollfreaks)

### Verzeichnisse erstellen

```bash
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/scripts
```

### Agenten kopieren

```bash
cp agents/architect.md ~/.claude/agents/
cp agents/builder.md ~/.claude/agents/
cp agents/validator.md ~/.claude/agents/
cp agents/scribe.md ~/.claude/agents/
```

### Hook-Script installieren

```bash
cp scripts/check-api-impact.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/check-api-impact.js
```

### Settings.json erweitern

Füge zu `~/.claude/settings.json` hinzu:

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

### CLAUDE.md erweitern (optional)

Kopiere relevante Abschnitte aus `config/CLAUDE-system.md` in deine `~/.claude/CLAUDE.md`.

---

## 📁 Was wird wohin installiert?

| Datei | Zielort | Zweck |
|-------|---------|-------|
| `agents/architect.md` | `~/.claude/agents/` | Architektur-Agent |
| `agents/builder.md` | `~/.claude/agents/` | Implementierungs-Agent |
| `agents/validator.md` | `~/.claude/agents/` | Validierungs-Agent |
| `agents/scribe.md` | `~/.claude/agents/` | Dokumentations-Agent |
| `scripts/check-api-impact.js` | `~/.claude/scripts/` | Auto-Hook für API-Änderungen |
| Hook-Config | `~/.claude/settings.json` | Aktiviert den Hook |

---

## 🧪 Installation verifizieren

Nach der Installation:

```bash
# Agenten prüfen
ls -la ~/.claude/agents/

# Sollte zeigen:
# architect.md
# builder.md
# validator.md
# scribe.md

# Hook prüfen
ls -la ~/.claude/scripts/

# Sollte zeigen:
# check-api-impact.js

# Settings prüfen
cat ~/.claude/settings.json

# Sollte hooks.PostToolUse enthalten
```

---

## 🆘 Troubleshooting

### "Die Agenten werden nicht erkannt"

Prüfe ob die Dateien im richtigen Verzeichnis sind:
```bash
ls ~/.claude/agents/
```

### "Der Hook läuft nicht"

Prüfe `~/.claude/settings.json`:
```bash
cat ~/.claude/settings.json | grep -A 10 "hooks"
```

### "Permission denied beim Hook-Script"

```bash
chmod +x ~/.claude/scripts/check-api-impact.js
```

### "Node nicht gefunden"

Der Hook braucht Node.js. Installiere es:
```bash
# macOS
brew install node

# oder
nvm install --lts
```

---

## 🎯 Nach der Installation

### Teste die Agenten

Starte Claude Code in einem Projekt und probiere:

```
@architect Analysiere die Struktur dieses Projekts
```

### Teste den Hook

Editiere eine Datei in `src/api/` oder `shared/types/`:

```
Erstelle eine Datei src/api/test.ts mit dem Inhalt "export {}"
```

Du solltest eine Warnung sehen.

### Orchestrator-Modus starten

```
Du bist der Orchestrator. Delegiere an: @architect @builder @validator @scribe
```

---

## 🔄 Updates

Um CC_GodMode zu aktualisieren:

```bash
cd CC_GodMode
git pull

# Dann Installation wiederholen (YOLO oder Safe Mode)
```

---

## 🗑️ Deinstallation

Falls du genug hast:

```bash
# Agenten entfernen
rm ~/.claude/agents/architect.md
rm ~/.claude/agents/builder.md
rm ~/.claude/agents/validator.md
rm ~/.claude/agents/scribe.md

# Hook entfernen
rm ~/.claude/scripts/check-api-impact.js

# Hook-Config aus settings.json manuell entfernen
```

---

## 🎉 Fertig!

Du bist jetzt im **God Mode**.

Nächster Schritt: Lies [ORCHESTRATOR-PROMPT.md](./ORCHESTRATOR-PROMPT.md) für die Prompts die du brauchst.

---

<div align="center">

*"Mit großer Macht kommt großer Spaß am Delegieren."*

</div>
