# Documentation Standards

How every sub-repo presents itself.

---

## README Template

Every sub-repo README follows this structure:

```markdown
# <tool-name>

<one-line tagline>

[![npm](https://img.shields.io/npm/v/@os-eco/<tool>-cli)](https://www.npmjs.com/package/@os-eco/<tool>-cli)
[![CI](https://github.com/jayminwest/<tool>/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/<tool>/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## Install

\`\`\`bash
bun install -g @os-eco/<tool>-cli
\`\`\`

Or try without installing:

\`\`\`bash
npx @os-eco/<tool>-cli --help
\`\`\`

## Quick Start

<3-5 commands showing the core workflow>

## Commands

| Command | Description |
|---------|-------------|
| `<alias> init` | ... |
| ... | ... |

## Architecture

<brief description of storage format, key design decisions>

## Part of os-eco

<tool> is part of the [os-eco](https://github.com/jayminwest/os-eco) AI agent tooling ecosystem.

\`\`\`
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  overstory   orchestration
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  canopy      prompts
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  seeds       issues
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  mulch       expertise
\`\`\`

## License

MIT
```

### Rules
- Badge order: npm version, CI, license
- Install section always shows both `bun install -g` and `npx` fallback
- Quick Start section: real commands, not pseudo-code
- Commands table: every user-facing command listed
- Architecture section: keep it short, link to SPEC.md for details
- "Part of os-eco" section with the stacked-layer logo at the bottom

---

## Badge Set

Every repo uses these three badges:

```markdown
[![npm](https://img.shields.io/npm/v/@os-eco/<tool>-cli)](https://www.npmjs.com/package/@os-eco/<tool>-cli)
[![CI](https://github.com/jayminwest/<tool>/actions/workflows/ci.yml/badge.svg)](https://github.com/jayminwest/<tool>/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
```

---

## Changelog Format

All tools use [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

## [Unreleased]

## [0.6.0] - 2026-02-20

### Added
- New `doctor` command with `--fix` flag

### Changed
- Migrated arg parsing to commander

### Fixed
- JSON output now uses consistent envelope format
```

Categories in this order: Added, Changed, Deprecated, Removed, Fixed, Security.

---

## npx Support

Every tool should work with `npx @os-eco/<tool>-cli` for zero-install tryout.

Requirements:
- `bin` field in `package.json` points to the entry script
- Shebang `#!/usr/bin/env bun` on the entry script (requires Bun installed)
- `files` field in `package.json` includes `src/` so npm publishes the source

---

## Root-Level README

The os-eco root README serves as the ecosystem landing page:

- Stacked-layer logo (in the brand colors, or as plain text for GitHub)
- One-sentence description of each tool
- Install-all snippet: `bun install -g @os-eco/mulch-cli @os-eco/seeds-cli @os-eco/canopy-cli @os-eco/overstory-cli`
- Relationship graph showing how tools interact
- Links to each sub-repo
- "Getting Started" section showing a full workflow across tools
