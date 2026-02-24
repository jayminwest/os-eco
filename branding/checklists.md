# Implementation Checklists

Per-tool TODO lists. Check items off as work is completed.

---

## Mulch

### Branding
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
- [ ] Add `--verbose` global flag — only on `mulch prime`, not global
- [x] Add `--compact` to `mulch prime` — done (v0.6.0, default output mode)
- [ ] Add typo suggestions for unknown commands
- [ ] Add shell completions (`--completions <shell>`)
- [ ] JSON errors to stdout (currently stderr)
- [ ] Add `--timing` flag

### Commands
- [x] Add `mulch upgrade` command — done (v0.6.0, with `--check` and `--json`)

---

## Seeds

### Branding
- [x] Apply forest palette (brand: `rgb(124, 179, 66)`, accent, muted) — done (v0.2.2)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.2.2, custom configureHelp in index.ts)
- [x] Adopt status icon set D (`- > x !`) — done (v0.2.2)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.2.2)

### CLI Standards
- [x] Migrate arg parsing to commander — done (v0.2.1)
- [x] Replace raw ANSI with chalk — done (v0.2.1)
- [x] Add per-command `--help` (free from commander) — done
- [x] Standardize version flag to `-v, --version` — done
- [x] Add `--version --json` (rich metadata output) — done (v0.2.2, outputs name/version/runtime/platform)
- [x] Switch to `process.exitCode = 1` (no hard exit) — done (v0.2.1)
- [x] Add `--quiet, -q` global flag — done (v0.2.2)
- [x] Add `--verbose` global flag — done (v0.2.2, defined but underused in commands)
- [x] Add `--dry-run` to `sd sync` — done (v0.2.2)
- [ ] Add typo suggestions for unknown commands
- [ ] Add shell completions (`--completions <shell>`)
- [ ] Add `--timing` flag

### Commands
- [x] Add `sd upgrade` command (self-update from npm) — done (v0.2.2)

---

## Canopy

### Branding
- [x] Apply forest palette (brand: `rgb(56, 142, 60)`, accent, muted) — done (v0.1.5)
- [x] Adopt help screen style A (see visual-spec.md) — done (v0.1.5, custom branded header)
- [x] Adopt status icon set D (`- > x !`) — done (v0.1.5, icons object in output.ts)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.1.5, fmt helpers in output.ts)

### CLI Standards
- [x] Remove dual-track arg parsing (commander-only) — done (register pattern, all 19 commands)
- [x] Add `--version --json` (rich metadata output) — done (v0.1.6, outputs name/version/runtime/platform)
- [x] Add `--quiet, -q` global flag — done (v0.1.6, setQuiet in output.ts)
- [x] Add `--verbose` global flag — done (v0.1.6, used by doctor command)
- [ ] Add typo suggestions for unknown commands
- [ ] Add shell completions (`--completions <shell>`)
- [ ] Add `--timing` flag

### Commands
- [x] Implement `cn doctor` (8 checks, `--fix`, `--json`) — done (v0.1.6)
- [x] Add `cn upgrade` command (self-update from npm) — done (v0.1.6, with `--check` and `--json`)

---

## Overstory

### Branding
- [x] Apply forest palette (brand: `rgb(27, 94, 32)`, accent, muted) — done (v0.6.3, color.ts)
- [ ] Adopt help screen style A (see visual-spec.md) — still default Commander output, no branded header
- [ ] Adopt status icon set D (`- > x !`) — dashboard uses `● ◐ ⚠ ○ ✓`, doctor uses `✔ ⚠ ✘`
- [ ] Adopt message format standards (`✓ ✗ !`) — uses log format `[HH:MM:SS] LVL agent | event`
- [ ] Add stacked-layer logo to `ov ecosystem` dashboard

### CLI Standards
- [x] Migrate arg parsing to commander (~30 command files) — ~30/31 done (v0.6.3)
- [x] Replace raw ANSI with chalk — done (v0.6.2, chalk v5)
- [ ] Standardize version output (bare semver, no "overstory v" prefix) — still outputs `overstory v0.6.4`
- [ ] Add `--version --json` (rich metadata output)
- [ ] Export VERSION constant — still `const VERSION`, needs `export`
- [ ] Wrap JSON output in `{ success, command }` envelope — inconsistent across commands
- [ ] Switch to `process.exitCode = 1` (no hard exit) — mixed: uses both `process.exit(1)` and `process.exitCode`
- [ ] Add `--timing` flag

### Commands
- [ ] Add global `--fix` flag to `ov doctor` — doctor exists but is read-only
- [ ] Add ecosystem version check to `ov doctor` (check mulch/seeds/canopy)
- [ ] Add `ov upgrade` command (self-update + `--all` for sibling tools)
- [ ] Implement `ov ecosystem` dashboard command

---

## Cross-Cutting

### Documentation
- [ ] Unify all sub-repo READMEs to template (see documentation.md) — Seeds closest to template
- [x] Add consistent badge set to all repos (npm, CI, license) — done on Seeds, Mulch
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
