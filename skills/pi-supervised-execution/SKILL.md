---
name: pi-supervised-execution
description: "Use when launching pi from cron, systemd, or another supervisor, where stdin or PATH may differ from an interactive shell and the job silently fails."
---
# Pi Supervised Execution

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Purpose: keep a pi invocation alive under a system supervisor. Each supervisor removes something pi needs: systemd can provide stdin at end-of-file, and cron can provide a minimal PATH that causes exit code 127. The form that works in an interactive shell often fails under a supervisor, with a different symptom each time.

Rule: invoke pi by absolute path, with stdin and environment declared explicitly, never inherited. A wrapper script can own the stdin pipe and resolve the binary path, which covers both cases without guessing which one is missing.

Inputs: the absolute path of the pi binary, the prompt or mode, and the supervisor type.

Steps:

1. Compare the supervisor's environment with an interactive shell. List the stdin source, the PATH, and the working directory.
2. Write a wrapper that resolves the binary path, sets PATH explicitly if needed, and supplies its own stdin.
3. Abort with a named reason when a binary is missing. The message must say which binary was missing and show the effective PATH. A bare exit code hides the cause, and a silent job looks like "nothing to do".
4. For cron, a PATH line at the top of the crontab helps, but the absolute path inside the script is what makes the script correct on its own.
5. Test the launch under the real supervisor, not only from the shell, and read its log after the first scheduled run.

Negative control: remove the PATH entry in a test copy and confirm the named abort appears instead of a bare exit code.

Lesson: when a neighboring job already works under the same supervisor, read its configuration before writing a new one.

Done criteria: the wrapper's abort messages, the absolute paths used, the supervisor configuration, and one successful run recorded in the supervisor log.
