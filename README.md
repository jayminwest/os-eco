# os-eco

[![Mulch CI](https://github.com/jayminwest/mulch/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/mulch/actions/workflows/ci.yml)
[![Seeds CI](https://github.com/jayminwest/seeds/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/seeds/actions/workflows/ci.yml)
[![Canopy CI](https://github.com/jayminwest/canopy/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/canopy/actions/workflows/ci.yml)
[![Overstory CI](https://github.com/jayminwest/overstory/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/overstory/actions/workflows/ci.yml)

A tightly integrated ecosystem of four tools for AI agent workflows. Each tool is an independent project; this meta-repo tracks cross-cutting concerns and ecosystem-wide orchestration.

## Tools

| Tool | CLI | npm | What it does |
|------|-----|-----|-------------|
| [**Mulch**](mulch/) | `mulch` / `ml` | [![npm](https://img.shields.io/npm/v/@os-eco/mulch-cli)](https://www.npmjs.com/package/@os-eco/mulch-cli) | Structured expertise management — agents record and retrieve project knowledge |
| [**Seeds**](seeds/) | `sd` | [![npm](https://img.shields.io/npm/v/@os-eco/seeds-cli)](https://www.npmjs.com/package/@os-eco/seeds-cli) | Git-native issue tracking — JSONL storage, zero dependencies, built for agents |
| [**Canopy**](canopy/) | `cn` | [![npm](https://img.shields.io/npm/v/@os-eco/canopy-cli)](https://www.npmjs.com/package/@os-eco/canopy-cli) | Prompt management — version-controlled prompt composition and inheritance |
| [**Overstory**](overstory/) | `overstory` / `ov` | [![npm](https://img.shields.io/npm/v/@os-eco/overstory-cli)](https://www.npmjs.com/package/@os-eco/overstory-cli) | Multi-agent orchestration — spawn, coordinate, and merge work across Claude Code agents |

## How they fit together

```
overstory (orchestrates agents)
  ├── mulch (stores expertise for agents)
  ├── seeds (tracks issues agents work on)
  └── canopy (manages prompts agents use)
```

Overstory spawns Claude Code agents in git worktrees. Those agents use Seeds to pick up work, Mulch to load project expertise, and Canopy to access managed prompts. All four tools share the same design principles: zero runtime dependencies, git-native storage (JSONL/YAML), advisory file locking for multi-agent safety, and CLI-first interfaces.

## Structure

Each tool lives in its own sub-repo with independent git history, CI, and versioning. The root directory has its own instances of all four tools (`.mulch/`, `.seeds/`, `.canopy/`, `.overstory/`) for ecosystem-level tracking — cross-repo issues, shared expertise, and multi-repo orchestration.

## Getting started

Requires [Bun](https://bun.sh/) >= 1.0.

Install all four tools globally via npm:

```bash
npm install -g @os-eco/mulch-cli @os-eco/seeds-cli @os-eco/canopy-cli @os-eco/overstory-cli
```

Or from source:

```bash
cd mulch && bun link
cd seeds && bun link
cd canopy && bun link
cd overstory && bun link
```

Verify:

```bash
ml status
sd list
cn list
ov status
```
