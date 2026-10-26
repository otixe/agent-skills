---
name: parser-failure-mode-testing
description: "Use when auditing a parser or guard for delimited text, or any check that reports its own reliability, to prove corruption always produces a warning and never silently passes."
---
# Parser Failure-Mode Testing

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Find failure modes that a fix introduced, not just whether the current result is correct. The key property is: corruption implies a warning. A guard that compares counts can be blind when a lost element and an invented one cancel out. Test for that compensation first.

## Inputs and scope

- The parser or guard code, with the commit under review.
- A sandbox where adversarial inputs can be created through the real system, using a test identity, then cleaned up.

## Steps

1. Reproduce the defect through the real system. Generate adversarial input with a test identity, then parse the raw text returned by the service, importing the delivered code and not a copy. Remove test artifacts afterward.
2. Look first for compensation: can an input lose one element and invent another while keeping totals unchanged? This is the case most likely to pass unnoticed.
3. Ask for a structural argument rather than a list of cases. Example pattern: if a block start is accepted only when the previous line matches an anchored end delimiter, then that previous line always closes its block, so a phantom element always unbalances the count and the old guard detects it.
4. Confirm the argument by exhaustive enumeration over what the attacker controls: number of real elements, fake start delimiters, quoted delimiters with and without closing quotes, trailing content. For each case compute two independent booleans: corrupted (spoofed sender or type, truncated content, wrong count, or a real identifier reached by a destructive action) and warned (warning is not null). The verdict is the number of corrupted-and-silent cases, which must be zero.
5. Check that any destructive action is gated by the guard. A warning that is logged while the mutation still runs means the operator reads the warning after the damage. Trace the warning variable to the write.
6. Check scope: list files changed since the previous rejection, and rerun the main suite if it references the changed file.

## Controls

Run the same enumeration against the pre-fix code. The positive control must show silent cases there.

## Done when

The original defect does not reproduce, the guard warns in the scenario where it previously stayed silent, and silent corrupted cases equal zero. Explicitly exploitable but noisy residuals are documented.
