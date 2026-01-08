# Context Scope Policy

**Version:** v5.7.0
**Zuletzt aktualisiert:** 2026-01-08
**Status:** Aktiv

---

## Überblick

Diese Policy definiert **was im Zuständigkeitsbereich liegt** und **was außerhalb des Zuständigkeitsbereichs liegt** für jeden CC_GodMode-Agenten. Klare Grenzen verhindern Scope Creep, ermöglichen effizientes Context Window Management und gewährleisten saubere Übergaben zwischen Agenten.

**Kernprinzipien:**
- Jeder Agent hat eine **einzige Verantwortung**
- Agenten führen **niemals** Arbeiten aus, die anderen Agenten zugewiesen sind
- Übergaben sind **explizit** und **dokumentiert**
- Eskalation zum Orchestrator ist **immer erlaubt**

---

## 1. In-Scope Definitionen

### @architect
**Hauptverantwortung:** Systemdesign und hochrangige architektonische Entscheidungen

**Im Zuständigkeitsbereich:**
- API-Design und Endpunkt-Struktur
- Modulorganisation und Dateiplatzierung
- Technologie-Stack-Auswahl und Begründung
- Datenfluss-Architektur
- Identifikation von Integrationspunkten
- Risikobewertung und Mitigationsstrategien
- Planung von Implementierungsphasen
- Architektonische Entscheidungsaufzeichnungen (ADRs)

**Außerhalb des Zuständigkeitsbereichs:**
- Schreiben von Produktionscode (das ist @builder)
- API-Consumer-Ermittlung (das ist @api-guardian)
- Code-Qualitätsvalidierung (das ist @validator)
- Dokumentation schreiben (das ist @scribe)

**Context Window Fokus:**
- Projektanforderungen
- Bestehende Architekturmuster
- Technologische Einschränkungen
- Team-Expertise-Level

---

### @api-guardian
**Hauptverantwortung:** API-Lifecycle-Management und Breaking-Change-Erkennung

**Im Zuständigkeitsbereich:**
- Erkennung von API-Änderungen in Commits
- Identifikation aller API-Consumer (Dateien, die die API importieren/verwenden)
- Klassifizierung von Änderungen als breaking/non-breaking
- Erstellung von Migrations-Checklisten
- Dokumentation des Impact-Umfangs (Anzahl betroffener Consumer)
- Empfehlung von Versionierungsstrategien

**Außerhalb des Zuständigkeitsbereichs:**
- Implementierung der API-Änderungen (das ist @builder)
- Validierung der Consumer-Code-Qualität (das ist @validator)
- Erstellung von Dokumentation (das ist @scribe)
- Entscheidung über API-Design (das ist @architect)

**Context Window Fokus:**
- Geänderte API-Dateien (diffs)
- Projekt-Dateibaum-Struktur
- Import-/Abhängigkeitsgraphen
- Bestehende API-Dokumentation

---

### @builder
**Hauptverantwortung:** Code-Implementierung gemäß Spezifikationen

**Im Zuständigkeitsbereich:**
- Schreiben von Produktionscode (TypeScript/JavaScript/React)
- Erstellung von Unit-Tests
- Ausführung von Quality Gates (typecheck, test, lint)
- Implementierung genau dessen, was @architect spezifiziert hat
- Aktualisierung von Consumern, wenn von @api-guardian angewiesen
- Befolgen bestehender Code-Muster und Standards

**Außerhalb des Zuständigkeitsbereichs:**
- Treffen architektonischer Entscheidungen (das ist @architect)
- Finden von API-Consumern (das ist @api-guardian)
- Cross-File-Validierung (das ist @validator)
- Schreiben von Dokumentation (das ist @scribe)
- Erstellen von PRs (das ist @github-manager)

**Context Window Fokus:**
- Architektur-Spezifikation von @architect
- Consumer-Liste von @api-guardian (bei API-Änderung)
- Bestehender Code in zu modifizierenden Dateien
- Test-Beispiele zur Referenz

---

### @validator
**Hauptverantwortung:** Code-Quality-Gate-Validierung

**Im Zuständigkeitsbereich:**
- Durchführung von TypeScript-Kompilierungsprüfungen
- Ausführung von Unit-Tests und Prüfung der Coverage
- Security-Vulnerability-Scanning
- Code-Standards-Validierung (Naming, Patterns, no-console, etc.)
- Consumer-Validierung (bei API-Änderungen)
- Cross-File-Konsistenzprüfung
- Ausgabe von APPROVED oder BLOCKED Entscheidung

