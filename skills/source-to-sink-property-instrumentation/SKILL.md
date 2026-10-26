---
name: source-to-sink-property-instrumentation
description: "Use when writing a regression test that asserts a property of a sensitive resource, such as which code may read a credential, by instrumenting its origin and egress with canary values instead of allowlisting files."
---
# Source-to-Sink Property Instrumentation

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this when writing a security regression test that must prove a property, for example that only one module can obtain a sensitive value. A file allowlist is a warning sign: each audit reveals a new way to write the same access, so the allowlist never closes. Express the invariant on the resource, not on the code shape.

## Preconditions

The resource has a finite set of physical origins (environment variables, config files) and an observable sink it must pass through to be useful (outgoing HTTP headers, subprocess arguments, network sockets).

## Step 1: Instrument the origin with attribution

Wrap the environment object with a proxy that records reads, membership checks, and enumeration, with a stack trace. Attribute each access to the first frame inside the repository. Wrap file reads that can carry the resource the same way. Load the instrumentation before any module that reads the resource.

## Step 2: Instrument the egress with canaries

Seed unique canary values per run into the origins. Intercept outgoing HTTP calls and search headers, URLs, and bodies for the canaries. Record the caller frame.

## Step 3: Cover the other channels

Intercept subprocess creation, raw socket connections, datagram sends, and signal delivery. A value passed in a subprocess argument or environment is invisible to the origin and to the HTTP sink. Note file writes outside the sandbox as a weak channel, since no public choke point exists; declare it.

- Emulate the failure behavior of each primitive. Synchronous calls throw; asynchronous calls call back with an error. Do not add a pass-through to the original function.
- Remember helper symbols such as promisify custom markers, which may bypass a simple patch.

## Step 4: Derive the universe, do not enumerate it

Scan entry points with the same rules the host uses. Capture registered tools and hooks at runtime by passing a fake registration API. Execute each with arguments synthesized from its schema. Any new file or tool enters automatically.

## Step 5: Safety of the probe

Running every tool can trigger real external effects such as email, deployments, deletions, or pushes. Run the probe in a child process with a scrubbed environment, a sandbox home directory, and a sandbox working directory. Intercept channels before loading modules. Do not use a tool's own kill switch inside the probe, because it would stop before the path being measured. Make simulated side effects target paths inside the sandbox.

## Controls

- Positive per unit: each legitimate actor emits the canary through its approved path.
- Negative: the unauthorized identity emits zero canaries.
- Sensitivity: probes designed to evade the strongest channel must be detected by it.
- Non-vacuity: the same operation without instrumentation really creates the observable artifact.

## Reporting

Print variable names and canary labels, never values. Report what was observed per channel, and phrase results as "no egress observed through the intercepted channels in this run".

## Done when

Origin, egress, and universe checks each have a positive control, and limits are printed unit by unit.
