# Agenten-Architektur - Lokal vs Global

> **Das Zwei-Standort-Modell in CC_GodMode verstehen**

---

## Übersicht

CC_GodMode verwendet ein **Zwei-Standort-Agenten-Modell**, bei dem Agenten-Dateien an zwei Orten existieren:
1. **Quell-Standort** (`/agents/` im GitHub-Repo) - Versionskontrollierte Single Source of Truth
2. **Laufzeit-Standort** (`~/.claude/agents/` auf deinem Rechner) - Aktive Agenten-Definitionen

Dieses Dokument erklärt, warum diese Architektur existiert, wie man damit arbeitet und wie man häufige Probleme behebt.

---

## Architektur-Diagramm

```
┌─────────────────────────────────────────────────────────────────────┐
│                         GITHUB REPOSITORY                            │
│                     github.com/user/CC_GodMode                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  /agents/                                                            │
│  ├── architect.md          ← SOURCE OF TRUTH                        │
│  ├── api-guardian.md       ← Versionskontrolliert                   │
│  ├── builder.md            ← Projektübergreifend geteilt            │
│  ├── validator.md          ← Aktualisiert via git                   │
│  ├── tester.md                                                       │
│  ├── scribe.md                                                       │
│  └── github-manager.md                                               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ git clone / git pull
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        DEIN LOKALER RECHNER                          │
│              ~/Desktop/.../CC_GodMode/agents/                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ✓ Du hast lokale Kopien                                            │
│  ✓ Kannst zum Testen bearbeiten                                     │
│  ✓ Kannst mit Laufzeit-Versionen vergleichen                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                                  │ Installation
                                  │ cp agents/*.md ~/.claude/agents/
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE RUNTIME                               │
│                    ~/.claude/agents/                                 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  /Users/yourname/.claude/agents/                                     │
│  ├── architect.md          ← AKTIVE LAUFZEIT                        │
│  ├── api-guardian.md       ← Claude Code liest hiervon              │
│  ├── builder.md            ← Global für ALLE Projekte               │
│  ├── validator.md          ← Task tool verwendet diese              │
│  ├── tester.md                                                       │
│  ├── scribe.md                                                       │
│  └── github-manager.md                                               │
│                                                                      │
│  Wenn du aufrufst: @architect                                        │
│  Claude Code führt aus: ~/.claude/agents/architect.md               │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Warum zwei Standorte?

### Quell-Standort (`/agents/` im Repo)

**Zweck:** Versionskontrolle und Distribution
**Vorteile:**
- Agenten-Evolution im Laufe der Zeit via Git-Historie verfolgen
- Agenten-Verbesserungen projektübergreifend teilen
- Agenten-Fähigkeiten für die Community dokumentieren
- Kollaborative Agenten-Entwicklung ermöglichen

**Du interagierst mit diesen wenn:**
- Du neue Agenten-Features entwickelst
- Du Agenten-Änderungen in PRs reviewst
- Du lernst, wie Agenten funktionieren
- Du Agenten-Verbesserungen beisteuerts

### Laufzeit-Standort (`~/.claude/agents/`)

**Zweck:** Aktive Ausführung durch Claude Code
**Vorteile:**
- Globale Verfügbarkeit über ALLE Projekte hinweg
- Keine Notwendigkeit, Agenten pro Projekt zu duplizieren
- Single Source für das Claude Code Task tool
- Konsistentes Agenten-Verhalten überall

**Claude Code interagiert mit diesen wenn:**
- Du `@architect` in JEDEM Projekt aufrufst
- Das Task tool einen Subagenten spawnen muss
- Agenten-Delegation automatisch geschieht

---

## Installationsverfahren

### Ersteinrichtung

```bash
# 1. CC_GodMode Repository klonen
git clone https://github.com/user/CC_GodMode.git
cd CC_GodMode

# 2. Globales Agenten-Verzeichnis erstellen
mkdir -p ~/.claude/agents

