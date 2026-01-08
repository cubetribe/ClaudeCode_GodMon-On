<div align="center">

# CC_GodMode

### *"What happens when an AI system is used to improve itself?"*

**You're looking at the answer.**

[![Version](https://img.shields.io/badge/Version-5.8.0-blue)](./CHANGELOG.md)
[![State of the Art](https://img.shields.io/badge/2026%20Compliance-93%25-green)](./reports/)
[![Agents](https://img.shields.io/badge/Agents-7%20Specialists-purple)](./agents/)
[![Self-Improving](https://img.shields.io/badge/Self--Improving-Yes%2C%20Really-red)](./CHANGELOG.md)

</div>

---

## The Story

It started simple: One developer, mass sleep deprivation, and a vision.

**Phase 1:** Manual labor. Researching best practices. Reading docs. Testing prompts. Failing. Iterating. Building agent after agent. Workflow after workflow. Week after week.

**Phase 2:** The system works. 7 specialized AI agents orchestrating themselves. Features get built. Bugs get fixed. Documentation writes itself. *"This is pretty good,"* I thought.

**Phase 3:** January 6th, 2026. A thought: *"What if I use the system... to improve the system?"*

I gave it one prompt. The orchestrator delegated to the research team. Analyzed its own architecture. Found inefficiencies. Proposed improvements. Implemented them. Validated itself. Documented the changes.

**The loop closed.**

**Phase 4:** You're reading this README. An AI wrote parts of it. An AI will improve it. The experiment continues.

---

## What Is This?

**CC_GodMode** transforms Claude Code into a self-orchestrating development team.

**You say WHAT. The AI figures out HOW.**

```
You: "I need user authentication with JWT"

Orchestrator:
  → Analyzes request
  → Determines version (5.5.0)
  → Creates report folder
  → Delegates to @architect for design
  → Delegates to @api-guardian for API impact
  → Delegates to @builder for implementation
  → @validator checks code quality
  → @tester checks UX quality
  → @scribe documents everything
  → @github-manager creates PR

You: *drinks coffee*
```

The difference?

| Without CC_GodMode | With CC_GodMode |
|:---|:---|
| You: "Design the feature" | You: "Build Feature X" |
| You: "Now implement it" | ☕ |
| You: "Check the types" | ☕ |
| You: "Update the consumers" | ☕ |
| You: "Write the docs" | ☕ |
| You: "Did I forget something?" | AI: "Done. Here's the report." |

---

## The Agents

7 specialists. Each with their own expertise. Each knowing exactly what they do—and what they don't.

| Agent | Role | Specialty |
|:------|:-----|:----------|
| `@architect` | System Architect | High-level design, module structure, tech decisions |
| `@api-guardian` | API Lifecycle Expert | Breaking changes, consumer impact, contract validation |
| `@builder` | Senior Developer | Implementation, following @architect's specifications |
| `@validator` | Code Quality Gate | TypeScript, unit tests, security, consumer verification |
| `@tester` | UX Quality Gate | E2E tests, visual regression, accessibility, performance |
| `@scribe` | Technical Writer | Documentation, changelog, version management |
| `@github-manager` | GitHub Manager | Issues, PRs, releases, CI/CD orchestration |

**Dual Quality Gates:**

```
                    @builder completes
                           │
           ┌───────────────┴───────────────┐
           ▼                               ▼
    ┌─────────────┐                 ┌─────────────┐
    │ @validator  │                 │  @tester    │
    │ Code Quality│                 │ UX Quality  │
    ├─────────────┤                 ├─────────────┤
    │ ✓ TypeScript│                 │ ✓ E2E Tests │
    │ ✓ Unit Tests│                 │ ✓ Visuals   │
    │ ✓ Security  │                 │ ✓ A11y      │
    │ ✓ Consumers │                 │ ✓ Perf      │
    └──────┬──────┘                 └──────┬──────┘
           │                               │
           └───────────────┬───────────────┘
                           ▼
                   Both gates passed?
                   → Continue to @scribe
```

---

## The Architecture

```
~/.claude/                          ← RUNTIME (What Claude loads)
├── agents/                         ← 7 agents, globally available
│   ├── architect.md
│   ├── api-guardian.md
│   ├── builder.md
│   ├── validator.md
│   ├── tester.md
│   ├── scribe.md
│   └── github-manager.md
├── scripts/                        ← Hook scripts
│   └── check-api-impact.js
├── templates/                      ← Project templates
│   ├── CLAUDE-ORCHESTRATOR.md
│   └── CC-GodMode-Prompts/CCGM_Prompt_ProjectSetup.md
└── settings.json                   ← Hooks configuration
```

```
your-project/                       ← YOUR PROJECT
├── CLAUDE.md                       ← Orchestrator (auto-loaded!)
├── VERSION                         ← Single source of truth
├── CHANGELOG.md                    ← Version history
└── reports/                        ← Agent outputs
    └── v5.1.0/                     ← Grouped by version
        ├── 00-architect-report.md
        └── ...
```

**The trick:** `CLAUDE.md` is automatically loaded by Claude Code. No copy-paste. No activation. Just... works.

---

## Agent Architecture

CC_GodMode uses a **dual-location model** for agents:

```
┌─────────────────────────────────────────────────────────────────────┐
│                    AGENT DUAL-LOCATION MODEL                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   GitHub Repository                    Your System                   │
│   ════════════════                    ════════════                   │
│                                                                      │
│   CC_GodMode/                         ~/.claude/                     │
│   └── agents/           ──INSTALL──►  └── agents/                   │
│       ├── architect.md                    ├── architect.md          │
│       ├── builder.md                      ├── builder.md            │
│       ├── validator.md                    ├── validator.md          │
│       └── ...                             └── ...                   │
│                                                                      │
│   📦 SOURCE                            🚀 RUNTIME                    │
│   • Version controlled                 • Actually loaded by Claude   │
│   • Templates for Git                  • System-wide available       │
│   • Update here, reinstall             • Used during workflows       │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

**Why this design?**
- **Source** (`/agents/`): Tracked in Git, shareable, updatable
- **Runtime** (`~/.claude/agents/`): Where Claude Code actually looks for agents

**Update flow:**
1. Modify agent in `/agents/` (source)
2. Run installation script
3. Changes copied to `~/.claude/agents/` (runtime)
4. Claude Code uses updated agents

---

## The Workflows

The Orchestrator selects the right workflow automatically:

**New Feature:**
```
@architect → @builder → (@validator ∥ @tester) → @scribe
```

**Bug Fix:**
```
@builder → (@validator ∥ @tester)
```

**API Change (Critical!):**
```
@architect → @api-guardian → @builder → (@validator ∥ @tester) → @scribe
```

**Refactoring:**
```
@architect → @builder → (@validator ∥ @tester)
```

**Note:** Since v5.6.0, quality gates run in PARALLEL (∥ symbol) for 40% faster validation.

**Release:**
```
@scribe → @github-manager
```

---

## The Hook

The secret ingredient: A PostToolUse hook that runs after every file change.

```
Developer changes: shared/types/User.ts
                          │
                          ▼
              ┌───────────────────────┐
              │  check-api-impact.js  │  ← AUTOMATICALLY
              │                       │
              │  • Detects API change │
              │  • Analyzes diff      │
              │  • Finds consumers    │
              │  • Warns about breaks │
              └───────────────────────┘
                          │
                          ▼
╔═══════════════════════════════════════════════════════════╗
║  ⚠️  API/TYPE FILE CHANGE DETECTED                         ║
║                                                            ║
║  📁 File: shared/types/User.ts                             ║
║  🔴 BREAKING: Removed field 'email'                        ║
║  📍 5 consumers found                                      ║
║                                                            ║
║  ⚡ @api-guardian MUST be called!                          ║
╚═══════════════════════════════════════════════════════════╝
```

Nothing gets forgotten. The hook remembers for you.

---

## Installation

### One-Shot Install (Recommended)

> One prompt. Claude installs everything.

**Step 1:** Start Claude with permissions:
```bash
claude --dangerously-skip-permissions
```

**Step 2:** Copy the entire content from [`CC-GodMode-Prompts/CCGM_Prompt_Install.md`](./CC-GodMode-Prompts/CCGM_Prompt_Install.md) and paste it.

**Step 3:** Watch. Claude will:
- Clone the repository
- Install 7 agents globally
- Set up hook scripts
- Install Memory MCP Server
- Configure and verify

**Why `--dangerously-skip-permissions`?** 30+ file operations. Without it, you'd confirm each one manually.

### Manual Install

See [`CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md`](./CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md) for step-by-step instructions.

---

## Prompt Files

CC_GodMode includes ready-to-use prompts for different scenarios:

| Prompt File | Purpose | When to Use |
|-------------|---------|-------------|
| [`CCGM_Prompt_Install.md`](./CC-GodMode-Prompts/CCGM_Prompt_Install.md) | One-shot installation | First-time setup with `--dangerously-skip-permissions` |
| [`CCGM_Prompt_ManualInstall.md`](./CC-GodMode-Prompts/CCGM_Prompt_ManualInstall.md) | Step-by-step installation | When you prefer manual control |
| [`CCGM_Prompt_ProjectSetup.md`](./CC-GodMode-Prompts/CCGM_Prompt_ProjectSetup.md) | Inject orchestrator into project | Adding CC_GodMode to existing project's CLAUDE.md |
| [`CCGM_Prompt_Restart.md`](./CC-GodMode-Prompts/CCGM_Prompt_Restart.md) | **CRITICAL** Context recovery | After `/compact`, long sessions, or **every fresh session** |

### When to Use Which Prompt

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         PROMPT DECISION TREE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  Is CC_GodMode installed globally (~/.claude/)?                             │
│     │                                                                       │
│     ├── NO → Use CCGM_Prompt_Install.md (one-time setup)                   │
│     │                                                                       │
│     └── YES → Does your project have CLAUDE.md?                            │
│                  │                                                          │
│                  ├── NO → Copy CCGM_Prompt_ProjectSetup.md into CLAUDE.md  │
│                  │                                                          │
│                  └── YES → Is this a fresh/new session?                    │
│                              │                                              │
│                              └── YES → Use CCGM_Prompt_Restart.md          │
│                                        (CRITICAL - Do this EVERY TIME!)    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

### CRITICAL: The Restart Prompt

**Why is `CCGM_Prompt_Restart.md` so important?**

Claude Code does NOT automatically remember orchestrator mode between sessions. Even if:
- CC_GodMode is installed globally
- Your project has CLAUDE.md configured
- Everything worked perfectly yesterday

**You MUST use the Restart Prompt when:**
1. Starting a **new/fresh Claude Code session**
2. After using **`/compact`** (context summarization)
3. After **long sessions** where Claude seems to "forget"
4. When Claude **starts implementing instead of delegating**

**Signs you need the Restart Prompt:**
- Claude writes code instead of calling agents
- Claude forgets to call @api-guardian for API changes
- Claude skips quality gates (@validator or @tester)
- Claude pushes without asking permission

### Quick Reference

| Scenario | Action |
|----------|--------|
| **First time ever** | `CCGM_Prompt_Install.md` |
| **New project (CC_GodMode already installed)** | Copy `CCGM_Prompt_ProjectSetup.md` into CLAUDE.md |
| **Every new session** | Paste `CCGM_Prompt_Restart.md` |
| **After /compact** | Paste `CCGM_Prompt_Restart.md` |
| **Claude seems confused** | Paste `CCGM_Prompt_Restart.md` |

**TL;DR:** Install once, restart every session.

---

## Activate in Your Project

After installation, for each project:

**macOS / Linux:**
```bash
cd your-project
cp ~/.claude/templates/CLAUDE-ORCHESTRATOR.md ./CLAUDE.md
claude
```

**Windows:**
```powershell
cd your-project
Copy-Item "$env:USERPROFILE\.claude\templates\CLAUDE-ORCHESTRATOR.md" ".\CLAUDE.md"
claude
```

The CLAUDE.md is auto-loaded. Orchestrator mode is active.

---

## MCP Servers

Enhanced capabilities through Model Context Protocol:

| Server | Agent | Purpose | Required? |
|:-------|:------|:--------|:----------|
| **memory** | All | Persistent knowledge | ✅ Installed |
| **playwright** | @tester | Browser automation, E2E | Recommended |
| **github** | @github-manager | Issues, PRs, Releases | Recommended |
| **lighthouse** | @tester | Performance audits | Optional |
| **a11y** | @tester | Accessibility testing | Optional |

```bash
# Install recommended MCPs
claude mcp add playwright -- npx @playwright/mcp@latest
claude mcp add lighthouse -- npx lighthouse-mcp
claude mcp add a11y -- npx a11y-mcp

# GitHub MCP (requires token)
export GITHUB_TOKEN="your_token"
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=$GITHUB_TOKEN \
  -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN \
  ghcr.io/github/github-mcp-server
```

---

## The Rules

1. **Version-First** — Determine version BEFORE any work starts
2. **@architect is the Gate** — No feature starts without design
3. **@api-guardian is MANDATORY** — For any API change
4. **Dual Quality Gates** — Both @validator AND @tester must pass
5. **No Skipping** — Every agent in workflow executes
6. **Reports in reports/vX.X.X/** — Organized by version
7. **NEVER push without permission** — Applies to ALL agents

---

## Documentation

CC_GodMode includes comprehensive documentation for understanding and extending the system:

### Core Documentation
- **[CHANGELOG.md](./CHANGELOG.md)** - Full version history and evolution of the system
- **[AGENT_ARCHITECTURE.md](./docs/AGENT_ARCHITECTURE.md)** - Understanding the dual-location model
- **[AGENT_MODEL_SELECTION.md](./docs/AGENT_MODEL_SELECTION.md)** - Cost optimization and ROI analysis

### Policy Documents (NEW in v5.7.0)
- **[REPORT_TEMPLATES.md](./docs/templates/REPORT_TEMPLATES.md)** - Standardized formats for all 7 agents
- **[CONTEXT_SCOPE_POLICY.md](./docs/policies/CONTEXT_SCOPE_POLICY.md)** - Agent boundaries and responsibilities
- **[SECURITY_TOOLING_POLICY.md](./docs/policies/SECURITY_TOOLING_POLICY.md)** - Tool access control matrix

These documents transform implicit knowledge into explicit contracts, making the system more maintainable and predictable.

---

## Context Recovery

Claude Code's `/compact` can cause memory loss. When the orchestrator starts implementing instead of delegating:

1. Open [`CC-GodMode-Prompts/CCGM_Prompt_Restart.md`](./CC-GodMode-Prompts/CCGM_Prompt_Restart.md)
2. Copy the restart prompt
3. Paste into chat
4. Orchestrator mode restored

**Signs you need restart:**
- Claude writes code instead of calling agents
- Claude forgets @api-guardian for API changes
- Claude skips quality gates (@validator or @tester)
- Claude pushes without permission
- Claude writes reports to wrong folder (should be `reports/v[VERSION]/`)

---

## FAQ

**Q: Why 7 agents?**
A: Separation of concerns. Each agent has ONE job. No overlap. No confusion.

**Q: What's the difference between @validator and @tester?**
A: @validator = code quality (TypeScript, tests, security). @tester = UX quality (E2E, visual, a11y, perf).

**Q: Can I skip @tester?**
A: For backend-only changes, yes. For anything UI-related, no.

**Q: Can agents push without my permission?**
A: No. "NEVER git push without permission" is enforced across all agents.

**Q: Is this just... AI improving AI?**
A: Yes. That's the unsettling part. And the fascinating part. Same thing, really.

---

## The Meta

This README was partly written by an AI.
The system that wrote it will improve it.
The loop continues.

---

## Version

**CC_GodMode v5.8.0**

- Meta-decision logic for intelligent workflow adaptation
- Governance features (DECISIONS.md ADR log, RARE Matrix)
- Domain-pack architecture for industry-specific validation
- Three-tier escalation mechanism for error recovery
- State-of-the-Art 2026 compliance: 93%
- 7 specialized agents with clear boundaries
- Dual quality gates (40% faster since v5.6.0)
- Hook-based API detection
- Version-first workflow

See [CHANGELOG.md](./CHANGELOG.md) for the full story.

---

## Credits

**Dennis Westermann** ([www.dennis-westermann.de](https://www.dennis-westermann.de))
*Years of suffering, distilled into this repo. Now the repo improves itself. Was it worth it?*

---

## License

**Proprietary License** — Private use permitted. Commercial use requires permission.

Copyright (c) 2025 Dennis Westermann

---

<div align="center">

**Made with mass sleep deprivation**

*The experiment continues.*

⭐ Star if you're not too unsettled ⭐

</div>
