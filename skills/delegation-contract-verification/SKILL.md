---
name: delegation-contract-verification
description: "Use when writing a contract for delegated work to a subagent, or verifying a delivery before sign-off, so that criteria describe observable effects, acceptance evidence is named, and controls can actually fail."
---
# Delegation Contract and Verification

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this before delegating a non-trivial task, and before accepting its result. Most failed deliveries came from contracts that specified the shape of an artifact instead of its effect, and from verifications that could not fail.

## Part 1: Writing the contract

1. Describe the effect, not the form. "Write an index entry" is form. "The next session can read the text that was discarded" is effect. Specifying form invites a hollow delivery.
2. Attach acceptance evidence to every requirement. If you cannot name the evidence that proves it, the requirement is not yet written. "Rollback tested" needs a defined test, not only a syntax check.
3. If you offer alternatives, analyze the feasibility of each. A menu where one option cannot work is worse than a single required option.
4. Before asking the worker to select from a set, confirm the set is observable from the worker's position.
5. Do not use a hash as acceptance when the subject is expected to change. Define the criterion by its purpose instead.
6. When removing a control, list all of its justifications. A control with two reasons is not removed because one has expired.
7. Keep scope to what was requested. Extra code, extra storage, or extra components need a separate request. Propose first, then wait.
8. Prefer no local state for memory or continuity. Local-only files break recovery when a machine is lost. If a remote write fails, retry in memory and fail loudly; do not queue to disk.

## Part 2: Verifying the delivery

- Read raw evidence, not the summary. A summary can say "all passed" while the raw output shows failures.
- Audit the conclusion as well as the procedure. A careful procedure can still reach a false conclusion.
- Each red test must demonstrate that it would fail: show the pair, with the mutation failing and the same flow without it passing. A red test that hardcodes its failure, tests a validator instead of the real module, or tests a dead path proves nothing.
- Never remove an existing red test when adding new ones. If one becomes obsolete, state which predicate it covered and what now covers that gap.
- Check that controls can fire. A cap that no real producer reaches, or a branch on a status code the endpoint never returns, is noise.
- Protection belongs at each output sink, not only in a wrapper on the known path.
- Distinguish a stop caused by a policy gate from a non-atomic failure. Write stop conditions by failure mode, not by exit code.
- Declare residual risk and who covers it.

## Controls

- Mutant check: a deliberately broken version must fail.
- Scope check: no unrequested code appears in the delivery.

## Done when

Each requirement maps to a named piece of evidence, each red test has its pair, and residual risks are declared with an owner.
