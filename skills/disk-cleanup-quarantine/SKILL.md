---
name: disk-cleanup-quarantine
description: "Use when freeing disk space or removing clutter from a host, and you must quarantine candidates with a manifest instead of deleting them."
---
# Disk Cleanup Quarantine

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Inventory authorized local paths, sizes, ownership, active writers, mounts and sync policies with bounded searches. Do not traverse unrelated network mounts.
2. Propose a candidate allowlist and private quarantine destination. Confirm that paths are not authoritative data or required by a running service, and obtain approval before moving or stopping anything.
3. Preserve a manifest, hashes and restoration mapping. Coordinate active writers and sync clients through their supported pause mechanism when separately authorized.
4. Move only reviewed paths, rejecting collisions and checking symlinks. A move on the same filesystem does not free capacity; cross-filesystem copies require complete verification before any separately approved source removal.
5. Verify the expected tree, hashes and service/sync health after the change. Explain whether the operation reduces clutter, transfers usage or actually reclaims space.
6. Quarantine is not permission to delete. Retention and final disposal require their own authorization. Restore only the selected paths if rollback is approved.
