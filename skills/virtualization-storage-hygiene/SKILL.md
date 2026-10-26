---
name: virtualization-storage-hygiene
description: "Use when a Proxmox host storage pool is filling up, to audit ZFS snapshots, clone dependencies, backup retention, and orphaned volumes before any destructive cleanup."
---
# Virtualization Storage Hygiene

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this for host-level storage: ZFS pools, snapshots, backup retention, and orphaned volumes. It is not for guest disk usage or for RAM. Read-only inventory comes first. Every destructive step requires verified backups and explicit approval.

## Step 1: Inventory

Check storage status, filesystem usage, pool allocation, and per-dataset space. A dataset whose used space is much larger than its referenced space holds space in snapshots. Check whether automatic snapshot jobs are scheduled; they accumulate and never purge on their own.

## Step 2: Find orphaned volumes

A volume with an ID that has no matching guest configuration file may be orphaned. Report it; do not remove it without confirming it is not needed.

## Step 3: Verify the backup before deleting anything

Confirm the most recent backup of each guest in the backup store, with its timestamp and count. A ZFS snapshot is not an off-host copy. Treat snapshots as redundant only when an independent verified backup exists.

## Step 4: Check dependencies before destroying a snapshot

List snapshots that are the origin of a clone. A snapshot that another dataset depends on cannot be destroyed without breaking that dataset. Proceed only when the dependency list is empty for the snapshots in scope.

## Step 5: Prepare and approval

- Back up the storage configuration file before changing retention or schedules.
- Disable automatic snapshot schedules by moving their files aside, not deleting them.
- Retention settings that delete old backups are destructive. Apply them only with explicit approval; otherwise keep the current setting and report it as pending.

## Step 6: Destructive cleanup, with approval only

Destroy the approved snapshots one at a time, logging each name. Then verify pool allocation and remaining snapshots against the inventory from Step 1.

## Controls

- Before and after: report allocation per pool.
- Dependency check empty for every snapshot destroyed.
- Backups verified for every guest whose snapshots were removed.

## Done when

The report lists each pool before and after, what was destroyed or changed, what was deliberately kept, and what remains pending approval. Rollback notes identify the saved configuration files.
