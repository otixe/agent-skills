---
name: pi-live-npm-tree-canary
description: "Use when a test reads source or metadata from an installed npm package and must read the copy pi actually loads, not an orphaned node_modules tree."
---
# Pi Live npm Tree Canary

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: write or audit a canary test that reads an installed package the way pi loads it. Assuming the repository's top-level node_modules is the installed copy is a common mistake. Pi can load a different copy, declared in its settings, and two copies can diverge while a single literal still matches by chance.

Inputs: the package name, the project settings file, and the pi package version that defines the install-path rule.

Steps:

1. Read the project settings and confirm the target package is declared in its package list. If it is not declared, stop and review the assumption.
2. Derive the live path from pi's install-path rule for the project scope. Cite the file and line of the installed pi version in a comment, so a future reader can recheck it after an upgrade.
3. If the derived path does not exist, fail loudly with the expected path and the reason. Never fall back silently to another tree.
4. If another copy of the package exists in a candidate location and its version differs from the live copy, fail, even if the literal being checked matches.
5. Print all candidate versions with full paths in the test output, even on success.
6. Run a positive control: copy the test and the modules it imports into a temporary directory, make the live path absent, keep an orphan copy reachable read-only, and confirm the test fails with the expected message.
7. If the real run fails because two diverging trees exist, report it as a legitimate ambiguity. Do not weaken the check to get green. Leave cleanup of the orphan tree to the owner of that part of the repository.

Scheduling (optional): run the canary as a user-level systemd timer with a oneshot service. Keep the script outside any directory that pi scans for extensions. Test the failure branch with a dry-run flag, and confirm that the timer is enabled with user linger.

Risk: a canary that can never fail gives more false confidence than no canary.

Done criteria: the output lists every candidate version and path, the positive-control failure message, and the cited install-path rule.
