---
name: counterfactual-baseline-testing
description: "Use when an executor claims a fix changed only one assertion of an adversarial test harness, to verify it by running the same harness against a reverted pre-fix copy."
---
# Counterfactual Baseline Testing

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Check the claim "I re-ran your adversarial harness unmodified; the only failure is the assertion that encoded the old bug." A count such as "135 pass, 1 fail" is compatible with other checks breaking and being offset elsewhere. A counterfactual run proves that only one property changed.

## Inputs and scope

- The audited file, the harness, and the pre-fix source reconstructed from a known good copy, not from prose.
- A sandbox copy. Never patch the audited file in place, because other work may be reading it.

## Steps

1. Copy the production file into a sandbox at the same directory depth as the original. Import paths that compute the repository root depend on depth.
2. Revert each fix by counting. For each fix text, assert that it occurs exactly once before replacing it. Zero or multiple matches make the baseline invalid.
3. Redirect only the import line in a copy of the harness. Verify that the rest of the harness is byte-identical after reversing the substitution.
4. Run both versions and compare three things, in order: total number of checks emitted, the list of check names (must be identical), and the pass or fail verdict per name (must differ in exactly one line, the expected assertion).
5. Verify the harness was not modified: matching hashes before and after, and a change time earlier than the fixed file's modification time.
6. Label the reverted copy clearly as an inert defective copy, with a note that it must not be used as production code.
7. Optional: mutate the reverted copy and run the executor's new suite. Failures should fall only in the new sections, not in preexisting ones. That shows the new tests are property tests, not data tests.

## Controls

Predeclare the expected baseline and fixed-version verdict for the target assertion, and reproduce the baseline result before attributing the difference to the fix. A regression check may change FAIL to PASS; an old assertion that encodes the bug may change PASS to FAIL. In either direction, all other named verdicts must remain identical.

## Done when

The report states exactly one changed verdict, with the name of the assertion and the evidence: equal count, identical names, one line changed.
