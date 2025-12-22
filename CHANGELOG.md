# Changelog

All notable changes to CC_GodMode will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.0] - 2024-12-22

### Added

- **New Agent: `@api-guardian`** - Dedicated API Lifecycle Expert
  - Breaking change detection via git diff analysis
  - Consumer discovery and impact analysis
  - Migration checklist generation
  - API versioning strategy recommendations
  - Single Point of Truth for all API-related decisions

- **Enhanced Hook Script** (`check-api-impact.js`)
  - Breaking change detection with severity levels (HIGH/MEDIUM)
  - Improved consumer discovery
  - Structured output with clear sections
  - Automatic workflow recommendations
  - Support for OpenAPI and GraphQL schema files

- **Version tracking**
  - Added CHANGELOG.md
  - Version badge in README.md
  - Renamed ORCHESTRATOR-PROMPT.md to ORCHESTRATOR-PROMPT-V2.md

### Changed

- **`@architect`** - Now focused on high-level design only
  - Removed: API contract validation (moved to @api-guardian)
  - Removed: Consumer impact analysis (moved to @api-guardian)
  - Added: Explicit "What You Do NOT Do" section
  - Added: Clear handoff instructions to other agents

- **`@builder`** - Now pure implementation agent
  - Removed: Consumer search responsibility (moved to @api-guardian)
  - Added: Receives file list from @api-guardian
  - Added: Explicit "What You Do NOT Do" section
  - Added: Clear workflow for API file changes

- **`@validator`** - Now focused on verification only
  - Removed: Consumer discovery (moved to @api-guardian)
  - Added: Verifies against @api-guardian's consumer list
  - Added: Explicit "What You Do NOT Do" section
  - Added: Structured validation workflow

- **`@scribe`** - Now receives data from @api-guardian
  - Removed: Independent consumer analysis
  - Added: Uses @api-guardian's consumer matrix for registry
  - Added: Explicit "What You Do NOT Do" section

- **Workflow for API Changes**
  - Old: `@architect` → `@builder` → `@validator` → `@scribe`
  - New: `@architect` → `@api-guardian` → `@builder` → `@validator` → `@scribe`

### Fixed

- Eliminated overlapping responsibilities between agents
- Clear separation of concerns for API-related tasks
- No more redundant consumer searches by multiple agents

---

## [1.0.0] - 2024-12-07

### Added

- Initial release of CC_GodMode
- 4 Subagents: `@architect`, `@builder`, `@validator`, `@scribe`
- Orchestrator workflow system
- Basic `check-api-impact.js` hook script
- API Consumer Registry template
- YOLO Mode installation option
- Global and project-specific configuration support

### Features

- Automated task delegation via Orchestrator
- Cross-file consistency checking
- API consumer tracking
- Automatic documentation updates
- TypeScript/React/Node.js optimized workflows

---

## Version History Summary

| Version | Date | Agents | Key Feature |
|---------|------|--------|-------------|
| 2.0.0 | 2024-12-22 | 5 | `@api-guardian` + Enhanced Hooks |
| 1.0.0 | 2024-12-07 | 4 | Initial Release |

---

## Upgrade Guide: v1.0.0 → v2.0.0

### 1. Update Agent Files

Copy the new agent files to your global Claude config:

```bash
cp agents/*.md ~/.claude/agents/
```

### 2. Update Hook Script

```bash
cp scripts/check-api-impact.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/check-api-impact.js
```

### 3. Update Your Workflow

**Old workflow for API changes:**
```
@architect → @builder → @validator → @scribe
```

**New workflow for API changes:**
```
@architect → @api-guardian → @builder → @validator → @scribe
```

### 4. Use New Orchestrator Prompt

Use `ORCHESTRATOR-PROMPT-V2.md` instead of the old prompt.

---

## Links

- [README](./README.md)
- [Installation Guide](./INSTALLATION.md)
- [Orchestrator Prompt V2](./ORCHESTRATOR-PROMPT-V2.md)
