# Producer validation evidence

- [Results and limitations](validation.json)
- [Actual Node 22 check output](node22-check.txt)
- [Source/public hashes and reference hashes](source-map.json)
- [Candidate file seal](file-sha256.json) — excludes itself

The evidence directory is repository-only, not npm payload. It contains no private source names, original inventory, credentials, raw model sessions, source getter envelopes or canary values.

## Reproduce the bounded checks

From a reviewed checkout with Node 22 or newer:

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm run check
npm pack --ignore-scripts --json
```

The tested fixture additionally used npm offline mode. The package was unpacked with an exact allowlist: 50 skill files, package metadata, two READMEs, license and source map. All 55 payload files matched candidate bytes. A clean local consumer installed that tarball offline with lifecycle scripts disabled; all files again matched.

Pi 1.4.0 native skill loading and prompt-list formatting were exercised against those installed files, with default resources disabled and no inference: 50 unique names, 50 prompt entries, no diagnostics. This is not a test of the `pi install` command or behavior of all skills. Claude Code and Codex paths are documentation-checked, not host-tested.

The real gitleaks scanner passed on candidate and unpacked payload and detected a generated synthetic format canary in a separate private fixture. Known privacy-pattern families each detected a matching controlled value. No real credential was used. Known-pattern scans do not prove universal absence.

## Limits and review

These are producer checks, not independent QA, legal authorship certification, technical privilege enforcement, integration tests of infrastructure procedures, remote CI or publication. Source mappings hash exactly the retrieved body, with getter length discrepancies disclosed in the source map. Private provenance is available only to authorized reviewers.

Prior verifier-format and Markdown-list failures were preserved privately and corrected before the successful checks; they were not called package failures or passes. Any change invalidates the relevant seal and requires revalidation.

Original producer test logs/results describe the pre-wording-update candidate. Later narrow wording clarifications are recorded in `validation.json`; the mapping and file seal describe the current tree. Independent QA evidence and publication approval are separate.
