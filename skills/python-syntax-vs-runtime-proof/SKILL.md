---
name: python-syntax-vs-runtime-proof
description: "Use when deciding whether a Python change is verified, since syntax checks alone do not prove runtime behavior, target-interpreter compatibility, or what is deployed."
---
# Python Syntax Checks Are Not Runtime Proof

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: prevent false green results. `py_compile` and `ast.parse` only check syntax against the interpreter that ran them. They do not prove three things: that the target interpreter accepts the code, that names resolve at runtime, or that the deployed code is the code you edited.

Inputs: the changed Python or shell files, the target runtime version, and the deployment mode of the target service.

Preconditions: you know the target interpreter version and whether the service runs from a build image or a bind mount.

Steps:

1. Check the target version. Parse with the target grammar, for example `ast.parse(source, feature_version=(3, 12))`, or compile inside an ephemeral container built from the target image.
2. Run a runtime smoke test of the changed function with sample data. Cover a success case, a no-data case, and an error case. Do not stop at "it compiles".
3. Look for unquoted literals inside f-strings or `.get()` calls and for variables reused from another scope after an anchor-based edit. These pass syntax checks and fail at runtime.
4. Confirm deployment: check whether the service uses `build:` or a bind mount, then compare the file hash inside the running container with the hash on disk.

Negative controls: introduce a deliberate syntax-version difference or a missing name in a scratch copy and confirm that the chosen check fails. A check that cannot go red proves nothing.

Done criteria: the report lists which of the three dimensions were tested (interpreter version, runtime behavior, deployed code), with the command and result for each. Any dimension not tested is listed as not verified.

Scope limits: this procedure does not replace unit tests. Run it only against fixtures or staging, not against production files.
