---
name: postgres-capacity-measurement
description: "Use when sizing PostgreSQL disk or memory for a large table from measured bytes per row, before buying infrastructure, and checking declared row counts against real partitions."
---
# PostgreSQL Capacity Measurement

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Confirm the authorized database and least-privilege read-only role. Inspect sessions and waiting locks before measurements. Set conservative statement, lock and idle-in-transaction timeouts and a recognizable application name.
2. Use read-only transactions as an additional guard, not a privilege boundary: session settings and regex blocklists are not substitutes for database permissions. Inspect function effects before invoking them.
3. Measure heap, index and total relation bytes against actual row counts and partitions. Report stale statistics, empty partitions and sampling limits.
4. Derive bytes per row from comparable observed objects, then extrapolate with explicit assumptions about growth, indexes, bloat and retention. Distinguish allocated storage from live payload.
5. For an external query engine, verify its current minimum billable amount and access costs before a query. Do not inherit historical price figures as current facts.
6. Preserve sanitized queries, outputs and units; label forecasts as estimates. Stop on unexpected locks or load rather than expanding an unbounded scan.
