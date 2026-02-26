---
name: prioritize
description: Prioritize open issues across GitHub and Seeds for the next swarm run
---

## description

Analyze all open issues across GitHub Issues and Seeds (both per-repo and ecosystem-level), cross-reference with codebase health, and recommend the top ~5 issues for the next swarm to tackle.

**Argument:** `$ARGUMENTS` — optional: a repo name to focus on (e.g., `overstory`, `seeds`, `canopy`, `mulch`). If empty, analyze the full ecosystem.

## gather-issues

Use the Task tool to spawn **three parallel agents**:

### Agent A: GitHub Issues
- Run `gh issue list --state open --limit 50 --json number,title,author,labels,createdAt,updatedAt,body` for each sub-repo that has a GitHub remote
- For each issue, capture: number, title, labels, author, creation date, body summary
- Note any issues with community engagement (comments, thumbs-up, external authors)

### Agent B: Seeds Issues
- For each sub-repo (`overstory/`, `seeds/`, `canopy/`, `mulch/`) and the root (`./`):
  - Run `sd list` and `sd ready` (if seeds is initialized in that directory)
  - For each open issue, run `sd show <id>` to get full details
  - Capture: id, title, type, priority, status, description, dependencies/blockers
- Build a dependency graph: which issues block which

### Agent C: Codebase Health
- For each sub-repo:
  - Run tests (`bun test` or `npm test`) and capture pass/fail counts
  - Run lint (`biome check .` or equivalent) and capture error counts
  - Run typecheck (`tsc --noEmit`) and capture error counts
  - Search for `TODO`, `FIXME`, `HACK` comments and count them
  - Check which source files lack test coverage (compare `src/**/*.ts` vs `src/**/*.test.ts`)
- Summarize: which repos are healthy, which have quality issues that need attention

## cross-reference

After all three agents complete:

- **Deduplicate**: Match GitHub issues to Seeds issues that describe the same work (same title, overlapping description, related files)
- **Dependency mapping**: Identify chains — issues that must be done before others can start
- **Cluster detection**: Group related issues that could be tackled together (same subsystem, same theme, same files)
- **Staleness check**: Flag issues that have been open a long time with no activity

## scoring

For every unique issue (deduplicated), assess:

### a. Impact
- Does it fix a bug that blocks users or the swarm workflow?
- Does it enable new capabilities or unblock other work?
- How many other issues does it unblock (dependency graph)?
- Does it affect external users (GitHub issues from community)?

### b. Feasibility
- Is it well-scoped with clear acceptance criteria?
- How many files/subsystems does it touch? (Small: 1-2, Medium: 3-5, Large: 6+)
- Are there prerequisite changes needed first?
- Can it be done independently or does it require coordination?

### c. Swarm-suitability
- Can it be cleanly delegated to a single agent (builder/scout/reviewer)?
- Is the file scope narrow enough for worktree isolation?
- Are there merge conflict risks with other issues in the batch?
- Does it need human judgment or can an agent handle it autonomously?

### d. Urgency
- Is it blocking active development or user workflows?
- Is it a regression from a recent release?
- Has it been reported by external users?
- Does codebase health data (failing tests, lint errors) point to it?

## deep-dive

Before finalizing recommendations, check if any high-scoring issues need more investigation:

- **Ambiguous scope**: If an issue's file scope is unclear, use Grep/Glob to trace the affected code paths and estimate the real blast radius
- **Hidden dependencies**: If an issue looks independent but touches shared code (types.ts, config.ts, errors.ts), check what else depends on those files
- **Conflict risk**: If two candidate issues touch overlapping files, read those files to assess whether parallel work would cause merge conflicts
- **Stale context**: If an issue references old code or merged PRs, verify the problem still exists

Spawn additional Task agents for any deep-dives needed. Don't recommend issues you haven't validated.

## recommendations

Present a final prioritized recommendation:

### Summary Table

| Rank | Issue ID | Title | Source | Type | Scope | Score | Why |
|------|----------|-------|--------|------|-------|-------|-----|

### Detailed Rationale

For each recommended issue:
- **Issue:** `<id> — <title>`
- **Source:** GitHub #N / Seeds <id> / Both
- **Type:** Bug / Feature / Test / Refactor / Docs
- **Priority:** Critical / High / Medium
- **Scope:** Small / Medium / Large — list key files
- **Swarm fit:** How to delegate (which agent type, any special considerations)
- **Dependencies:** What must be done first, what this unblocks
- **Rationale:** 2-3 sentences on why this should be in the next batch

### Batch Coherence Check
- Do the recommended issues work well together as a batch?
- Are there merge conflict risks between them?
- Is the total scope realistic for one swarm run?
- Suggest an execution order if sequencing matters

### Deferred Issues
- List the top 5 issues that almost made the cut, with brief reasons for deferral
- Note any issues that should be closed (stale, duplicate, wontfix)

### Observations
- Cross-cutting themes across the issue landscape
- Areas of the codebase accumulating technical debt
- Suggestions for issues that should be filed but don't exist yet
