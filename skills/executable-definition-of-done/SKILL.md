---
name: executable-definition-of-done
description: "Use when writing or reviewing an executable definition of done or automated acceptance check, so it cannot certify broken work or push the executor to fake evidence."
---
# Executable Definition of Done

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Write an executable acceptance contract that does not certify broken work. Each check must be able to fail, must test behavior rather than existence, and must have a defined universe. Structural false greens (checks that cannot fail) and semantic false greens (checks that fail but measure the wrong thing) both need to be caught.

## Inputs and scope

- The task history in full, not only the description. Decisions often live in comments.
- The current state of the system, for a baseline run before dispatch.

## Steps

1. Read the full history and extract decisions and rejected options. Check them against the planned contract.
2. Run the contract once against the current state. Anything correct that fails is a contract bug. Anything broken that passes is also a contract bug.
3. Test behavior, not existence. Instead of checking that a mode exists, inject a fault and confirm that the unattended path, including wrappers and schedulers, reports and notifies it.
4. Define the universe by artifact class, not by directory. Pair each filtered check with an unfiltered check that confirms residual items fall only in permitted classes.
5. Classify checks by determinism. Network-dependent checks get retries and waits, or are marked informational. Apply the same retry rigor to all checks that depend on the same service.
6. Use lower bounds (at least N) for counts when the requirement is a floor, and equality only when equality is the requirement. Equality on a count can push the executor to remove legitimate content.
7. Measure diversity, not only size: distinct origins, the largest share of any single source, and per-category minimums.
8. For parity between a guard and a real path, state "no stricter than the guarded path, and both bounded." Literal parity can propagate existing defects.
9. Security checks need a whole-tree universe and permission checks, not one file.
10. State explicitly that the executor may object: a check that looks wrong should stay red with an argument, not be edited to pass.
11. Before blocking on a finding, measure how often its precursor occurs in real logs. Prefer degrade-and-alert over abort, except at a hard threshold.
12. Look for the symmetric silent failure on the output side, for example a notifier that reports success regardless of delivery.

## Controls

Run the contract against a known-good and a known-broken state. Both results must match expectation.

## Done when

Every check has a recorded failing case, and the review event is present before the task is closed.
