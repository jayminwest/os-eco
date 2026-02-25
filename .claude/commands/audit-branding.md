## description

Scout all four sub-repos to verify branding implementation, then update branding/ docs to match reality.

**Argument:** `$ARGUMENTS` — optional: a single tool name to audit [e.g., overstory]. If empty, audit all four.

## scout

Use the Task tool to spawn **four parallel Explore agents** [or one, if a specific tool was requested]. Each agent examines one sub-repo and reports ground truth.

### Per-tool agent instructions

For the tool at `<tool>/` [mulch, seeds, canopy, or overstory], check every item below. Report what IS implemented [with file path + line evidence] and what is NOT.

#### Package metadata
- package.json: name, version, description, bin entries, keywords

#### Branding
- Forest palette: brand color in palette/output module [check exact RGB values]
- Help screen: Style A with branded header [tool name in brand color + bold, version muted, tagline]
- Status icons: Set D — the characters `- > x !` with green/cyan/dim/yellow
- Message formats: printSuccess [brand checkmark], printError [red X], printWarning [yellow bang]

#### CLI standards
- Commander.js migration: all commands registered via Commander
- Chalk v5 integration
- `--version` / `-v` flag
- `--version --json` with JSON object containing name, version, runtime, platform
- `--quiet, -q` global flag
- `--verbose` global flag
- `--timing` global flag [outputs elapsed time to stderr]
- `--json` flag with success/command envelope
- `process.exitCode = 1` [not process.exit]
- VERSION constant exported from entry point

#### Commands
- upgrade command [with --check and --json]
- doctor command [with --fix and --json]
- Shell completions [completions subcommand for bash/zsh/fish]
- Typo suggestions [Levenshtein "did you mean?" for unknown commands]

#### Documentation
- README.md: badges [npm, CI, license], install instructions, command reference
- CHANGELOG.md: Keep a Changelog format with semantic versioning

## compare

After all agents return, compare their findings against the current `branding/checklists.md`. Identify:

1. **Items marked incomplete that are actually done** — these need to be checked off
2. **Items marked complete that are no longer true** — these need to be unchecked
3. **New items implemented that aren't tracked** — these should be added
4. **Version numbers that have changed** — update everywhere

## update

Edit the branding files to match reality:

### `branding/checklists.md`
- Check/uncheck items based on scout findings
- Update version numbers in section headers
- Update "Last verified" date to today
- Add any newly discovered features

### `branding/cli-standards.md`
- Update all status tables [global flags, VERSION constant, JSON envelope, exit mechanism, doctor, upgrade, features to propagate]
- Remove completed migration notes
- Update version numbers in examples

### `branding/visual-spec.md`
- Update version numbers in help screen examples

### `branding/roadmap.md`
- Mark completed items [e.g., shell completions, timing]
- Update version numbers in ov ecosystem example
- Add status notes to items that are partially done

### `branding/README.md`
- Update the status summary table with current versions and remaining items

## report

After all edits are made, output a summary:

### What changed
- List each file edited and what was updated

### Current status
| Tool | Version | Branding | CLI Standards | Remaining gaps |
|------|---------|----------|---------------|----------------|

### Remaining work
- Bullet list of all unchecked items across all tools, grouped by tool
