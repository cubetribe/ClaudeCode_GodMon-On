# CC_GodMode 🚀⚡

> **Years of trial, error, and mass prompt engineering - distilled into one glorious package.**

[![Version](https://img.shields.io/badge/Version-2.0.0-blue)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Subagents](https://img.shields.io/badge/Subagents-5%20Specialists-green)](./agents/)
[![YOLO Mode](https://img.shields.io/badge/YOLO%20Mode-Available-red)](./INSTALLATION.md)

> **Version 2.0.0** - 5-Agent System with `@api-guardian` | [See CHANGELOG](./CHANGELOG.md)

---

## What is CC_GodMode? 🤔

**CC_GodMode** transforms your AI coding setup into a self-orchestrating machine.

### The Problem

You tell your AI assistant "Build feature X" and then... chaos:
- You have to trigger every step manually
- You forget to update API consumers
- Documentation falls behind
- TypeScript screams, tests cry, tech lead gives you the look

### The Solution

With CC_GodMode you give **one single prompt** - and everything else runs automatically:

```
You: "I need user authentication with JWT"

AI (now Orchestrator):
  → Calls @architect for high-level design
  → Calls @api-guardian for API impact analysis
  → Calls @builder for implementation
  → Calls @validator for quality checks
  → Calls @scribe for documentation
  → Hooks automatically warn about API changes

You: *drinks coffee*
```

**You say WHAT. The AI decides HOW and delegates autonomously.**

---

## How does it work? 🧠

### The Orchestrator Loop

```
┌─────────────────────────────────────────────────────────────┐
│                        YOU                                   │
│                   "Build Feature X"                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              🤖 AI BECOMES THE ORCHESTRATOR                  │
│                                                              │
│   "Ok, for this feature I need..."                          │
│                                                              │
│   1. @architect for high-level design                       │
│   2. @api-guardian for API contracts (if API changes)       │
│   3. @builder for implementation                            │
│   4. @validator for quality checks                          │
│   5. @scribe for documentation                              │
│                                                              │
│   "Starting the workflow now..."                            │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   @architect         @api-guardian        @builder
   (Subagent)          (Subagent)         (Subagent)
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ┌───────┴───────┐
                    ▼               ▼
               @validator       @scribe
               (Subagent)      (Subagent)
                    │               │
                    └───────┬───────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 🪝 HOOKS RUN AUTOMATICALLY                   │
│                                                              │
│   On every file change:                                     │
│   → check-api-impact.js detects API changes                 │
│   → Analyzes breaking changes                               │
│   → Finds affected consumers                                │
│   → Triggers @api-guardian workflow                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        YOU                                   │
│               "Feature is done. Nice."                       │
└─────────────────────────────────────────────────────────────┘
```

### The Difference to Normal Prompting

| Without CC_GodMode | With CC_GodMode |
|--------------------|-----------------|
| You: "Design the feature" | You: "Build Feature X" |
| You: "Now implement it" | ☕ |
| You: "Check the types" | ☕ |
| You: "Update the consumers" | ☕ |
| You: "Write the docs" | ☕ |
| You: "Did I forget something?" | AI: "Done. Here's the report." |

---

## The Subagents 🤖

The Orchestrator has 5 specialized subagents at its disposal:

| Agent | Role | Called for |
|-------|------|------------|
| `@architect` | Senior Software Architect | High-level design, module structure, tech decisions |
| `@api-guardian` | API Lifecycle Expert | API contracts, breaking changes, consumer impact analysis |
| `@builder` | Senior Full-Stack Developer | Code implementation, tests |
| `@validator` | Code Quality Engineer | Verification, quality gate, security checks |
| `@scribe` | Technical Writer | Documentation, changelog, API registry |

Each agent has:
- **Own personality** and expertise
- **Specific tools** it's allowed to use
- **Clear responsibilities** (no overlap!)
- **Output formats** for structured reports
- **Explicit "What I do NOT do"** section

### Agent Workflow

```
@architect → High-level design
    ↓
@api-guardian → API impact analysis (if API changes)
    ↓
@builder → Implementation
    ↓
@validator → Quality gate
    ↓
@scribe → Documentation
```

---

## The Hooks 🪝

The secret why nothing gets forgotten:

```
You (or @builder) changes: shared/types/User.ts

                    │
                    ▼
        ┌───────────────────────┐
        │  check-api-impact.js  │  ← Runs AUTOMATICALLY
        │                       │
        │  Enhanced Detection:  │
        │  • Breaking changes   │
        │  • Consumer discovery │
        │  • Impact severity    │
        └───────────────────────┘
                    │
                    ▼
╔════════════════════════════════════════════════════════════╗
║  ⚠️   API/TYPE FILE CHANGE DETECTED                         ║
╚════════════════════════════════════════════════════════════╝

📁 File: shared/types/User.ts
📋 Type: TYPE DEFINITION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 BREAKING CHANGE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔴 POTENTIAL BREAKING CHANGES DETECTED:

   🔴 REMOVED_FIELDS
      └─ email: string;

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 CONSUMER DISCOVERY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Found 5 potential consumer(s):

   📍 src/hooks/useUsers.ts:15: import { User }
   📍 src/components/UserCard.tsx:23: user.email
   ...

╔════════════════════════════════════════════════════════════╗
║  ⚡ @api-guardian MUST be called for API changes!          ║
╚════════════════════════════════════════════════════════════╝
```

**This happens on EVERY Write/Edit.** Automatically. Without you having to remember.

---

## Workflows 🔄

The Orchestrator knows these standard workflows:

### New Feature
```
@architect → @builder → @validator → @scribe
```
Design → Implementation → Quality check → Documentation

### Bug Fix
```
@builder → @validator
```
Implement fix → Make sure nothing breaks

### API Change (Critical!)
```
@architect → @api-guardian → @builder → @validator → @scribe
```
Design → **Impact analysis** → Implementation + all consumers → Check → Docs

### Refactoring
```
@architect → @builder → @validator
```
Plan → Rebuild → Verify

---

## Installation 🛠️

### Option A: YOLO Mode 🚀💀

> *For the brave: One prompt, everything automatic*

```bash
git clone https://github.com/cubetribe/CC_GodMode.git
cd CC_GodMode
claude --dangerously-skip-permissions
```

Then enter:
```
Run the complete CC_GodMode installation.
You have full access. Install everything globally. YOLO.
```

Lean back. Done.

### Option B: Safe Mode 🛡️

> *For the cautious: Step by step with confirmation*

```bash
git clone https://github.com/cubetribe/CC_GodMode.git
cd CC_GodMode
claude
```

Then enter:
```
I want to install CC_GodMode step by step.
Read INSTALLATION.md and guide me through.
Ask before every file change.
```

### Option C: Manual 📝

See [INSTALLATION.md](./INSTALLATION.md) for the complete guide.

---

## Quick Start 🏃‍♂️

After installation:

### 1. Open your project
```bash
cd your-project
claude
```

### 2. Activate Orchestrator mode

Copy this prompt:
```
You are the Orchestrator for this project.

Your subagents:
- @architect (Design)
- @api-guardian (API Contracts & Impact)
- @builder (Code)
- @validator (Check)
- @scribe (Docs)

Workflow rules:
- New feature: @architect → @builder → @validator → @scribe
- API change: @architect → @api-guardian → @builder → @validator → @scribe
- Bug fix: @builder → @validator

You delegate and coordinate. You don't write code yourself.
For API changes @api-guardian MUST be called before @builder.
Reports go in the Agents/ folder.

Wait for my task.
```

### 3. Give your task

```
I need a REST API for user management with CRUD operations.
```

### 4. Drink coffee ☕

The Orchestrator:
1. Calls `@architect` for high-level design
2. Calls `@api-guardian` for API contract design
3. Calls `@builder` for implementation
4. Hooks automatically warn about issues
5. Calls `@validator` for quality checks
6. Calls `@scribe` for documentation
7. Gives you a final report

---

## Project Structure 📁

```
CC_GodMode/
├── README.md                 # You are here 👋
├── INSTALLATION.md           # Setup guide
├── ORCHESTRATOR-PROMPT.md    # Copy-paste prompts
│
├── agents/                   # The subagents
│   ├── architect.md          # 🏗️ The Architect
│   ├── api-guardian.md       # 🛡️ The API Guardian (NEW!)
│   ├── builder.md            # 👷 The Developer
│   ├── validator.md          # ✅ The Checker
│   └── scribe.md             # 📝 The Writer
│
├── scripts/
│   └── check-api-impact.js   # 🪝 The automatic hook (enhanced!)
│
├── config/                   # Configuration files
└── templates/                # Project templates
```

---

## Why does this work? 🎯

### 1. Clear Separation of Concerns
Each subagent has ONE job. No overlap. No confusion.

### 2. API Guardian as Single Point of Truth
All API-related decisions go through `@api-guardian`. No more fragmented responsibility.

### 3. Enhanced Hooks
The hook script now:
- Detects breaking changes
- Analyzes git diff
- Categorizes severity
- Triggers the right workflow

### 4. Explicit "What I Do NOT Do"
Every agent knows what's NOT their job. Clear handoffs.

### 5. Structured Reports
Every agent outputs in a consistent format. Easy to follow.

---

## FAQ ❓

**Q: Why 5 agents instead of 4?**
A: The `@api-guardian` solves the problem of fragmented API responsibility. Previously, API logic was spread across all 4 agents.

**Q: When do I need @api-guardian?**
A: Whenever you change files in `src/api/`, `backend/routes/`, `shared/types/`, or `*.d.ts`.

**Q: Can I skip @api-guardian for small changes?**
A: No. The hook will remind you. Small changes can have big impact.

**Q: Does this work with GraphQL?**
A: Yes! The `@api-guardian` supports `schema.graphql` files too.

---

## Credits 🙏

**Dennis Westermann** ([www.dennis-westermann.de](https://www.dennis-westermann.de))
*Years of suffering, distilled into this repo*

---

## License 📄

MIT - Do whatever you want.

---

<div align="center">

**Made with mass sleep deprivation**

*"You say what. The AI does how."*

⭐ Star if it helps ⭐

</div>
