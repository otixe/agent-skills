---
name: pi-extension-fetch-seam-testing
description: "Use when end-to-end testing a pi extension or ESM module that calls HTTP hardcoded inside it, by stubbing globalThis.fetch to fail on any unexpected URL."
---
# Pi Extension Fetch Seam Testing

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. In an externally isolated disposable process, install the fetch stub before importing the subject. Remove live credentials.
2. Route by expected full URL, method and relevant payload. Return realistic Response objects. Throw on unknown calls and record every intercepted request.
3. For JSON-RPC, simulate initialization, session headers, notifications and tool calls. For REST, verify pathname and query parameters. Use a deterministic fixture clock for staleness.
4. Assert the healthy synthetic path produces exactly the intended request and the abstaining path produces none. Test an unknown endpoint so the fail-hard guard is demonstrably active.
5. Restore the stub after the test and disclose channels not intercepted: cached fetch references, alternative HTTP clients, native modules and subprocesses may bypass it.

## Limits

A globalThis.fetch stub is a useful seam, not a complete network sandbox or proof that no other transport can reach a service.
