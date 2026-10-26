---
name: fetch-timeout-effect-validation
description: "Use when verifying a timeout or AbortController fix on a fetch call, by reproducing a real hang with a server that accepts connections and never answers."
---
# Fetch Timeout Effect Validation

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: reproduce a real hang, so a timeout fix is tested against the failure it is meant to prevent. An unroutable address is not a reliable stand-in: it may fail quickly or behave differently across networks and operating systems, without reproducing the intended application hang.

Steps:

1. Start a local TCP server that accepts connections and never writes a response. Listen on an ephemeral port on the loopback interface.
2. Point the code under test at that address, using a temporary environment file in a sandbox directory.
3. Load the real module with a dynamic import, and call the handler or function directly. Measure elapsed time with a monotonic clock before and after.
4. Check three things: the elapsed time is close to the configured timeout and not at the test harness cap; the code keeps running and returns a degraded result; and the degradation reason is explicit, not a silent failure.
5. Cleanup: destroy each incoming socket before closing the server, because a graceful close can wait indefinitely for open connections.
6. Positive control: run the same code against a healthy local stub and confirm that the timeout does not add friction on the normal path.
7. If the code reads a credential from a fixed environment variable, use a credential belonging to the test identity placed in the sandbox only. Never print its value, and never use another agent's credential.

Negative control: remove the timeout in a copy, and confirm that the harness hits its cap instead of returning a degraded result.

Done criteria: measured elapsed time, the degraded result, the stated reason, and the healthy-path result.
