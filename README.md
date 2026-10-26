# Agent Skills

50 English, platform-neutral procedures for verification, agents, infrastructure, security and working method. Each directory contains a standard `SKILL.md` with only `name` and `description` frontmatter. No executable skills, templates, plugins or credentials are bundled.

[Español](README.es.md) · [MIT license](LICENSE) · [Source map](SOURCE-MAP.md)

## Trust and scope

Read a skill before enabling it. Instructions grant no tools, accounts, permissions or authority. Deliberate failures belong in disposable fixtures with synthetic canaries, not production. Imports and dry-run commands may have effects; application stubs are not network isolation. Use least privilege and separately authorize sensitive, external or irreversible work.

This is an ordinary Agent Skills collection, not a Claude Code or Codex plugin. Compatibility means the portable file format and documented discovery locations. It does not certify behavior on every runtime, model or infrastructure. The procedures themselves have not all been executed as integration tests.

Install only a relevant subset where possible. Descriptions consume discovery context even when bodies load progressively; there is no universal guarantee that all 50 fit a host's budget. Avoid duplicate names. Keep higher-priority safety and authorization updates current, regardless of caching.

## Installation

Registry commands below are for an approved published release; preparing this repository is not proof of npm publication. Review the source and package file list first.

### Pi

`pi install npm:@otixe/agent-skills`

For a reviewed local checkout: `pi install /path/to/agent-skills`. Use `pi config` to enable only relevant resources. The package declares `skills/`, with no extensions, prompts or themes. Consult the installed version's [package documentation](https://github.com/badlogic/pi-mono/blob/main/packages/coding-agent/docs/packages.md) for project-local installation and filtering.

### Claude Code and Codex

From a reviewed checkout, copy a chosen directory. This Bash example must not overwrite an existing skill; inspect the destination first.

```bash
skill=redaction-before-truncation
destination="$HOME/.claude/skills"
mkdir -p "$destination"
test ! -e "$destination/$skill" && cp -R "skills/$skill" "$destination/"
```

Claude Code personal skills use `~/.claude/skills`; project skills use `.claude/skills`. Codex personal skills use `~/.agents/skills`; project skills use `.agents/skills`. For Codex, change `destination` to `"$HOME/.agents/skills"`. Preserve the directory and its `SKILL.md` together. Follow the installed host's reload behavior.

