# L5 Toolkit

A portable, opinionated quality kit for taking a Bun + TypeScript sub-repo from
baseline to **Level 5** on the 82-criterion Agent-Readiness rubric
(see `readiness-report-prompt.md` at the os-eco root). The kit is extracted
from `warren/` — the canonical L5 implementation — and parameterized so it
drops cleanly into any of the os-eco sub-repos (`canopy`, `plot`, `mulch`,
`seeds`, `burrow`) and, with light adaptations, into a fresh repo too.

This directory is a **template tree, not a published package**. Consumers
copy artifacts out of it and adapt budgets/thresholds/tracker prefixes to
their target repo's current state. There is no runtime dependency on this
directory from any sub-repo.

## Subdirectory Map

Every artifact in the toolkit lives under one of seven subdirectories. Use
this table as the index: each row names a subdirectory, the purpose it
serves, and the rubric criteria its contents close. The §(d) checklist
later in this README walks the same subdirectories in copy order.

| Subdirectory | Purpose | Closes (rubric criteria) |
|--------------|---------|--------------------------|
| [`scripts/`](./scripts/) | TypeScript ratchets (file size, debt markers, coverage), the AGENTS.md validator, the CI step-summary reporters, and the `hooks/pre-commit` shell hook installed via `prepare`. Every script has a co-located `*.test.ts` suite. | `large_file_detection`, `tech_debt_tracking`, `test_coverage_thresholds`, `agents_md_validation`, `test_performance_tracking`, `code_quality_metrics`, `pre_commit_hooks` |
| [`budgets/`](./budgets/) | JSON budget templates consumed by the ratchet scripts. Each is rebased to the sub-repo's current worst state at port time and only loosens via explicit commits. | Same as `scripts/` — budgets are the data half of the ratchets |
| [`configs/`](./configs/) | Drop-in baselines for the tool surface every Bun + TS sub-repo shares: Biome (lint + filenaming + complexity), knip (deps), jscpd (dup detection), bunfig (test root), strict `tsconfig.base.json`. | `naming_consistency`, `cyclomatic_complexity`, `duplicate_code_detection`, `unused_dependencies_detection` |
| [`github/`](./github/) | Repository governance artifacts: `dependabot.yml` (with `cooldown`), structured `ISSUE_TEMPLATE/`, `pull_request_template.md`, `labels.yml`, and the `ci.yml` + `sync-labels.yml` workflows. | `dependency_update_automation`, `min_release_age`, `issue_templates`, `pr_templates`, `issue_labeling_system` |
| [`docs/`](./docs/) | Templates for the three required per-repo docs: `AGENTS.md` (populated per repo), `RUNBOOK.md` (release/triage/rollback), and an architecture mermaid skeleton. | `agents_md`, `runbooks_documented`, `service_flow_documented` |
| [`env/`](./env/) | `.env.example` template (for repos that read env vars) and the comprehensive `.gitignore` baseline appended to each sub-repo's existing `.gitignore`. | `env_template`, `gitignore_comprehensive` |
| [`skills/`](./skills/) | Documentation for how to author a real `.factory/skills/<name>/SKILL.md` per repo — frontmatter shape, body conventions, and what counts as "real" vs. placeholder. | `skills` |

The toolkit root also ships [`package-scripts.json`](./package-scripts.json),
a JSON snippet listing the canonical `check:*`, `test:ci`, and `prepare`
scripts that get merged into each sub-repo's `package.json` (see §(d)
Step 8 below).

## What "Level 5" Means Here

