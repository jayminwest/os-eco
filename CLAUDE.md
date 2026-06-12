# os-eco

Meta-project for the AI agent tooling ecosystem. This repo tracks cross-cutting concerns across **eight integrated tools**, each living in its own sub-repo. (Two further tools, **greenhouse** and **overstory**, have been archived — see "Retired tools" below.)

**Warren is the headline project.** It is the self-hostable control plane that orchestrates ephemeral cloud agents and closes the autonomous loop (GitHub → dispatch → PR). The rest of os-eco is the toolchain warren stands on. Each piece works standalone too, but warren is where the ecosystem narrative begins.

## Ecosystem Overview

Tools group by role: **warren** is the flagship orchestrator. Underneath sit the **substrate** (sandbox + coordination), the **context primitives** (what agents read & write), and a **runtime** (single-agent execution). Alongside the fleet sits a **standards** layer (readiness audit) that measures every repo, warren included.

### Flagship — agent control plane

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Warren** | `warren` | `@os-eco/warren-cli` | Self-hostable control plane for ephemeral cloud agents; polls GitHub → dispatches runs → opens PRs. Absorbed greenhouse's autonomous-loop role 2026-05. | `warren/` |

### Substrate — sandbox & coordination

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Burrow** | `burrow` / `bw` | `@os-eco/burrow-cli` | OS-isolated sandbox runtime (bwrap on Linux, sandbox-exec on macOS). Warren embeds it per run; usable standalone. | `burrow/` |
| **Plot** | `plot` | `@os-eco/plot-cli` | Typed, queryable coordination object — binds seeds issues, mulch records, prompts, runs, and PRs around a unit of work. The substrate warren uses to keep humans and agents in sync. | `plot/` |

### Context primitives — what agents read & write

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Mulch** | `mulch` / `ml` | `@os-eco/mulch-cli` | Structured expertise management. In production across multiple engineering teams as the memory layer for their agent workflows. | `mulch/` |
| **Seeds** | `sd` | `@os-eco/seeds-cli` | Git-native issue tracking with structured plans for LLM decomposition. Primary planning and tracking surface for agent work. | `seeds/` |
| **Canopy** | `cn` | `@os-eco/canopy-cli` | Prompt management & composition (inheritance, pinning, schema validation). | `canopy/` |

### Runtime — single-agent execution

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Sapling** | `sapling` / `sp` | `@os-eco/sapling-cli` | Headless coding agent with proactive context management. Alternative runtime warren can dispatch alongside Claude Code. | `sapling/` |

### Standards — fleet readiness & audit

| Tool | CLI | npm | Purpose | Sub-repo |
|------|-----|-----|---------|----------|
| **Trellis** | `trellis` | `@os-eco/trellis-cli` | Agentic-readiness audit & sync — scores repos against a versioned 9-category rubric (maturity Level 1–5), detects canonical-config drift, keeps a fleet in standard. Pre-release. | `trellis/` |

### How they fit together

```
                              Warren  (cloud control plane)
                                 │
                  ┌──────────────┼──────────────┐
                  │              │              │
              Substrate       Context        Runtime
              ─────────       ───────        ───────
              Burrow          Mulch          Sapling
              Plot            Seeds
                              Canopy
        ────────────────────────────────────────────────
              Trellis  (standards — audits every repo)
```

- **Warren** is the flagship — a self-hostable HTTP/UI control plane that polls GitHub for triaged issues, dispatches runs, opens PRs, and runs each agent inside a burrow sandbox. Absorbed greenhouse's daemon role in 2026-05.
- **Burrow** is the sandbox primitive — bwrap on Linux, sandbox-exec on macOS. Used directly or embedded inside warren.
- **Plot** is the coordination object — a binder that holds intent, attachments, and event log for a unit of work. Warren bundles it as a feature; it stands alone too.
- **Mulch** is the expertise layer — agents call `ml record` / `ml prime` to store and retrieve learnings across sessions.
- **Seeds** is the issue tracker — `sd create` / `sd ready` / `sd close` drive the work queue.
- **Canopy** is the prompt library — `cn emit` renders prompts for agent consumption.
- **Sapling** is an alternative coding agent runtime.
- **Trellis** is the standards layer — `trellis audit` scores a repo's agent-readiness against a versioned rubric; `trellis drift` / `trellis fleet` keep the whole fleet on canonical configs.

Each sub-repo has its own `CLAUDE.md` with tool-specific conventions, architecture, and commands.

## Root-Level Tool Instances

The root `.mulch/`, `.seeds/`, and `.canopy/` directories are for **cross-repo concerns**:
- Use root `.seeds/` for ecosystem-wide issues (integration bugs, cross-tool features)
- Use root `.mulch/` for ecosystem-level expertise (the `ecosystem` domain)
- Use root `.canopy/` for shared prompt templates

## Build & Test Commands

All tools use Bun and conform to the fleet `check:all` standard
([docs/check-all-standard.md](docs/check-all-standard.md)): every sub-repo
runs the same byte-identical quiet runner over one canonical gate manifest,
with `verify` as the agent-facing alias. From the respective sub-repo:

```bash
cd <repo> && bun run check:all    # full gate suite (quiet runner)
cd <repo> && bun run verify       # alias for check:all
```

