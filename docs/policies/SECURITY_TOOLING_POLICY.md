# Security & Tooling Policy

**Version:** v5.7.0
**Zuletzt aktualisiert:** 2026-01-08
**Status:** Aktiv

---

## Überblick

Diese Policy definiert **Tool-Zugriffsebenen**, **Sicherheitsgrenzen** und **betriebliche Einschränkungen** für alle CC_GodMode-Agenten. Das Prinzip des **geringsten Privilegs** wird durchgesetzt - jeder Agent hat nur Zugriff auf Tools, die für seine spezifische Rolle erforderlich sind.

**Kernprinzipien:**
- Least-Privilege-Zugriff
- Keine destruktiven Operationen ohne explizite User-Erlaubnis
- PII-Schutz auf allen Ebenen
- Dateisystem-Grenzen werden durchgesetzt
- WebFetch-Einschränkungen zur Sicherheit

---

## 1. Tool-Zugriffs-Matrix

| Tool | @architect | @api-guardian | @builder | @validator | @tester | @scribe | @github-manager |
|------|-----------|---------------|----------|-----------|---------|---------|----------------|
| **Read** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Write** | ⚠️ | ❌ | ✅ | ❌ | ⚠️ | ✅ | ❌ |
| **Edit** | ⚠️ | ❌ | ✅ | ❌ | ⚠️ | ✅ | ❌ |
| **Bash** | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| **Glob** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Grep** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Playwright MCP** | ❌ | ❌ | ⚠️ | ❌ | ✅ | ❌ | ❌ |
| **GitHub MCP** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Lighthouse MCP** | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ |
| **A11y MCP** | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ❌ |

**Legende:**
- ✅ **Erlaubt** - Vollzugriff für diese Rolle
- ⚠️ **Eingeschränkt** - Begrenzter Zugriff (siehe Einschränkungen unten)
- ❌ **Verweigert** - Kein Zugriff für diese Rolle

---

## 2. Tool-spezifische Policies

### Read Tool

**Zugriff:** Alle Agenten

**Erlaubt:**
- Lesen jeder Projektdatei
- Lesen von Agenten-Reports
- Lesen von Konfigurationsdateien
- Lesen von bestehendem Code

**Verweigert:**
- Lesen von Dateien außerhalb des Projektverzeichnisses
- Lesen von Systemdateien (/etc/, /usr/, etc.)
- Lesen von Home-Verzeichnissen anderer User
- Lesen von Credential-Dateien (.env, secrets.json, etc.) ohne User-Erlaubnis

**Sicherheitshinweise:**
- Immer validieren, dass Dateipfade innerhalb des Projekts liegen
- Warnen, wenn versucht wird, Credential-Dateien zu lesen
- Niemals sensible Dateiinhalte in die Konsole loggen

---

### Write Tool

**Zugriff:** @builder, @scribe (voll), @architect/@tester (nur Reports)

**@builder - Erlaubt:**
- Erstellen neuer Quelldateien (src/, tests/)
- Erstellen von Testdateien
- Erstellen von Konfigurationsdateien (mit User-Genehmigung)

**@builder - Verweigert:**
- Überschreiben von Dateien ohne vorheriges Lesen
- Schreiben außerhalb des Projektverzeichnisses
- Schreiben in Systemverzeichnisse
- Erstellen von ausführbaren Dateien ohne Review

**@scribe - Erlaubt:**
- Aktualisieren der VERSION-Datei
- Aktualisieren von CHANGELOG.md
- Aktualisieren von README.md
- Aktualisieren von Dokumentationsdateien (docs/)

**@scribe - Verweigert:**
- Modifizieren von Quellcode
- Erstellen von ausführbaren Scripts
- Überschreiben von Konfigurationsdateien

**@architect/@tester - Erlaubt:**
- Schreiben von Reports nur nach reports/vX.X.X/

**@architect/@tester - Verweigert:**
- Schreiben von Produktionscode
- Schreiben außerhalb des Reports-Verzeichnisses

**Sicherheitshinweise:**
- Immer Read vor Write für bestehende Dateien verwenden
- Dateipfade relativ zur Projektwurzel validieren
- Niemals Credentials auf Festplatte schreiben
- User vor Erstellen von Config-Dateien fragen

---

