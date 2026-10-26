---
name: infrastructure-effect-classification
description: "Use when writing or reviewing rules that let an operations agent run infrastructure commands on AWS, Fortinet, Kubernetes, or remote hosts, by classifying verbs by the effect they leave rather than how they sound."
---
# Infrastructure Command Effect Classification

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Classify each proposed operation by its actual effects, environment, reversibility and blast radius, not by verb spelling. Sync-with-delete, ingress authorization and infrastructure-state removal all mutate state.
2. Separate observation, reversible local work, external or production mutation, and destructive or irreversible work. Mixed commands inherit the strongest effect class they contain.
3. Identify the authorized identity and capability boundary for every resource. Read-only labels or prose are not technical enforcement; verify permissions and command startup behavior.
4. Detect contradictory predicates and impossible requirements. Write narrow, explicit exceptions such as an authorized identity check rather than an open-ended bypass.
5. Record scope and approval before effects. Use proportionate evidence for small reversible work and full controls where sensitive data, production, migrations or irreversibility demand them.
6. Challenge the rules with counterexamples and known bypass cases. Independent review tests the stated boundary; it does not grant new permission.

## Limits

A short prompt can summarize a policy but cannot implement RBAC, network isolation or irreversible-action approval. Escalate unknown effects instead of inventing authority.
