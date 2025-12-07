# CC_GodMode 🚀⚡

> **Years of trial, error, and mass prompt engineering - distilled into one glorious package.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Subagents](https://img.shields.io/badge/Subagents-4%20Specialists-green)](./agents/)
[![YOLO Mode](https://img.shields.io/badge/YOLO%20Mode-Available-red)](./INSTALLATION.md)

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
  → Calls @architect for design & impact analysis
  → Calls @builder for implementation
  → Calls @validator for cross-file checks
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
│   1. @architect for architecture design                     │
│   2. @builder for implementation                            │
│   3. @validator for quality checks                          │
│   4. @scribe for documentation                              │
│                                                              │
│   "Starting the workflow now..."                            │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
   @architect          @builder           @validator
   (Subagent)          (Subagent)         (Subagent)
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
                       @scribe
                      (Subagent)
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 🪝 HOOKS RUN AUTOMATICALLY                   │
│                                                              │
│   On every file change:                                     │
│   → check-api-impact.js checks for API changes              │
│   → Warns if consumers need updating                        │
│   → Orchestrator reacts and adapts                          │
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

The Orchestrator has 4 specialized subagents at its disposal:

| Agent | Role | Called for |
|-------|------|------------|
| `@architect` | Senior Software Architect | Design, planning, impact analysis, API contracts |
| `@builder` | Senior Full-Stack Developer | Code implementation, tests, consumer updates |
| `@validator` | Code Quality Engineer | Cross-file consistency, TypeScript checks, security |
| `@scribe` | Technical Writer | Documentation, changelog, API registry |

Each agent has:
- **Own personality** and expertise
- **Specific tools** it's allowed to use
- **Clear responsibilities**
- **Output formats** for structured reports

---

## The Hooks 🪝

The secret why nothing gets forgotten:

```
You (or @builder) changes: src/api/userService.ts

                    │
                    ▼
        ┌───────────────────────┐
        │  check-api-impact.js  │  ← Runs AUTOMATICALLY
        │                       │
        │  "Hey, this is an     │
        │   API file!"          │
        └───────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│ ⚠️  API/TYPE FILE CHANGED!                                   │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 📁 File: src/api/userService.ts                             │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 📋 Potential consumers found:                               │
│                                                              │
│ src/hooks/useUsers.ts:15: import { UserService }            │
│ src/components/UserList.tsx:23: UserService.getAll()        │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ │
│ 🔴 ACTION REQUIRED: Update consumers!                        │
└─────────────────────────────────────────────────────────────┘
                    │
                    ▼
        Orchestrator sees this and
        calls @validator for
        cross-file consistency check
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
@architect → @builder → @validator (MANDATORY!) → @scribe
```
Impact analysis → Change + all consumers → Cross-file check → Docs

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
git clone https://github.com/cubetribe/ClaudeCode_GodMon-On.git
cd ClaudeCode_GodMon-On
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
git clone https://github.com/cubetribe/ClaudeCode_GodMon-On.git
cd ClaudeCode_GodMon-On
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

Your subagents: @architect @builder @validator @scribe

Workflow rules:
- New feature: @architect → @builder → @validator → @scribe
- Bug fix: @builder → @validator
- API change: @architect → @builder → @validator (MANDATORY!) → @scribe

You delegate and coordinate. You don't write code yourself.
For API changes @validator MUST be called.
Reports go in the Agents/ folder.

Wait for my task.
```

### 3. Give your task

```
I need a REST API for user management with CRUD operations.
```

### 4. Drink coffee ☕

The Orchestrator:
1. Calls `@architect` for API design
2. Calls `@builder` for implementation
3. Hooks automatically warn about issues
4. Calls `@validator` for quality checks
5. Calls `@scribe` for documentation
6. Gives you a final report

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
│   ├── builder.md            # 👷 The Developer
│   ├── validator.md          # ✅ The Checker
│   └── scribe.md             # 📝 The Writer
│
├── scripts/
│   └── check-api-impact.js   # 🪝 The automatic hook
│
├── config/                   # Configuration files
└── templates/                # Project templates
```

---

## Why does this work? 🎯

### 1. Specialization over generalism
Each subagent is an expert for ONE thing. No "do everything".

### 2. Automation over memory
Hooks run automatically. You don't have to remember.

### 3. Orchestration over micromanagement
You say WHAT, not HOW. The Orchestrator decides the flow.

### 4. Cross-file awareness
@validator knows ALL dependencies. Nothing gets forgotten.

### 5. Documentation by default
@scribe documents automatically. No more outdated READMEs.

---

## FAQ ❓

**Q: Do I really need this?**
A: Have you ever forgotten to update API consumers? Then yes.

**Q: Does this work with my project?**
A: If it's TypeScript/JavaScript with a reasonably normal structure, yes.

**Q: Can I customize the subagents?**
A: Sure! The `.md` files in `agents/` are simple Markdown with frontmatter.

**Q: What if a workflow doesn't fit?**
A: Just tell the Orchestrator what should be different. It's flexible.

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
