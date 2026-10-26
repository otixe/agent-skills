---
name: duplicate-port-listener-triage
description: "Use when two processes may be bound to the same TCP port on a Linux host, so that a reload or health check gives inconsistent results between runs."
---
# Duplicate Port Listener Triage

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this procedure when a service "should have changed but sometimes did not", when identical checks give different answers, or when a new systemd unit was added without checking whether another unit already serves the same port. The goal is to prove whether two independent sockets listen on one port, then contain the duplicate safely.

## Inputs

- `PORT`: the TCP port in question.
- `APP`: the binary or application name.
- Access to run read-only inspection commands on the host.

## Steps

1. List listeners: `ss -tlnp | grep ":PORT"`. Two separate lines, each with one process, is a strong signal of two real sockets. One line with two process entries usually means a shared socket inherited through fork.
2. Check process relationships: `ps -eo pid,ppid,pgid,sid,stat,lstart,cmd | grep APP`. Note parent PIDs and start times. Confirm whether the two starts are independent.
3. Decisive test: compare the socket inode behind each process's file descriptor, for example `readlink /proc/PID/fd/N`. Different `socket:[inode]` values mean two real sockets. Identical values mean a shared socket, which is not split-brain.
4. Find the origin: list units with `systemctl list-units --all | grep -i APP`, then inspect each with `systemctl cat UNIT`. Two units pointing to the same configuration file explain the duplication.
5. Contain minimally: before any configuration change, stop only the redundant unit. Do not disable it, because that is an ownership decision. Verify with a real request that the surviving instance still responds as before.
6. Report the stopped unit as pending if it is still enabled, because it would return after a reboot.
7. Beware of flapping: if the same smoke check gives alternating results across repeated runs, treat this as a sign of an unresolved duplicate until another explanation (cache, latency) is ruled out.

## Controls

- Positive control: at least one request per instance is identified and attributed to a PID.
- Negative control: after containment, repeated requests return consistent results.
- Do not restart the surviving instance as part of diagnosis unless explicitly approved.

## Done when

The evidence includes the port listing, the inode comparison, the unit configuration that caused the duplicate, the containment action, and the post-containment check. The decision on disabling or reconfiguring the redundant unit is recorded for the service owner.
