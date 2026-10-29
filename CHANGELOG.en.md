# Changelog

This file is kept without rewriting history. Commit dates have not been changed.
Version lines for 18–19 October 2026 were **written retrospectively** (added to this file after the fact, not at release time). Lines dated after 21 October 2026 were written on their own date.

SHAs are from `git log` in this repository. Kule (measurement and tests) SHAs come from the local `cv-portfoy-kule` repository; they do not exist on a remote. Lines marked "no commit" are in the publish copy and have not been committed yet.

## 2026-10-29 (v0.6.0)

- **v0.6.0 demo update:** the static demo (`demo/`) now matches v0.6.0. It adds FBL1N open item reconciliation as the seventh module, a morning report screen (top 5 findings, skipped analyses and why), a "since yesterday" comparison (a "load day 2" button, NEW / "open N days" / "amount changed" badges) and a note on SAP file formats. The data comes from Kule's synthetic trial package; the demo is still static, has no live API and holds no real SAP or company data. The overview text says "seven modules" (in the previous release the demo showed six modules while the text said seven by mistake; that was corrected). An independent check passed 49/49 in a real browser.
- **v0.6.0 (Kule commit `a772940`; numbers from the `sayim.py` output):** Kule Pro gets a morning workflow built on SAP exports. The source code is still not published; the text, numbers and limits were updated. Numbers are taken from `sayim.py` and `yayin_uret.py` output, never typed by hand.
  - **SAP formats:** ALV/SE16N exports are read with Turkish and English headings, UTF-8, UTF-16 (with and without BOM) and ANSI encodings, and tab, semicolon, comma or pipe (`|`, the framed "Unconverted" list) separators. The ALV header and total rows are skipped and a trailing minus sign (`12,5-`) is converted. HTML/MHTML and Excel files with an `.xls` extension are rejected with a plain message; a value that cannot be converted is never guessed, the row is rejected. The formats were tested with synthetic files; **they were not tried on output from a real SAP system**, and the default encoding and BOM decision is not settled by a primary source. There is no live SAP connection. Reports: KULE-S1, S7, S12, R5, R5b.
  - **FBL1N vendor open-item reconciliation:** the seventh analysis module. Rules: overdue, duplicate open item, open item that looks paid, amount mismatch, balance difference, and partial payment (added as the sixth rule in S12). The SAP side is the FBL1N export; the other side is the vendor statement (Kule CSV format; the statement has no SAP counterpart). On hand-calculated test sets the findings matched by type, document and effect. Reports: KULE-S2, R6, Q1, Q4.
  - **Morning report screen:** drag and drop SAP files, automatic recognition from the header, the top 5 findings of today, rejected rows, and a card that says which SAP list is missing. The report date now comes from the request (the screen sends today's date) or from the server's today; the fixed sample date is used only when every input is sample data, and it is labelled on screen (S9). A synthetic SAP trial pack loads with one button; the pack has 5 files and 17 known issues, 17/17 are caught, 0 unexpected findings. Reports: KULE-S3, S4, S8, S9, S11, Q3, Q4.
  - **"Since yesterday" section:** the morning report compares the snapshot with the previous one: new, resolved or gone, amount changed, and findings that carry on unchanged; cases waiting for an owner are counted separately. The same numbers appear on screen, in the downloaded HTML report and in the CSV. The comparison is against "the previous upload"; decision-engine findings do not have this difference yet. Report: KULE-S14.
  - **Downloadable report:** a single-file printable HTML report and an Excel-compatible, formula-protected findings CSV; neither contains a person's name or an access key. Report: KULE-S13.
  - **Invoice line fix (BPI 2019 adapter):** cumulative invoice sequences at the ±1 EUR boundary are now recognised as duplicates, and legitimate partial invoicing (two half invoices, two half payments) no longer raises a false alarm. The full XES output is byte for byte identical to the previous version. In the injection check, detection rose from 7/20 to 20/20, and from 14/16 to 16/16 on a further 10-type set; these checks use our own seeds, and an independent re-check is pending. Reports: KULE-V6, V7, V9, Q5, Q6.
  - **Measurement infrastructure:** upload processing time is measured; the user records their own time estimate (only under their own name); a "was the finding right?" mark goes to the audit trail; the summary endpoint is `/v1/olcum/ozet`. The ROI calculation can take two values from Kule records (monthly cases, recorded time) with their source; a single estimate is labelled "user estimate" and shown with its quartile range (S10). Reports: KULE-M1, M2, Q2, S8, S10.
  - **Open-data scale tests:** the modules were run on large input with M5, Favorita, SECOM, AI4I and BPI 2019; open-data inputs come out labelled `ACIK_VERI_DAHILI_TEST`, not `GERCEK_VERI`. Reports: KULE-V1–V8, S7, S12.
  - **Eval:** 123 cases; criteria/check/coverage 111/111 passed, 12 known gaps observed and not closed. The paraphrase check in the orchestrator can now be switched on from the Analyst option. Reports: KULE-C2, A1, ARASTIRMA-KULE-02. The real-model measurement was not repeated; the O1 numbers are unchanged.
  - **Numbers:** Kule Python 411, Node 58, orchestrator 111, total 580 (previous release: 229 + 29 + 87 = 345). API 28 routes, counted as operations (previous release: 21). Kule SHA: `a772940`.
  - **Known limits:**
    - Not tried on real SAP output; the formats are synthetic.
    - **The morning screen does not accept `.xlsx` files:** the picker is limited to `.csv` and `.txt`; a dropped `.xlsx` is rejected with a "Save as → CSV" notice. The server can read `.xlsx`, but only from a disk folder. Accepting it is a product decision. Report: KULE-R7.
    - The BPI 2019 result is neither a company's situation nor a measurement of accuracy: most findings come from the adapter's assumptions, and accuracy was not measured. The OEE value for AI4I and SECOM is a proxy.
    - "Since yesterday" compares with the previous upload; the amount threshold is 0.005 TL.
    - Measurement records are not a pilot measurement: time is the user's own estimate; ROI is "partly recorded", not "tied to measurement".
    - The 12 eval gaps are not closed; the Auditor does not check the context of a number in plain text.
    - The full M5 demand run and the 5-million-row run could not finish on this machine because of low memory.

## 2026-10-22 (later releases: v0.2.0, v0.2.1, v0.3.0, v0.4.0, v0.4.1, v0.4.2, v0.5.0)

- **v0.5.0 (this update):** the home and product pages were rebuilt to explain the product only (what it is, which problem it solves, how it works, modules, evidence, limits, how to try it); the résumé, employer names and author name were removed from the pages (the copyright-holder line in the LICENSE file stays, as the licence requires it). Small animations (reveal on scroll, counters, flow diagram, replay/pause) are disabled under `prefers-reduced-motion`. Real panel screenshots with a synthetic-data badge were added. README and screenshots updated. Report: KULE-D3.
- **v0.4.2 (`fb94f6b`):** eval counts and drawings from a single source (46 cases, 41/41 criteria, 5 known gaps), both gaps side by side, roadmap updated. Report: KULE-A2.
- **v0.4.1 (this update):** the SHA-256 verification on the evidence page is fixed. The digests in `kanit/SHA256SUMS` and `paket.json` had been computed from files written with CRLF on Windows, while the published files are LF, so `sha256sum -c` reported FAILED for 8 of 9 files on Linux/macOS (reported by an external review, reproduced on the live site). The digests were regenerated from the published bytes, `kanit/*` is pinned to `eol=lf` in `.gitattributes`, and the release gate now checks digests and line endings. Reports: ARASTIRMA-KULE-01, ARASTIRMA-KULE-02.
- **v0.4.0 (`e301249`):** two separate videos (introduction 2 min 45 s, usage 4 min 42 s; silent, with Turkish and English subtitles, MP4/.srt/.vtt), a player page (`video/`, `noindex`), video and screenshot sections in the README, four screenshots from the live pages. No new measurements; the numbers are the same as v0.3.0. Reports: PORTFOY-V4, V5.
- **v0.3.0 (`83857f8`):** open-data trials added. Mendeley *Retail Inventory Data* (a model sample dataset, 30/30 rows accepted) and UCI *Online Retail II* (1,067,371 rows, proxy mapping, ingest robustness only). `stok_durumu` could not be run on real data; no open real data was found for goods receipt, delivery notes, invoices or production. DataCo licence note updated. Reports: ARASTIRMA-VERI-01, VERI-E1, VERI-T1, VERI-Y1.
- **v0.2.1 (`80c1bf7`):** 4 sample traces from the real-model runs in the trace viewer, a 4-card reading order on the home and portfolio pages, README summary. Real-model run counts corrected: 38 runs were made, 37 completed, 1 was cut off by the quota. Report: PORTFOY-S2.
- **v0.2.0 (`42c5af4`):** test evidence page (`kanit/`), a 345-item test catalogue, a SHA-256 manifest, a static demo (`demo/`, outside the MIT licence), a seed band and an ROI assumptions table (`olcum/`), `noindex`. Reports: PORTFOY-K2, K3, K4, O2.
- Current state of the 22 October lines below: orchestrator tests 68 → 87 (G2b, G3, G4, G6); eval 24/24 → 34 cases, 33/33 passed, 1 known gap (numbers in plain text are checked only for presence in Kule's data). Blind-approval mode was closed; approval opens a write only with the content digest (G2b). Numbers in plain text are checked too (G3). Planner output passes a code gate with at most 2 retries (G4, G6). Reports: PORTFOY-G2b, G3, G4, G6.
- Real-model measurement (O1): 38/40 runs, 16/20 accepted in the investigation; paraphrased leaks got through the gate (0/6), which is a known limit. Report: PORTFOY-O1.

## 2026-10-22

- **Correction (publish consistency, A2):** the "no commit" marks in this section are stale: `noindex` and `demo/` were already committed in v0.2.0 (`42c5af4`). The lines "blind approval mode remains open" and "eval 24/24" are superseded by the current-state line above: the blind approval path is closed, and the flag only opens a write with a scenario-specific summary. The eval is now 46 cases: criteria/checks/scope 41/41 passed, 5 known gaps observed (source `ajan-orkestrasyon/ornek/eval-a3/`). The older lines below are unchanged.
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
