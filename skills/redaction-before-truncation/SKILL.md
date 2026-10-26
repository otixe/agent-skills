---
name: redaction-before-truncation
description: "Use when designing or auditing code that redacts secrets and also truncates the same text for a size-limited channel, to confirm redaction runs before truncation."
---
# Redact Before Truncating

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Generate a synthetic credential-shaped canary in memory. Never use a real credential. Choose cut positions inside its detectable span.
2. Identify the actual redactor and truncator at the consumer boundary. Exercise both orders on identical fixtures: truncate then redact is the counterfactual; redact then truncate is the candidate.
3. Require the counterfactual to expose the planted fragment and the candidate to remove it before any size limit. Verify the removed span, not an impossible claim that no individual letter shared with the canary occurs anywhere in normal text.
4. Test matching shapes, non-secret text, multiple values, short limits, and escaped or multiline forms within the declared redactor scope.
5. Observe the real output path, not merely a helper returning a masked string. Record fixture labels and assertions, never real secret values.

## Limits

A regex only covers its tested patterns. A green helper test does not prove every consumer invokes it or every credential format is recognized.
