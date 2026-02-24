# os-eco

A tightly integrated ecosystem of four tools for AI agent workflows. Each tool is an independent project; this meta-repo tracks cross-cutting concerns and ecosystem-wide orchestration.

## Tools

| Tool | CLI | What it does |
|------|-----|-------------|
| [**Mulch**](mulch/) | `mulch` | Structured expertise management — agents record and retrieve project knowledge |
| [**Seeds**](seeds/) | `sd` | Git-native issue tracking — JSONL storage, zero dependencies, built for agents |
| [**Canopy**](canopy/) | `cn` | Prompt management — version-controlled prompt composition and inheritance |
| [**Overstory**](overstory/) | `overstory` | Multi-agent orchestration — spawn, coordinate, and merge work across Claude Code agents |

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

Install all four tools globally:

```bash
# Mulch (Node/npm)
cd mulch && npm install && npm link

# Seeds, Canopy, Overstory (Bun)
cd seeds && bun link
cd canopy && bun link
cd overstory && bun link
```

Verify:

```bash
mulch status
sd list
cn list
overstory status
```
