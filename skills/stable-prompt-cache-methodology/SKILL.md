---
name: stable-prompt-cache-methodology
description: "Use when an agent using prompt caching pays for full rewrites on every human message, and you must find which prompt sections change between turns."
---
# Stable Prompt Cache Methodology

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Identify the provider's cache contract: eligible models, minimum prefix length, cache-marker placement, TTL and usage counters. Version-specific evidence outranks assumed universal behavior.
2. Hold eligible prompt bytes, stable context and tool schema/order constant across controlled requests. Measure cache-read, cache-write and input usage with the same workload. Never dump private prompts or credentials into public reports.
3. Change one factor at a time, such as tool ordering or a prefix edit, and compare to the baseline. Repeat within and beyond the relevant TTL. Reloading or opening a session is not inherently a miss if the eligible prefix is identical.
4. Keep reusable stable context separate from genuinely changing information. Measure the cost of modifications rather than treating a hit as guaranteed.
5. Never freeze permissions, safety updates, current identity instructions or time-sensitive facts merely to preserve cache hits.

## Reporting

Record provider/model, tested prefix changes, timings and counters without publishing sensitive content. Distinguish observed savings from predictions.
