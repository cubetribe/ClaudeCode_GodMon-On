# Beitragen zu CC_GodMode 🤝

Zunächst einmal: **Danke!** Hier zu sein bedeutet, dass du entweder:
- a) Einen Bug gefunden hast
- b) Eine brillante Idee hast
- c) Dich verlaufen hast

Für alle drei Fälle: Willkommen!

---

## 🐛 Bugs melden

1. **Prüfe zuerst** ob der Bug nicht bereits gemeldet wurde (durchsuche Issues)
2. **Öffne ein Issue** mit:
   - Was du erwartet hast
   - Was stattdessen passiert ist
   - Deine Umgebung (OS, Claude Code Version, Node Version)
   - Schritte zur Reproduktion
3. **Bonuspunkte** für Screenshots oder Logs

### Template:

```markdown
**Was passieren sollte:**
Der @validator sollte alle Consumer finden.

**Was stattdessen passiert:**
Er findet nur die Hälfte und macht dann Mittagspause.

**Umgebung:**
- macOS 14.x
- Claude Code 1.x.x
- Node 20.x

**Schritte zur Reproduktion:**
1. ...
2. ...
3. Verzweifeln
```

---

## 💡 Feature-Anfragen

Hast du eine Idee wie CC_GodMode noch besser werden kann?

1. **Öffne ein Issue** mit dem Label `enhancement`
2. Beschreibe:
   - Das Problem das du lösen möchtest
   - Deine vorgeschlagene Lösung
   - Alternativen die du erwogen hast

Keine Idee ist zu verrückt. Außer vielleicht "Claude sollte mir auch Kaffee machen". Das funktioniert (noch) nicht.

---

## 🔧 Code beitragen

### Setup

```bash
# Forke das Repo auf GitHub
# Dann:
git clone https://github.com/DEIN-BENUTZERNAME/ClaudeCode_GodMode-On.git
cd ClaudeCode_GodMode-On
```

### Branch erstellen

```bash
git checkout -b feature/meine-brillante-idee
# oder
git checkout -b fix/dieser-nervige-bug
```

### Änderungen vornehmen

- Halte dich an den bestehenden Code-Stil
- Teste deine Änderungen
- Schreibe aussagekräftige Commit-Messages

### Commit-Message-Format

```
typ(scope): kurze Beschreibung

Längere Beschreibung falls nötig.

Typen: feat, fix, docs, style, refactor, test, chore
```

**Beispiele:**
```
feat(agents): @reviewer Agent für Code-Reviews hinzugefügt
fix(hooks): Dateien mit Leerzeichen im Pfad behandeln
docs(readme): Troubleshooting-Sektion hinzugefügt
```

### Pull Request erstellen

1. Pushe deinen Branch: `git push origin feature/meine-brillante-idee`
2. Öffne einen Pull Request auf GitHub
3. Beschreibe deine Änderungen
4. Warte auf Review (ich versuche schnell zu sein, versprochen)

---

## 📁 Projektstruktur

```
CC_GodMode/
├── agents/           # Die Subagenten
├── scripts/          # Automatisierungs-Scripts
├── templates/        # Projekt-Templates
├── config/           # Konfigurationsdateien
├── reports/          # Generierte Reports (in .gitignore ignoriert)
└── docs/             # Zusätzliche Dokumentation
```

### Wo kommt was hin?

| Änderung | Datei/Ordner |
|--------|-------------|
| Neuer Agent | `agents/name.md` |
| Neues Script | `scripts/name.js` |
| Neues Template | `templates/name.template` |
| Dokumentation | `README.md` oder `docs/` |

---

## 🎨 Code-Stil

### Markdown (Agenten, Docs)

- Nutze `##` für Hauptabschnitte
- Code-Blöcke mit Sprach-Annotation (```bash, ```typescript)
- Tabellen für strukturierte Daten
- Emojis sind erlaubt (aber nicht übertreiben)

### JavaScript (Scripts)

- Nutze ES6+ Features
- Kommentare für komplexe Logik
- Vergiss nicht die Fehlerbehandlung
- Keine externen Dependencies (nur Node Built-ins)

---

## 🧪 Testen

Vor dem Erstellen eines PR:

1. **Teste die Installation** (YOLO und Safe Mode)
2. **Teste die Agenten** in einem echten Projekt
3. **Teste die Hooks** mit verschiedenen Dateipfaden

### Quick Test Checkliste

- [ ] Installation läuft durch
- [ ] Agenten werden erkannt
- [ ] Hooks triggern für API-Dateien
- [ ] Reports landen in `reports/`
- [ ] Nichts explodiert

---

## 🙋 Fragen?

- Öffne ein Issue mit dem Label `question`
- Oder schreib mir direkt (siehe README für Kontakt)

---

## 📜 Code of Conduct

Sei nett. Das ist im Grunde alles.

Genauer gesagt:
- Respektiere andere Beitragende
- Konstruktive Kritik ist willkommen, Arschloch-Verhalten nicht
- Wir sind alle hier um zu lernen

---

<div align="center">

**Danke fürs Beitragen!** 🎉

*"Alleine kannst du Code schreiben. Zusammen kannst du ihn auch verstehen."*

</div>
