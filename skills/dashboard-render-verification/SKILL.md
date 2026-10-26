---
name: dashboard-render-verification
description: "Use when verifying that a Dash or Plotly dashboard really renders data, not just returns HTTP 200, or when adding middleware to a Dash app."
---
# Dashboard Render Verification

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. Confirm the authorized application URL and expected dashboard content. Inspect the server response and the client-rendered result separately.
2. Verify required bundles, initialization requests, data and assets load without relevant console or network errors. A successful HTTP status or large response is not proof of rendering.
3. Use a structural browser snapshot to check the expected labels, controls and meaningful data. When visual evidence is authorized, capture the relevant viewport and record whether a person actually reviewed it.
4. Exercise a representative callback or navigation path using synthetic data. Compare its semantic response before and after the change; byte size is only a diagnostic clue.
5. Use an isolated deliberately broken fixture to show that the check rejects an empty shell, failed callback or missing bundle. Do not break the real service.

## Reporting

Separate HTTP availability, client initialization, interactive behavior and visual review. State any step that was not tested.