The manifest is lint, typecheck, check:agents, check:dups, check:deps,
check:size, check:debt, any conditional gates (warren: check:bundle-size +
gen:docs:check + gen:openapi:check; canopy: gen:docs:check),
check:coverage, and check:ci-parity (CI ⇄ local parity, always last). Run a
single gate by name (`bun run lint`, `bun test`, ...). `CHECK_ALL_VERBOSE=1`
streams full output; `--bail` stops at the first failure.

## Retired tools

- **Greenhouse** (`greenhouse` / `grhs`, `@os-eco/greenhouse-cli`) — archived 2026-05. Was the autonomous development daemon (GitHub poll → dispatch → PR). Superseded by warren, which absorbed the autonomous-loop role into the same control plane that runs cloud agents. The greenhouse GitHub repo (https://github.com/jayminwest/greenhouse) is archived and readable for historical context; the npm package was never published; the local sub-repo was removed. Records and seeds issues that reference greenhouse are kept for traceability but marked obsolete.
- **Overstory** (`overstory` / `ov`, `@os-eco/overstory-cli`) — archived 2026-05. Was the local-first multi-agent orchestrator (tmux + git worktrees, top-down decomposition, SQLite mail). The most popular tool in the ecosystem by stars, but development wound down in favor of warren as the go-forward orchestrator. The overstory GitHub repo (https://github.com/jayminwest/overstory) is archived read-only and remains MIT-licensed for anyone who wants to fork it; the published `@os-eco/overstory-cli` npm package stays up; the local sub-repo was removed. Records and seeds issues that reference overstory are kept for traceability.

## Scripts

- `scripts/run-plan.sh <plan-id>` — sequentially work a seeds plan. For each open child of a seeds plan, runs `claude -p "work on sd <id>..."` with `--permission-mode bypassPermissions`, logs to `.run-plan-logs/<plan>/<id>.log`, stops on the first non-zero exit. Idempotent: skips closed children on re-runs. Requires `sd`, `claude`, `jq` on PATH.

## L5 Toolkit

`templates/l5-toolkit/` is the canonical source of portable
**Level 5 agent-readiness** artifacts. It is a template tree (not a published
package), extracted from `warren/` — the reference L5 implementation — and
parameterized so its contents drop cleanly into any Bun + TypeScript sub-repo
during the L5 uplift mission. Consumers copy artifacts out and adapt
budgets/thresholds/tracker prefixes to their target repo; nothing depends on
this directory at runtime. See
[`templates/l5-toolkit/README.md`](templates/l5-toolkit/README.md) for the
full per-criterion mapping and copy-order checklist.

What's inside (seven subdirectories plus a root snippet):

- `scripts/` — ratchet scripts (file-size, debt-markers, coverage), reporters
  (test-timing, quality-metrics), and the AGENTS.md validator, each with a
  co-located test suite.
- `budgets/` — JSON budget templates consumed by the ratchet scripts.
- `configs/` — drop-in baselines for Biome, knip, jscpd, bunfig, and a strict
  `tsconfig.base.json`.
- `github/` — governance artifacts: `dependabot.yml`, `ISSUE_TEMPLATE/`,
  `pull_request_template.md`, `labels.yml`, and the `ci.yml` / `sync-labels.yml`
  workflows.
- `docs/` — `AGENTS.md`, `RUNBOOK.md`, and architecture-diagram templates.
- `env/` — `.env.example` and `.gitignore` baseline templates.
- `skills/` — guidance for authoring real `.factory/skills/<name>/SKILL.md`
  files per repo.
- `package-scripts.json` — the canonical `check:*` / `test:ci` / `prepare`
  scripts merged into each sub-repo's `package.json`.

## Conventions

- Sub-repos are independently versioned and managed — each has its own git history
- The root git repo ignores all sub-repo directories (see `.gitignore`)
- Cross-repo issues go in root `.seeds/`; per-tool issues go in each sub-repo's `.seeds/`
- When making changes that span multiple tools, file a root-level issue to track the integration

<!-- mulch:start -->
## Project Expertise (Mulch)
<!-- mulch-onboard-v:2 -->

This project uses [Mulch](https://github.com/jayminwest/mulch) for structured expertise management.

**At the start of every session**, run:
```bash
ml prime
```

Injects project-specific conventions, patterns, decisions, failures, references, and guides into
your context. Run `ml prime --files src/foo.ts` before editing a file to load only records
relevant to that path (per-file framing, classification age, and confirmation scores included).

**Before completing your task**, record insights worth preserving — conventions discovered,
patterns applied, failures encountered, or decisions made:
```bash
ml record <domain> --type <convention|pattern|failure|decision|reference|guide> --description "..."
```

Evidence auto-populates from git (current commit + changed files). Link explicitly with
`--evidence-seeds <id>` / `--evidence-gh <id>` / `--evidence-linear <id>` / `--evidence-bead <id>`,
`--evidence-commit <sha>`, or `--relates-to <mx-id>`. Upserts of named records merge outcomes
instead of replacing them; validation failures print a copy-paste retry hint with missing fields
pre-filled.

Run `ml status` for domain health, `ml doctor` to check record integrity (add `--fix` to strip
broken file anchors), `ml --help` for the full command list. Write commands use file locking and
atomic writes, so multiple agents can record concurrently. Expertise survives `git worktree`
cleanup — `.mulch/` resolves to the main repo.

### Before You Finish

1. Discover what to record (shows changed files and suggests domains):
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
