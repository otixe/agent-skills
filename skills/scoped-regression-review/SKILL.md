---
name: scoped-regression-review
description: "Use when re-reviewing a previously rejected deliverable, to verify each returned item is closed and the happy path still works, without re-auditing what was already confirmed."
---
# Scoped Regression Review

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Audit a second or later review round without repeating the first. Verify that each returned finding is closed, that the fix's happy path works, and that new findings are still possible when the fix adds code.

## Inputs and scope

- Your own earlier findings, retrieved from the review record rather than memory.
- The new revision and the task event history.

## Steps

1. Recover your findings from the review record. Use header-level event summaries first, and paginate comment bodies only when needed.
2. State the scope in the first paragraph of the comment: the confirmed items are not re-audited, and the review covers the closure of the returned items plus new findings.
3. For each returned item, classify it as closed (with a measurement that proves it), not closed (returned again), or partially closed (name the missing part).
4. Test the happy path. A fix that tightens secrets, permissions, or validation may stop the feature from working, and the diff will not show that. If the fix touches a script, run it. If it touches a pipeline, run a real build.
5. Check environment-variable usage carefully. Prefix assignments in a shell command do not expand within the same command line, so a value referencing that variable is empty. Verify with a real run.
6. Keep the door open to new findings, especially where the fix added text or code.
7. Close with a review verdict and do not submit afterward. Submitting after a rejection returns the task to review and overrides the verdict.
8. If the task is not in a reviewable state, do not submit it yourself. Leave a comment stating the reason and request the submission from the executor.
9. When citing a build or job as evidence, read the global status and the last stage first, then the intermediate stages, to avoid confirmation bias.

## Controls

Reproduce the original failure to confirm the returned item was real before judging the fix.

## Done when

Each returned item has a verdict with its measurement, the happy path was executed, and the review verdict is recorded without a later submission.
