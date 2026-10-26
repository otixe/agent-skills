---
name: external-effect-audit-without-execution
description: "Use when validating or refuting a fix in a tool that sends messages, pays, deploys, or writes to an external system, without producing any real external effect during the audit."
---
# Auditing an External-Effect Tool Without Producing the Effect

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Define the prohibited external effect and the exact production entrypoint being tested. Work only on disposable fixtures with no live credentials.
2. Establish verified operating-system, container or network isolation before importing executable modules. Imports and constructors may have effects. If effective isolation cannot be established, restrict the exercise to static inspection.
3. Add complementary instrumentation: replace the service client with a recording stub, intercept known transports before import, and make unexpected operations fail visibly. Language-level traps are instrumentation, not a kernel sandbox.
4. Exercise the candidate through the actual tool or wrapper boundary. Assert both emitted requests and abstention behavior for valid, invalid, stale and missing inputs.
5. In the same isolated environment, use a synthetic positive control that attempts the prohibited path and must trip the detector. Confirm a safe path remains usable.
6. Compare relevant state before and after, preserve logs and disclose unobserved channels, subprocesses, native clients and cached references.

## Reporting

Say which intercepted channels and enforced barriers were tested. Do not claim that monkeypatching one client makes all real-world effects impossible.
