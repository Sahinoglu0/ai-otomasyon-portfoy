# Changelog

This file is kept without rewriting history. Commit dates have not been changed.
Version lines for 18–19 October 2026 were **written retrospectively** (added to this file after the fact, not at release time). Lines dated after 21 October 2026 were written on their own date.

SHAs are from `git log` in this repository. Kule (measurement and tests) SHAs come from the local `cv-portfoy-kule` repository; they do not exist on a remote. Lines marked "no commit" are in the publish copy and have not been committed yet.

## 2026-10-22

- Kule Python tests 224 → 229 (K1). Counts produced from a run, via `sayim.py`. Kule SHA `1d31a4f`. Report: PORTFOY-K1.
- Orchestrator tests 60 → 68 (G2, +8 regression tests; 68/68 run). Report: PORTFOY-G2.
- Node tests 29 (29/29 on the full tree). One test is skipped in a temporary copy; the reason is recorded. Report: PORTFOY-K1.
- Eval 22/24 → 24/24. Two open criteria were turned into measures; the baseline was rewritten with the new names. Report: PORTFOY-G2.
- Prompt injection: tool output leaking into the final answer is closed. A confirmed write is refused when the summary does not match the arguments. Blind approval mode (`--onay-ver`) remains open. Report: PORTFOY-G2.
- Test counts on the publish pages are generated from the JSON and checked by a control mode. Report: PORTFOY-K1. No commit.
- `noindex` added to three HTML pages (index, portfoy, trace viewer). No commit. Live check to run after push. Report: PORTFOY-D2.
- Static panel demo added (`demo/`; synthetic, precomputed data; click test 58/58). No commit. Report: PORTFOY-S1.
- The "HAND-WRITTEN RECORD" label on trace data is kept. Report: PORTFOY-G2.

## 2026-10-19 (written retrospectively)

- Real model traces and English SVGs added, with a badge on the trace viewer. SHA `98b3131`.
- Text fixes after the real-model run (SVG, trace viewer footer, home page). SHA `a5c645a`.
- README: detailed version describing what the tool does (TR + EN). SHA `0bb9d9d`.

## 2026-10-18 (written retrospectively)

- Score 3.0/5 and current test counts (Kule 224 Python + 29 Node). SHA `66df4d0`.
- Eval result: typo fixed. SHA `2d7c1dc`.
- Trace viewer: TR/EN language switch. SHA `ed1f0da`.
- Home and portfolio pages: TR/EN language switch; link to the explanation from the home page. SHA `30b79c8`.
- README: detailed explanation, drawings; English version. SHA `9403a08`.
- Drawings (SVG). SHA `f698c30`.
- TR/EN language switch script. SHA `dda64a4`.
- Trace viewer. SHA `c449a9a`.
- Eval result. SHA `64de285`.
- Analyst traces and eval result. SHA `29d516c`.
- Portfolio page, analyst traces and eval result. SHA `8541b59`.
- README, home page and sample traces. SHA `33bb039`.
- MIT license. SHA `10169b0`.
