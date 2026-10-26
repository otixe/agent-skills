---
name: rollback-and-dedup-effect-testing
description: "Use when signing off a claimed rollback or an alert deduplication, verifying the rollback actually ran and the dedup suppresses from persisted state without relying on the executor's word."
---
# Rollback Execution and Dedup Effect Testing

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Verify two claims without trusting the executor: that a rollback was executed, not just described, and that an alert deduplication suppresses repeated notices. Both claims are easy to write and hard to audit by reading code.

## Inputs and scope

- The live file and its backup, the service journal, and the persisted alert state.
- Production systems where the change cannot be rerun to see it fail.

## Steps

Part A, rollback:

1. Inspect authorized preimages, hashes, diffs, execution records and service health. Separate a rollback plan, a staged restore and an actually executed restore. Do not perform a rollback merely to prove that one happened.
2. Correlate journals and restart events with the approved change window. Restart counts, filenames and modification/change times are supporting clues, not unique proof of restoration or authorship.
3. Verify the selected resource version and relevant effects. Record concurrent writers and inaccessible evidence. Do not infer a complete causal history from a single timestamp or a matching backup.
4. If verification cannot close the claim, mark it unverified. Restoration or fix-forward is a separate authorized decision, based on service health, data safety and understood repair.

Part B, dedup:

1. Use a controlled copy of persisted state and synthetic delivery sinks. Two non-persisting dry runs only establish determinism, not suppression across runs.
2. Verify the triggering data still satisfies the condition using bounded authorized reads. Otherwise no notice may merely mean the data changed.
3. Exercise notify, suppress, state persistence, exceptions and restart behavior in an isolated fixture. Verify that dry mode covers every write and delivery path before relying on it.
4. Handle empty or invalid notification timestamps explicitly under the approved policy. They must not silently suppress forever or trigger unauthorized delivery.
5. Test late/backfilled rows so date filters do not defeat an identifier watermark. Mutate the dedup mechanism and require the same detector to expose the duplicate.

## Controls

Test the failure state yourself with side effects disabled. Verify exit codes differ by state and that "could not verify" is not reported as success.

## Done when

Each claim has a command and its result, and any item not measured is named with the data that would close it.
