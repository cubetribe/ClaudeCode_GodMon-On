# Contributing to CC_GodMode 🤝

Erstmal: **Danke!** Dass du hier bist bedeutet, dass du entweder:
- a) Einen Bug gefunden hast
- b) Eine geniale Idee hast
- c) Dich verlaufen hast

Für alle drei Fälle: Willkommen!

---

## 🐛 Bugs melden

1. **Check erstmal** ob der Bug nicht schon gemeldet wurde (Issues durchsuchen)
2. **Öffne ein Issue** mit:
   - Was du erwartet hast
   - Was stattdessen passiert ist
   - Deine Umgebung (OS, Claude Code Version, Node Version)
   - Schritte zum Reproduzieren
3. **Bonus-Punkte** für Screenshots oder Logs

### Template:

```markdown
**Was sollte passieren:**
Der @validator sollte alle Consumer finden.

**Was passiert stattdessen:**
Er findet nur die Hälfte und macht dann Mittagspause.

**Umgebung:**
- macOS 14.x
- Claude Code 1.x.x
- Node 20.x

**Schritte zum Reproduzieren:**
1. ...
2. ...
3. Verzweiflung
```

---

## 💡 Feature Requests

Hast du eine Idee wie CC_GodMode noch besser werden kann?

1. **Öffne ein Issue** mit dem Label `enhancement`
2. Beschreibe:
   - Das Problem das du lösen willst
   - Deine vorgeschlagene Lösung
   - Alternativen die du erwogen hast

Keine Idee ist zu wild. Außer vielleicht "Claude soll mir auch Kaffee kochen". Das geht (noch) nicht.

---

## 🔧 Code beitragen

### Setup

```bash
# Fork das Repo auf GitHub
# Dann:
git clone https://github.com/DEIN-USERNAME/CC_GodMode.git
cd CC_GodMode
```

### Branch erstellen

```bash
git checkout -b feature/meine-geniale-idee
# oder
git checkout -b fix/der-nervige-bug
```

### Änderungen machen

- Halte dich an den bestehenden Code-Stil
- Teste deine Änderungen
- Schreibe sinnvolle Commit Messages

### Commit Message Format

```
type(scope): kurze beschreibung

Längere Beschreibung wenn nötig.

Types: feat, fix, docs, style, refactor, test, chore
```

**Beispiele:**
```
feat(agents): add @reviewer agent for code reviews
fix(hooks): handle files with spaces in path
docs(readme): add troubleshooting section
```

### Pull Request erstellen

1. Push deinen Branch: `git push origin feature/meine-geniale-idee`
2. Öffne einen Pull Request auf GitHub
3. Beschreibe deine Änderungen
4. Warte auf Review (ich versuche schnell zu sein, versprochen)

---

## 📁 Projekt-Struktur

```
CC_GodMode/
├── agents/           # Die Subagenten
├── scripts/          # Automation Scripts
├── templates/        # Projekt-Templates
├── config/           # Konfigurationsdateien
├── Agents/           # Generierte Reports (ignoriert in .gitignore)
└── docs/             # Zusätzliche Dokumentation
```

### Wo kommt was hin?

| Änderung | Datei/Ordner |
|----------|--------------|
| Neuer Agent | `agents/name.md` |
| Neues Script | `scripts/name.js` |
| Neues Template | `templates/name.template` |
| Dokumentation | `README.md` oder `docs/` |

---

## 🎨 Code Style

### Markdown (Agents, Docs)

- Verwende `##` für Hauptsektionen
- Code-Blöcke mit Sprach-Annotation (```bash, ```typescript)
- Tabellen für strukturierte Daten
- Emojis sind erlaubt (aber nicht übertreiben)

### JavaScript (Scripts)

- ES6+ Features nutzen
- Kommentare für komplexe Logik
- Error Handling nicht vergessen
- Keine externen Dependencies (nur Node built-ins)

---

## 🧪 Testen

Bevor du einen PR erstellst:

1. **Teste die Installation** (YOLO und Safe Mode)
2. **Teste die Agenten** in einem echten Projekt
3. **Teste die Hooks** mit verschiedenen Dateipfaden

### Quick Test Checklist

- [ ] Installation läuft durch
- [ ] Agenten werden erkannt
- [ ] Hooks triggern bei API-Dateien
- [ ] Reports landen in `Agents/`
- [ ] Nichts explodiert

---

## 🙋 Fragen?

- Öffne ein Issue mit dem Label `question`
- Oder schreib mir direkt (siehe README für Kontakt)

---

## 📜 Code of Conduct

Sei nett. Das ist eigentlich alles.

Genauer:
- Respektiere andere Contributors
- Konstruktive Kritik ist willkommen, Arschloch-Verhalten nicht
- Wir sind alle hier um zu lernen

---

<div align="center">

**Danke fürs Mitmachen!** 🎉

*"Alleine kann man Code schreiben. Zusammen kann man ihn auch verstehen."*

</div>
