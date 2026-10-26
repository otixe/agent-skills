---
name: connection-pool-effect-testing
description: "Use when reviewing a connection pool fix that adds a validation check before handing out a connection, to test a full scenario-by-variant matrix with latencies, mutants, and failure modes."
---
# Connection Pool Validation Fix Review

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this to verify a small fix in a connection pool, or any validation added on a hot path (such as a pre-checkout check, ping, keepalive, or retry). A single "2 of 10 failed, now 0 of 10" result is one cell of a matrix, not a verdict. A fix can remove the frequent failure and change the failure mode in the rare case, from fast failure to slow failure.

## Step 0: Chain of custody

Record checksums of every file under test before and after. Record exact versions of the libraries and the database engine used in the target environment. Use an isolated sandbox with its own container name and port. Do not reuse the executor's sandbox. Confirm no file in the target tree changed during the test window.

## Step 1: Full matrix, no empty cells

Rows are scenarios: idle pool at minimum size, pool grown by a burst of concurrent connections, and the database genuinely down (not restarted, down). Columns are variants: original, fix, and a mutant of the fix. Each cell reports failure count per request total, the list of latencies, and the exact exception type. The typical gap is the positive case the executor did not run.

## Step 2: Two methods for the same damage

Use a fast server-side method, such as terminating backends, and also the real method, such as stopping and starting the service. The results must match. Confirm the exception text in the test matches the text in production logs; count occurrences in the real log.

## Step 3: Mutate the fix

Test the fix present but inert: a check that does nothing, and no check at all. If the inert version reintroduces the defect, the effect comes from the check doing its work. If the inert version passes, the assertion only measured that the parameter exists.

## Step 4: Read the installed source

Confirm in the installed library version that the callback signature and purpose match. Determine whether the check runs on every checkout or only after an error, and what happens when it fails: retries, backoff, deadline.

## Step 5: Cost and failure mode

Measure latency over about 300 successful checkouts: mean, median, 95th percentile, maximum, for original and fix. With the database down, measure latency and exception type. Converting a fast error into a long pool timeout is a deployment condition to review, and it also degrades monitoring.

## Step 6: Time-of-check gap

Wrap the check so that it breaks the resource after validating it. If the request still fails, the window shrank but did not close. Report this as a residual limit.

## Step 7 to 9: Production

Measure amplification on production by counting connections per worker process. After deployment, verify that the running process started after the file change, that the restart count is as expected, and that health checks touch every worker. Note any lost observability, such as a library that silently heals without logs.

## Done when

The matrix, mutant table, cost, failure mode, amplification, residual gap, and deployment conditions are reported separately.
