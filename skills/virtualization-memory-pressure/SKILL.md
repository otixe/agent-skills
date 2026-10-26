---
name: virtualization-memory-pressure
description: "Use when a Proxmox host reports high memory use or swap, to measure configured-versus-real memory per guest, swap pressure, balloon, and KSM before proposing any change."
---
# Virtualization Memory Pressure Triage

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this when someone says a Proxmox node uses too much RAM, is running out of memory, or feels slow. It also applies before adding a new VM, to check real headroom. Read-only diagnosis comes first; no configuration changes without explicit approval.

## Rule: `free` does not answer the question

A summary of used and free memory can look healthy while swap is heavily used. Measure instead:

- `SwapFree` against `SwapTotal` in `/proc/meminfo`, to see whether overcommitment is being paid in swap.
- `Committed_AS` against `CommitLimit`, to see promised memory against what can be honored.
- Configured memory against resident memory for each guest: `qm config ID` against the VmRSS of its `kvm` process.

The host total is the last thing to check, not the first.

## Distinguish cold swap from thrashing

Swap that is full but idle is not an emergency. Read the pressure stall file for memory and sample the `si` and `so` columns of `vmstat` over several seconds. Three signs of inert swap: high occupancy, memory pressure averages at zero, and no blocked processes. If the guest still stalls, compare the CPU and I/O pressure files; the bottleneck may be CPU, which belongs to the CPU contention skill.

## Counters are not rates

`pswpin`, `pswpout`, balloon swap-in counts, and major fault counts are cumulative since boot. Take two readings separated by 30 seconds and report the delta. A large cumulative value is not evidence of current activity.

## Balloon

A balloon configuration key does not prove ballooning works. Ask the running guest through the hypervisor monitor (`info balloon`) and compare the actual value to the maximum. A guest without the balloon driver or guest agent keeps its full allocation. Mark that cause as inference until verified inside the guest.

## Kernel Samepage Merging (KSM)

Check that the daemon is running, the run flag, shared and sharing page counts, and whether each guest's memory regions are marked mergeable. Guests may be excluded by an explicit configuration option; never reverse such an option without the owner's approval. Changes to the daemon's configuration file should be preceded by a backup and by calculating the threshold from current host numbers.

## Done when

The report includes per-guest configured against real memory, the swap and pressure evidence with deltas, balloon and KSM status, and a single health verdict stated plainly. Any proposed change lists its risk, reversibility, and rollback command, and is not applied without approval.
