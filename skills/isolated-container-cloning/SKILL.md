---
name: isolated-container-cloning
description: "Use when cloning a production Proxmox container for development, to isolate network identity and disable external-write integrations before the clone starts."
---
# Isolated Container Cloning

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Identify the authorized source, clone target, storage and address plan. Preserve source configuration and confirm restore rights before copying sensitive data.
2. Ensure the clone cannot run jobs, send messages, charge customers, synchronize or reach production before its first start. Network isolation and disabled startup hooks must precede service execution.
3. Give it unique container, host, network and storage identities; verify bind mounts do not point back at authoritative source data.
4. Remove clone-side access to inherited live credentials without displaying them. Use separately provisioned least-privilege test identities when needed. Do not rotate or revoke source credentials unless that independent production change is authorized.
5. Start only inside the verified isolation boundary. Exercise services with synthetic data and recording sinks. Confirm the source and production state remain unchanged through authorized observations.
6. Record sensitive-data retention and an approved teardown plan. Never imply that changing only a hostname or address isolates a clone.
