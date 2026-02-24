#!/usr/bin/env bun
/**
 * os-eco branding reference — run `bun branding/preview.ts`
 *
 * This is the canonical visual spec for all four CLIs.
 * Point agents here so they know exactly what output should look like.
 */

// ── Palette definition (shared across all tools) ──────────────────────
const palette = {
  brand: {
    mulch:     "\x1b[38;2;139;90;43m",   // brown/soil
    seeds:     "\x1b[38;2;124;179;66m",   // sprout green
    canopy:    "\x1b[38;2;56;142;60m",    // deep green
    overstory: "\x1b[38;2;27;94;32m",     // forest green
  },
  accent:  "\x1b[38;2;255;183;77m",       // amber — IDs, references
  muted:   "\x1b[38;2;120;120;110m",      // stone gray — metadata
  success: "\x1b[32m",                     // green (ANSI)
  warn:    "\x1b[33m",                     // yellow (ANSI)
  error:   "\x1b[31m",                     // red (ANSI)
  info:    "\x1b[36m",                     // cyan (ANSI)
};

const R = "\x1b[0m";
const B = "\x1b[1m";
const D = "\x1b[2m";

function hr(label: string) {
  console.log(`\n${D}──── ${R}${B}${label}${R} ${D}${"─".repeat(Math.max(0, 54 - label.length))}${R}\n`);
}

// ── Tools ─────────────────────────────────────────────────────────────
const tools = [
  { key: "mulch",     alias: "ml", ver: "0.6.0", tag: "Structured expertise management", desc: "expertise" },
  { key: "seeds",     alias: "sd", ver: "0.2.2", tag: "Git-native issue tracking",       desc: "issues" },
  { key: "canopy",    alias: "cn", ver: "0.1.5", tag: "Prompt management & composition",  desc: "prompts" },
  { key: "overstory", alias: "ov", ver: "0.6.3", tag: "Multi-agent orchestration",        desc: "orchestration" },
];

// =====================================================================
console.log(`\n${B}os-eco CLI Branding Reference${R}`);
console.log(`${D}${"═".repeat(60)}${R}`);

// ── 1. Palette ───────────────────────────────────────────────────────
hr("Palette: Forest (earth tones)");

console.log(`  ${B}Tool colors:${R}`);
for (const t of tools) {
  const col = palette.brand[t.key as keyof typeof palette.brand];
  console.log(`    ${col}██${R} ${col}${B}${t.key}${R}  ${D}rgb in source${R}`);
}

console.log();
console.log(`  ${B}Semantic colors:${R}`);
console.log(`    ${palette.accent}██${R} accent   ${D}IDs, references, links${R}`);
console.log(`    ${palette.muted}██${R} muted    ${D}metadata, secondary info${R}`);
console.log(`    ${palette.success}██${R} success  ${D}ANSI green${R}`);
console.log(`    ${palette.warn}██${R} warn     ${D}ANSI yellow${R}`);
console.log(`    ${palette.error}██${R} error    ${D}ANSI red${R}`);
console.log(`    ${palette.info}██${R} info     ${D}ANSI cyan${R}`);

// ── 2. Logo ──────────────────────────────────────────────────────────
hr("Logo: Stacked layers");

for (const t of [...tools].reverse()) {
  const col = palette.brand[t.key as keyof typeof palette.brand];
  const pad = " ".repeat(10 - t.key.length);
  console.log(`  ${col}▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓${R}  ${col}${B}${t.key}${R}${pad} ${D}${t.desc}${R}`);
}

// ── 3. Help screen ───────────────────────────────────────────────────
hr("Help screen: Style A (clean header)");

// Using seeds as the example
const g = palette.success;
const sd = palette.brand.seeds;
console.log(`  ${sd}${B}seeds${R} ${D}v0.2.2${R} — git-native issue tracking`);
console.log();
console.log(`  ${B}Usage:${R} sd <command> [options]`);
console.log();
console.log(`  ${B}Commands:${R}`);
console.log(`    ${g}init${R}              Initialize .seeds/ in current directory`);
console.log(`    ${g}create${R}            Create a new issue`);
console.log(`    ${g}show${R} ${D}<id>${R}         Show issue details`);
console.log(`    ${g}list${R}              List issues`);
console.log(`    ${g}ready${R}             Show unblocked work`);
console.log(`    ${g}update${R} ${D}<id>${R}       Update issue fields`);
console.log(`    ${g}close${R} ${D}<id>${R}        Close an issue`);
console.log(`    ${g}sync${R}              Stage and commit changes`);
console.log(`    ${g}doctor${R}            Run health checks`);
console.log(`    ${g}upgrade${R}           Update to latest version`);
console.log();
console.log(`  ${B}Options:${R}`);
console.log(`    ${D}-h, --help${R}        Show help`);
console.log(`    ${D}-v, --version${R}     Show version`);
console.log(`    ${D}--json${R}            Output as JSON`);
console.log(`    ${D}--quiet${R}           Suppress non-error output`);
console.log();
console.log(`  Run ${D}sd <command> --help${R} for command-specific help.`);