# 3. Agenten in globalen Standort kopieren
cp agents/*.md ~/.claude/agents/

# 4. Installation verifizieren
ls -la ~/.claude/agents/

# Du solltest sehen:
# architect.md
# api-guardian.md
# builder.md
# validator.md
# tester.md
# scribe.md
# github-manager.md
```

### Agenten aktualisieren

```bash
# Wenn Agenten im Repository aktualisiert wurden:

# 1. Neueste Änderungen pullen
cd /path/to/CC_GodMode
git pull origin main

# 2. Agenten erneut in globalen Standort kopieren
cp agents/*.md ~/.claude/agents/

# 3. Update verifizieren (Datei-Änderungszeiten prüfen)
ls -lt ~/.claude/agents/
```

### Verifizierung

```bash
# Prüfen, dass Agenten korrekt installiert sind:

# 1. Globale Agenten auflisten
ls -la ~/.claude/agents/

# 2. Prüfen, dass Agenten-Datei existiert und lesbar ist
cat ~/.claude/agents/architect.md | head -20

# 3. Frontmatter verifizieren
head -6 ~/.claude/agents/architect.md

# Sollte anzeigen:
# ---
# name: architect
# description: ...
# tools: ...
# model: ...
# ---
```

---

## Mit Agenten arbeiten

### Entwicklungs-Workflow

```bash
# Bei der Entwicklung von Agenten-Verbesserungen:

# 1. Quell-Datei bearbeiten
vim CC_GodMode/agents/architect.md

# 2. Lokal testen durch Kopieren in Laufzeit
cp CC_GodMode/agents/architect.md ~/.claude/agents/

# 3. In beliebigem Projekt testen
cd ~/some-other-project
# Rufe @architect auf und beobachte das Verhalten

# 4. Falls gut, zu Git committen
cd CC_GodMode
git add agents/architect.md
git commit -m "feat: improve architect agent"
```

### Agenten-Verhalten troubleshooten

```bash
# Falls ein Agent nicht wie erwartet funktioniert:

# 1. Prüfen, welche Version aktiv ist
diff CC_GodMode/agents/architect.md ~/.claude/agents/architect.md

# 2. Falls unterschiedlich, entscheiden welche korrekt ist:

# Option A: Quelle ist korrekt (Laufzeit aktualisieren)
cp CC_GodMode/agents/architect.md ~/.claude/agents/

# Option B: Laufzeit ist korrekt (Quelle aktualisieren)
cp ~/.claude/agents/architect.md CC_GodMode/agents/
cd CC_GodMode && git commit -am "fix: update architect from runtime"
```

---

## Häufige Probleme & Lösungen

### Problem 1: Agent nicht gefunden

**Symptome:**
```
Error: Agent 'architect' not found
```

**Lösung:**
```bash
# Prüfen ob Agenten-Datei existiert
ls ~/.claude/agents/architect.md

# Falls nicht, installieren:
cp CC_GodMode/agents/architect.md ~/.claude/agents/
```

### Problem 2: Agent verwendet altes Verhalten

**Symptome:**
- Agent macht etwas, das in einem kürzlichen Update geändert wurde
- Agent-Output stimmt nicht mit Dokumentation überein

**Lösung:**
```bash
# Laufzeit-Version von Quelle aktualisieren
cp CC_GodMode/agents/*.md ~/.claude/agents/

# Update-Zeitstempel verifizieren
ls -lt ~/.claude/agents/architect.md
```

### Problem 3: Lokale Änderungen funktionieren nicht

**Symptome:**
- Du hast `CC_GodMode/agents/architect.md` bearbeitet
- Aber @architect zeigt immer noch altes Verhalten

**Lösung:**
```bash
# Du hast vergessen, in den Laufzeit-Standort zu kopieren!
cp CC_GodMode/agents/architect.md ~/.claude/agents/

# Immer nach dem Bearbeiten von Quell-Dateien kopieren
```

### Problem 4: Unterschiedliches Verhalten zwischen Projekten

**Symptome:**
- Agent funktioniert in Projekt A anders als in Projekt B
- Inkonsistentes Agenten-Verhalten

**Lösung:**
```bash
# Dies sollte NICHT passieren (Agenten sind global)
# Prüfen ob lokale Agenten-Dateien globale überschreiben

# In jedem Projekt, nach lokalen Agenten suchen:
ls .claude/agents/  # Sollte NICHT existieren

# Falls vorhanden, lokale Überschreibungen entfernen:
rm -rf .claude/agents/

# Agenten sollten NUR in ~/.claude/agents/ sein
```

---

## Best Practices

### 1. Immer beide Standorte aktualisieren

```bash
# Nach dem Bearbeiten von Agenten:
# ✅ SO MACHEN:
vim CC_GodMode/agents/architect.md
cp CC_GodMode/agents/architect.md ~/.claude/agents/
git commit -am "feat: improve architect"

# ❌ NICHT SO MACHEN:
vim ~/.claude/agents/architect.md  # Änderungen nicht versionskontrolliert!
```

### 2. Vor dem Committen testen

```bash
# Agenten-Änderungen in Laufzeit testen vor dem Committen:
cp CC_GodMode/agents/architect.md ~/.claude/agents/
# In verschiedenen Projekten testen...
# Falls gut:
cd CC_GodMode && git commit -am "feat: tested change"
```

### 3. Agenten synchronisiert halten

```bash
# Periodisch auf Drift prüfen:
diff -r CC_GodMode/agents/ ~/.claude/agents/

# Falls Unterschiede gefunden, entscheiden welche korrekt ist und synchronisieren
```

### 4. Agenten-Änderungen dokumentieren

```markdown
# Bei Modifikation von Agenten, in Commit-Nachricht dokumentieren:

git commit -m "feat(architect): add REQUEST TO ORCHESTRATOR pattern

- Added explicit note about no Bash access
- Clarified delegation pattern
- Updated dependency check examples

Resolves: Issue #1"
```

---

## Erweiterte Themen

### Neue Agenten erstellen

```bash
# Um einen neuen Agenten zum System hinzuzufügen:

# 1. Im Quell-Standort erstellen
cat > CC_GodMode/agents/new-agent.md << 'EOF'
---
name: new-agent
description: What this agent does
tools: Read, Write
model: sonnet
---

# @new-agent - Role Name

Agent instructions here...
EOF

# 2. Zur Laufzeit kopieren
cp CC_GodMode/agents/new-agent.md ~/.claude/agents/

# 3. Testen
# Rufe @new-agent in beliebigem Projekt auf

# 4. Committen
cd CC_GodMode
git add agents/new-agent.md
git commit -m "feat: add new-agent for X functionality"
```

### Agenten-Vererbung

Agenten können andere Agenten referenzieren, aber sie erben keine Konfiguration.
Jeder Agent ist unabhängig und in sich geschlossen.

### Multi-Projekt-Konsistenz

Da Agenten global sind (`~/.claude/agents/`), funktionieren sie identisch über alle Projekte auf deinem Rechner. Dies stellt sicher:
- Konsistente Workflow-Muster
- Keine projektspezifische Agenten-Konfiguration
- Single Source of Truth für Agenten-Verhalten

---

## Begründung für globales Agenten-Design

### Warum global statt lokal?

**1. Konsistenz über Projekte hinweg**
- Gleiche Agenten, gleiches Verhalten, überall
- Keine Verwirrung darüber, welche Agenten-Version aktiv ist
- Reduziert Wartungsaufwand

**2. Single Source of Truth**
- Ein Standort, von dem Claude Code liest
- Keine Mehrdeutigkeit darüber, welche Agenten-Datei zu verwenden ist
- Klarer Update-Pfad

**3. Reduzierte Duplizierung**
- Keine Notwendigkeit, Agenten in jedes Projekt zu kopieren
- Updates propagieren global
- Speicherplatz-Einsparungen

**4. Einfachere Wartung**
- Einmal aktualisieren, betrifft alle Projekte
- Klare Trennung: Quelle vs. Laufzeit
- Git verfolgt Quelle, Laufzeit ist Deployment

### Wann könnte man lokale Agenten wollen?

In seltenen Fällen könnte man projektspezifisches Agenten-Verhalten wollen:
- Experimentelle Agenten-Features für ein Projekt
- Projektspezifische Tool-Integrationen
- Testen von Agenten-Änderungen vor globalem Deployment

**Für diese Fälle:**
```bash
# Projektlokale Agenten-Überschreibung erstellen (sparsam verwenden!)
mkdir -p .claude/agents
cp ~/.claude/agents/architect.md .claude/agents/
# .claude/agents/architect.md für projektspezifisches Verhalten bearbeiten

# Hinweis: Dies wird für normale Verwendung NICHT empfohlen
# Es bricht das globale Konsistenz-Modell
```

---

## Zusammenfassung

**Zwei-Standort-Modell:**
- **Quelle** (`/agents/` im Repo): Versionskontrolliert, geteilt, dokumentiert
- **Laufzeit** (`~/.claude/agents/`): Aktive Ausführung, global, konsistent

**Schlüssel-Befehle:**
```bash
# Agenten installieren
cp CC_GodMode/agents/*.md ~/.claude/agents/

# Agenten aktualisieren
cp CC_GodMode/agents/*.md ~/.claude/agents/

# Sync-Status prüfen
diff -r CC_GodMode/agents/ ~/.claude/agents/
```

**Beachte:**
- Agenten sind global und konsistent über alle Projekte
- Quell-Standort ist für Entwicklung und Versionskontrolle
- Laufzeit-Standort ist das, was Claude Code tatsächlich verwendet
- Immer beide Standorte synchronisiert halten

---

**Für weitere Informationen:**
- Siehe [AGENT_MODEL_SELECTION.md](./AGENT_MODEL_SELECTION.md) für Kosten-Optimierung
- Siehe [CLAUDE.md](../CLAUDE.md) für Orchestrator-Konfiguration
- Siehe [agents/](../agents/) für individuelle Agenten-Dokumentation
