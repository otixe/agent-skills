---
name: postgres-per-row-cost-diagnosis
description: "Use when a PostgreSQL batch classification hangs or runs too long because a correlated EXISTS subquery or per-row PL/pgSQL function is evaluated for every input row at scale."
---
# PostgreSQL: Removing Per-Row Correlated Subqueries and Functions

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Inspect a bounded query plan and workload evidence. Correlated subplans with high loop counts or per-row procedural function calls are suspects, not automatic proof that every plan executes the same way.
2. Establish the distinct keys and original semantics, including NULLs, duplicates and unmatched rows. Use disposable representative fixtures for changes.
3. Compare a set-based rewrite that precomputes distinct pairs or joins classified results back to the input. Avoid evaluating the same expensive predicate for every input row.
4. Verify old and new results in both directions, multiplicities included. A faster query with changed NULL or duplicate behavior is not a valid fix.
5. Measure plans, loops, elapsed time, buffers and resource use over comparable runs. EXPLAIN ANALYZE executes the statement; never run it on a write or expensive live query without authorization and bounds.
6. Report data size, statistics, cache state, limits and actual measured speedup. Deploy separately with approval and rollback.