### Edit Tool

**Zugriff:** @builder, @scribe (voll), @architect/@tester (nur Reports)

**@builder - Erlaubt:**
- Bearbeiten von Quelldateien (src/, tests/)
- Bearbeiten von Konfigurationsdateien
- Bearbeiten von Testdateien

**@builder - Verweigert:**
- Bearbeiten ohne vorheriges Lesen (Tool erzwingt dies)
- Bearbeiten von Versionskontroll-Dateien (.git/)
- Bearbeiten von Credential-Dateien
- Bearbeiten von Systemdateien

**@scribe - Erlaubt:**
- Bearbeiten der VERSION-Datei
- Bearbeiten von CHANGELOG.md
- Bearbeiten von README.md
- Bearbeiten von Dokumentationsdateien

**@scribe - Verweigert:**
- Bearbeiten von Quellcode
- Bearbeiten von Testdateien
- Bearbeiten von Build-Konfigurationen

**Sicherheitshinweise:**
- Tool erzwingt "read before edit" automatisch
- Immer exakte Einrückung beibehalten
- Validieren, dass old_string eindeutig ist
- Niemals Credential-Dateien bearbeiten

---

### Bash Tool

**Zugriff:** Alle Agenten (mit Einschränkungen)

**@builder - Erlaubt:**
```bash
npm run typecheck
npm test
npm run lint
npm install [package]
node [script]
```

**@builder - Verweigert:**
```bash
rm -rf
git push (ohne Erlaubnis)
npm publish
chmod +x
sudo [anything]
curl | bash
```

**@validator/@tester - Erlaubt:**
```bash
npm run typecheck
npm test
npm run lint
npm run test:e2e
node scripts/validate-*
```

**@validator/@tester - Verweigert:**
```bash
npm install
git [any command]
rm [anything]
```

**@github-manager - Erlaubt:**
```bash
git status
git diff
git log
git add
git commit
gh pr create
gh issue [commands]
```

**@github-manager - Verweigert:**
```bash
git push (ohne explizite User-Erlaubnis)
git push --force (NIEMALS ohne User-Erlaubnis)
git reset --hard
git rebase -i
rm [anything]
```

**@architect/@api-guardian/@scribe - Erlaubt:**
```bash
ls [directory]
tree [directory]
node scripts/analyze-*
```

**@architect/@api-guardian/@scribe - Verweigert:**
```bash
npm [anything]
git [anything]
rm [anything]
```

**Sicherheitshinweise:**
- Niemals Befehle mit sudo ausführen
- Immer User-Erlaubnis für git push validieren
- Niemals piped curl-Befehle ausführen
- Dateipfade mit Leerzeichen in Anführungszeichen setzen
- Absolute Pfade verwenden, wenn möglich

---

### Glob Tool

**Zugriff:** Alle Agenten (uneingeschränkt)

**Erlaubt:**
- Suche nach Dateien nach Muster
- Auflisten von Verzeichnisinhalten
- Finden spezifischer Dateitypen

**Best Practices:**
- Spezifische Muster verwenden (*.ts nicht *)
- Suchbereich auf relevante Verzeichnisse begrenzen
- Für Datei-Ermittlung verwenden, nicht für Inhalts-Lesen

---

### Grep Tool

**Zugriff:** Alle Agenten (uneingeschränkt)

**Erlaubt:**
- Suche in Dateiinhalten nach Muster
- Finden von API-Verwendungen
- Ermittlung von Consumern

**Best Practices:**
- Spezifische Regex-Muster verwenden
- Suche auf Dateitypen begrenzen
- output_mode: "files_with_matches" für Ermittlung verwenden
- output_mode: "content" nur bei Bedarf verwenden

---

## 3. MCP-Server-Policies

### Playwright MCP

**Zugriff:** @tester (voll), @builder (begrenzt)

**@tester - Erlaubt:**
- Browser starten
- Zu Seiten navigieren
- Screenshots erstellen
- E2E-Tests ausführen
- Konsole überwachen
- Netzwerkverkehr erfassen

**@tester - Verweigert:**
- Zu externen Sites navigieren (nur localhost erlaubt)
- Beliebiges JavaScript ausführen
- Dateien ohne Review herunterladen

