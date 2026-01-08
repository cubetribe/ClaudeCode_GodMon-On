# RARE Verantwortungsmatrix

> **Definiert wer was in der CC_GodMode-Orchestrierung tut**

---

## RARE-Definitionen

| Rolle | Symbol | Beschreibung |
|------|--------|-------------|
| **Responsible** | **R** | Führt die Arbeit aus. Der Agent, der die Aufgabe ausführt und das Output produziert. |
| **Accountable** | **A** | Besitzt das Ergebnis. Trifft finale Entscheidungen und stellt Qualität sicher. Nur EINER pro Aktivität. |
| **Recommends** | **Re** | Stellt Input und Expertise bereit. Wird konsultiert für Empfehlungen, aber führt nicht aus. |
| **Executes** | **E** | Folgt Anweisungen. Führt spezifische Unteraufgaben aus, wie vom Responsible-Agenten angeleitet. |

### Kernprinzipien

1. **Ein Accountable pro Aktivität** - Immer genau ein A pro Zeile
2. **Responsible führt die Arbeit aus** - R produziert das Deliverable
3. **Recommends berät** - Re stellt Expertise ohne Ausführung bereit
4. **Executes folgt** - E führt angeleitete Unteraufgaben aus
5. **Orchestrator koordiniert** - Führt niemals aus, nur orchestriert

---

## Agenten-Verantwortungsmatrix

### Kern-Entwicklungsaktivitäten

| Aktivität | Orchestrator | @architect | @api-guardian | @builder | @validator | @tester | @scribe | @github-manager |
|----------|--------------|------------|---------------|----------|------------|---------|---------|-----------------|
| **System Design** | A | R | Re | - | - | - | - | - |
| **API Design** | A | R | Re | - | - | - | - | - |
| **API Impact Analysis** | A | Re | R | - | - | - | - | - |
| **Consumer Discovery** | A | - | R | - | - | - | - | - |
| **Code Implementation** | A | Re | - | R | - | - | - | - |
| **Type Definitions** | A | Re | Re | R | - | - | - | - |
| **Unit Testing** | A | - | - | R | E | - | - | - |
| **Code Quality Check** | A | - | - | - | R | - | - | - |
| **Security Scan** | A | - | - | - | R | - | - | - |
| **E2E Testing** | A | - | - | - | - | R | - | - |
| **Visual Regression** | A | - | - | - | - | R | - | - |
| **Accessibility Audit** | A | - | - | - | - | R | - | - |
| **Performance Testing** | A | - | - | - | - | R | - | - |
| **Documentation** | A | Re | - | - | - | - | R | - |
| **CHANGELOG Update** | A | - | - | - | - | - | R | - |
| **VERSION Update** | A | - | - | - | - | - | R | - |
| **PR Creation** | A | - | - | - | - | - | - | R |
| **Issue Processing** | A | - | - | - | - | - | - | R |
| **Release Management** | A | - | - | - | - | - | Re | R |

### Legende

- **R** = Responsible (führt die Arbeit aus)
- **A** = Accountable (besitzt Ergebnis, trifft Entscheidungen)
- **Re** = Recommends (stellt Expertise/Input bereit)
- **E** = Executes (führt Unteraufgaben aus wie angewiesen)
- **-** = Nicht beteiligt

---

## Entscheidungstyp-Zuweisungen

### Architektur-Entscheidungen

| Entscheidungstyp | Primärer Besitzer | Konsultiert | Informiert |
|--------------|---------------|-----------|----------|
| Modul-Struktur | @architect | Orchestrator | @builder |
| API-Contracts | @architect | @api-guardian | @builder, @scribe |
| Technologie-Auswahl | @architect | Orchestrator | Alle Agenten |
| Breaking Changes | @architect | @api-guardian | Alle Agenten |
| Performance-Architektur | @architect | @tester | @builder |

### Implementierungs-Entscheidungen

