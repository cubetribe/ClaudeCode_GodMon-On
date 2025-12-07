# ~/.claude/CLAUDE.md - Global Configuration

## Personal Code Preferences

- Clear, descriptive variable names
- Early Returns to reduce nesting
- Small, focused functions (<30 lines)
- Error handling always explicit

## Communication Style

- Explain reasoning before code changes
- When in doubt: Ask instead of assuming
- Always confirm critical changes

## Subagent Orchestration (global)

```
Rule 1: Call Architect BEFORE Builder for new features
Rule 2: Call Validator AFTER every API change
Rule 3: Call Scribe after feature completion for docs
Rule 4: ALWAYS check consumers for cross-file changes
```

## Token Efficiency

- `/clear` after completed tasks
- `/compact` for longer sessions (proactively at 70% capacity)
- Sonnet for standard tasks, Opus only for complex architecture
- Write large outputs to files instead of chat

## Git Workflow

- Atomic Commits (one logical change per commit)
- Conventional Commits Format
- Branch names: `feature/`, `fix/`, `refactor/`
- Always `typecheck` and `test` before push

## Avoid

- No `any` Types in TypeScript
- No Console.logs in production code
- No hardcoded strings (use i18n keys)
- No direct DOM manipulations in React