**@builder - Erlaubt:**
- E2E-Tests während Entwicklung ausführen
- Debug-Screenshots erstellen

**@builder - Verweigert:**
- E2E-Test-Ausführung modifizieren
- Browser-Konfiguration ändern

**Sicherheitshinweise:**
- Nur gegen localhost oder genehmigte Staging-URLs testen
- Niemals Formulare mit echten PII absenden
- Browser-Storage nach Tests löschen
- Nicht zu nicht vertrauenswürdigen URLs navigieren

---

### GitHub MCP

**Zugriff:** Nur @github-manager

**Erlaubt:**
- Lesen von Issues, PRs, Releases
- Erstellen von PRs
- Aktualisieren von Issues
- Erstellen von Releases
- Kommentare hinzufügen
- Issues mit PRs verknüpfen

**Verweigert:**
- Force Push
- Branches löschen (ohne User-Erlaubnis)
- PRs ohne Review schließen
- Repository-Einstellungen modifizieren
- Collaborators hinzufügen
- Webhooks erstellen

**Sicherheitshinweise:**
- NIEMALS ohne explizite User-Erlaubnis pushen
- NIEMALS force push zu main/master
- Immer PRs mit Issues verknüpfen (Fixes #N)
- Branch-Namen vor Operationen validieren

---

### Lighthouse MCP

**Zugriff:** @tester (optional)

**Erlaubt:**
- Performance-Audits durchführen
- Core Web Vitals erfassen
- Performance-Reports generieren

**Verweigert:**
- Gegen Produktions-URLs ohne Erlaubnis ausführen
- Beliebigen Code in Audits ausführen

**Sicherheitshinweise:**
- Nur localhost oder genehmigte URLs auditieren
- Keine echten User-Daten an Lighthouse senden

---

### A11y MCP

**Zugriff:** @tester (optional)

**Erlaubt:**
- Accessibility-Audits durchführen
- WCAG-Compliance prüfen
- A11y-Reports generieren

**Verweigert:**
- Seiten-DOM während Audits modifizieren
- Beliebigen Code ausführen

**Sicherheitshinweise:**
- Nur localhost oder genehmigte URLs auditieren
- Keine externen Sites scannen

---

## 4. Verbotene Operationen Liste

### Universell Verboten

**ALLE Agenten sind verboten:**

1. **Destruktive Datei-Operationen**
   - `rm -rf` (rekursives Löschen)
   - Löschen des `.git`-Verzeichnisses
   - Löschen von `node_modules` (npm clean stattdessen verwenden)
   - Überschreiben von Credential-Dateien

2. **Gefährliche Git-Operationen**
   - `git push --force` (außer explizit genehmigt)
   - `git reset --hard` (verliert uncommitted work)
   - `git rebase -i` (interaktiv, nicht unterstützt)
   - `git push` ohne User-Erlaubnis

3. **Sicherheitsrisiken**
   - `sudo`-Befehle
   - `curl | bash` (piped remote execution)
   - `eval` auf User-Input
   - `chmod +x` ohne Review

4. **Netzwerkrisiken**
   - Abrufen von nicht vertrauenswürdigen URLs
   - Daten an externe Services senden (ohne Erlaubnis)
   - Packages aus nicht vertrauenswürdigen Registries installieren

5. **Privacy-Verletzungen**
   - Lesen von Credential-Dateien ohne Erlaubnis
   - Loggen sensibler Daten
   - Secrets in Git committen
   - PII in Klartext speichern

---

## 5. PII-Handling

### Definition

**Personally Identifiable Information (PII)** umfasst:
- Namen
- E-Mail-Adressen
- Telefonnummern
- Physische Adressen
- Kreditkartennummern
- Sozialversicherungsnummern
- API-Keys, Tokens, Passwörter
- Alle Daten, die eine spezifische Person identifizieren können

### PII-Schutzregeln

**1. Erkennung**
- Auf gängige PII-Muster vor dem Committen scannen
- Warnen, wenn .env oder Credentials-Dateien staged sind
- Bei hardcodierten API-Keys oder Tokens alarmieren

**2. Speicherung**
- NIEMALS PII in Git committen
- NIEMALS PII in Klartext speichern
- NIEMALS PII in die Konsole loggen
- Immer Umgebungsvariablen für Secrets verwenden

**3. Testing**
- Mock-/Fake-PII für Tests verwenden
- Niemals echte User-Daten in E2E-Tests verwenden
- Browser-Storage nach Tests löschen
- Keine Testdaten mit PII committen

**4. Handling in Code**
- Sensible Daten im Ruhezustand verschlüsseln
- Sichere Credential-Verwaltung verwenden (dotenv, vault)
- PII in Logs und Fehlermeldungen schwärzen
- Keine PII in URL-Parametern übergeben

**5. Agenten-Verhalten**
- Falls PII in staged files erkannt → Commit BLOCKIEREN und User warnen
- Falls Credential-Datei in git diff → Alarmieren und um Bestätigung bitten
- Falls API-Key in Code → Umgebungsvariable stattdessen vorschlagen

### Häufige PII-Muster (Regex)

```regex
# Email
/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/

# API Key (generisch)
/['"]([A-Za-z0-9_-]{32,})['"]/

# Kreditkarte
/\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b/

# JWT Token
/eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/

# SSH Private Key
/-----BEGIN (RSA|OPENSSH|DSA|EC) PRIVATE KEY-----/
```

**Agenten sollten warnen, wenn diese Muster in Code-Änderungen erkannt werden.**

---

## 6. WebFetch-Einschränkungen

**WebFetch ist NICHT als Tool verfügbar** - dies ist absichtlich aus Sicherheitsgründen.

**Verboten:**
- Abrufen beliebiger URLs
- Herunterladen externer Scripts
- API-Aufrufe an externe Services
- Web Scraping

**Begründung:**
- Verhindert Daten-Exfiltration
- Blockiert nicht vertrauenswürdige Code-Ausführung
- Schützt vor SSRF-Angriffen
- Gewährleistet reproduzierbare Builds

**Ausnahmen:**
- Package-Installation via npm (verwendet package-lock.json für Integrität)
- MCP-Server dürfen von genehmigten URLs abrufen (z.B. GitHub API)

**Falls externe Daten benötigt werden:**
- User muss manuell herunterladen
- User muss vor Bereitstellung an Agent reviewen
- User muss Quelle validieren

---

## 7. Dateisystem-Grenzen

### Erlaubte Verzeichnisse

**Lesezugriff:**
```
/Users/denniswestermann/Desktop/Coding Projekte/CC_GodMode/
├── src/                    ✅ Read/Write
├── tests/                  ✅ Read/Write
├── scripts/                ✅ Read
├── docs/                   ✅ Read/Write
├── reports/                ✅ Read/Write
├── public/                 ✅ Read
├── CHANGELOG.md            ✅ Read/Write
├── README.md               ✅ Read/Write
├── VERSION                 ✅ Read/Write
├── package.json            ✅ Read
├── package-lock.json       ✅ Read
└── .gitignore              ✅ Read
```

**Schreibzugriff (begrenzt):**
```
├── src/                    ✅ nur @builder
├── tests/                  ✅ nur @builder
├── docs/                   ✅ nur @scribe
├── reports/                ✅ Alle Agenten (eigene Reports)
├── CHANGELOG.md            ✅ nur @scribe
├── VERSION                 ✅ nur @scribe
└── README.md               ✅ nur @scribe
```

### Verbotene Verzeichnisse

**NIEMALS zugreifen:**
```
/etc/                       ❌ System-Konfiguration
/usr/                       ❌ System-Binaries
/var/                       ❌ System-Daten
/root/                      ❌ Root-Home-Verzeichnis
~/.ssh/                     ❌ SSH-Keys
~/.aws/                     ❌ AWS-Credentials
/tmp/                       ❌ Temporäre System-Dateien
node_modules/               ⚠️ Nur lesen, niemals schreiben
.git/                       ⚠️ Nur lesen, niemals schreiben
```

**Begründung:**
- Verhindert Systemschäden
- Schützt Credentials
- Vermeidet Berechtigungsprobleme
- Erhält Projekt-Isolation

---

## 8. Audit-Anforderungen

### Logging

**Erforderliche Logs:**
1. **Tool-Verwendung** - Welcher Agent welches Tool verwendet hat
2. **Dateizugriff** - Read/Write-Operationen mit Zeitstempeln
3. **Git-Operationen** - Alle Commits, Pushes, PR-Erstellungen
4. **MCP-Aufrufe** - Alle Interaktionen mit MCP-Servern
5. **Eskalationen** - Alle Eskalationen zum Orchestrator

**Log-Format:**
```json
{
  "timestamp": "2026-01-08T10:30:00Z",
  "agent": "builder",
  "tool": "Write",
  "path": "src/auth/AuthService.ts",
  "result": "success"
}
```

**Log-Speicherort:** `reports/vX.X.X/audit.log`

### Review-Punkte

**Vor Git Push:**
- Alle geänderten Dateien reviewen
- Auf PII in Diffs prüfen
- VERSION aktualisiert verifizieren
- CHANGELOG aktualisiert bestätigen
- User explizit genehmigt

**Vor PR-Erstellung:**
- PR-Beschreibung reviewen
- "Fixes #N"-Verknüpfung verifizieren
- Prüfen, dass CI/CD triggert
- User genehmigt PR-Erstellung

**Nach Quality Gates:**
- Beide @validator und @tester haben approved
- Alle Tests bestanden
- Keine Sicherheitsprobleme gefunden

---

## 9. Durchsetzung

### Automatische Durchsetzung

1. **Tool-Einschränkungen** - Tools verweigern Operationen außerhalb erlaubten Umfangs
2. **Pre-Push-Hooks** - Git-Hooks prüfen auf PII und Versionierung
3. **Agenten-Validierung** - SubagentStop-Hook validiert Agenten-Verhalten
4. **Pfad-Validierung** - Datei-Operationen validieren, dass Pfade im Projekt sind

### Manuelle Durchsetzung

1. **Orchestrator-Monitoring** - Reviewed Agenten-Reports auf Verstöße
2. **User-Review** - User muss alle Pushes und PRs genehmigen
3. **Audit-Log-Review** - Periodisches Review von Audit-Logs

### Verstoß-Reaktion

**Level 1 - Warnung:**
- Agent versuchte eingeschränkte Operation
- Operation automatisch blockiert
- Warnung geloggt

**Level 2 - Eskalation:**
- Agent versucht wiederholt Verstöße
- Zum Orchestrator eskalieren
- Workflow muss möglicherweise angepasst werden

**Level 3 - Abbruch:**
- Sicherheitskritischer Verstoß erkannt
- Workflow sofort abgebrochen
- User benachrichtigt

---

## 10. Best Practices

### Für Agenten

1. **Minimale Berechtigungen anfordern**
   - Nur benötigte Tools verwenden
   - Vor dem Schreiben lesen
   - Dateien nicht unnötig explorieren

2. **Vor Operationen validieren**
   - Prüfen, dass Dateipfade im Projekt sind
   - Vor Commits auf PII scannen
   - User-Erlaubnis für Pushes bestätigen

3. **Alle Operationen loggen**
   - Tool-Verwendung
   - Dateizugriff
   - Git-Operationen

4. **Sicher fehlschlagen**
   - Bei verweigerter Berechtigung eskalieren
   - Niemals Sicherheitseinschränkungen umgehen
   - Verstöße an Orchestrator melden

### Für Orchestrator

1. **Tool-Verwendung überwachen**
   - Verfolgen, welche Tools Agenten verwenden
   - Bei ungewöhnlichen Mustern alarmieren
   - Audit-Logs reviewen

2. **Grenzen durchsetzen**
   - Agenten-Reports auf Verstöße validieren
   - Workflows blockieren, die Schritte überspringen
   - Sicherstellen, dass Übergaben ordnungsgemäß sind

3. **User-Kommunikation**
   - Immer vor git push fragen
   - Sicherheitswarnungen erklären
   - Explizite Genehmigung für sensible Operationen einholen

---

## Versionshistorie

- **v5.7.0** - Initiale Formalisierung der Security and Tooling Policy
- **v5.6.0** - Grundlage (Agenten-Validierung, Quality Gates)

---

**Siehe auch:**
- `docs/templates/REPORT_TEMPLATES.md` - Agenten-Output-Formate
- `docs/policies/CONTEXT_SCOPE_POLICY.md` - Agenten-Scope-Grenzen
- `scripts/validate-agent-output.js` - Agenten-Validierungs-Implementierung