// ── 4. Status icons ──────────────────────────────────────────────────
hr("Status icons: Set D (minimal)");

console.log(`  ${palette.success}-${R} open / pending        ${D}green${R}`);
console.log(`  ${palette.info}>${R} in_progress / active   ${D}cyan${R}`);
console.log(`  ${D}x${R} closed / done         ${D}dim${R}`);
console.log(`  ${palette.warn}!${R} blocked / warning      ${D}yellow${R}`);

// ── 5. Message formats ──────────────────────────────────────────────
hr("Message formats");

console.log(`  ${B}Success${R} ${D}(tool brand color + ✓):${R}`);
console.log(`  ${sd}${B}✓${R} ${sd}Created issue${R} ${palette.accent}seeds-a1b2${R}`);
console.log(`  ${palette.brand.mulch}${B}✓${R} ${palette.brand.mulch}Recorded convention${R} ${D}in domain${R} ${palette.accent}testing${R}`);
console.log(`  ${palette.brand.canopy}${B}✓${R} ${palette.brand.canopy}Emitted 7 prompts${R}`);
console.log(`  ${palette.brand.overstory}${B}✓${R} ${palette.brand.overstory}Agent started${R} ${palette.accent}builder-01${R}`);
console.log();
console.log(`  ${B}Warning${R} ${D}(yellow + !):${R}`);
console.log(`  ${palette.warn}${B}!${R} ${palette.warn}3 prompts are stale${R} ${D}— run cn emit --all${R}`);
console.log();
console.log(`  ${B}Error${R} ${D}(red + ✗):${R}`);
console.log(`  ${palette.error}${B}✗${R} ${palette.error}Config not found${R} ${D}— run sd init${R}`);
console.log();
console.log(`  ${B}Info / hint${R} ${D}(dim, no prefix):${R}`);
console.log(`  ${D}  Run without --dry-run to apply changes${R}`);

// ── 6. ID & reference highlighting ──────────────────────────────────
hr("ID & reference highlighting");

console.log(`  Issue ${palette.accent}${B}seeds-a1b2${R} ${D}blocked by${R} ${palette.accent}${B}seeds-c3d4${R}`);
console.log(`  Record ${palette.accent}${B}mx-04f2${R} ${D}in${R} ${palette.brand.canopy}testing${R} ${D}domain${R}`);
console.log(`  Prompt ${palette.accent}${B}builder-prompt@3${R} ${D}extends${R} ${palette.accent}${B}base-prompt${R}`);
console.log(`  Agent ${palette.accent}${B}builder-01${R} ${D}on branch${R} ${palette.accent}${B}ov/builder-01${R}`);

// ── 7. Dashboard example ─────────────────────────────────────────────
hr("ov ecosystem dashboard");

console.log(`  ${B}os-eco${R} ${D}ecosystem status${R}`);
console.log();
console.log(`  ${D}Tool          Version    Status     Health${R}`);
console.log(`  ${D}${"─".repeat(45)}${R}`);
console.log(`  ${palette.brand.mulch}${B}mulch${R}    ${D}ml${R}   ${B}0.6.0${R}      ${palette.success}- latest${R}   ${palette.success}✓ 8/8 checks${R}`);
console.log(`  ${palette.brand.seeds}${B}seeds${R}    ${D}sd${R}   ${B}0.2.2${R}      ${palette.success}- latest${R}   ${palette.success}✓ 9/9 checks${R}`);
console.log(`  ${palette.brand.canopy}${B}canopy${R}   ${D}cn${R}   ${B}0.1.5${R}      ${palette.success}- latest${R}   ${palette.success}✓ healthy${R}`);
console.log(`  ${palette.brand.overstory}${B}overstory${R} ${D}ov${R}  ${B}0.6.3${R}      ${palette.success}- latest${R}   ${palette.success}✓ 9/9 checks${R}`);
console.log();
console.log(`  ${D}Last sync: 2 minutes ago${R}`);
console.log(`  ${D}Active agents: 3  |  Open issues: 12  |  Prompts: 7${R}`);

console.log(`\n${D}${"═".repeat(60)}${R}`);
console.log(`${D}See branding/ for full spec: visual-spec.md, cli-standards.md, checklists.md${R}\n`);
