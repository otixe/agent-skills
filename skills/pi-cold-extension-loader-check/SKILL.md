---
name: pi-cold-extension-loader-check
description: "Use when verifying a pi extension without a reload by loading it through the real pi loader in a fresh process and exercising the artifact it registers."
---
# Pi Cold Extension Loader Check

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Verify the installed Pi version and its documented loader API. Internal module paths are version-specific, not a portable public interface.
2. Prepare a fresh process and disposable project/configuration roots with external-effect isolation and no office credentials. Establish guards before loading the extension: imports and factories may execute code.
3. Load the candidate through that runtime's actual loader, not a handwritten imitation. Inspect loader errors and registered tools or handlers.
4. Invoke the registered artifact with synthetic parameters and a minimal fixture context, asserting its observable output and effects. Distinguish import, factory, registration and execution failures.
5. Use a compatible toy extension as a positive control and a deliberately invalid extension as a negative control. Confirm rejection is visible according to that loader's contract.

## Limits

Cold loading tests registration and the exercised artifact on one runtime. It does not prove live UI behavior, every version's compatibility or sandbox enforcement.
