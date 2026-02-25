# os-eco Branding & Standards

Canonical reference for visual identity, CLI conventions, and consistency standards
across the os-eco tooling ecosystem (mulch, seeds, canopy, overstory).

Last verified: 2026-02-25.

## Status

| Tool | Version | Branding | CLI Standards | Remaining |
|------|---------|----------|---------------|-----------|
| Mulch | 0.6.2 | complete | complete | typo suggestions |
| Seeds | 0.2.4 | complete | complete | — |
| Canopy | 0.1.9 | complete | complete | — |
| Overstory | 0.6.8 | complete | mostly done | `--timing`, `ov upgrade`, JSON envelope consistency |

## Quick Start

```bash
# See all visual standards rendered in your terminal
bun branding/preview.ts
```

## Contents

| File | What it covers |
|------|---------------|
| [visual-spec.md](visual-spec.md) | Color palette, logo, icons, message formats, help screen template |
| [cli-standards.md](cli-standards.md) | Flags, JSON envelope, error handling, version, arg parsing |
| [documentation.md](documentation.md) | README template, badges, changelog format, npx support |
| [roadmap.md](roadmap.md) | Future work: cli-common package, CI parity, man pages, website |
| [checklists.md](checklists.md) | Per-tool implementation checklists |
| [preview.ts](preview.ts) | Runnable branding reference script |

## For Agents

If you're an agent working in a sub-repo, here's what you need:

1. Run `bun branding/preview.ts` (from the os-eco root) to see the visual targets
2. Read `visual-spec.md` for exact colors, icons, and message formats
3. Read `cli-standards.md` for flag conventions and JSON output format
4. Check `checklists.md` for your tool's specific TODO items
