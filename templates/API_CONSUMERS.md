# API Consumer Registry

> ⚠️ This file MUST be kept up to date with every API change!
> Last updated: 2025-12-07

## Quick Reference: Finding Consumers

```bash
# Search for type name
grep -rn "TypeName" src/ --include="*.ts*"

# Search for endpoint
grep -rn "/api/v1/endpoint" src/ --include="*.ts*"
```

---

## /api/v1/users

**Backend:** `backend/routes/users.ts`
**Types:** `shared/types/User.ts`

| Consumer | Path | Usage |
|----------|------|-------|
| useUsers Hook | `src/hooks/useUsers.ts:15` | Data Fetching |
| UserList | `src/components/UserList.tsx:23` | Display |
| UserService | `src/api/userService.ts:8` | API Client |

### Check when changing

- [ ] Response schema → all consumer destructurings
- [ ] URL change → all fetch/axios calls
- [ ] Auth change → all header configs

---

## /api/v1/products

**Backend:** `backend/routes/products.ts`
**Types:** `shared/types/Product.ts`

| Consumer | Path | Usage |
|----------|------|-------|
| useProducts | `src/hooks/useProducts.ts:12` | Data Fetching |
| ProductCard | `src/components/ProductCard.tsx:34` | Display |
| CartService | `src/services/cart.ts:45` | Cart Logic |

---

## Template for New Endpoints

```markdown
## /api/v1/[endpoint]

**Backend:** `backend/routes/[file].ts`
**Types:** `shared/types/[Type].ts`

| Consumer | Path | Usage |
|----------|------|-------|
| [Name] | `[path:line]` | [Purpose] |

### Check when changing

- [ ] [Specific checkpoints]
```
