---
name: vm-cpu-contention-triage
description: "Use when a virtual machine on a Proxmox host freezes, lags, or disconnects, to measure host CPU per KVM process with correct deltas before blaming the guest."
---
# Virtual Machine CPU Contention Triage

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Bound the investigation to the authorized host and guests. Measure CPU contention over intervals, not from a single cumulative counter.
2. Attribute host CPU to each guest and process tree. Correlate the reporting guest's steal or scheduling delay with competing demand; do not assume that the complaining guest is the culprit.
3. Compare configured limits, scheduling policy and workload state. Read cumulative counters twice and compute deltas. Observe CPU, I/O and memory pressure to avoid misclassifying the bottleneck.
4. Propose the smallest reversible remedy, such as an approved workload limit or pause. Do not kill a browser or an entire guest process tree by default; obtain owner approval and protect active work.
5. Repeat comparable before-and-after samples: the suspected demand should change and the complaining guest should recover. Keep an unrelated baseline and disclose confounding workload changes.

## Reporting

Record attribution, deltas, the authorized action, rollback and sustained observations. Correlation alone is not proof of the unique root cause.
