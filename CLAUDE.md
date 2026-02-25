# os-eco

Meta-project for the AI agent tooling ecosystem. This repo tracks cross-cutting concerns across four tightly integrated tools, each living in its own sub-repo.

## Ecosystem Overview

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Mulch** | `mulch` / `ml` | `@os-eco/mulch-cli` | Structured expertise management | `mulch/` |
| **Seeds** | `sd` | `@os-eco/seeds-cli` | Git-native issue tracking | `seeds/` |
| **Canopy** | `cn` | `@os-eco/canopy-cli` | Prompt management & composition | `canopy/` |
| **Overstory** | `overstory` / `ov` | `@os-eco/overstory-cli` | Multi-agent orchestration | `overstory/` |

### Relationship Graph

```
overstory (orchestrates agents)
  ├── mulch (stores expertise for agents)
  ├── seeds (tracks issues agents work on)
  └── canopy (manages prompts agents use)
```

- **Overstory** spawns and coordinates Claude Code agents; reads issues from seeds, expertise from mulch
- **Mulch** is passive — agents call `ml record` / `ml prime` to store and retrieve expertise
- **Seeds** is the issue tracker — `sd create` / `sd ready` / `sd close` drive the work queue
- **Canopy** manages prompt templates — `cn emit` renders prompts for agent consumption

Each sub-repo has its own `CLAUDE.md` with tool-specific conventions, architecture, and commands.

## Root-Level Tool Instances

The root `.mulch/`, `.seeds/`, `.canopy/`, and `.overstory/` directories are for **cross-repo concerns**:
- Use root `.seeds/` for ecosystem-wide issues (integration bugs, cross-tool features)
- Use root `.mulch/` for ecosystem-level expertise (the `ecosystem` domain)
- Use root `.canopy/` for shared prompt templates
- Use root `.overstory/` for multi-repo orchestration

## Build & Test Commands

All tools use Bun. Run from the respective sub-repo:

```bash
# Mulch
cd mulch && bun test && bun run lint && bun run typecheck

# Seeds
cd seeds && bun test && bun run lint && bun run typecheck

# Canopy
cd canopy && bun test && bun run lint && bun run typecheck

# Overstory
cd overstory && bun test && bun run lint && bun run typecheck
```

## Conventions

- Sub-repos are independently versioned and managed — each has its own git history
- The root git repo ignores all sub-repo directories (see `.gitignore`)
- Cross-repo issues go in root `.seeds/`; per-tool issues go in each sub-repo's `.seeds/`
- When making changes that span multiple tools, file a root-level issue to track the integration

<!-- mulch:start -->
## Project Expertise (Mulch)
<!-- mulch-onboard-v:1 -->

This project uses [Mulch](https://github.com/jayminwest/mulch) for structured expertise management.

**At the start of every session**, run:
```bash
ml prime
```

This injects project-specific conventions, patterns, decisions, and other learnings into your context.
Use `ml prime --files src/foo.ts` to load only records relevant to specific files.

**Before completing your task**, review your work for insights worth preserving — conventions discovered,
patterns applied, failures encountered, or decisions made — and record them:
```bash
ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."
```

Link evidence when available: `--evidence-commit <sha>`, `--evidence-bead <id>`

Run `ml status` to check domain health and entry counts.
Run `ml --help` for full usage.
Mulch write commands use file locking and atomic writes — multiple agents can safely record to the same domain concurrently.

### Before You Finish

1. Discover what to record:
   ```bash
   ml learn
   ```
2. Store insights from this work session:
   ```bash
   ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."
   ```
3. Validate and commit:
   ```bash
   ml sync
   ```
<!-- mulch:end -->

<!-- seeds:start -->
## Issue Tracking (Seeds)
<!-- seeds-onboard-v:1 -->

This project uses [Seeds](https://github.com/jayminwest/seeds) for git-native issue tracking.

**At the start of every session**, run:
```
sd prime
```

This injects session context: rules, command reference, and workflows.

**Quick reference:**
- `sd ready` — Find unblocked work
- `sd create --title "..." --type task --priority 2` — Create issue
- `sd update <id> --status in_progress` — Claim work
- `sd close <id>` — Complete work
- `sd sync` — Sync with git (run before pushing)

### Before You Finish
1. Close completed issues: `sd close <id>`
2. File issues for remaining work: `sd create --title "..."`
3. Sync and push: `sd sync && git push`
<!-- seeds:end -->

<!-- canopy:start -->
## Prompt Management (Canopy)
<!-- canopy-onboard-v:1 -->

This project uses [Canopy](https://github.com/jayminwest/canopy) for git-native prompt management.

**At the start of every session**, run:
```
cn prime
```

This injects prompt workflow context: commands, conventions, and common workflows.

**Quick reference:**
- `cn list` — List all prompts
- `cn render <name>` — View rendered prompt (resolves inheritance)
- `cn emit --all` — Render prompts to files
- `cn update <name>` — Update a prompt (creates new version)
- `cn sync` — Stage and commit .canopy/ changes

**Do not manually edit emitted files.** Use `cn update` to modify prompts, then `cn emit` to regenerate.
<!-- canopy:end -->