Official references: [Agent Skills specification](https://agentskills.io/specification), [Claude Code skills](https://code.claude.com/docs/en/skills), [Codex skills](https://learn.chatgpt.com/docs/build-skills).

## Categorized index

### QA and verification (17)

- [`executable-definition-of-done`](skills/executable-definition-of-done/SKILL.md)
- [`counterfactual-baseline-testing`](skills/counterfactual-baseline-testing/SKILL.md)
- [`positive-controls-for-absence`](skills/positive-controls-for-absence/SKILL.md)
- [`independent-dedup-audit`](skills/independent-dedup-audit/SKILL.md)
- [`parser-failure-mode-testing`](skills/parser-failure-mode-testing/SKILL.md)
- [`purpose-vs-literal-compliance`](skills/purpose-vs-literal-compliance/SKILL.md)
- [`rollback-and-dedup-effect-testing`](skills/rollback-and-dedup-effect-testing/SKILL.md)
- [`scoped-regression-review`](skills/scoped-regression-review/SKILL.md)
- [`audit-by-claim-unit`](skills/audit-by-claim-unit/SKILL.md)
- [`performance-claim-validation`](skills/performance-claim-validation/SKILL.md)
- [`absence-claim-verification`](skills/absence-claim-verification/SKILL.md)
- [`dashboard-render-verification`](skills/dashboard-render-verification/SKILL.md)
- [`python-syntax-vs-runtime-proof`](skills/python-syntax-vs-runtime-proof/SKILL.md)
- [`container-deployment-effect-check`](skills/container-deployment-effect-check/SKILL.md)
- [`lightweight-typescript-scanning`](skills/lightweight-typescript-scanning/SKILL.md)
- [`duplicate-port-listener-triage`](skills/duplicate-port-listener-triage/SKILL.md)
- [`source-to-sink-property-instrumentation`](skills/source-to-sink-property-instrumentation/SKILL.md)

### Pi and agents (8)

- [`pi-cold-extension-loader-check`](skills/pi-cold-extension-loader-check/SKILL.md)
- [`pi-extension-fetch-seam-testing`](skills/pi-extension-fetch-seam-testing/SKILL.md)
- [`pi-isolated-environment-tests`](skills/pi-isolated-environment-tests/SKILL.md)
- [`pi-live-npm-tree-canary`](skills/pi-live-npm-tree-canary/SKILL.md)
- [`pi-subagent-stall-diagnostics`](skills/pi-subagent-stall-diagnostics/SKILL.md)
- [`pi-supervised-execution`](skills/pi-supervised-execution/SKILL.md)
- [`stable-prompt-cache-methodology`](skills/stable-prompt-cache-methodology/SKILL.md)
- [`fetch-timeout-effect-validation`](skills/fetch-timeout-effect-validation/SKILL.md)

### Infrastructure (12)

- [`read-only-deployment-inspection`](skills/read-only-deployment-inspection/SKILL.md)
- [`bounded-filesystem-recon`](skills/bounded-filesystem-recon/SKILL.md)
- [`disk-cleanup-quarantine`](skills/disk-cleanup-quarantine/SKILL.md)
- [`cron-preflight-alert-abort`](skills/cron-preflight-alert-abort/SKILL.md)
- [`vm-cpu-contention-triage`](skills/vm-cpu-contention-triage/SKILL.md)
- [`virtualization-memory-pressure`](skills/virtualization-memory-pressure/SKILL.md)
- [`isolated-container-cloning`](skills/isolated-container-cloning/SKILL.md)
- [`virtualization-storage-hygiene`](skills/virtualization-storage-hygiene/SKILL.md)
- [`postgres-lock-performance-validation`](skills/postgres-lock-performance-validation/SKILL.md)
- [`postgres-capacity-measurement`](skills/postgres-capacity-measurement/SKILL.md)
- [`postgres-per-row-cost-diagnosis`](skills/postgres-per-row-cost-diagnosis/SKILL.md)
- [`connection-pool-effect-testing`](skills/connection-pool-effect-testing/SKILL.md)

### Security (8)

- [`redaction-before-truncation`](skills/redaction-before-truncation/SKILL.md)
- [`git-history-secret-audit`](skills/git-history-secret-audit/SKILL.md)
- [`safe-git-initialization`](skills/safe-git-initialization/SKILL.md)
- [`no-leak-claim-audit`](skills/no-leak-claim-audit/SKILL.md)
- [`external-effect-audit-without-execution`](skills/external-effect-audit-without-execution/SKILL.md)
- [`end-to-end-kill-switch-audit`](skills/end-to-end-kill-switch-audit/SKILL.md)
- [`asgi-wsgi-auth-middleware`](skills/asgi-wsgi-auth-middleware/SKILL.md)
- [`safe-browser-research`](skills/safe-browser-research/SKILL.md)

### Method (5)

- [`compaction-continuity-check`](skills/compaction-continuity-check/SKILL.md)
- [`verified-jsonl-extraction`](skills/verified-jsonl-extraction/SKILL.md)
- [`traceable-decision-log`](skills/traceable-decision-log/SKILL.md)
- [`delegation-contract-verification`](skills/delegation-contract-verification/SKILL.md)
- [`infrastructure-effect-classification`](skills/infrastructure-effect-classification/SKILL.md)

## Development and verification

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm pack --dry-run --ignore-scripts
```

Node.js 22 or newer is required for development. Validation enforces a deliberately narrow portable subset: unique lowercase kebab-case names matching directories, two required string fields, description length at most 1,024 Unicode code points, valid UTF-8 without BOM, LF, nonempty titled bodies and no symlinks. The specification allows other fields; this collection intentionally does not use them.

CI validates frontmatter, runs validator negative controls and checks Markdown. It does not execute infrastructure procedures or certify privacy, publication, privilege enforcement or independent review. Package files are allowlisted; development tools, lockfile, CI and private provenance are not npm payload.

Local results and limitations are in [validation evidence](https://github.com/otixe/agent-skills/blob/main/evidence/validation.json), available in the repository, not the npm package. Producer checks are not independent QA. Any later edit invalidates the delivered hash seal and needs relevant revalidation.
