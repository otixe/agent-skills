---
name: cron-preflight-alert-abort
description: "Use when designing or reviewing an unattended cron or batch job wrapper that must check preflight and dependencies, retry once, alert on a real channel, and abort before expensive work."
---
# Cron Preflight with Alert and Abort

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this pattern when an unattended job (nightly sync, digest, backup, periodic health check) fails silently or runs expensive work on a degraded environment. The wrapper runs cheap checks first, retries each once after a short pause, alerts through a real channel, and aborts before the costly step.

## Why abort instead of continue

Aborting makes failure loud and deterministic. It avoids spending compute or quota, and it avoids sending half-finished output. Degrading and continuing is a product decision and must be declared explicitly, never chosen by default.

## Structure

- Change to the repository directory relative to the script location, not the caller's working directory.
- `run_with_retry LABEL COMMAND...`: run the command; on failure, log a warning, sleep briefly, and run it once more.
- `alert MESSAGE`: print the message and send it through a real channel. Treat delivery failure as a warning, so the wrapper still exits.
- Sequence: preflight (environment and credentials), then dependency or source health check, then the real work. Each failed gate calls `alert` and `exit 1`.
- The cron entry must invoke the wrapper, not the inner script, and should redirect output to a log.

## Two layers

The wrapper's health check and the job's own internal guard are separate. For example, the job can refuse to publish when it fetches zero entries. The wrapper stops early; the job protects against failures that occur between the check and the run.

## Testing the wiring

Do not wait for a real failure. Use dedicated environment variables that the job reads only in test mode:

- A fault injection switch that adds an unreachable source. It should fail fast with connection refused, not with a long timeout.
- A dry-run notification switch that logs the alert without sending it.

Exercise every abort branch, preflight and check alike, by actually running the wrapper. Reading the code is not evidence.

## Pitfalls

- Give each network call enough timeout budget; a short timeout makes the wrapper flaky without a real fault.
- If the real work takes minutes or costs money, confirm the wrapper aborts before reaching it when fault injection is active.
- Never run fault-injection tests against production state or live notification recipients.

## Done when

Each abort branch has been triggered and observed, the alert path has been verified in dry-run, and the cron entry points at the wrapper.
