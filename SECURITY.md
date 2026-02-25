# Security Policy

## Supported versions

| Tool | Version | Supported |
|------|---------|-----------|
| Mulch | 0.6.x | Yes |
| Seeds | 0.2.x | Yes |
| Canopy | 0.1.x | Yes |
| Overstory | 0.6.x | Yes |

Older versions receive no security patches. Please upgrade to the latest release.

## Reporting a vulnerability

**Do not open a public issue.** Instead, use [GitHub Security Advisories](https://github.com/jayminwest/os-eco/security/advisories/new) to report vulnerabilities privately.

For tool-specific vulnerabilities, report to the relevant sub-repo:
- [Mulch security advisories](https://github.com/jayminwest/mulch/security/advisories/new)
- [Seeds security advisories](https://github.com/jayminwest/seeds/security/advisories/new)
- [Canopy security advisories](https://github.com/jayminwest/canopy/security/advisories/new)
- [Overstory security advisories](https://github.com/jayminwest/overstory/security/advisories/new)

## Response timeline

| Step | Target |
|------|--------|
| Acknowledgment | 48 hours |
| Initial assessment | 7 days |
| Fix or mitigation | 30 days |

## Scope

Vulnerabilities we care about across the ecosystem:

- Command injection via CLI arguments
- Path traversal or arbitrary file access
- Symlink attacks on storage directories
- Temp file race conditions
- Agent escape or privilege escalation (Overstory)
- Mail injection between agents (Overstory)
- Prompt injection via stored templates (Canopy)

## Not in scope

- Denial of service via extremely large files
- Issues requiring existing shell access to the machine
- Social engineering
- Costs from spawning many agents (Overstory)

## Security measures

All four tools share these design principles:
- Atomic writes with advisory file locking for multi-agent safety
- Input validation on all CLI arguments
- No network access (git-native, local-first storage)
- No eval or dynamic code execution on user input