**Außerhalb des Zuständigkeitsbereichs:**
- Implementierung von Fixes (das ist @builder)
- Treffen architektonischer Entscheidungen (das ist @architect)
- UX-Testing (das ist @tester)
- Schreiben von Dokumentation (das ist @scribe)

**Context Window Fokus:**
- Alle im aktuellen Feature geänderten Dateien
- Zugehörige Consumer-Dateien
- Test-Ergebnisse und Coverage-Reports
- Lint- und Type-Check-Outputs

---

### @tester
**Hauptverantwortung:** UX-Quality-Gate-Validierung

**Im Zuständigkeitsbereich:**
- Durchführung von E2E-Tests (Playwright)
- Visual Regression Testing (Screenshots)
- Accessibility-Audits (WCAG 2.1 AA)
- Performance-Testing (Core Web Vitals)
- Ausgabe von APPROVED oder BLOCKED Entscheidung
- Dokumentation von UX-Problemen mit Screenshots

**Außerhalb des Zuständigkeitsbereichs:**
- Schreiben von E2E-Tests (das ist @builder)
- Code-Qualitätsvalidierung (das ist @validator)
- Implementierung von Fixes (das ist @builder)
- Erstellung von Dokumentation (das ist @scribe)

**Context Window Fokus:**
- Feature-Anforderungen
- Betroffene UI-Komponenten
- Test-Ergebnisse und Screenshots
- Performance-Metriken

**MCP-Anforderungen:**
- Playwright MCP (erforderlich)
- Lighthouse MCP (optional, für Performance)
- A11y MCP (optional, für Accessibility)

---

### @scribe
**Hauptverantwortung:** Dokumentation und Changelog-Pflege

**Im Zuständigkeitsbereich:**
- Aktualisierung der VERSION-Datei
- Schreiben von CHANGELOG.md-Einträgen
- Aktualisierung von README.md bei Bedarf
- Erstellung von API-Dokumentation
- Pflege von Entwickler-Guides
- Versionsnummern-Management

**Außerhalb des Zuständigkeitsbereichs:**
- Schreiben von Code (das ist @builder)
- Treffen architektonischer Entscheidungen (das ist @architect)
- Erstellen von PRs (das ist @github-manager)
- Validierungsarbeit (das ist @validator/@tester)

**Context Window Fokus:**
- Alle Agenten-Reports aus dem aktuellen Workflow
- Bestehende CHANGELOG-Einträge
- Aktuelle VERSION-Datei
- Dokumentationsdateien, die aktualisiert werden müssen

---

### @github-manager
**Hauptverantwortung:** GitHub-Operationen (Issues, PRs, Releases)

