---
name: performance-claim-validation
description: "Use when auditing a claim that a batch, backfill, or reprocessing change will cut total time by a stated factor, to separate measured numbers from inherited ones and check the structural limit."
---
# Performance Claim Validation

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Label each number measured, reconstructed or inherited. Trace measurements to the actual execution; a matching summary and log are not automatically independent evidence.
2. Under a justified linear model, cost for one unit is f+p and for k units is f+k*p. Estimate p=(cost(k)-cost(1))/(k-1), then f=cost(1)-p. Negative f, nonpositive p or inconsistent repetitions invalidate this model.
3. Batching N independent units into one run gives modeled speedup N*(f+p)/(f+N*p), approaching (f+p)/p. If that ceiling misses the target, batching alone is insufficient. Other optimizations may change f, p or the work count.
4. Repeat measurements and report variability. Check component totals, comparable workloads, storage persistence, write-ahead logging and historical scaling.
5. Test proposed incremental watermarks or revisit thresholds against real partition and row counts in authorized read-only data. Use isolated fixtures for changes.
6. Label extrapolations as modeled, not measured. Preserve the raw measurements and assumptions rather than replacing one unsupported estimate with another.
