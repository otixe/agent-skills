---
name: container-deployment-effect-check
description: "Use when a containerized service was redeployed and you must confirm the new code is running, not only that the container reports healthy or recreated."
---
# Container Deployment Effect Check

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: avoid false green deployments. A container can be healthy and recreated while still running old code. Compose may report "recreated" even when the image is unchanged, so deployment success must be measured inside the container.

Inputs: the container name, the changed file path inside the container, and a unique marker string that exists only in the change.

Preconditions:

- Check the compose file for `build:` versus `image:` and inspect the container mounts. If the code is not in a mount, it is baked into the image.
- Save a manifest of sha256 hashes of the files you will touch, before any change.
- Record a baseline of the metric the change should move.

Steps:

1. Compile or parse the changed file with the container's own interpreter, not the host's.
2. Deploy with the command that matches the mode. A `force-recreate` reloads environment variables but does not rebuild a baked image. Use a rebuild for `build:` services.
3. Compare the hash of the file inside the container with the hash on disk.
4. Grep the container for the unique marker. The hash proves that something changed. The marker proves that the intended change is present.
5. Only after steps 3 and 4 pass, run the functional check against the fix.
6. Confirm that files that must not change still have the same hash.

Diagnosis rule: if the post-fix result is identical to the pre-fix result, first ask whether the fix is running. Verify the premise before changing working code.

Caveats: in-process caches or workers may keep old modules loaded after a file change. Check the container start time and an observable value that only the new code can produce.

Done criteria: the evidence includes the hash comparison, the marker count, the deployment command used, and the functional result. Do not run this against production without the owner's approval.
