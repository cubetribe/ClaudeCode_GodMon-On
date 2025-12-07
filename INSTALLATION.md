# Installation Guide 🛠️

> *Choose your adventure*

---

## 🚀 Option A: YOLO Mode (Recommended for the Brave)

**Prerequisites:**
- Claude Code CLI installed
- Nerves of steel
- Basic trust in AI

### Step 1: Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/CC_GodMode.git
cd CC_GodMode
```

### Step 2: Start Claude in God Mode

```bash
claude --dangerously-skip-permissions
```

### Step 3: Enter the magic prompt

```
Execute the complete CC_GodMode installation.
You have full access to my system.

Install:
1. All agents (architect, builder, validator, scribe) to ~/.claude/agents/
2. The hook script to ~/.claude/scripts/
3. Extend ~/.claude/settings.json with the hooks
4. Create the templates

Read this file and execute all steps automatically.
Confirm at the end what you did.
YOLO.
```

### Step 4: Sit back and relax

Claude does the rest. You'll get a summary at the end.

---

## 🛡️ Option B: Safe Mode (For the Cautious)

**Prerequisites:**
- Claude Code CLI installed
- Patience
- Reading ability

### Step 1: Clone the repo

```bash
git clone https://github.com/YOUR-USERNAME/CC_GodMode.git
cd CC_GodMode
```

### Step 2: Start Claude normally

```bash
claude
```

### Step 3: Enter the cautious prompt

```
I want to install CC_GodMode step by step.
Read INSTALLATION.md and guide me through each step.
Ask for permission before EVERY file change.
Explain what you're doing.
```

### Step 4: Confirm each step

Claude will show you each command and ask for permission.

---

## 📝 Option C: Manual Installation (For Control Freaks)

### Create directories

```bash
mkdir -p ~/.claude/agents
mkdir -p ~/.claude/scripts
```

### Copy agents

```bash
cp agents/architect.md ~/.claude/agents/
cp agents/builder.md ~/.claude/agents/
cp agents/validator.md ~/.claude/agents/
cp agents/scribe.md ~/.claude/agents/
```

### Install hook script

```bash
cp scripts/check-api-impact.js ~/.claude/scripts/
chmod +x ~/.claude/scripts/check-api-impact.js
```

### Extend settings.json

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node ~/.claude/scripts/check-api-impact.js \"$CLAUDE_FILE_PATH\""
          }
        ]
      }
    ]
  }
}
```

### Extend CLAUDE.md (optional)

Copy relevant sections from `config/CLAUDE-system.md` to your `~/.claude/CLAUDE.md`.

---

## 📁 What gets installed where?

| File | Destination | Purpose |
|------|-------------|---------|
| `agents/architect.md` | `~/.claude/agents/` | Architecture agent |
| `agents/builder.md` | `~/.claude/agents/` | Implementation agent |
| `agents/validator.md` | `~/.claude/agents/` | Validation agent |
| `agents/scribe.md` | `~/.claude/agents/` | Documentation agent |
| `scripts/check-api-impact.js` | `~/.claude/scripts/` | Auto-hook for API changes |
| Hook Config | `~/.claude/settings.json` | Activates the hook |

---

## 🧪 Verify installation

After installation:

```bash
# Check agents
ls -la ~/.claude/agents/

# Should show:
# architect.md
# builder.md
# validator.md
# scribe.md

# Check hook
ls -la ~/.claude/scripts/

# Should show:
# check-api-impact.js

# Check settings
cat ~/.claude/settings.json

# Should contain hooks.PostToolUse
```

---

## 🆘 Troubleshooting

### "Agents are not recognized"

Check if the files are in the correct directory:
```bash
ls ~/.claude/agents/
```

### "Hook is not running"

Check `~/.claude/settings.json`:
```bash
cat ~/.claude/settings.json | grep -A 10 "hooks"
```

### "Permission denied for hook script"

```bash
chmod +x ~/.claude/scripts/check-api-impact.js
```

### "Node not found"

The hook needs Node.js. Install it:
```bash
# macOS
brew install node

# or
nvm install --lts
```

---

## 🎯 After installation

### Test the agents

Start Claude Code in a project and try:

```
@architect Analyze the structure of this project
```

### Test the hook

Edit a file in `src/api/` or `shared/types/`:

```
Create a file src/api/test.ts with the content "export {}"
```

You should see a warning.

### Start Orchestrator mode

```
You are the Orchestrator. Delegate to: @architect @builder @validator @scribe
```

---

## 🔄 Updates

To update CC_GodMode:

```bash
cd CC_GodMode
git pull

# Then repeat installation (YOLO or Safe Mode)
```

---

## 🗑️ Uninstallation

If you've had enough:

```bash
# Remove agents
rm ~/.claude/agents/architect.md
rm ~/.claude/agents/builder.md
rm ~/.claude/agents/validator.md
rm ~/.claude/agents/scribe.md

# Remove hook
rm ~/.claude/scripts/check-api-impact.js

# Manually remove hook config from settings.json
```

---

## 🎉 Done!

You are now in **God Mode**.

Next step: Read [ORCHESTRATOR-PROMPT.md](./ORCHESTRATOR-PROMPT.md) for the prompts you need.

---

<div align="center">

*"With great power comes great joy in delegating."*

</div>
