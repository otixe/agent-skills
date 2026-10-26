---
name: verified-jsonl-extraction
description: "Use when extracting assistant-authored text from raw JSONL session logs with a verbatim check, only under explicit authorization for that content."
---
# Verified JSONL Extraction

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Obtain consent and authorization for the exact transcript corpus and extraction purpose. Minimize the requested range; treat personal or identity-related material as sensitive.
2. Preserve originals and hashes privately. Parse JSONL records without executing their content. Select by actual role, event type and schema, not by substring guesses or an invented session identity.
3. Extract the original decoded text verbatim, preserving Unicode, spaces, punctuation and newlines. Do not normalize, summarize, translate or fill gaps in a verbatim artifact.
4. Assert the emitted text equals the selected decoded source exactly. Record original-record hashes and selection logic. Raw substring checks must respect the original escape representation; different valid JSON escapes can represent identical decoded text.
5. Test with Unicode, escaped newlines, multiple message parts and a one-character mutated extraction that must fail. Label user-authored, model-generated and tool records accurately.
6. Keep private outputs in an authorized location and redact only in a separately labeled public derivative. Never claim that an extracted quote establishes a current identity or consent to adopt it.
