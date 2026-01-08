# Domain Pack Spezifikation

**Version:** v5.8.0
**Zuletzt aktualisiert:** 2026-01-08
**Status:** Entwurf

---

## Überblick

Domain Packs ermöglichen die Anpassung von CC_GodMode für spezifische Projekttypen, Frameworks oder organisatorische Standards. Sie erlauben die Erweiterung oder das Überschreiben von Kern-Agenten-Verhalten, Validierungsregeln und Workflows, ohne das Kernsystem zu modifizieren.

**Kernprinzipien:**
- **Kern bleibt stabil** - Domain Packs erweitern, brechen nicht den Kern
- **Auflösungsreihenfolge ist vorhersagbar** - Projekt > Global > Kern
- **Rückwärtskompatibel** - Projekte ohne Domain Packs funktionieren normal
- **Erkennbar** - Domain Packs dokumentieren ihre Fähigkeiten selbst

---

## Architektur

```
Auflösungskette
===============

    Projekt-Domain-Pack          Global-Domain-Pack           Kern-Agenten
    (./domains/{name}/)          (~/.claude/domains/{name}/)  (~/.claude/agents/)
           |                              |                          |
           v                              v                          v
    +---------------+              +---------------+           +------------+
    | domain-config |              | domain-config |           | agent.md   |
    | agents/       |   ------>    | agents/       |   ----->  | (default)  |
    | validation/   |   fallback   | validation/   |   fallback|            |
    +---------------+              +---------------+           +------------+
           ^                              ^                          ^
           |                              |                          |
           +------------- resolveAgent(name, domain) ----------------+
                          Gibt ersten gefundenen zurück
```

---

## Verzeichnisstruktur

### Projekt-Ebenen-Domain-Pack

```
project-root/
  domains/
    {domain-name}/
      domain-config.json      # Erforderlich: Domain-Konfiguration
      agents/                 # Optional: Agenten-Prompt-Overrides
        builder.md
        validator.md
        tester.md
      validation-rules.json   # Optional: Validierungsregel-Erweiterungen
      hooks/                  # Optional: Domain-spezifische Hooks
        pre-workflow.js
        post-agent-builder.js
      templates/              # Optional: Report-Templates
        builder-report.md
```

### Globaler Domain Pack

```
~/.claude/
  domains/
    {domain-name}/
      domain-config.json
      agents/
      validation-rules.json
```

---

## Konfigurationsdatei

### domain-config.json (Erforderlich)

```json
{
  "name": "react-native",
  "version": "1.0.0",
  "description": "Domain Pack für React Native Mobile-Entwicklung",
  "author": "Team Name",
  "license": "MIT",

  "compatibility": {
    "minVersion": "5.8.0",
    "maxVersion": "6.0.0"
  },

  "agents": {
    "builder": {
      "extends": "core:builder",
      "prompt": "agents/builder.md",
      "model": "sonnet",
      "mcpServers": ["appium"]
    },
    "tester": {
      "extends": "core:tester",
      "prompt": "agents/tester.md",
      "tools": ["Bash", "Read", "Write"]
    }
  },

  "validationRules": {
    "builder": {
      "requiredSections": ["Platform Compatibility"],
      "requiredPatterns": ["(iOS|Android)"],
      "overrides": false
    }
  },

  "workflows": {
    "newFeature": ["architect", "builder", "validator", "tester", "mobile-qa", "scribe"]
  },

  "hooks": {
    "preWorkflow": ["hooks/check-expo-version.js"],
    "postAgent": {
      "builder": ["hooks/lint-native-code.js"]
    }
  },

  "tags": ["mobile", "react-native", "ios", "android"]
}
```

---

## Agenten-Override-Dateien

### Kern-Agenten erweitern

Wenn eine Agenten-Datei im Domain Pack existiert, kann sie den Kern-Agenten entweder **erweitern** oder **ersetzen**.

**Erweitern (Empfohlen):**
```markdown
# @builder - React Native Erweiterung

> Erweitert Kern-@builder mit React Native Spezifika

---

## Zusätzliche Verantwortlichkeiten

- Plattform-spezifische Code-Kompatibilität verifizieren
- iOS- und Android-Builds ausführen
- Native-Modul-Integration handhaben

## Plattform-Überlegungen

### iOS
- CocoaPods-Abhängigkeiten prüfen
- Xcode-Versions-Kompatibilität verifizieren

### Android
- Gradle-Konfiguration prüfen
- Android-SDK-Version verifizieren

---

## Ursprüngliche Kern-Verantwortlichkeiten

[Alle Kern-@builder-Verantwortlichkeiten bleiben gültig]
```

**Ersetzen (Mit Vorsicht verwenden):**
```markdown
# @builder - Benutzerdefinierte Implementierung

> Ersetzt Kern-@builder vollständig

**WARNUNG:** Dieser Agent ersetzt den Kern-Builder vollständig.
Alle Kern-Funktionalitäten müssen neu implementiert werden.

[Vollständige Agenten-Implementierung]
```

---

## Validierungsregeln

### validation-rules.json

```json
{
  "builder": {
    "requiredSections": [
      "Platform Compatibility",
      "iOS Considerations",
      "Android Considerations"
    ],
    "requiredPatterns": [
      "Platform\\.(OS|select)",
      "(iOS|Android)"
    ],
    "minLength": 800,
    "overrides": false
  },
  "tester": {
    "requiredSections": [
      "Device Testing",
      "Simulator Results"
    ],
    "overrides": false
  }
}
```

