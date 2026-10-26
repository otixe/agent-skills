---
name: safe-git-initialization
description: "Use when bringing an existing working directory with mixed secrets under local git control without committing credentials, testing ignore rules in a scratch copy first."
---
# Safe Git Initialization

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Confirm authorization to initialize this local directory. If a repository already exists, inspect it and stop treating it as a new initialization. Preserve existing files and metadata.
2. Inventory the reviewed publication files. Create appropriate ignore rules before staging; ignore rules do not remove already tracked secrets.
3. Scan the selected files for secrets and private identifiers, with a synthetic positive control in a separate fixture. Review documentation, generated files and metadata too.
4. Initialize locally only when authorized. Set a human-approved repository-local author identity; do not modify global Git configuration or borrow an agent identity.
5. Stage an explicit reviewed allowlist, not a blanket add of the entire directory. Inspect the staged diff and scan the staged content.
6. Commit only if local commit creation is within scope. Record the resulting tree and commit hashes. Do not add remotes, push, install hooks or rewrite history without separate authorization.

## Evidence

Report selected paths, ignore coverage, scan scope, staged review and local state. Preserve the preimage and describe withdrawal or restoration without executing it automatically.
