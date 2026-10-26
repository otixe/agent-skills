---
name: postgres-lock-performance-validation
description: "Use when a PostgreSQL fix (DDL lock change or query rewrite) must be shown by reproducible before-and-after tests to remove a lock wait or slow plan, not argued from reasoning alone."
---
# PostgreSQL Fix Validation: Locks and Performance

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this to prove that a fix for a lock problem or a slow query really works. Reasoning is not enough. Build two controlled scenarios, before and after the fix, with the same conditions, and measure the same mechanism. Run everything on a disposable sandbox database, never on production.

## Step 1: Name the exact mechanism

"The table hangs" is a symptom. A mechanism is specific: for example, an `ALTER TABLE` takes an exclusive lock held until commit, blocking readers. Without a precise mechanism, no test can isolate it.

## Step 2: Lock test

- Scenario A (old behavior): session 1 starts a transaction, runs the suspicious statement, sleeps for N seconds to simulate the rest of a long transaction, then commits.
- Session 2, started one to two seconds later, sets a statement timeout shorter than N and runs a representative read.
- Scenario B (new behavior): identical, minus the suspicious statement, with the same sleep.
- Calibrate so that A produces an explicit timeout error and B responds quickly. An ambiguous "waited but no timeout" result is weak evidence.
- Run both sessions in the background from a script, and capture the reader's exit code and elapsed time.

## Step 3: Performance test

- Reproduce the hostile load without fabricating data. If the scenario has a known invocation count, reduce one parameter in a copy of the configuration table until the plan shows the same loop count.
- Run `EXPLAIN (ANALYZE, BUFFERS, TIMING, COSTS OFF)` on both versions. The loop counts must match; the difference should appear in per-loop cost.
- Report execution time from the plan separately from total wall-clock time, which includes setup. Declare which is which.
- Also measure the ordinary, non-hostile case, to confirm the fix does not make the common path worse.

## Step 4: Regression check

Run the exact final code, not an equivalent rewrite, against an already validated dataset. Compare results with `EXCEPT` in both directions against the approved output. Zero differences confirm that only the execution mechanism changed.

## Controls

- Negative: the fixed version does not produce the lock timeout.
- Positive: the old version does produce it in the same run.
- Declare any scale difference against other environments; the loop count, not the absolute time, is what transfers.

## Done when

Both scenarios, the plan excerpts that explain the difference, the regression comparison, and the declared scope and environment are documented.