### Merge-Verhalten

Wenn `overrides: false` (Standard):
- Domain-`requiredSections` werden zu Kern-Abschnitten **hinzugefügt**
- Domain-`requiredPatterns` werden zu Kern-Mustern **hinzugefügt**
- Domain-`minLength` **überschreibt** Kern-minLength (falls angegeben)

Wenn `overrides: true`:
- Domain-Regeln **ersetzen vollständig** Kern-Regeln für diesen Agenten

---

## Auflösungs-Algorithmus

```javascript
function resolveAgent(agentName, domainName) {
  // 1. Projekt-Domain prüfen
  if (exists(`./domains/${domainName}/agents/${agentName}.md`)) {
    return projectDomainAgent;
  }

  // 2. Globale Domain prüfen
  if (exists(`~/.claude/domains/${domainName}/agents/${agentName}.md`)) {
    return globalDomainAgent;
  }

  // 3. Zurückfallen auf Kern
  if (exists(`~/.claude/agents/${agentName}.md`)) {
    return coreAgent;
  }

  // 4. Agent nicht gefunden
  return null;
}
```

---

## Verwendung

### CLI-Befehle

```bash
# Alle Domain Packs entdecken
node scripts/domain-pack-loader.js discover

# Agent mit Domain auflösen
node scripts/domain-pack-loader.js resolve builder react-native

# Domain Pack validieren
node scripts/domain-pack-loader.js validate ./domains/react-native

# Alle Agenten für eine Domain auflisten
node scripts/domain-pack-loader.js list react-native
```

### Im Orchestrator

```markdown
# CLAUDE.md Orchestrator-Konfiguration

domain: react-native
```

Oder pro Workflow:
```
User: "New Feature: Add push notifications --domain=react-native"
```

---

## Erstellen eines Domain Packs

### Schritt 1: Verzeichnis erstellen

```bash
mkdir -p domains/my-domain/agents
```

### Schritt 2: Konfiguration erstellen

```bash
cat > domains/my-domain/domain-config.json << 'EOF'
{
  "name": "my-domain",
  "version": "1.0.0",
  "description": "Benutzerdefinierte Domain für meinen Projekttyp",
  "compatibility": {
    "minVersion": "5.8.0"
  },
  "agents": {},
  "tags": ["custom"]
}
EOF
```

### Schritt 3: Agenten-Overrides hinzufügen (Optional)

```bash
# Benutzerdefinierten Builder erstellen
cat > domains/my-domain/agents/builder.md << 'EOF'
# @builder - Meine Domain-Erweiterung

## Zusätzliche Anforderungen
- Benutzerdefinierte Anforderung 1
- Benutzerdefinierte Anforderung 2
EOF
```

### Schritt 4: Validierungsregeln hinzufügen (Optional)

```bash
cat > domains/my-domain/validation-rules.json << 'EOF'
{
  "builder": {
    "requiredSections": ["Custom Section"],
    "overrides": false
  }
}
EOF
```

### Schritt 5: Validieren

```bash
node scripts/domain-pack-loader.js validate ./domains/my-domain
```

---

## Best Practices

### MACHEN

- Domain Packs auf einen einzelnen Projekttyp fokussiert halten
- Alle Anpassungen klar dokumentieren
- Domain Packs mit Kern-CC_GodMode-Updates testen
- `overrides: false` verwenden, außer absolut notwendig
- Versions-Kompatibilitätsinformationen einschließen

### NICHT MACHEN

- Domain Packs erstellen, die Kern-Workflows brechen
- Kern-Agenten ohne guten Grund überschreiben
- Vergessen, Domain-Pack-Version beim Ändern zu aktualisieren
- Zirkuläre Abhängigkeiten zwischen Domain Packs erstellen
- Secrets in Domain-Pack-Dateien speichern

---

## Eingebaute Domain Packs

CC_GodMode wird mit Referenz-Domain-Packs ausgeliefert:

| Name | Beschreibung | Modifizierte Agenten |
|------|-------------|-----------------|
| `react-native` | Mobile-App-Entwicklung | builder, tester |
| `backend` | Backend-/API-Entwicklung | architect, validator |
| `docs` | Dokumentationsprojekte | scribe |

Diese befinden sich im globalen Domains-Verzeichnis und dienen als Templates für benutzerdefinierte Domain Packs.

---

## Troubleshooting

### Domain Pack nicht erkannt

```bash
# Discovery prüfen
node scripts/domain-pack-loader.js discover

# Config-Datei existiert und ist gültiges JSON verifizieren
cat domains/my-domain/domain-config.json | jq .
```

### Agent löst nicht aus Domain auf

```bash
# Auflösungskette prüfen
node scripts/domain-pack-loader.js resolve builder my-domain
```

### Validierungsregeln werden nicht angewendet

```bash
# Regel-Datei verifizieren
cat domains/my-domain/validation-rules.json | jq .

# Mit Domain-Flag testen
node scripts/validate-agent-output.js report.md builder --domain=my-domain
```

---

## Versionshistorie

- **v5.8.0** - Initiale Domain-Pack-Spezifikation

---

**Siehe auch:**
- `config/domain-config.schema.json` - JSON-Schema zur Validierung
- `scripts/domain-pack-loader.js` - Domain-Pack-Loader-Implementierung
- `scripts/validate-agent-output.js` - Domain-aware-Validierung
