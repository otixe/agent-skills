---
name: absence-claim-verification
description: "Use when stating or auditing that something does not exist, lacks a property, or is missing, requiring a positive verification of the exact resource before any negative claim."
---
# Absence Claim Verification

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Purpose

Prevent false negatives. A statement such as "the resource does not exist" must rest on a positive check of the exact path or registry entry. A tool that fails, times out, or returns an empty list is missing evidence, not evidence of absence.

## Inputs and scope

- The claim, the exact resource identifier or path, and the access method (a read call, a registry lookup, or a directory listing).

## Steps

1. Write the absence claim precisely, naming the resource.
2. Verify positively: read the exact path or identifier directly. A successful read that returns content shows presence; a successful read that returns not-found, with the tool's normal response, supports absence.
3. If the discovery tool hung, failed, or truncated, do not conclude absence. Report "unverified" and repeat with the direct read.
4. Check a known-positive item with the same method, to confirm the method can return presence.
5. Record the verification date and time, because absence claims expire when resources are created later.
6. Before publishing a claim as fact in documentation or a report, have it independently re-verified with direct evidence. Do not accept another agent's statement without this check.
7. When auditing another's factual claim, re-read the source paths yourself and report any inherited factual errors.

## Controls

A positive control with a known-present item proves that the access path works, and a known-absent item confirms the negative result.

## Done when

The claim names the exact resource, has a recorded direct verification with date, and the method was shown to return presence on a control.