| Entscheidungstyp | Primärer Besitzer | Konsultiert | Informiert |
|--------------|---------------|-----------|----------|
| Code-Patterns | @builder | @architect | @validator |
| Test-Strategie | @builder | @validator, @tester | - |
| Refactoring-Ansatz | @builder | @architect | @validator |
| Error Handling | @builder | @architect | @validator |

### Qualitäts-Entscheidungen

| Entscheidungstyp | Primärer Besitzer | Konsultiert | Informiert |
|--------------|---------------|-----------|----------|
| Code-Qualitätsstandards | @validator | @architect | @builder |
| Test-Coverage-Anforderungen | @validator | @tester | @builder |
| Security-Policies | @validator | Orchestrator | Alle Agenten |
| Accessibility-Standards | @tester | @architect | @builder |
| Performance-Schwellenwerte | @tester | @architect | @builder |

### Dokumentations-Entscheidungen

| Entscheidungstyp | Primärer Besitzer | Konsultiert | Informiert |
|--------------|---------------|-----------|----------|
| Doc-Struktur | @scribe | @architect | Alle Agenten |
| API-Dokumentation | @scribe | @api-guardian | @builder |
| CHANGELOG-Format | @scribe | Orchestrator | Alle Agenten |
| Versions-Benennung | @scribe | Orchestrator | Alle Agenten |

### Release-Entscheidungen

| Entscheidungstyp | Primärer Besitzer | Konsultiert | Informiert |
|--------------|---------------|-----------|----------|
| Release-Timing | @github-manager | Orchestrator | Alle Agenten |
| PR-Strategie | @github-manager | Orchestrator | @scribe |
| Issue-Triage | @github-manager | Orchestrator | Relevante Agenten |
| CI/CD-Konfiguration | @github-manager | @builder | Alle Agenten |

---

## Orchestrator-Verantwortlichkeiten

Der Orchestrator (CLAUDE.md) hat einzigartige Verantwortlichkeiten, die alle Workflows umfassen:

### Koordinations-Verantwortlichkeiten

| Verantwortlichkeit | Beschreibung |
|----------------|-------------|
| **Workflow-Auswahl** | User-Request analysieren, passenden Workflow wählen |
| **Agenten-Sequenzierung** | Agenten-Reihenfolge basierend auf Abhängigkeiten bestimmen |
| **Versions-Management** | Zielversion setzen, bevor Arbeit beginnt |
| **Report-Ordner-Erstellung** | `reports/vX.X.X/` für jeden Workflow erstellen |
| **Gate-Durchsetzung** | Sicherstellen, dass Quality Gates bestehen, bevor fortgefahren wird |
| **Konflikt-Resolution** | Feedback zusammenführen, wenn mehrere Agenten Bedenken haben |
| **Meta-Entscheidungs-Anwendung** | Override-Regeln für Spezialfälle anwenden |

### Eskalations-Verantwortlichkeiten

| Situation | Orchestrator-Aktion |
|-----------|---------------------|
| Sicherheitsbedenken erkannt | An @validator eskalieren, Workflow anhalten |
| Breaking API Change | Durch @api-guardian routen (obligatorisch) |
| Beide Quality Gates schlagen fehl | Feedback zusammenführen, zu @builder zurück |
| MCP Health Check schlägt fehl | Graceful Degradation anwenden oder anhalten |
| Unklarer User-Request | Klarstellung anfordern, bevor fortgefahren wird |

### Accountability-Matrix

| Bereich | Orchestrator-Rolle |
|------|-------------------|
| Workflow-Korrektheit | **Accountable** |
| Agenten-Output-Qualität | Überwacht, Agenten sind Responsible |
| Dokumentations-Vollständigkeit | Überwacht, @scribe ist Responsible |
| Versions-Konsistenz | **Accountable** |
| Push-Erlaubnis | **Accountable** (muss User fragen) |

---

