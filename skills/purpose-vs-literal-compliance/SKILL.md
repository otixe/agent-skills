---
name: purpose-vs-literal-compliance
description: "Use when reviewing a deliverable that already passes a mechanical checklist, to decide whether it solved the problem and not only whether it met the letter of the contract."
---
# Purpose vs Literal Compliance

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

A mechanical checklist measures whether the executor did what it declared. A second, judgment-based review measures whether the problem is solved. Do not just rerun the checklist. Your review adds value only by checking what the checklist cannot.

## Inputs and scope

- The checklist and its output, the full task history, and the deliverable.
- Read-only access to services. Never fix what you audit; report it.

## Steps

1. Confirm the checklist once. If its count differs from the declared count, that is the main finding, and the review stops there.
2. Read the full history before the code. Note the dispatch brief's hypotheses and scope, any decisions taken by a human, scope corrections mid-way, and deviations declared by the executor. Check whether each declared deviation was necessary.
3. Compare section titles with their checks. If a title says a failure stops being silent, but the checks only verify that a mode exists, that is a gap.
4. Run unfiltered versions of any search the author scoped. If the author scoped a universe to one file, the claim is narrower than its name. Rename the check to its honest scope, or widen it.
5. Verify premises of any justification for removing something. Separate factual claims from interpretive ones, and attack the one that holds the decision.
6. Trace unattended paths. Check that the scheduled entry point imports its dependencies, that external binaries are on the path, that directories are created, that credentials are valid, and that the job returns a non-zero exit on partial degradation, not only on total failure.
7. Check for overcorrection: changes nobody requested must have no external references and must be covered elsewhere.
8. For copied artifacts, compare hashes of source and destination, and confirm the source was not touched using its modification time and a pre-edit backup.

## Controls

Each finding needs a reproducible command, its output, why it matters, and what to change. Without a command it is an opinion.

## Done when

The review lists both what was validated and rejected as a finding, separates executor regressions from pre-existing issues, and notes which parts of the contract still measure the wrong thing.
