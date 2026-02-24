# CLI Standards

Technical conventions that all four tools must follow.

---

## Arg Parsing & Color: Commander + Chalk

All tools use `commander` (v14+) for arg parsing and `chalk` (v5+) for color output.

| Tool | commander | chalk | Status |
|------|-----------|-------|--------|
| Mulch | yes | yes | done |
| Seeds | yes | yes | done (v0.2.1) |
| Canopy | yes | yes | done (v0.1.5, register pattern) |
| Overstory | yes (~30/31 commands) | yes | nearly done (v0.6.3) |

### Seeds migration — COMPLETE
- ~~Replace `parseArgs()` per command with commander~~ done (v0.2.1)
- ~~Replace ANSI codes in `src/output.ts` with chalk~~ done (v0.2.1)
- ~~Commander gives free per-command `--help`~~ done

### Canopy migration — COMPLETE
- ~~Remove dual-track parsing~~ done (commander register pattern for all 19 commands)
- ~~Already uses chalk~~ confirmed

### Overstory migration — NEARLY COMPLETE
- ~30 of 31 command files migrated to Commander.js typed options (v0.6.3)
- ~~Replace raw ANSI with chalk~~ done (chalk v5)
- ~~Remove manual `NO_COLOR` / `FORCE_COLOR` checks~~ chalk handles this
- `--quiet, -q` is a global commander option

---

## Global Flags

Every tool must support these flags:

| Flag | Description |
|------|-------------|
| `-h, --help` | Show help (global and per-command) |
| `-v, --version` | Print bare semver string (e.g. `0.6.0`, no prefix) |
| `--json` | Machine-readable JSON output |
| `--quiet, -q` | Suppress non-error output |
| `--verbose` | Extra diagnostic output |

### Current gaps

| Flag | Mulch | Seeds | Canopy | Overstory |
|------|-------|-------|--------|-----------|
| `-v` short form | missing | done | done | done |
| per-command `--help` | done | done | done | done |
| `--quiet, -q` | missing | done | missing | done |
| `--verbose` | done | done | missing | done |
| `--dry-run` | done | done | done | done |

---

## Version Output

```
$ sd --version
0.2.0
```

- Bare semver, no tool name prefix
- `--version --json` returns rich metadata:

```json
{
  "name": "@os-eco/seeds-cli",
  "version": "0.2.0",
  "runtime": "bun",
  "platform": "darwin-arm64"
}
```

### VERSION constant

All tools: `export const VERSION = "<semver>"` in the entry point, kept in sync with `package.json` via `version:bump` script.

| Tool | Current | Target |
|------|---------|--------|
| Mulch | `.version("0.6.0")` inline in `cli.ts` | `export const VERSION` in `src/cli.ts` |
| Seeds | `export const VERSION = "0.2.2"` in `src/index.ts` | done |
| Canopy | `export const VERSION = "0.1.5"` in `src/index.ts` | done |
| Overstory | `const VERSION = "0.6.3"` in `src/index.ts` | add `export` |

---

## JSON Response Envelope

All `--json` output uses this shape:

```json
{ "success": true, "command": "<name>", ...data }
{ "success": false, "command": "<name>", "error": "<message>" }
```

| Tool | Uses envelope | Status |
|------|-------------|--------|
| Mulch | yes | done |
| Seeds | yes | done |
| Canopy | yes | done |
| Overstory | **no** (raw arrays/objects) | needs envelope |

### JSON error channel

- **With `--json`:** errors go to **stdout** inside the `{ success: false }` envelope
- **Without `--json`:** errors go to **stderr** as colored text

Rationale: machine consumers parse stdout; stderr is for human-only diagnostics.

---

## Error Handling

### Exit mechanism

Use `process.exitCode = 1` everywhere. No hard `process.exit()`.
Rationale: testable, allows cleanup/finally blocks to run.

| Tool | Current | Target |
|------|---------|--------|
| Mulch | `process.exitCode = 1` | done |
| Seeds | `process.exitCode = 1` | done (migrated from `process.exit(1)` in v0.2.1) |
| Canopy | `ExitError` -> `process.exitCode` | done |
| Overstory | `process.exit(1)` | change to `process.exitCode = 1`, keep typed errors |

### Error codes

Overstory has structured error codes (`CONFIG_ERROR`, `AGENT_ERROR`, etc.).
The other tools don't need this — Overstory is more complex. No need to force on simpler tools.

---

## Doctor Command

Every tool has a `doctor` command with `--fix` and `--json`.

| Tool | Exists | --fix | Status |
|------|--------|-------|--------|
| Mulch | yes (8 checks) | yes | done |
| Seeds | yes (9 checks) | yes | done |
| Canopy | **no** | - | needs implementation |
| Overstory | yes (9 categories) | **no** | add `--fix` flag |

### Canopy doctor checks to implement
- config: `.canopy/config.yaml` exists and is valid
- jsonl-integrity: `prompts.jsonl` and `schemas.jsonl` parse correctly
- schema-validation: all prompts pass their declared schema
- inheritance: no broken `extends` references, no circular chains
- emit-staleness: emitted files match current prompt versions
- stale-locks: remove lock files older than 30s
- gitattributes: `.canopy/*.jsonl merge=union` present
- version-sync: package.json matches `src/index.ts` VERSION

### Overstory ecosystem check (`ov doctor`)
Verify sibling tools are:
1. Installed and on `$PATH`
2. Reporting a version (`mulch --version`, `sd --version`, `cn --version`)
3. At a compatible version

`ov doctor --fix` should:
1. Run `bun install -g @os-eco/mulch-cli @os-eco/seeds-cli @os-eco/canopy-cli`
2. Re-check versions after update
3. Report what was updated

---

## Upgrade Command (self-update)

Use `upgrade` (not `update`) to avoid collision with Seeds/Canopy record-update commands.

```
sd upgrade              # install latest from npm
sd upgrade --check      # check for updates without installing
```

| Tool | Command | Status |
|------|---------|--------|
| Mulch | `mulch update` (already exists) | consider renaming to `mulch upgrade` for consistency |
| Seeds | `sd upgrade` | done (v0.2.2, with `--check` flag) |
| Canopy | `cn upgrade` | needs implementation |
| Overstory | `ov upgrade` + `ov upgrade --all` | needs implementation |

### Behavior
- Check npm registry for latest `@os-eco/<tool>-cli`
- Compare with local VERSION
- `--check`: print current vs latest, exit 0 if current, exit 1 if outdated
- Default: install latest via `bun install -g @os-eco/<tool>-cli@latest`
- `--json`: `{ "current": "0.6.0", "latest": "0.7.0", "upToDate": false }`
- `ov upgrade --all`: update all four tools at once

---

## Features to Propagate

| Feature | Source | Missing from |
|---------|--------|-------------|
| `--quiet, -q` | Overstory, Seeds | Mulch, Canopy |
| `--verbose` | Overstory, Seeds, Mulch | Canopy |
| `--compact` (prime) | Seeds, Canopy, Overstory | Mulch |
| `--dry-run` (sync) | Seeds, Mulch, Canopy, Overstory | — (all done) |
| Per-command `--help` | Commander (free) | — (all on Commander now) |
| Typo suggestions | Overstory | Mulch, Seeds, Canopy |
| Shell completions | Overstory | Mulch, Seeds, Canopy |
| `--timing` / `--debug` | — | All (new: show execution time) |
