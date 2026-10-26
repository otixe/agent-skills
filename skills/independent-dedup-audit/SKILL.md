---
name: independent-dedup-audit
description: "Use when reviewing a fix that deduplicates a duplicated source with window functions or DISTINCT, to check it removes only the duplicate multiplicity and loses no legitimate rows."
---
# Independent Deduplication Audit

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Audit a fix that removes duplicates from a source that arrived repeated. Two failure modes matter: (F1) the dedup deletes legitimate rows, which is silent data loss; (F2) it does not collapse all the duplication, or collapses differently than claimed. Do not reuse the executor's evidence. Attack both modes with independent controls.

## Inputs and scope

- The pre-fix query or table, a snapshot taken before the fix, and the post-fix query.
- Read-only access. Use aggregate queries and CTEs.

## Steps

1. Test the dedup key across all partitions, not one sample. Group by partition and key columns, then report partitions where the row count differs from the key count, with the factor minimum across the whole universe. Any unexpected dirty partition signals legitimate rows being removed.
2. Check nullable key components. Partition windows group nulls together, unlike key uniqueness in SQL. Count nulls in each key column. Any non-zero count in a nullable column is a blocking risk.
3. Measure multiplicity per key: minimum, maximum, and the count of groups whose copies disagree in business columns. Divergent copies mean the "keep one" rule is choosing a value, which must be justified.
4. Prove a no-op on clean days with a multiset comparison inside the engine: build keyed counts over the full output row for old and new versions, then compare totals, keys present in only one version, and multiplicity differences. Where the fix should collapse a known factor, check the exact factor instead.
5. Predict the expected result from the pre-fix snapshot alone: apply the corrected arithmetic and compare the count and sum with the post-fix output. Also check that all old values are divisible by the factor.
6. Confirm only the declared rows changed: reconcile totals before, removed, added, and after, for counts and amounts. Apply the factor to every derived column, not only the one that triggered the fix.
7. Trace the cause through ingestion audit columns: job identifiers, timestamps, and key counts per job. Two complete reloads with identical key sets support the dedup; differing key sets suggest incremental loads, where keeping one row can merge two different facts.

## Controls

Verify that some legitimate content-identical rows exist and survive, which is positive evidence that a content-based dedup would have destroyed data.

## Done when

Both failure modes are measured, and residuals are reported: other consumers of the same source without dedup, alerts that look only at the previous day, and backups lacking a verified restore.
