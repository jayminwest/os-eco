# The os-eco `check:all` Standard

**Status:** frozen (rev 1, 2026-06-12) · **Tracker:** os-eco-3ee9 / pl-760e ·
**Runner:** [`templates/l5-toolkit/scripts/check-all.ts`](../templates/l5-toolkit/scripts/check-all.ts)

Every os-eco sub-repo exposes the same quality-gate surface: one canonical
name per gate, one ordered manifest, one byte-identical quiet runner, a
`verify` alias, and a CI-parity meta-gate that makes local `check:all` and CI
provably equivalent. A contributor (human or agent) who learns the gate
vocabulary in one repo knows it in all of them.

## 1. Canonical gate vocabulary

The terse names below are frozen. No repo may introduce a synonym for a gate
that has a canonical name (e.g. `check:file-sizes`, `check:duplicates`,
`validate:agents-md` are retired).

| Gate | Canonical script body | What it enforces |
|------|----------------------|------------------|
| `lint` | `biome check --error-on-warnings .` | Biome lint + format; warnings fail |
| `typecheck` | `tsc --noEmit` | Strict TypeScript |
| `check:agents` | `bun run scripts/validate-agents-md.ts` | AGENTS.md accuracy |
| `check:dups` | `bunx jscpd` | Duplication budget (`.jscpd.json`) |
| `check:deps` | `knip --dependencies` | Unused/undeclared dependencies |
| `check:size` | `bun run scripts/check-file-sizes.ts` | File-size ratchet |
| `check:debt` | `bun run scripts/check-debt-markers.ts` | Debt-marker ratchet |
| `check:coverage` | `bun run scripts/check-coverage.ts` | Tests + coverage-floor ratchet |
| `check:ci-parity` | `bun scripts/check-ci-parity.ts` | CI ⇄ check:all parity (§5) |

Repos may pass extra flags in a gate's script body (e.g. `--budget` paths,
`--known-missing` entries) — the *name* is what is frozen, not the flags.

## 2. Ordered core gate list

`check:all` runs the gates in exactly this order — cheap static gates first,
the expensive test+coverage gate second-to-last, and the parity meta-gate
last (so it always sees the final manifest):

```
lint → typecheck → check:agents → check:dups → check:deps → check:size
     → check:debt → [conditional gates] → check:coverage → check:ci-parity
```

All nine core gates are mandatory in every repo. A repo that is missing a
core gate's script fails `check:all` loudly — the runner never silently
narrows the manifest.

## 3. Conditional-gate registry

Conditional gates slot between `check:debt` and `check:coverage`, in this
order. The runner includes a conditional gate iff the repo's `package.json`
defines a script with that exact name — presence of the script *is* the
opt-in; there is no other registration step.

| Gate | Applies to | Current repos |
|------|-----------|---------------|
| `check:bundle-size` | repos that produce a UI/asset bundle | warren |
| `gen:docs:check` | repos with a generated-docs drift check | warren, canopy |
| `gen:openapi:check` | repos that serve an OpenAPI schema | warren |

Adding a new conditional gate is a standard change: extend
`CANONICAL_GATES` in the template runner, re-sync the fleet, and add a row
here.

## 4. The quiet runner

`check:all` must be `bun scripts/check-all.ts`, where `scripts/check-all.ts`
is **byte-identical** to the template copy — never edited in place. All
per-repo variation comes from `package.json` (which conditional gates exist,
what flags gate bodies pass). Trellis and the fleet close-out verify
byte-identity with a plain `cmp` against the template.

To keep byte-identity safe from local `lint:fix` runs, every repo's
`biome.json` carries a formatter-off override scoped to exactly
`scripts/check-all.ts` + `scripts/check-ci-parity.ts` (the linter still
covers them) — the canonical override ships in
`templates/l5-toolkit/configs/biome.json`. Reformatting the frozen scripts
is a standard rev, not a repo-local fix (tracked: os-eco root seeds).

The runner exports the resolved manifest as `GATES` (the single source of
truth that `check-ci-parity.ts` imports) and obeys this **output contract**:

- **One aligned line per gate:** `<✓|✗> <gate padded> (N.Ns)`.
- **Success:** a one-line tally — `12/12 gates passed (34.2s)`.
- **Failure:** the failing gate names plus *parsed failure signatures* from
  the captured output (bun-test `(fail)` lines, tsc/biome error lines,
  budget-ratchet violations — tail of output as fallback), never the full
  log, followed by a `re-run: bun run <gate>` hint.
- **`CHECK_ALL_VERBOSE=1`** streams every gate's full output instead of
  capturing.
- **`--bail`** stops at the first failing gate.

## 5. The `verify` rule

Every repo defines `"verify": "bun run check:all"`. `verify` is the
agent-facing entry point; `check:all` is the implementation. Neither name
may diverge from the other.

## 6. The CI-parity rule

`check:ci-parity` (byte-identical `scripts/check-ci-parity.ts`, ported from
warren's original) imports `GATES` from `check-all.ts`, parses every
`.github/workflows/ci*.yml`, and fails when any `bun run <X>` in a CI `run:`
step is not transitively reachable from the manifest. Release/publish
workflows (`release.yml` etc.) are intentionally out of scope.

Per-repo escape hatches live in an optional
`scripts/ci-parity-config.json` (the scripts themselves stay byte-identical):

```json
{
  "$comment": "justify every entry",
  "aliases": { "check:coverage:ci": "check:coverage" },
  "ciOnly": ["report:test-timing", "report:quality-metrics"]
}
```

- `aliases` — CI-side name → canonical gate-reachable equivalent, for
  variants that run the same gate with a different reporter/preamble.
- `ciOnly` — explicit allowlist for intentionally CI-only steps (summaries,
  environment setup). This is the only sanctioned divergence.

## 7. Per-repo reconciliation (pre-standard → canonical)

| Repo | Pre-standard state | Conformance change |
|------|--------------------|--------------------|
| warren | 12-gate `&&` chain; verbose names `check:file-sizes`, `check:debt-markers`, `check:duplicates`, `validate:agents-md` | rename to `check:size`/`check:debt`/`check:dups`/`check:agents`; adopt runner; refactor its check-ci-parity to import `GATES`; keeps all three conditional gates |
| plot | terse 6-gate `&&` chain, no lint/typecheck in chain | adopt runner (lint+typecheck join the manifest); add ci-parity + verify |
| mulch | same as plot | same as plot |
| seeds | same as plot | same as plot |
| trellis | terse 8-gate `&&` chain, `check:coverage` first | adopt runner (canonical order); add ci-parity + verify |
| canopy | terse 5-gate `&&` chain omitting `check:coverage`; has `gen:docs:check` outside the chain | adopt runner; `check:coverage` + `gen:docs:check` join the manifest; add ci-parity + verify |
| burrow | no `check:all` (test/lint/typecheck only) | greenfield: port toolkit scripts/configs, then runner + ci-parity |
| sapling | no `check:all`, no `scripts/` | greenfield: same as burrow |

## 8. Conformance checklist (any repo, any time)

1. `scripts/check-all.ts` and `scripts/check-ci-parity.ts` are byte-identical
   to `templates/l5-toolkit/scripts/`.
2. `package.json` has `check:all` = `bun scripts/check-all.ts`, `verify` =
   `bun run check:all`, `check:ci-parity` = `bun scripts/check-ci-parity.ts`,
   and only canonical gate names.
3. `bun run check:all` is green with the quiet-output contract.
4. CI workflows invoke only manifest-reachable scripts (or justified
   `ci-parity-config.json` entries).
5. The `yaml` package is a devDependency (ci-parity's workflow parser).
