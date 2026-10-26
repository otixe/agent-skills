---
name: traceable-decision-log
description: "Use when writing or auditing a decision sheet or status brief, so that each open item carries verifiable provenance, a stop-on-contradiction control, and a timestamp of its data."
---
# Traceable Decision Log

## Authorization and test boundary

These instructions grant no permission. Confirm the exact resources, allowed effects and data handling before acting. Use synthetic canaries and disposable fixtures for deliberate failures; never use real credentials as test inputs. Keep secrets and fragments out of model context, arguments, logs and plaintext artifacts. Imports, constructors, help and dry-run commands may have effects. Establish external-effect isolation before executing untrusted code; application stubs are not a sandbox. Record untested scope and obtain separate authorization for production changes or destructive actions.

Use this before escalating a decision to a human, or when writing or auditing any document that consolidates pending decisions, such as a decision sheet or status brief. The goal is that a contradiction hidden across many sections becomes a visible empty field.

## Step 0: Admission test for any control

Before adopting a control, run it against the incident that motivated it. If it would pass that incident without catching it, discard it or redesign it. A control that shows green on the exact failure it was built for is worse than none, because it adds an appearance of diligence.

Also list every store where authority can live, such as policy tables, task comments, activity logs, and memory notes. A control that queries one of four stores will miss the decision most of the time.

## Step 1: Provenance card per item

Each decision item carries three search-derived fields:

- authority_checked: store, identifier, last modified time, and query time.
- last_decision_found: date, author, and a verbatim quote, or NONE.
- why_still_open: the reason the item remains open despite the last decision.

Rule: if last_decision_found is not empty, the item cannot be labeled pending unless why_still_open is filled. Citing a policy without its identifier and modification time is decoration, and it discourages verification.

## Step 2: Check contradictions in both forms

A recommendation can contradict a decision; a presupposition can contradict it too. A question such as "which of the two is correct?" may assume that both are correct. Verify the premises of your questions, not only your recommendations.

## Step 3: Blocking claims need the last event

Do not write that an item blocks another without quoting the latest event of the blocked item, with its timestamp. If that event is an unblock, completion, or a scope reduction, the claim is invalid.

## Step 4: Timestamp the data

A decision sheet is a snapshot. State when its data was verified and when it was delivered. Date a document by its content: the newest event it reports as past is a floor, and the oldest event it reports as not occurred but that did occur is a ceiling.

## Step 5: Do not publish or send without re-checking

Items that touch external publication are irreversible. Re-verify them immediately before any send.

## Controls

- Negative: no item claims pending while a last decision exists without a reason.
- Positive: the control flags a seeded contradiction in a test document.

## Done when

Every item has the three provenance fields, timestamps are present, and contradictions are listed for the owner to resolve.
