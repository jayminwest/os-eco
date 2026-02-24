# Visual Spec

Run `bun branding/preview.ts` to see all of this rendered in your terminal.

---

## Color Palette: Forest (earth tones)

Each tool gets a unique brand color tied to its forest-layer metaphor.
Shared semantic colors handle status and feedback.

### Tool Brand Colors

| Tool | Color Name | RGB | Chalk |
|------|-----------|-----|-------|
| mulch | brown/soil | `139, 90, 43` | `chalk.rgb(139, 90, 43)` |
| seeds | sprout green | `124, 179, 66` | `chalk.rgb(124, 179, 66)` |
| canopy | deep green | `56, 142, 60` | `chalk.rgb(56, 142, 60)` |
| overstory | forest green | `27, 94, 32` | `chalk.rgb(27, 94, 32)` |

### Semantic Colors

| Role | Color | Chalk | When to use |
|------|-------|-------|-------------|
| accent | amber `255, 183, 77` | `chalk.rgb(255, 183, 77)` | IDs, references, links, cross-references |
| muted | stone gray `120, 120, 110` | `chalk.rgb(120, 120, 110)` | Metadata, version numbers, secondary info |
| success | — | (use tool brand color) | `✓` prefix on success messages |
| warning | ANSI yellow | `chalk.yellow` | `!` prefix on warnings |
| error | ANSI red | `chalk.red` | `✗` prefix on errors |
| info | ANSI cyan | `chalk.cyan` | In-progress status, informational highlights |
| dim | — | `chalk.dim` | Hints, help text, remediation suggestions |

### Implementation

Each tool defines its palette in its output module:

```typescript
import chalk from "chalk";

// Brand color — unique per tool (this example is seeds)
const brand = chalk.rgb(124, 179, 66);

// Shared across all tools
const accent = chalk.rgb(255, 183, 77);
const muted = chalk.rgb(120, 120, 110);
```

---

## Logo: Stacked Layers

The primary ecosystem logo. Each line uses that tool's brand color.
Tool name bold, description dim.

```
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  overstory   orchestration
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  canopy      prompts
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  seeds       issues
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  mulch       expertise
```

Use in:
- Root-level README
- `ov ecosystem` dashboard
- Website / docs landing page

---

## Status Icons: Set D (minimal)

Maximum terminal compatibility. No unicode circles, no emoji.

| Icon | Status | Color | Chalk |
|------|--------|-------|-------|
| `-` | open / pending | green | `chalk.green("-")` |
| `>` | in_progress / active | cyan | `chalk.cyan(">")` |
| `x` | closed / done | dim | `chalk.dim("x")` |
| `!` | blocked / warning | yellow | `chalk.yellow("!")` |

All four tools use these exact characters and colors for any status display.

---

## Message Formats

### Success

Tool brand color for both the `✓` and the message text. IDs in accent.

```
✓ Created issue seeds-a1b2
✓ Recorded convention in domain testing
✓ Emitted 7 prompts
✓ Agent started builder-01
```

```typescript
console.log(`${brand.bold("✓")} ${brand("Created issue")} ${accent("seeds-a1b2")}`);
```

### Warning

Yellow `!`, yellow message, dim hint.

```
! 3 prompts are stale — run cn emit --all
```

```typescript
console.log(`${chalk.yellow.bold("!")} ${chalk.yellow("3 prompts are stale")} ${chalk.dim("— run cn emit --all")}`);
```

### Error

Red `✗`, red message, dim hint.

```
✗ Config not found — run sd init
```

```typescript
console.log(`${chalk.red.bold("✗")} ${chalk.red("Config not found")} ${chalk.dim("— run sd init")}`);
```

### Info / Hint

Dim text, no prefix, indented.

```
  Run without --dry-run to apply changes
```

```typescript
console.log(chalk.dim("  Run without --dry-run to apply changes"));
```

---

## ID & Reference Highlighting

IDs and cross-references always use accent (amber). Context words use dim.

```
Issue seeds-a1b2 blocked by seeds-c3d4
Record mx-04f2 in testing domain
Prompt builder-prompt@3 extends base-prompt
Agent builder-01 on branch ov/builder-01
```

---

## Help Screen: Style A (clean header)

All tools follow this exact layout.

### Template

```
<tool> v<semver> — <tagline>

Usage: <alias> <command> [options]

Commands:
  <command>           <description>
  <command> <arg>     <description>
  ...

Options:
  -h, --help        Show help
  -v, --version     Show version
  --json            Output as JSON
  --quiet           Suppress non-error output

Run '<alias> <command> --help' for command-specific help.
```

### Rules

- **Line 1:** Tool name in brand color + bold, version in muted/dim, tagline in default
- **Command names:** ANSI green (not brand color — for readability across all tools)
- **Args** like `<id>`: dim
- **Option flags:** dim
- **Indent:** two spaces throughout
- **Command column:** descriptions aligned at column 20
- **Footer:** the `Run '<alias> <command> --help'` line in default text, alias in dim

### Tool-Specific Values

| Tool | Line 1 |
|------|--------|
| mulch | `mulch v0.6.0 — Structured expertise management` |
| seeds | `seeds v0.2.2 — Git-native issue tracking` |
| canopy | `canopy v0.1.5 — Prompt management & composition` |
| overstory | `overstory v0.6.3 — Multi-agent orchestration` |
