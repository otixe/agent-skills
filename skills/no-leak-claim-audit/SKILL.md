---
name: no-leak-claim-audit
description: "Use when verifying a claim that no credential value entered a transcript, script, or temporary file after a secret was moved, rotated, or distilled."
---
# Auditing a No-Leak Claim

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Define the authorized corpus, execution interval, legitimate credential store, and sinks covered by the no-leak claim. Snapshot relevant files before remediation where permitted.
2. Use opaque credential references. Perform value comparisons inside an authorized non-logging process, never by printing values or fragments, storing them in pattern files, or loading them into model transcripts.
3. Check complete values and identifiable cut fragments in the declared representations, including parsed transcript text where authorized. Bound filesystem searches to approved roots.
4. Distinguish removal of an old leak from introduction of a new one. Correlate preimages, hashes, diffs, provenance and timestamps; timestamps alone cannot establish authorship or absence of editing.
5. Verify that any required credential destination is an authorized secret store, not a plaintext memory note. Do not rotate or move credentials as part of a read-only audit.
6. Prove detector sensitivity on an isolated synthetic corpus, plus a clean negative control. Report only labels and sanitized findings.

## Limits

State inaccessible files, unobserved sinks, historical uncertainty and encoding limits. A matching authorized source is not itself a leak.