L5 = ≥80% pass rate on the rubric, with the same set of criteria passing as
warren ships today (warren's "ceiling"). A handful of criteria
(`automated_pr_review`, `metrics_collection`, `feature_flag_infrastructure`,
…) are intentionally left failing across the ecosystem — see
`mission library/warren-ceiling.md` for the full list. The toolkit does not
attempt to close those.

## Directory Layout

```
templates/l5-toolkit/
├── README.md                       <-- you are here
├── scripts/                        <-- ratchet & reporter scripts (TS)
│   ├── check-file-sizes.ts
│   ├── check-debt-markers.ts
│   ├── check-coverage.ts
│   ├── check-bundle-size.ts        (optional; bundled repos only)
│   ├── validate-agents-md.ts
│   ├── report-test-timing.ts
│   ├── report-quality-metrics.ts
│   └── hooks/
│       └── pre-commit              (executable shell hook)
├── budgets/                        <-- JSON budget templates
│   ├── coverage-budgets.json
│   ├── file-size-budgets.json
│   └── debt-markers-budget.json
├── configs/                        <-- baseline tool configs
│   ├── biome.json
│   ├── knip.json
│   ├── .jscpd.json
│   ├── bunfig.toml
│   └── tsconfig.base.json
├── github/
│   ├── dependabot.yml
│   ├── pull_request_template.md
│   ├── labels.yml
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── config.yml
│   └── workflows/
│       ├── ci.yml
│       └── sync-labels.yml
├── docs/
│   ├── AGENTS.md.template
│   ├── RUNBOOK.md.template
│   └── architecture-diagram.mmd.template
├── env/
│   ├── .env.example.template
│   └── .gitignore.template
├── skills/
│   └── README.md                   (how to populate .factory/skills/)
└── package-scripts.json            <-- canonical package.json scripts snippet
```

This Milestone 0 commit creates only the directory **skeleton** plus this
README. Subsequent Milestone 0 features land the scripts, configs,
templates, and tests; per-repo milestones then copy those artifacts into
each sub-repo.

## (a) Per-Criterion → Artifact Mapping

The toolkit exists to close the rubric criteria below. Each row names the
artifact that closes the criterion when ported. Criteria warren also fails
(its "ceiling") are out of scope and not listed here — they live in
`mission library/warren-ceiling.md`.

### Style & Validation

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `pre_commit_hooks` | `scripts/hooks/pre-commit` (exec) + `prepare` script in `package-scripts.json`. |
| `naming_consistency` | `configs/biome.json` `style.useFilenamingConvention` (strict kebab-case). |
| `cyclomatic_complexity` | `configs/biome.json` `complexity.noExcessiveCognitiveComplexity` (cap 15) + `complexity.noExcessiveLinesPerFunction` (cap 500). |
| `large_file_detection` | `scripts/check-file-sizes.ts` + `budgets/file-size-budgets.json`. |
| `duplicate_code_detection` | `configs/.jscpd.json` (threshold 3%) invoked via `bunx jscpd`. |
| `tech_debt_tracking` | `scripts/check-debt-markers.ts` + `budgets/debt-markers-budget.json`. |

### Build System

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `unused_dependencies_detection` | `configs/knip.json` + `knip --dependencies`. |

### Testing

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `test_performance_tracking` | `scripts/report-test-timing.ts` + `test:ci` produces `junit.xml`. |
| `test_coverage_thresholds` | `scripts/check-coverage.ts` + `budgets/coverage-budgets.json`. |

### Documentation

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `agents_md` | `docs/AGENTS.md.template` (populated per repo, >100 chars). |
| `agents_md_validation` | `scripts/validate-agents-md.ts` invoked by `check:all` AND CI. |
| `service_flow_documented` | `docs/architecture-diagram.mmd.template`. |
| `automated_doc_generation` | Repo-specific. The toolkit ships no generator: canopy/plot already pass via `publish.yml` CHANGELOG extraction; burrow needs a CLI-tree-to-markdown generator added in-repo. |

### Development Environment

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `devcontainer` | Ported from `warren/.devcontainer/devcontainer.json` per repo (the toolkit does not vendor a copy — adapt warren's verbatim modulo project name). |
| `env_template` | `env/.env.example.template`. |

### Debugging & Observability

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `structured_logging` | Repo-specific: canopy & burrow already pass via `src/output.ts` / pino. For plot/mulch/seeds, add `pino` + `pino-pretty` as devDeps; the toolkit does not vendor a logger module. |
| `log_scrubbing` | Logger `redact` paths + AGENTS.md sanitization note (per-repo). |
| `code_quality_metrics` | `scripts/report-quality-metrics.ts`. |
| `runbooks_documented` | `docs/RUNBOOK.md.template`. |

### Security

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `gitignore_comprehensive` | `env/.gitignore.template` (append per repo, do not overwrite). |
| `min_release_age` | `github/dependabot.yml` `cooldown` block. |

### Task Discovery

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `issue_labeling_system` | `github/labels.yml` + `github/workflows/sync-labels.yml`. |
| `issue_templates` | `github/ISSUE_TEMPLATE/{bug_report,feature_request,config}.yml`. |
| `pr_templates` | `github/pull_request_template.md`. |
| `dependency_update_automation` | `github/dependabot.yml`. |

### Other Repo-Scope

| Criterion | Artifact in this toolkit |
|-----------|--------------------------|
| `skills` | `skills/README.md` documents how to author `.factory/skills/<name>/SKILL.md`. The actual SKILL.md is authored per repo. |

## (b) Ratchet Baselining Procedure

Four scripts are **ratchets**: file-size, coverage, debt-markers,
bundle-size. They read a JSON budget, measure the repo's current state, and
fail CI if any measurement violates the budget. Baselining sets the initial
budget to reflect the **current** worst state — never tighter, never
artificially loose.

For each ratchet, the porting worker follows this procedure:

1. **Drop the script and budget templates in.** Copy
   `scripts/check-<thing>.ts` and the matching `budgets/<thing>.json`
   template into the target repo (typically under `scripts/` and the script
   reads the budget from a co-located JSON next to it, e.g.
   `scripts/file-size-budgets.json`).
2. **Run with no budget (or `MAX = Infinity`).** Invoke the script
   permissively to learn the repo's current state. For file sizes that means
   the largest current source file in lines. For coverage that means
   `bun test --coverage` and reading the per-package line/branch percentage.
   For debt markers that means counting current TODO/FIXME/HACK/XXX
   occurrences not yet pinned to a tracker.
3. **Write the budget to ceil(observed) + small margin.** Pick a value that
   forgives normal in-flight churn but doesn't manufacture failures.
   Recommended margins:
   - File-size cap: `ceil(observed_max / 50) * 50 + 50` (round up to next
     50 and add 50). Example: observed max 487 → budget 550.
   - Coverage floor: `floor(observed * 100) / 100` (round down to 1%). Do
     not bake in current rounding noise.
   - Debt markers: exact observed count; force every existing marker to
     carry a tracker reference before commit.
   - Bundle size: `observed * 1.10` (10% headroom).
4. **Re-run with the budget.** Must exit 0.
5. **Commit the budget JSON alongside the script.** The ratchet now only
   loosens with an explicit future commit; an automated tightening commit
   is forbidden by design.

The ratchet philosophy: budgets reflect the **truth on disk today**. They
move *down* (tighter) on purpose, not as a side-effect; they never move *up*
(looser) silently. A reviewer of a budget-loosening PR can see exactly what
was relaxed.

## (c) Per-Feature Shape (the worker skill contract)

This toolkit is consumed by the `readiness-uplift-worker` skill. Each
"feature" in the mission corresponds to one commit on the target repo's
`main` branch. Workers follow this shape consistently:

```
feature-id: <slug>
description: <what artifact gets ported and which criteria it closes>
skillName: readiness-uplift-worker
milestone: <toolkit | canopy | plot | mulch | seeds | burrow | os-eco>
preconditions:
  - working dir is <target-repo>/
  - git status clean on target main
  - any earlier features in the same milestone are committed
expectedBehavior:
  - <artifact files exist at expected paths>
  - bun run lint && bun run typecheck && bun test all exit 0
  - bun run check:all exits 0 (once F-CHECK-ALL has landed)
  - git log shows one new commit on target main scoped to this feature
fulfills:
  - VAL-<AREA>-NNN (one or more validation contract assertions)
```

The worker procedure per feature is the same shape across all milestones:

1. Read AGENTS.md, criteria-mapping.md, this README, and the target repo's
   baseline report (if the user has supplied one in
   `.factory-mission-scratch/`).
2. Inspect warren for the artifact's reference implementation.
3. Inspect the target repo for partial coverage (the **adapt-don't-overwrite
   rule**: if canopy already has an AGENTS.md, extend it; do not rewrite).
4. Port + adapt: copy the artifact, replace warren-specific paths and
   tracker prefixes with the target's, baseline any ratchet budgets to the
   current state.
5. Wire: add `check:*` script entries to `package.json`; ensure CI invokes
   them via `.github/workflows/ci.yml`.
6. Verify locally — all four gates must exit 0:
   ```bash
   bun run lint
   bun run typecheck
   bun test
   bun run check:all   # only after F-CHECK-ALL has wired the aggregator
   ```
7. Commit per the format `<area>: <summary> (closes <criteria> for <repo>)`.
   Do **not** `git push`; the user pushes manually.
8. Handoff: fill out `EndFeatureRun` with `salientSummary`,
   `whatWasImplemented`, `verification.commandsRun` (every command + exit
   code + key observation), `tests.added`, and any `discoveredIssues` —
   especially N/A escalations like `distributed_tracing` /
   `deployment_observability` for CLI sub-repos.

## (d) Files-to-Copy Checklist & Per-Repo Adaptations

Use this when porting the toolkit into a new sub-repo. Order matters: scripts
need budget JSON, package.json wiring needs scripts, CI needs the package.json
scripts.

### Step 1 — Scripts (`<repo>/scripts/`)

Copy from `templates/l5-toolkit/scripts/`:

- [ ] `check-file-sizes.ts`
- [ ] `check-debt-markers.ts`
- [ ] `check-coverage.ts`
- [ ] `check-bundle-size.ts` (only if the repo bundles via `bun build`)
- [ ] `validate-agents-md.ts`
- [ ] `check-all.ts` — the canonical quiet runner (**byte-identical**, never
      edited; see `docs/check-all-standard.md` at the os-eco root). Resolves
      its gate manifest from the host repo's `package.json` and exports it
      as `GATES`.
- [ ] `check-ci-parity.ts` — CI ⇄ check:all drift detector (**byte-identical**;
      imports `GATES` from `check-all.ts`). Per-repo escape hatches go in an
      optional `scripts/ci-parity-config.json` (`aliases` + `ciOnly`), not in
      the script.
- [ ] `report-test-timing.ts`
- [ ] `report-quality-metrics.ts`
- [ ] `hooks/pre-commit` (make executable: `chmod +x scripts/hooks/pre-commit`)

Each script's co-located `*.test.ts` comes along with it.

**Adaptations:**
- `check-debt-markers.ts`: edit the tracker-prefix list to match the
  repo's tracker (canopy uses `canopy-XXXX`; plot uses `pl-XXXX`; etc.).
  Always keep the cross-repo prefixes `mx-XXXX` (mission tracker), `#NNN`
  (GitHub issues), and `URL` (any http link).
- `validate-agents-md.ts`: usually drop-in; only adapt if a repo stores
  AGENTS.md somewhere non-standard.

### Step 2 — Budget JSON (`<repo>/scripts/`)

Co-located with their script. Copy templates from
`templates/l5-toolkit/budgets/`:

- [ ] `file-size-budgets.json` — baseline per §(b).
- [ ] `coverage-budgets.json` — baseline per §(b).
- [ ] `debt-markers-budget.json` — start at 0 and require existing markers
      be pinned to a tracker before commit.

### Step 3 — Configs (`<repo>/`)

Copy from `templates/l5-toolkit/configs/`:

- [ ] `biome.json` — if the repo already has one, **merge**; do not
      overwrite. Preserve existing overrides.
- [ ] `knip.json`
- [ ] `.jscpd.json`
- [ ] `bunfig.toml` — for mulch, set `[test] root = "test"` (mulch keeps
      tests under `test/`, not `src/`).
- [ ] `tsconfig.base.json` — extend from this in the repo's own
      `tsconfig.json` so per-repo path overrides remain local.

### Step 4 — GitHub (`<repo>/.github/`)

Copy from `templates/l5-toolkit/github/`:

- [ ] `dependabot.yml` (preserve any repo-specific update groups)
- [ ] `pull_request_template.md`
- [ ] `labels.yml`
- [ ] `ISSUE_TEMPLATE/bug_report.yml`
- [ ] `ISSUE_TEMPLATE/feature_request.yml`
- [ ] `ISSUE_TEMPLATE/config.yml`
- [ ] `workflows/ci.yml` — **extend**, do not replace. The toolkit's CI
      adds `check:all`, `test:ci`, and the two `report-*` step summaries
      plus artifact uploads.
- [ ] `workflows/sync-labels.yml`

### Step 5 — Docs (`<repo>/`)

Copy from `templates/l5-toolkit/docs/`:

- [ ] `AGENTS.md` (from `AGENTS.md.template`) — populate with repo-specific
      commands, conventions, and agent workflow.
- [ ] `RUNBOOK.md` (from `RUNBOOK.md.template`) — fill in release, triage,
      and rollback steps.
- [ ] `docs/architecture.mmd` (from `architecture-diagram.mmd.template`) —
      optional if the repo already documents architecture in SPEC.md.

### Step 6 — Env & Ignore (`<repo>/`)

Copy from `templates/l5-toolkit/env/`:

- [ ] `.env.example` (from `.env.example.template`) — only if the repo
      reads env vars at runtime. plot/canopy can keep README docs instead.
- [ ] `.gitignore` — **append** the toolkit baseline entries; do not
      replace the existing `.gitignore`. plot has plot-specific ignores
      that must be preserved.

### Step 7 — Skills (`<repo>/.factory/skills/<name>/`)

- [ ] One real `SKILL.md` (not a placeholder) with valid YAML frontmatter
      (`name`, `description`) and a non-empty body. See
      `templates/l5-toolkit/skills/README.md` for the shape.

### Step 8 — package.json wiring

Merge from the toolkit's `package-scripts.json` snippet (`cat
templates/l5-toolkit/package-scripts.json` shows the authoritative
key set):

- [ ] `check:size`, `check:debt`, `check:dups`, `check:deps`, `check:agents`
- [ ] `check:coverage`
- [ ] `check:all` = `bun scripts/check-all.ts` (the quiet runner — never an
      `&&` chain)
- [ ] `verify` = `bun run check:all` (the agent-facing alias; mandatory)
- [ ] `check:ci-parity` = `bun scripts/check-ci-parity.ts` (the manifest's
      final gate)
- [ ] `test:ci` (emits `junit.xml` + coverage)
- [ ] `prepare` (sets `core.hooksPath=scripts/hooks`; idempotent on
      non-git checkouts via `[ -e .git ] && ... || true`)
- [ ] Add `knip` and `yaml` (ci-parity's workflow parser) to
      `devDependencies`. (`jscpd` runs via `bunx`; no install.)
- [ ] For plot/mulch/seeds: add `pino` + `pino-pretty` to `devDependencies`.
- [ ] Conditional gates (`check:bundle-size`, `gen:docs:check`,
      `gen:openapi:check`) need no manifest edit — the runner includes them
      automatically when the script key exists in `package.json`.

### Step 9 — Verify

From the target repo's working directory:

```bash
bun install
bun run lint
bun run typecheck
bun test
bun run check:all
```

All five must exit 0. Run the new ratchet scripts standalone too to
confirm budgets are not under-spec'd:

```bash
bun run scripts/check-file-sizes.ts
bun run scripts/check-debt-markers.ts
bun run scripts/check-coverage.ts
bun run scripts/validate-agents-md.ts
```

### Step 10 — Commit & handoff

```bash
git add <only-the-changed-files>
git commit -m "<area>: <summary> (closes <criteria> for <repo>)"
```

One feature → one commit. Do not bundle unrelated changes. Do not push;
the user pushes manually. Fill out the `EndFeatureRun` handoff per §(c).

## Worked Example — Porting to a Hypothetical `nursery` Sub-Repo

Imagine `nursery` is a new Bun + TypeScript CLI for managing seedling
manifests. Baseline audit (run via `/readiness-report` from `nursery/`)
shows: no AGENTS.md, no `.github/`, no `scripts/`, no dependabot, 487-line
worst-case source file, 62% line coverage on `src/index.ts`, 4 untracked
TODOs scattered across the repo. The porting worker takes nursery from
baseline → L5 in seven feature-commits, all to `nursery/main`:

**Feature `nursery-baseline-catchup`** — Governance baseline.
- Copy `github/dependabot.yml`, `github/pull_request_template.md`, all
  three `ISSUE_TEMPLATE/*.yml`. Closes `dependency_update_automation`,
  `pr_templates`, `issue_templates`, and unlocks `min_release_age`
  (cooldown block already present in dependabot.yml).
- Verify: `bun run lint && bun run typecheck && bun test` all 0.
- Commit: `governance: add dependabot, PR template, ISSUE_TEMPLATEs (closes dependency_update_automation, pr_templates, issue_templates for nursery)`.

**Feature `nursery-quality-scripts`** — Ratchet scripts + budgets.
- Copy `scripts/check-file-sizes.ts`, `scripts/check-debt-markers.ts`,
  `scripts/check-coverage.ts`, `scripts/validate-agents-md.ts`,
  `scripts/hooks/pre-commit`, `scripts/report-test-timing.ts`,
  `scripts/report-quality-metrics.ts`. Adapt debt-markers tracker prefixes
  to `nursery-XXXX, mx-XXXX, #NNN, URL`.
- Baseline budgets:
  - File-size: observed max 487 → budget `max_new_file_lines: 550`. Add the
    four files currently over 400 to `ratcheted: {}` so future commits
    can't regress them.
  - Coverage: observed `src/index.ts` 62% lines → floor 0.62, branches
    floor 0.55. Round down by 1%.
  - Debt markers: 4 untracked TODOs. Pin all four to `nursery-001..004`
    (filed simultaneously in seeds) before commit. Budget: `max_markers: 0`,
    `tracker_prefixes: ["nursery-", "mx-", "#", "http"]`.
- Verify: each script exits 0 on the now-pinned repo.
- Commit: `quality: port ratchet scripts + budgets (closes large_file_detection, tech_debt_tracking, test_coverage_thresholds, test_performance_tracking, pre_commit_hooks for nursery)`.

**Feature `nursery-configs`** — Tool configs.
- Copy `configs/biome.json` (merging with nursery's existing biome.json),
  `configs/knip.json`, `configs/.jscpd.json`, `configs/bunfig.toml`,
  `configs/tsconfig.base.json` (extended from nursery's own tsconfig.json).
- Add `knip` to devDependencies; `bun install`.
- Verify: `bun run lint && bun run typecheck && bun test` all 0.
- Commit: `quality: port biome, knip, jscpd, tsconfig configs (closes naming_consistency, cyclomatic_complexity, duplicate_code_detection, unused_dependencies_detection for nursery)`.

**Feature `nursery-wiring`** — package.json scripts + prepare hook.
- Merge `package-scripts.json` into nursery's `package.json`. Add `check:size`,
  `check:debt`, `check:dups`, `check:deps`, `check:agents`, `check:coverage`,
  `check:all`, `test:ci`, `prepare`. Run `bun run prepare` once to install
  `core.hooksPath`.
- Verify: `bun run check:all` exits 0.
- Commit: `quality: wire check:all aggregator + prepare hook (closes pre_commit_hooks for nursery)`.

**Feature `nursery-agents-md`** — AGENTS.md authoring.
- Copy `docs/AGENTS.md.template` to `nursery/AGENTS.md`. Populate Commands
  (`bun run lint`, `bun run typecheck`, `bun test`, `bun run check:all`),
  Conventions (kebab-case filenames, redact policy, debt-marker tracker
  prefixes), and Agent Workflow sections.
- Verify: `bun run check:agents` exits 0 (validator finds all referenced
  scripts and file paths).
- Commit: `docs: author AGENTS.md (closes agents_md, agents_md_validation for nursery)`.

**Feature `nursery-ci`** — CI workflow upgrade.
- Copy `github/workflows/ci.yml` and `github/workflows/sync-labels.yml`.
  Extend nursery's existing ci.yml (do not replace). Add steps for
  `bun run check:all`, `bun run test:ci`, the two `report-*` summary
  emitters, and `actions/upload-artifact` for `junit.xml` and
  `coverage/lcov.info`. Copy `github/labels.yml`.
- Verify: workflow YAML lints clean; locally `bun run check:all` matches CI.
- Commit: `ci: extend ci.yml + add sync-labels (closes code_quality_metrics, issue_labeling_system for nursery)`.

**Feature `nursery-supporting`** — Devcontainer, env, runbook, gitignore, skill.
- Copy `.devcontainer/devcontainer.json` from warren (adjust name).
- Copy `env/.env.example.template` → `.env.example` (or document env vars
  in README if nursery has none).
- Copy `docs/RUNBOOK.md.template` → `RUNBOOK.md`. Fill in release / triage
  / rollback.
- Append `env/.gitignore.template` baseline entries to nursery's existing
  `.gitignore` (preserve nursery-specific entries).
- Author `.factory/skills/nursery-seedling-manage/SKILL.md` with frontmatter
  + body (>200 chars, real procedure).
- Verify: full gate suite green.
- Commit: `repo: devcontainer + env + runbook + gitignore + skill (closes devcontainer, env_template, runbooks_documented, gitignore_comprehensive, skills for nursery)`.

**Audit handoff.** Orchestrator prompts the user to run
`/readiness-report` from `nursery/` interactively. User pastes the report
back. Pass rate ≥80% with the same criteria as warren's ceiling → nursery
hits Level 5. If the report shows a regression or a claimed criterion
still failing, the orchestrator files a fix feature at the top of the queue
and the worker re-runs. Otherwise, milestone seals and nursery is done.

## What This Kit Does NOT Do

- Publish itself as an npm package. It is a template tree; sub-repos own
  their copies.
- Auto-propagate upstream changes. If the toolkit is updated post-port,
  the orchestrator decides per-repo whether to re-port.
- Close every rubric criterion. ~12 criteria are warren's ceiling
  (`automated_pr_review`, `metrics_collection`, `feature_flag_infrastructure`,
  …) and intentionally remain failing. See `mission library/warren-ceiling.md`.
- Run any auditor. The Agent-Readiness Droid is invoked manually by the
  user via `/readiness-report` inside an interactive `droid` session. This
  toolkit only makes the rubric pass; it does not score.

## See Also

- `mission library/l5-toolkit-spec.md` — formal spec for Milestone 0.
- `mission library/porting-playbook.md` — the per-repo procedure.
- `mission library/criteria-mapping.md` — full criterion → artifact table.
- `mission library/warren-ceiling.md` — criteria intentionally left failing.
- `warren/` — the reference implementation. Read-only.
- `readiness-report-prompt.md` — the authoritative 82-criterion rubric.