## Parallele Quality Gates Diagramm

```
                          @builder abgeschlossen
                                  |
                                  v
              +-------------------+-------------------+
              |                                       |
              v                                       v
    +------------------+                   +------------------+
    |    @validator    |                   |     @tester      |
    |------------------|                   |------------------|
    | R: Code-Qualität |                   | R: UX-Qualität   |
    | - TypeScript     |                   | - E2E-Tests      |
    | - Unit-Tests     |                   | - Visual Match   |
    | - Security       |                   | - A11y           |
    | - Consumer       |                   | - Performance    |
    +------------------+                   +------------------+
              |                                       |
              v                                       v
    +------------------+                   +------------------+
    | APPROVED/BLOCKED |                   | APPROVED/BLOCKED |
    +------------------+                   +------------------+
              |                                       |
              +-------------------+-------------------+
                                  |
                                  v
                    +---------------------------+
                    |      SYNC POINT           |
                    | Orchestrator koordiniert  |
                    +---------------------------+
                                  |
              +-------------------+-------------------+
              |                   |                   |
              v                   v                   v
     Beide APPROVED        Einer BLOCKED         Beide BLOCKED
              |                   |                   |
              v                   v                   v
         @scribe           @builder              @builder
                       (einzelnes Anliegen)  (gemerged Feedback)
```

### Decision Matrix Detail

| @validator Ergebnis | @tester Ergebnis | Orchestrator-Aktion | Verantwortlichkeit |
|-------------------|----------------|---------------------|----------------|
| APPROVED | APPROVED | Weiter zu @scribe | @scribe: R, Orchestrator: A |
| APPROVED | BLOCKED | Zurück zu @builder mit tester Feedback | @builder: R, @tester: Re |
| BLOCKED | APPROVED | Zurück zu @builder mit validator Feedback | @builder: R, @validator: Re |
| BLOCKED | BLOCKED | Feedback zusammenführen, zurück zu @builder | @builder: R, Beide: Re |

---

## Workflow-spezifische RARE-Zuweisungen

### Feature-Workflow

```
User Request
     |
     v
@architect (R: Design, A: Orchestrator)
     |
     v
@builder (R: Implementierung, A: Orchestrator)
     |
     +---> @validator (R: Code-Qualität) ----+
     |                                       |
     +---> @tester (R: UX-Qualität) ---------+
                                             |
                                             v
                                    @scribe (R: Dokumentation)
```

### API-Änderungs-Workflow

```
User Request
     |
     v
@architect (R: API Design, A: Orchestrator)
     |
     v
@api-guardian (R: Impact Analysis, A: Orchestrator)  <-- OBLIGATORISCH
     |
     v
@builder (R: Implementierung, A: Orchestrator)
     |
     +---> @validator (R: Code-Qualität + Consumer) --+
     |                                                 |
     +---> @tester (R: UX-Qualität) -------------------+
                                                       |
                                                       v
                                              @scribe (R: Dokumentation)
```

### Bug-Fix-Workflow

```
User Request
     |
     v
@builder (R: Fix-Implementierung, A: Orchestrator)
     |
     +---> @validator (R: Regression-Check) --+
     |                                         |
     +---> @tester (R: Fix-Verifikation) -----+
                                               |
                                               v
                                           (Abgeschlossen)
```

---

## Aktualisierung dieser Matrix

Wann aktualisieren:
- Neuer Agent hinzugefügt
- Agenten-Verantwortlichkeiten ändern sich
- Neuer Workflow eingeführt
- Entscheidungstyp-Besitz ändert sich

Aktualisierungsprozess:
1. Änderungen über @architect vorschlagen
2. Dieses Dokument aktualisieren
3. CLAUDE.md aktualisieren, falls Workflow betroffen
4. ADR-Eintrag in DECISIONS.md erstellen

---

*Dokument-Version: 1.0.0 (v5.8.0)*
