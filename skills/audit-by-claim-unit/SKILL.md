---
name: audit-by-claim-unit
description: "Use when building or auditing a coverage table of hypotheses and controls, to add the predication unit axis so a defect confined to one subgroup is not hidden by global results."
---
# Audit by Claim Unit

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

## Method

1. List the claim, control and unit over which it is asserted. A globally correct aggregate can hide a defect confined to a subgroup.
2. In synthetic fixtures, plant the same defect globally and inside a relevant stratum. Measure whether each control can detect it at the required resolution.
3. Run the existing control with the stratum as its population before adding a new control. Preserve unassigned records as a separate unit. Missing or insufficient observations are indeterminate, not green.
4. For statistical controls, specify the null, sampling assumptions, effect size, significance level and multiplicity adjustment. For extremes, explain why the reference-tail model is applicable; do not present an unvalidated formula as universal.
5. Demonstrate sensitivity before and after the grouping fix, and expose its power cost and resolution limit.
6. Require explicit configuration for historically important grouping keys. Removal needs a reason. Attributes derived from row indices are acceptable only in labeled synthetic fixtures, never as invented attributes of real records.

## Limits

The wrong partition remains blind. Finer partitions reduce power; no finite grouping list guarantees every hidden subgroup is covered.
