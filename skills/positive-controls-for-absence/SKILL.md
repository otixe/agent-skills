---
name: positive-controls-for-absence
description: "Use when a verification passes because a search, diff, query, or count returned nothing, to prove the instrument could have seen the thing it was looking for."
---
# Positive Controls for Absence Checks

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Protect checks whose expected result is empty: zero rows, zero matches, an empty diff, zero failures. A broken instrument also returns empty. A dropped channel, a truncated output, a missing table, or a denied permission all look like success. Running the same empty check twice does not help, because it is the same empty result twice.

## Inputs and scope

- Any evidence whose pass condition is absence, from database queries, file searches, diffs, or test runs.
- Remote runs where output can be truncated or a session can die.

## Steps

1. Classify each verification by the shape of its pass condition. Expects rows or a value: low risk. Expects nothing: high risk, and needs a control.
2. For each high-risk check, add a positive control in the same run, using the same instrument and channel. Examples: the same query applied where the item must exist, a mutated copy whose diff must be non-empty, a deliberately broken assertion that must fail for the right reason.
3. For remote batches, put a channel marker as the first statement that returns a row with a row count from a table that always has rows, and an end marker as the last statement. A missing channel marker means the output is not from this channel. A missing end marker means output was truncated.
4. If the channel is down, do not force a conclusion. Name what was not verified and state that "I could not measure" is a statement about the instrument, not a measurement of the effect.
5. Audit your own report for absence claims. Each one needs a named positive control.
6. Start with the executor's headline control, since it is the one least likely to be questioned.

## Controls

A detector that finds nothing must also find the phenomenon in some place where it exists. If it exists nowhere, the detector is untested, and that must be declared.

## Done when

Every absence result has a matching positive control in the same run, and every unverified item is listed by name.
