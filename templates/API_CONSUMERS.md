# API Consumer Registry

> ⚠️ Diese Datei MUSS bei jeder API-Änderung aktuell gehalten werden!
> Zuletzt aktualisiert: 2025-12-07

## Schnellreferenz: Consumer finden

```bash
# Nach Typ-Namen suchen
grep -rn "TypeName" src/ --include="*.ts*"

# Nach Endpoint suchen
grep -rn "/api/v1/endpoint" src/ --include="*.ts*"
```

---

## /api/v1/users

**Backend:** `backend/routes/users.ts`
**Types:** `shared/types/User.ts`

| Consumer | Pfad | Verwendung |
|----------|------|------------|
| useUsers Hook | `src/hooks/useUsers.ts:15` | Datenabruf |
| UserList | `src/components/UserList.tsx:23` | Anzeige |
| UserService | `src/api/userService.ts:8` | API Client |

### Prüfen bei Änderung

- [ ] Response-Schema → alle Consumer-Destrukturierungen
- [ ] URL-Änderung → alle fetch/axios-Aufrufe
- [ ] Auth-Änderung → alle Header-Configs

---

## /api/v1/products

**Backend:** `backend/routes/products.ts`
**Types:** `shared/types/Product.ts`

| Consumer | Pfad | Verwendung |
|----------|------|------------|
| useProducts | `src/hooks/useProducts.ts:12` | Datenabruf |
| ProductCard | `src/components/ProductCard.tsx:34` | Anzeige |
| CartService | `src/services/cart.ts:45` | Warenkorb-Logik |

---

## Template für neue Endpoints

```markdown
## /api/v1/[endpoint]

**Backend:** `backend/routes/[file].ts`
**Types:** `shared/types/[Type].ts`

| Consumer | Pfad | Verwendung |
|----------|------|------------|
| [Name] | `[pfad:zeile]` | [Zweck] |

### Prüfen bei Änderung

- [ ] [Spezifische Prüfpunkte]
```
