# CLI Standards

Technical conventions that all four tools must follow.

---

## Arg Parsing & Color: Commander + Chalk

All tools use `commander` (v14+) for arg parsing and `chalk` (v5+) for color output.

| Tool | commander | chalk | Status |
|------|-----------|-------|--------|
| Mulch | yes | yes | done (v0.6.0) |
| Seeds | yes | yes | done (v0.2.1) |
| Canopy | yes | yes | done (v0.1.5, register pattern) |
| Overstory | yes | yes | done (v0.6.3) |

All four tools are fully migrated to Commander + Chalk.

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
| `--timing` | Print execution time to stderr |

### Current status

All four tools support all global flags:

| Flag | Mulch | Seeds | Canopy | Overstory |
|------|-------|-------|--------|-----------|
| `-v, --version` | done | done | done | done |
| per-command `--help` | done | done | done | done |
| `--quiet, -q` | done | done | done | done |
| `--verbose` | done | done | done | done |
| `--json` | done | done | done | done |
| `--timing` | done | done | done | done |

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

| Tool | Location | Status |
|------|----------|--------|
| Mulch | `export const VERSION` in `src/cli.ts` | done |
| Seeds | `export const VERSION` in `src/index.ts` | done |
| Canopy | `export const VERSION` in `src/index.ts` | done |
| Overstory | `export const VERSION` in `src/index.ts` | done |

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
| Overstory | yes | done (v0.6.11, json.ts with jsonOutput/jsonError helpers) |

### JSON error channel

- **With `--json`:** errors go to **stdout** inside the `{ success: false }` envelope
- **Without `--json`:** errors go to **stderr** as colored text

Rationale: machine consumers parse stdout; stderr is for human-only diagnostics.

---

## Error Handling

### Exit mechanism

Use `process.exitCode = 1` everywhere. No hard `process.exit()`.
Rationale: testable, allows cleanup/finally blocks to run.

| Tool | Status |
|------|--------|
| Mulch | done (`process.exitCode = 1`) |
| Seeds | done (`process.exitCode = 1`, migrated v0.2.1) |
| Canopy | done (`ExitError` -> `process.exitCode`) |
| Overstory | done (`process.exitCode = 1`; `process.exit(0)` only for SIGINT cleanup) |

### Error codes

Overstory has structured error codes (`CONFIG_ERROR`, `AGENT_ERROR`, etc.).
The other tools don't need this — Overstory is more complex. No need to force on simpler tools.

---

## Doctor Command

Every tool has a `doctor` command with `--fix` and `--json`.

| Tool | Exists | --fix | --json | Status |
|------|--------|-------|--------|--------|
| Mulch | yes (8 checks) | yes | yes | done |
| Seeds | yes (9 checks) | yes | yes | done |
| Canopy | yes (8 checks) | yes | yes | done (v0.1.6) |
| Overstory | yes (10 categories) | yes | yes | done (v0.6.11) |

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
| Mulch | `mulch upgrade` | done (with `--check` and `--json`) |
| Seeds | `sd upgrade` | done (v0.2.2, with `--check` and `--json`) |
| Canopy | `cn upgrade` | done (v0.1.6, with `--check` and `--json`) |
| Overstory | `ov upgrade` + `ov upgrade --all` | done (v0.6.11, with `--check`, `--all`, `--json`) |

### Behavior
- Check npm registry for latest `@os-eco/<tool>-cli`
- Compare with local VERSION
- `--check`: print current vs latest, exit 0 if current, exit 1 if outdated
- Default: install latest via `bun install -g @os-eco/<tool>-cli@latest`
- `--json`: `{ "current": "0.6.0", "latest": "0.7.0", "upToDate": false }`
- `ov upgrade --all`: update all four tools at once

---

## Features to Propagate

| Feature | Done | Missing from |
|---------|------|-------------|
| `--quiet, -q` | all 4 | — |
| `--verbose` | all 4 | — |
| `--dry-run` (sync) | all 4 | — |
| Per-command `--help` | all 4 | — |
| Shell completions | all 4 | — |
| `--timing` | all 4 | — |
| Typo suggestions | all 4 | — |
| `upgrade` command | all 4 | — |
