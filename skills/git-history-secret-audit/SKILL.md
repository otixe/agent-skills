---
name: git-history-secret-audit
description: "Use when signing off that a git repository has zero secrets in its full history, not just HEAD, including unreachable objects and the ignore rules."
---
# Git History Secret Audit

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Identify the authorized repository, candidate files, refs, and credential sources. Preserve its existing state and remotes; do not change history or credentials during inspection.
2. Scan the working tree and reachable history with a secret scanner. Include untracked publication candidates and inspect metadata that will be published. If unreachable objects are in scope, enumerate them explicitly; a reachable-ref traversal does not cover them.
3. Where authorized, compare known credential values inside a non-logging local process. Keep values out of the model context, command arguments, reports, and plaintext pattern files. Do not ignore short passwords merely because a length heuristic would miss them.
4. Emit only opaque labels, counts, and appropriately sanitized locations. Check relevant encodings within the declared scope.
5. Validate the scanner on an isolated repository containing runtime-generated synthetic canaries. Verify an unrelated fixture remains clean. Never insert canaries into the real candidate.
6. Record scanner version, refs, scope, exclusions, exit status, findings and hashes. Findings block the claimed zero-findings result; proposed remediation requires separate authorization.

## Limits

Zero scanner findings is bounded evidence, not proof that no possible secret exists. It does not cover absent objects, remote copies, or unknown formats.
