# Changelog

This file is kept without rewriting history. Commit dates have not been changed.
Version lines for 18–19 October 2026 were **written retrospectively** (added to this file after the fact, not at release time). Lines dated after 21 October 2026 were written on their own date.

SHAs are from `git log` in this repository. Kule (measurement and tests) SHAs come from the local `cv-portfoy-kule` repository; they do not exist on a remote. Lines marked "no commit" are in the publish copy and have not been committed yet.

## 2026-10-22 (later releases: v0.2.0, v0.2.1, v0.3.0, v0.4.0, v0.4.1)

- **v0.4.1 (this update):** the SHA-256 verification on the evidence page is fixed. The digests in `kanit/SHA256SUMS` and `paket.json` had been computed from files written with CRLF on Windows, while the published files are LF, so `sha256sum -c` reported FAILED for 8 of 9 files on Linux/macOS (reported by an external review, reproduced on the live site). The digests were regenerated from the published bytes, `kanit/*` is pinned to `eol=lf` in `.gitattributes`, and the release gate now checks digests and line endings. Reports: ARASTIRMA-KULE-01, ARASTIRMA-KULE-02.
- **v0.4.0 (`e301249`):** two separate videos (introduction 2 min 45 s, usage 4 min 42 s; silent, with Turkish and English subtitles, MP4/.srt/.vtt), a player page (`video/`, `noindex`), video and screenshot sections in the README, four screenshots from the live pages. No new measurements; the numbers are the same as v0.3.0. Reports: PORTFOY-V4, V5.
- **v0.3.0 (`83857f8`):** open-data trials added. Mendeley *Retail Inventory Data* (a model sample dataset, 30/30 rows accepted) and UCI *Online Retail II* (1,067,371 rows, proxy mapping, ingest robustness only). `stok_durumu` could not be run on real data; no open real data was found for goods receipt, delivery notes, invoices or production. DataCo licence note updated. Reports: ARASTIRMA-VERI-01, VERI-E1, VERI-T1, VERI-Y1.
- **v0.2.1 (`80c1bf7`):** 4 sample traces from the real-model runs in the trace viewer, a 4-card reading order on the home and portfolio pages, README summary. Real-model run counts corrected: 38 runs were made, 37 completed, 1 was cut off by the quota. Report: PORTFOY-S2.
- **v0.2.0 (`42c5af4`):** test evidence page (`kanit/`), a 345-item test catalogue, a SHA-256 manifest, a static demo (`demo/`, outside the MIT licence), a seed band and an ROI assumptions table (`olcum/`), `noindex`. Reports: PORTFOY-K2, K3, K4, O2.
- Current state of the 22 October lines below: orchestrator tests 68 → 87 (G2b, G3, G4, G6); eval 24/24 → 34 cases, 33/33 passed, 1 known gap (numbers in plain text are checked only for presence in Kule's data). Blind-approval mode was closed; approval opens a write only with the content digest (G2b). Numbers in plain text are checked too (G3). Planner output passes a code gate with at most 2 retries (G4, G6). Reports: PORTFOY-G2b, G3, G4, G6.
- Real-model measurement (O1): 38/40 runs, 16/20 accepted in the investigation; paraphrased leaks got through the gate (0/6), which is a known limit. Report: PORTFOY-O1.

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
