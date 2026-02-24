# os-eco Branding & Standards

Canonical reference for visual identity, CLI conventions, and consistency standards
across the os-eco tooling ecosystem (mulch, seeds, canopy, overstory).

## Quick Start

```bash
# See all visual standards rendered in your terminal
bun branding/preview.ts
```

## Contents

| File | What it covers |
|------|---------------|
| [visual-spec.md](visual-spec.md) | Color palette, logo, icons, message formats, help screen template |
| [cli-standards.md](cli-standards.md) | Flags, JSON envelope, error handling, version, arg parsing, commander/chalk migration |
| [documentation.md](documentation.md) | README template, badges, changelog format, npx support |
| [roadmap.md](roadmap.md) | Future work: cli-common package, CI parity, man pages, website, wow-factor features |
| [checklists.md](checklists.md) | Per-tool implementation checklists |
| [preview.ts](preview.ts) | Runnable branding reference script |

## For Agents

If you're an agent working in a sub-repo, here's what you need:

1. Run `bun branding/preview.ts` (from the os-eco root) to see the visual targets
2. Read `visual-spec.md` for exact colors, icons, and message formats
3. Read `cli-standards.md` for flag conventions and JSON output format
4. Check `checklists.md` for your tool's specific TODO items
