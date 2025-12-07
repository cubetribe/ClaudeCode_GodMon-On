# API Consumer Registry

> ⚠️ Diese Datei MUSS aktuell gehalten werden bei jeder API-Änderung!
> Letzte Aktualisierung: 2025-12-07

## Schnell-Referenz: Consumer finden

```bash
# Nach Type-Name suchen
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
| useUsers Hook | `src/hooks/useUsers.ts:15` | Data Fetching |
| UserList | `src/components/UserList.tsx:23` | Display |
| UserService | `src/api/userService.ts:8` | API Client |

### Bei Änderungen prüfen

- [ ] Response-Schema → alle Consumer-Destructurings
- [ ] URL-Änderung → alle fetch/axios-Calls
- [ ] Auth-Änderung → alle Header-Configs

---

## /api/v1/products

**Backend:** `backend/routes/products.ts`
**Types:** `shared/types/Product.ts`

| Consumer | Pfad | Verwendung |
|----------|------|------------|
| useProducts | `src/hooks/useProducts.ts:12` | Data Fetching |
| ProductCard | `src/components/ProductCard.tsx:34` | Display |
| CartService | `src/services/cart.ts:45` | Cart Logic |

---

## Template für neue Endpoints

```markdown
## /api/v1/[endpoint]

**Backend:** `backend/routes/[file].ts`
**Types:** `shared/types/[Type].ts`

| Consumer | Pfad | Verwendung |
|----------|------|------------|
| [Name] | `[pfad:zeile]` | [Zweck] |

### Bei Änderungen prüfen

- [ ] [Spezifische Prüfpunkte]
```
