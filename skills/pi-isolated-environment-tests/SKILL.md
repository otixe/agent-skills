---
name: pi-isolated-environment-tests
description: "Use when running a test suite for pi tooling so that an ambient environment variable does not contaminate fixtures and produce misleading failures."
---
# Pi Isolated Environment Tests

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Identify the authorized worktree and environment keys that affect fixture discovery or resource names. Do not print ambient credentials.
2. Start fresh test processes with only the intended environment changes. Remove contaminating variables for those commands, not globally for the user's shell.
3. Use separate disposable configuration and state directories. Establish external-effect isolation separately; clearing one variable or changing HOME is not a sandbox.
4. Run the relevant JavaScript and Python suites through their supported runners. Require every required test and stage to pass. Report skips and exclusions explicitly; a pass-rate threshold cannot hide failures.
5. Prove the contamination diagnosis using synthetic fixtures with and without the variable. Preserve old logs, exit statuses and the exact candidate hash.

## Limits

Different state roots do not automatically isolate network access, subprocesses or inherited provider authentication.
