---
name: lightweight-typescript-scanning
description: "Use when a verification script must find code structure in TypeScript, such as a call's real argument, without a full parser and without matching comments or strings."
---
# Lightweight TypeScript Scanning

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Define the narrow TypeScript property being checked. Prefer the supported compiler parser API or another maintained parser for structural or semantic decisions.
2. If a lightweight lexical scanner is justified, declare its subset and track strings, comments, regular expressions, template literals and interpolation nesting explicitly. A brace counter alone is not a parser.
3. Preserve source offsets and line mapping so findings can be checked against the original. Do not silently turn unknown syntax into a clean verdict.
4. Create fixtures with braces in comments, quoted text, regex literals, template expressions and nested blocks. Add a known matching case and an evading mutant for every claimed detection rule.
5. Compare representative scanner output with a real parser. Unsupported or ambiguous constructs remain indeterminate or are escalated to parsing.

## Limits

Tokenization cannot establish full TypeScript semantics or runtime effects. Check the installed compiler version rather than assuming that its public parser is unavailable.
