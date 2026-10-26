---
name: end-to-end-kill-switch-audit
description: "Use when verifying that a kill switch or send cap works link by link across a multi-process chain, instead of trusting an aggregate counter that did not move."
---
# End-to-End Kill-Switch Audit

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Define the switch contract and every process boundary from parent to wrapper to worker. Test only in a disposable environment with enforced external-effect isolation and synthetic clients.
2. Verify the caller's accepted switch values, propagation into children, and the callee's own refusal behavior. Presence of an environment variable is not proof the implementation checks it.
3. Exercise the normal entrypoint, direct callee invocation, missing or malformed values, and startup/import paths. Record which values are accepted rather than assuming every truthy spelling is supported.
4. Assert the blocked path never reaches the recording sink. Assert the enabled synthetic path does reach it, demonstrating that the test is not vacuous.
5. For a quota or cap, run concurrent synthetic workers against isolated state and measure the actual admitted count. Include a known defective variant to expose races.
6. Hash or snapshot protected fixtures before and after. Keep test state separate from production counters. Do not print full process environments or inherited credentials.

## Limits

An unreachable destination, invalid credential or application kill switch is not network isolation. A parent-only check does not protect direct invocation.
