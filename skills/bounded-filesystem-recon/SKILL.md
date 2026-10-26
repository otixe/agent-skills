---
name: bounded-filesystem-recon
description: "Use when an agent must list or search files on a host without hanging, avoiding unbounded searches over home directories or network-mounted folders."
---
# Bounded Filesystem Recon

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: find files without stalling the process. An unbounded search over a home directory or a network mount can block in uninterruptible disk wait, and the process may need a forced kill.

Rule: never run an unbounded find, grep, or ls over the home directory or any mount. Scope every search to a small known directory, such as the project root or a dedicated subfolder.

Steps:

1. Prefer the project's own indexes, memory search, or vault read tools when they hold the information you need. They avoid touching the slow filesystem.
2. If a filesystem search is needed, set a root directory that is known and small, limit the depth, exclude mount points, and apply a timeout. For example, use a bounded find with a timeout, with `-xdev` to stay on one device, and prune network mount paths.
3. If a command stalls, do not repeat it. Change the approach.
4. Diagnose a stalled task by checking the process state for disk wait, and recognize that a forced kill may be needed to release it.

Negative control: run the bounded search against a fixture directory that contains a path you excluded, and confirm that the excluded path does not appear in the results.

Done criteria: the root directory and depth used, the exclusions, the timeout used, and the list of results.
