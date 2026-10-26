---
name: pi-subagent-stall-diagnostics
description: "Use when a pi subagent has been silent for a long time and you must decide whether a tool call is hung or the agent died, before killing or relaunching anything."
---
# Pi Subagent Stall Diagnostics

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. A quiet transcript is a symptom, not proof of death. Some tools only append results when a call returns; verify the runtime's actual logging behavior.
2. Inspect bounded process metadata: parent/child relationships, elapsed time, wait state, CPU and relevant authorized progress logs. Do not print complete environments.
3. Distinguish a blocked child, a live long-running operation and a dead agent using multiple observations. Preserve progress and establish the exact child identity before intervention.
4. If cancellation is authorized and safe, prefer the runtime's cooperative cancellation. Terminate only the identified disposable or safely cancellable blocking child when necessary, with bounded escalation.
5. Never kill an unknown process tree merely because the agent is silent. A database writer, migration or production operation may require a different recovery contract. Guard against PID reuse.
6. Observe whether the agent receives the failure and continues, checkpoint the diagnosis, and report unresolved states.