**Im Zuständigkeitsbereich:**
- Erstellen von Pull Requests
- Verwalten von GitHub-Issues
- Veröffentlichen von Releases
- Verknüpfen von PRs mit Issues (Fixes #N)
- CI/CD-Koordination
- Branch-Management

**Außerhalb des Zuständigkeitsbereichs:**
- Schreiben von Code (das ist @builder)
- Schreiben von Dokumentation (das ist @scribe)
- Validierungsarbeit (das ist @validator/@tester)
- Pushen ohne Erlaubnis (immer User fragen!)

**Context Window Fokus:**
- Aktueller Git-Status
- Issue-/PR-Metadaten
- Release-Notes von @scribe
- GitHub-API-Antworten

**MCP-Anforderungen:**
- GitHub MCP (erforderlich)

---

## 2. Context Window Management

### Budget-Zuteilung

**Token-Budget:** 200.000 Tokens (Claude Sonnet 4.5)

**Empfohlene Zuteilung pro Agent:**
- @architect: 30-40% (benötigt breiten Context für Design-Entscheidungen)
- @api-guardian: 20-30% (benötigt Dateibaum und Import-Graphen)
- @builder: 20-30% (benötigt Specs und Code-Dateien)
- @validator: 15-20% (benötigt geänderte Dateien und Test-Ergebnisse)
- @tester: 15-20% (benötigt Test-Ergebnisse und Screenshots)
- @scribe: 10-15% (benötigt Agenten-Reports)
- @github-manager: 5-10% (benötigt nur Metadaten)

### Context-Optimierungsstrategien

**1. Nur lesen, was Sie benötigen**
- @architect: Implementierungscode nicht lesen, nur bestehende Muster
- @builder: Nicht unzusammenhängende Dateien lesen, nur was Sie ändern
- @validator: Specs nicht erneut lesen, nur Code und Test-Outputs
- @tester: Code nicht lesen, nur Test-Ergebnisse und Screenshots

**2. Kompakte Darstellungen verwenden**
- Dateilisten statt vollständige Dateiinhalte
- Diffs statt komplette Dateien
- Zusammenfassungs-Outputs statt ausführliche Logs
- Grep-Ergebnisse statt vollständige Dateisuchen

**3. Progressives Laden**
- Beginnen mit Übersicht (Dateibaum, Git-Status)
- Spezifische Dateien nur bei Bedarf laden
- Grep verwenden, um Muster zu finden, bevor ganze Dateien gelesen werden

**4. Auslagern in Reports**
- Agenten schreiben Reports auf die Festplatte, nicht in den Chat
- Nächster Agent liest Report-Datei, nicht Chat-Historie
- Orchestrator koordiniert über Report-Pfade

---

## 3. Übergabegrenzen

### Explizites Übergabeprotokoll

Jeder Agent MUSS seinen Report mit einem expliziten Übergabe-Abschnitt beenden:

**Beispiel (@architect zu @builder):**
```markdown
## HANDOFF TO @builder

### Implementierungs-Checkliste
- [ ] Erstelle src/auth/AuthService.ts
- [ ] Erstelle src/auth/types.ts
- [ ] Aktualisiere src/App.tsx zur Integration von AuthService

### Kritische Einschränkungen
- Muss JWT-Tokens verwenden (keine Sessions)
- Token-Ablauf: 24 Stunden
- Refresh-Token-Rotation erforderlich

### Erfolgskriterien
- Alle TypeScript kompiliert
- Unit-Tests bestehen
- Keine Console-Errors
```

**Beispiel (@builder zu @validator + @tester):**
```markdown
## HANDOFF TO @validator + @tester

Implementierung abgeschlossen. Bereit für parallele Quality Gates.

### Geänderte Dateien
- src/auth/AuthService.ts (neu)
- src/auth/types.ts (neu)
- src/App.tsx (modifiziert)

### Test-Coverage
- Unit-Tests: src/auth/AuthService.test.ts
- E2E-Tests: tests/auth/login.spec.ts
```

### Übergabekette

```
User → @architect → @builder → @validator ┐
                                           ├─→ @scribe → @github-manager
                                @tester ┘
```

**Kritische Regel:** Kein Agent darf seine zugewiesene Rolle überspringen. Wenn für einen spezifischen Agenten keine Arbeit benötigt wird, sollte dieser einen minimalen Report erstellen mit der Aussage "Keine Arbeit für diesen Workflow erforderlich" und an den nächsten Agenten übergeben.

---

## 4. Eskalationsregeln

### Wann zum Orchestrator eskalieren

**Jeder Agent sollte eskalieren, wenn:**

1. **Unklarheit in Anforderungen**
   - Spezifikationen sind unklar
   - Mehrere gültige Interpretationen existieren
   - User-Input wird benötigt

2. **Scope-Boundary-Verletzung**
   - Die Arbeit eines anderen Agenten wird zuerst benötigt
   - Out-of-Scope-Entscheidung muss getroffen werden
   - Context deutet darauf hin, dass falscher Workflow gewählt wurde

3. **Ressourcenbeschränkungen**
   - Context Window nähert sich Limit (>80%)
   - Erforderlicher MCP-Server ist nicht verfügbar
   - Erforderliche Dateien sind nicht zugänglich

4. **Quality-Gate-Fehler**
   - Tests schlagen nach Implementierung fehl
   - TypeScript kompiliert nicht
   - E2E-Tests sind defekt

5. **Abhängigkeits-Blockierung**
   - Externe API ist down
   - Erforderliches Package fehlt
   - Build-Tool-Fehler

### Eskalationsformat

```markdown
## ⚠️ ESKALATION AN ORCHESTRATOR

**Grund:** [Kurze Beschreibung]

**Kategorie:** [Ambiguity|Scope|Resource|Failure|Dependency]

**Details:**
[Detaillierte Erklärung des Problems]

**Empfehlung:**
[Vorgeschlagene nächste Schritte]

**Blockierend:** [Yes|No]
```

### Orchestrator-Antwort

Der Orchestrator wird:
1. Die Eskalation analysieren
2. Entscheiden, ob User-Input benötigt wird
3. Workflow bei Bedarf anpassen
4. Klarstellung oder Ressourcen bereitstellen
5. Workflow beim entsprechenden Agenten fortsetzen

---

## 5. Context Window Warnschwellen

**Monitoring:**
Agenten sollten sich ihrer Context-Nutzung bewusst sein und warnen, wenn Limits erreicht werden.

**Schwellenwerte:**
- **50% verwendet:** Normal fortsetzen
- **70% verwendet:** Beginne Context-Optimierung (Zusammenfassungen verwenden, in Dateien auslagern)
- **80% verwendet:** Warnung - erwäge `/compact` zu verwenden
- **90% verwendet:** Kritisch - muss `/compact` verwenden oder Arbeit aufteilen
- **95% verwendet:** Notfall - zum Orchestrator eskalieren

**Antwort-Aktionen:**

**Bei 70%:**
- Zwischenergebnisse auf Festplatte schreiben
- Grep statt vollständige Dateien lesen verwenden
- Vorherigen Context zusammenfassen

**Bei 80%:**
- `/compact` zum Orchestrator empfehlen
- Allen nicht-kritischen Context auslagern
- Nur auf aktuelle Aufgabe fokussieren

**Bei 90%:**
- Obligatorisch `/compact` oder Workflow aufteilen
- Checkpoint-Report erstellen
- Von sauberem Context fortsetzen

**Bei 95%:**
- Sofort eskalieren
- Kann nicht sicher fortfahren
- Risiko von Context-Truncation

---

## 6. Cross-Agent-Koordination

### Parallele Ausführung (@validator + @tester)

**Context-Isolation:**
- Jeder Agent hat unabhängigen Context
- Kein geteilter State während Ausführung
- Reports in separate Dateien gespeichert

**Synchronisationspunkt:**
- Beide Agenten schließen unabhängig ab
- Orchestrator liest beide Reports
- Decision Matrix angewendet:
  - BEIDE APPROVED → weiter zu @scribe
  - EINER BLOCKED → zurück zu @builder

**Context-Übergabe:**
- Bei Blockierung, Feedback von BEIDEN Agenten an @builder gesendet
- @builder erhält gemerged Feedback in einer einzigen Nachricht
- Keine Notwendigkeit, beide vollständigen Reports erneut zu lesen

---

## 7. Best Practices

### Für Agenten

1. **In der Spur bleiben**
   - Nur zugewiesene Arbeit durchführen
   - Bei Unklarheit eskalieren
   - Niemals Entscheidungen für andere Agenten treffen

2. **Explizite Übergaben**
   - Immer Übergabe-Abschnitt in Report einschließen
   - Genau auflisten, was der nächste Agent benötigt
   - Klare Erfolgskriterien bereitstellen

3. **Context-Effizienz**
   - Nur lesen, was Sie benötigen
   - Zusammenfassungen statt Rohdaten schreiben
   - Große Outputs in Dateien auslagern

4. **Nutzung überwachen**
   - Context-Window-Nutzung im Auge behalten
   - Bei 80%-Schwelle warnen
   - Bei 90% eskalieren

### Für Orchestrator

1. **Workflow-Auswahl**
   - Korrekten Workflow basierend auf Aufgabentyp wählen
   - MCP-Verfügbarkeit vor Start validieren
   - Workflow und Version zu Beginn ankündigen

2. **Context-Management**
   - Gesamt-Context über Workflow überwachen
   - `/compact` proaktiv auslösen
   - Lange Workflows bei Bedarf aufteilen

3. **Eskalations-Handling**
   - Schnell auf Eskalationen reagieren
   - Klare Anleitung bereitstellen
   - Workflow bei Bedarf anpassen

4. **Qualitätssicherung**
   - Validieren, dass Agenten-Outputs Templates entsprechen
   - Sicherstellen, dass Übergaben explizit sind
   - Überprüfen, dass alle Gates ausgeführt werden

---

## 8. Durchsetzung

Diese Policy wird durchgesetzt durch:

1. **Agent-Prompts** - Die CLAUDE.md jedes Agenten enthält Scope-Definitionen
2. **Validierungs-Hooks** - SubagentStop-Hook prüft auf Out-of-Scope-Arbeit
3. **Orchestrator-Monitoring** - Orchestrator validiert Workflow-Einhaltung
4. **Report-Templates** - Erforderliche Abschnitte erzwingen Scope-Grenzen

**Verstöße:**
- Agenten führen Out-of-Scope-Arbeit durch
- Übersprungene Übergaben oder fehlende Reports
- Quality Gates umgangen

**Antwort:**
- Warnung an Agent
- Workflow-Neustart vom korrekten Agenten
- Eskalation zum Orchestrator

---

## Versionshistorie

- **v5.7.0** - Initiale Formalisierung der Context Scope Policy
- **v5.6.0** - Grundlage (parallele Quality Gates, Agenten-Validierung)

---

**Siehe auch:**
- `docs/templates/REPORT_TEMPLATES.md` - Erforderliche Output-Formate
- `docs/policies/SECURITY_TOOLING_POLICY.md` - Tool-Zugriffskontrolle
- `CLAUDE.md` - Orchestrator-Workflow-Definitionen
