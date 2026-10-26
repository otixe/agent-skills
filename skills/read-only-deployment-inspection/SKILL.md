---
name: read-only-deployment-inspection
description: "Use when auditing or inspecting a deployed tool or service on a host without changing it, including scripts whose default behavior writes files."
---
# Read-Only Deployment Inspection

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Inspect source and configuration statically before invoking deployment tooling. A script's help option, import or constructor can perform writes before argument handling.
2. Identify defaults, destinations, hooks, environment handling and effects reachable during startup. Do not dump credentials or complete service environments.
3. Check installed documentation and version-specific command behavior. Use a disposable, externally isolated fixture if dynamic inspection is necessary and authorized.
4. For approved live inspection, use narrowly scoped read-only commands and a least-privilege identity. Capture sanitized versions, configuration and service state without triggering deployment.
5. Record which observations were static, simulated or live. Propose a deployment separately with its authorization and rollback requirements.

## Limits

A command name such as help, inspect or dry-run does not establish its effect class. Inspection does not authorize redeployment.
