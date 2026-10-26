---
name: compaction-continuity-check
description: "Use when an agent must save a session summary under a stable key so it can resume after context compaction or in a new session."
---
# Compaction Continuity Check

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: survive context compaction by saving a live session summary under one stable key that is overwritten on each save, instead of creating duplicates.

Precondition: use this convention only if the memory store has a documented and tested upsert contract by source path and chunk index. Under that contract, writing to the same key replaces the current version without manual deletion. If the backend uses different semantics, use its supported checkpoint/update mechanism instead; do not assume replacement.

Convention:

- Use one stable key per agent, for example a source path of the form `memory/<agent>/session-latest`, with chunk index 0 and a summary tag.
- Save periodically, and before any long task. Include what you are doing, the current state, the next steps, the relevant task identifiers, and where to resume.
- Use dated keys for historical milestones you do not want to overwrite.

Resume procedure: after compaction or a new session, search the memory for the topic and filter by the agent's owner, or look up the stable key directly. Use the result to recover the last state in one step.

Inputs: the agent identifier, the topic, and the memory search tool.

Negative control: write a test summary, overwrite it with a second value, and confirm that only one current record exists and that it has the second value.

Limits: this stores a pointer and a summary, not proof that the work was done. Verify the state against the real artifacts before acting on the summary.

Done criteria: the stable key used, the timestamp of the last save, and the result of the resume lookup.
