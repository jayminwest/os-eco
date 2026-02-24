# Implementation Checklists

Per-tool TODO lists. Check items off as work is completed.

---

## Mulch

### Branding
- [ ] Apply forest palette (brand: `rgb(139, 90, 43)`, accent, muted)
- [ ] Adopt help screen style A (see visual-spec.md)
- [ ] Adopt status icon set D (`- > x !`) — currently uses `✔ ⚠ ✘`
- [ ] Adopt message format standards (`✓ ✗ !`)

### CLI Standards
- [x] Migrate arg parsing to commander — done (v0.6.0)
- [x] Replace raw ANSI with chalk — done (v0.6.0)
- [ ] Standardize version flag to `-v, --version`
- [ ] Add `--version --json` (rich metadata output)
- [ ] Move VERSION to `export const VERSION` in entry point — still inline `.version("0.6.0")` in cli.ts
- [ ] Add `--quiet, -q` global flag
- [ ] Add `--compact` to `mulch prime`
- [ ] Add typo suggestions for unknown commands
- [ ] Add shell completions (`--completions <shell>`)
- [ ] JSON errors to stdout (currently stderr)
- [ ] Add `--timing` flag

### Commands
- [ ] Rename `mulch update` to `mulch upgrade` (for consistency)

---

## Seeds

### Branding
- [x] Apply forest palette (brand: `rgb(124, 179, 66)`, accent, muted) — done (v0.2.2)
- [x] Adopt help screen style A (see visual-spec.md) — done via Commander
- [x] Adopt status icon set D (`- > x !`) — done (v0.2.2)
- [x] Adopt message format standards (`✓ ✗ !`) — done (v0.2.2)

### CLI Standards
- [x] Migrate arg parsing to commander — done (v0.2.1)
- [x] Replace raw ANSI with chalk — done (v0.2.1)
- [x] Add per-command `--help` (free from commander) — done
- [x] Standardize version flag to `-v, --version` — done
- [ ] Add `--version --json` (rich metadata output)
- [x] Switch to `process.exitCode = 1` (no hard exit) — done (v0.2.1)
- [x] Add `--quiet, -q` global flag — done (v0.2.2)
- [x] Add `--verbose` global flag — done (v0.2.2)
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
- [ ] Add `--version --json` (rich metadata output)
- [ ] Add `--quiet, -q` global flag
- [ ] Add `--verbose` global flag
- [ ] Add typo suggestions for unknown commands
- [ ] Add shell completions (`--completions <shell>`)
- [ ] Add `--timing` flag

### Commands
- [ ] Implement `cn doctor` (8 checks, `--fix`, `--json`)
- [ ] Add `cn upgrade` command (self-update from npm)

---

## Overstory

### Branding
- [x] Apply forest palette (brand: `rgb(27, 94, 32)`, accent, muted) — done (v0.6.3)
- [ ] Adopt help screen style A (see visual-spec.md) — Commander gives structure, needs style alignment
- [ ] Adopt status icon set D (`- > x !`) — dashboard uses custom state icons (booting, working, etc.)
- [ ] Adopt message format standards (`✓ ✗ !`) — uses log format `[HH:MM:SS] LVL agent | event`
- [ ] Add stacked-layer logo to `ov ecosystem` dashboard

### CLI Standards
- [x] Migrate arg parsing to commander (~30 command files) — ~30/31 done (v0.6.3)
- [x] Replace raw ANSI with chalk — done (v0.6.2, chalk v5)
- [ ] Standardize version output (bare semver, no "overstory v" prefix)
- [ ] Add `--version --json` (rich metadata output)
- [ ] Export VERSION constant — still `const VERSION`, needs `export`
- [ ] Wrap JSON output in `{ success, command }` envelope
- [ ] Switch to `process.exitCode = 1` (no hard exit) — still uses `process.exit(1)`
- [ ] Add `--timing` flag

### Commands
- [ ] Add global `--fix` flag to `ov doctor`
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
- [ ] Add version-sync CI check (package.json vs VERSION constant) — Seeds has this
- [ ] Create `@os-eco/cli-common` shared package — 3/4 tools on commander+chalk now, ready to extract

### Future
- [ ] Cross-tool JSON piping tests
- [ ] Man page generation
- [ ] `ov init` bootstraps all tools
- [ ] GitHub Pages website
- [ ] Consistent spinner style for long-running commands
