# Implementation Checklists

Per-tool TODO lists. Check items off as work is completed.
Last verified: 2026-02-25 (scouted each sub-repo individually).

---

## Mulch (v0.6.2)

### Branding — Complete
- [x] Apply forest palette (brand: `rgb(139, 90, 43)`, accent, muted) — done (v0.6.0, palette.ts)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.6.0, custom configureHelp in cli.ts)
- [x] Adopt status icon set D (`✓ ! ✗ - > x`) — done (v0.6.0, icons object in palette.ts)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.6.0, printSuccess/Error/Warning in palette.ts)

### CLI Standards
- [x] Migrate arg parsing to commander — done (v0.6.0)
- [x] Replace raw ANSI with chalk — done (v0.6.0)
- [x] Standardize version flag to `-v, --version` — done (v0.6.0)
- [x] Add `--version --json` (rich metadata output) — done (v0.6.0, outputs name/version/runtime/platform)
- [x] Move VERSION to `export const VERSION` in entry point — done (v0.6.0, cli.ts)
- [x] Add `--quiet, -q` global flag — done (v0.6.0, setQuiet in palette.ts)
- [x] Add `--verbose` global flag — done (registered globally in cli.ts, used by prime/query/status)
- [x] Add `--compact` to `mulch prime` — done (v0.6.0, default output mode)
- [ ] Add typo suggestions for unknown commands
- [x] Add shell completions (`completions <shell>`) — done (bash/zsh/fish, completions.ts)
- [x] Add `--timing` flag — done (global flag, outputs to stderr)
- [x] JSON output helpers (`--json` flag, outputJson/outputJsonError) — done (json-output.ts)

### Commands
- [x] Add `mulch upgrade` command — done (v0.6.0, with `--check` and `--json`)
- [x] Add `mulch doctor` command (8 checks, `--fix`, `--json`) — done

---

## Seeds (v0.2.4) — Fully Complete

### Branding — Complete
- [x] Apply forest palette (brand: `rgb(124, 179, 66)`, accent, muted) — done (v0.2.2)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.2.2, custom configureHelp in index.ts)
- [x] Adopt status icon set D (`- > x !`) — done (v0.2.2)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.2.2)

### CLI Standards — Complete
- [x] Migrate arg parsing to commander — done (v0.2.1)
- [x] Replace raw ANSI with chalk — done (v0.2.1)
- [x] Add per-command `--help` (free from commander) — done
- [x] Standardize version flag to `-v, --version` — done
- [x] Add `--version --json` (rich metadata output) — done (v0.2.2, outputs name/version/runtime/platform)
- [x] Switch to `process.exitCode = 1` (no hard exit) — done (v0.2.1)
- [x] Add `--quiet, -q` global flag — done (v0.2.2)
- [x] Add `--verbose` global flag — done (v0.2.2)
- [x] Add `--dry-run` to `sd sync` — done (v0.2.2)
- [x] Add typo suggestions for unknown commands — done (Levenshtein, index.ts)
- [x] Add shell completions (`completions <shell>`) — done (bash/zsh/fish, completions.ts)
- [x] Add `--timing` flag — done (global flag, outputs to stderr)

### Commands — Complete
- [x] Add `sd upgrade` command (self-update from npm) — done (v0.2.2)
- [x] Add `sd doctor` command (9 checks, `--fix`, `--json`) — done

---

## Canopy (v0.1.9) — Fully Complete

### Branding — Complete
- [x] Apply forest palette (brand: `rgb(56, 142, 60)`, accent, muted) — done (v0.1.5)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.1.5, custom branded header)
- [x] Adopt status icon set D (`- > x !`) — done (v0.1.5, icons object in output.ts)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.1.5, fmt helpers in output.ts)

### CLI Standards — Complete
- [x] Remove dual-track arg parsing (commander-only) — done (register pattern, all 19 commands)
- [x] Add `--version --json` (rich metadata output) — done (v0.1.6, outputs name/version/runtime/platform)
- [x] Add `--quiet, -q` global flag — done (v0.1.6, setQuiet in output.ts)
- [x] Add `--verbose` global flag — done (v0.1.6, used by doctor command)
- [x] Add typo suggestions for unknown commands — done (v0.1.9, Levenshtein in index.ts)
- [x] Add shell completions (`completions <shell>`) — done (v0.1.9, bash/zsh/fish, completions.ts)
- [x] Add `--timing` flag — done (v0.1.9, global flag, outputs to stderr)

### Commands — Complete
- [x] Implement `cn doctor` (8 checks, `--fix`, `--json`) — done (v0.1.6)
- [x] Add `cn upgrade` command (self-update from npm) — done (v0.1.6, with `--check` and `--json`)

---

## Overstory (v0.6.10) — Fully Complete

### Branding — Complete
- [x] Apply forest palette (brand: `rgb(27, 94, 32)`, accent, muted) — done (v0.6.3, color.ts)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.6.8, branded header in index.ts)
- [x] Adopt status icon set D (`- > x !`) — done (v0.6.6, migrated dashboard + all commands)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.6.6, fmt helpers in color.ts)

### CLI Standards — Complete
- [x] Migrate arg parsing to commander (~30 command files) — done (v0.6.3)
- [x] Replace raw ANSI with chalk — done (v0.6.2, chalk v5)
- [x] Standardize version output (bare semver) — done (VERSION constant is bare semver)
- [x] Add `--version --json` (rich metadata output) — done (v0.6.8, JSON envelope with name/version/runtime/platform)
- [x] Add `--quiet, -q` global flag — done (v0.6.8, index.ts)
- [x] Add `--verbose` global flag — done (v0.6.8, index.ts)
- [x] Add shell completions (`completions <shell>`) — done (bash/zsh/fish, completions.ts)
- [x] Add typo suggestions for unknown commands — done (Levenshtein in index.ts)
- [x] Add `--timing` flag — done (v0.6.10, global flag, outputs to stderr)
- [x] Wrap JSON output in `{ success, command }` envelope — done (v0.6.10, json.ts with jsonOutput/jsonError helpers)
- [x] Switch to `process.exitCode = 1` (no hard exit) — done (v0.6.10, primary pattern; process.exit(0) only for SIGINT cleanup)

### Commands — Complete
- [x] Add `ov upgrade` command (self-update + `--all` for sibling tools) — done (v0.6.10, with `--check`, `--all`, `--json`)
- [x] Add ecosystem version check to `ov doctor` (check mulch/seeds/canopy) — done (v0.6.10, ecosystem check category)
- [x] Implement `ov ecosystem` dashboard command — done (v0.6.10, registered via addCommand)

---

## Cross-Cutting

### Documentation
- [x] Unify all sub-repo READMEs to template (see documentation.md) — done (all four follow canonical structure)
- [x] Add consistent badge set to all repos (npm, CI, license) — done (all four repos have badges)
- [x] Adopt Keep a Changelog format in all repos — done (all four have CHANGELOG.md)
- [ ] Ensure `npx @os-eco/<tool>-cli` works for all tools
- [ ] Update root os-eco README as ecosystem landing page

### Infrastructure
- [ ] Standardize CI workflows across all repos
- [ ] Add version-sync CI check (package.json vs VERSION constant) — Seeds has this, Canopy doctor checks it
- [ ] Create `@os-eco/cli-common` shared package — 4/4 tools on commander+chalk now, ready to extract

### Future
- [ ] Cross-tool JSON piping tests
- [ ] Man page generation
- [ ] `ov init` bootstraps all tools
- [ ] GitHub Pages website
- [ ] Consistent spinner style for long-running commands
