# os-eco

[![Mulch CI](https://github.com/jayminwest/mulch/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/mulch/actions/workflows/ci.yml)
[![Seeds CI](https://github.com/jayminwest/seeds/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/seeds/actions/workflows/ci.yml)
[![Canopy CI](https://github.com/jayminwest/canopy/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/canopy/actions/workflows/ci.yml)
[![Overstory CI](https://github.com/jayminwest/overstory/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/overstory/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An integrated ecosystem of CLI tools for AI agent workflows. Each tool handles one concern — expertise, issues, prompts, or orchestration — and they compose together so multi-agent teams can operate autonomously on real codebases.

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  overstory   orchestration
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  canopy      prompts
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  seeds       issues
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  mulch       expertise
```

## Tools

| Tool | CLI | npm | What it does |
|------|-----|-----|-------------|
| [**Mulch**](https://github.com/jayminwest/mulch) | `mulch` / `ml` | [![npm](https://img.shields.io/npm/v/@os-eco/mulch-cli)](https://www.npmjs.com/package/@os-eco/mulch-cli) | Structured expertise management — agents record conventions, patterns, and decisions as they work, then retrieve them at the start of each session |
| [**Seeds**](https://github.com/jayminwest/seeds) | `sd` | [![npm](https://img.shields.io/npm/v/@os-eco/seeds-cli)](https://www.npmjs.com/package/@os-eco/seeds-cli) | Git-native issue tracking — JSONL storage, dependency graphs, templates, zero external dependencies |
| [**Canopy**](https://github.com/jayminwest/canopy) | `cn` | [![npm](https://img.shields.io/npm/v/@os-eco/canopy-cli)](https://www.npmjs.com/package/@os-eco/canopy-cli) | Prompt management — version-controlled prompt composition with inheritance, pinning, and schema validation |
| [**Overstory**](https://github.com/jayminwest/overstory) | `overstory` / `ov` | [![npm](https://img.shields.io/npm/v/@os-eco/overstory-cli)](https://www.npmjs.com/package/@os-eco/overstory-cli) | Multi-agent orchestration — spawn Claude Code agents in git worktrees via tmux, coordinate through SQLite mail, merge with conflict resolution |

## How they fit together

```
overstory (orchestrates agents)
  ├── mulch    (stores expertise for agents)
  ├── seeds    (tracks issues agents work on)
  └── canopy   (manages prompts agents use)
```

Overstory spawns Claude Code agents in isolated git worktrees. Those agents pick up work from Seeds, load project expertise from Mulch, and access managed prompts from Canopy. All four tools share the same design principles:

- **Git-native storage** — JSONL and YAML files that live in your repo, merge cleanly, and need no external database
- **Zero runtime dependencies** — each tool is a single Bun binary with no daemon or server
- **Multi-agent safe** — advisory file locking so concurrent agents don't corrupt shared state
- **CLI-first** — every operation is a shell command with `--json` output for scripting and piping
- **Consistent UX** — shared color palette, status icons, help screen layout, and flag conventions across all four tools

## Quick start

Requires [Bun](https://bun.sh/) >= 1.0.

```bash
# Install all four tools
bun install -g @os-eco/mulch-cli @os-eco/seeds-cli @os-eco/canopy-cli @os-eco/overstory-cli

# Initialize in your project
cd your-project
ml init && sd init && cn init && ov init

# Verify
ml --version && sd --version && cn --version && ov --version
```

Or install individually — each tool works standalone:

```bash
bun install -g @os-eco/seeds-cli    # just issue tracking
bun install -g @os-eco/mulch-cli    # just expertise management
```

## Example workflow

```bash
# An agent starts a session
ml prime                              # load project expertise into context
sd ready                              # find unblocked issues to work on
sd update seed-a1b2 --status in_progress

# Agent does work, then wraps up
ml record testing --type convention \
  --description "Always mock fs in unit tests"
sd close seed-a1b2

# Multi-agent orchestration
ov sling seed-c3d4 --strategy worktree   # spawn an agent for an issue
ov status                                 # monitor running agents
ov merge builder-01                       # merge completed work back
```

## Repo structure

Each tool lives in its own sub-repo with independent git history, CI, and npm versioning. This meta-repo tracks cross-cutting concerns:

```
os-eco/
  mulch/           # sub-repo: @os-eco/mulch-cli
  seeds/           # sub-repo: @os-eco/seeds-cli
  canopy/          # sub-repo: @os-eco/canopy-cli
  overstory/       # sub-repo: @os-eco/overstory-cli
  branding/        # shared visual spec, CLI standards, checklists
  .mulch/          # ecosystem-level expertise
  .seeds/          # ecosystem-level issues
  .canopy/         # shared prompt templates
  .overstory/      # multi-repo orchestration config
```

## Development

```bash
# Run tests, lint, and typecheck for any tool
cd mulch && bun test && bun run lint && bun run typecheck
cd seeds && bun test && bun run lint && bun run typecheck
cd canopy && bun test && bun run lint && bun run typecheck
cd overstory && bun test && bun run lint && bun run typecheck

# Check ecosystem health
ov doctor          # checks all tools are installed and healthy
ov ecosystem       # dashboard with versions, health, and status
```

## License

[MIT](LICENSE)
