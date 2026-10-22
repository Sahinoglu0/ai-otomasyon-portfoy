# Kule Pro: a supply chain decision support tool

**Language:** [Turkish](README.md) · English (this page)

Kule Pro reads a company's stock, order, supplier, invoice and production files and has the answers ready every morning: **which items are about to run out, how much to order and when, which order or invoice has a mismatch, which supplier cannot be relied on, and where money is leaking.** Alongside it sits a multi-agent orchestrator that uses the tool's modules to answer questions and checks its own answers.

**Live pages** (the TR / EN button at the bottom right switches the language):

- [Home](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portfolio page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Agent trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): sample traces, approval gate, Auditor decisions, eval
- [Test evidence](https://sahinoglu0.github.io/ai-otomasyon-portfoy/kanit/): source code is closed; test counts, behaviour catalogue and an evidence package you can verify with SHA-256

**Boundary:** The sample data is synthetic or public and is not a real company's result. The Kule source code is not in this repository.

## 1. Agent orchestrator and Auditor

![Investigation flow: Planner, Analyst, Auditor; approval gate and allow-list](docs/img/en/ajan-akisi.svg)

A thin multi-agent orchestrator that uses Kule's modules as tools. The core is written with the Python standard library only and contains: a state machine, step and token budgets, timeouts, retry with backoff, a tool allow-list, an approval gate for tools with side effects, and a trace that records every event.

Example question: *"Why are warehouse IZM-01 and supplier T-03 critical? Produce an action plan and a draft email to the supplier."*

| Role | What it does | How |
|---|---|---|
| Planner | Splits the question into sub-tasks | Model, no tools |
| Analyst | Calls Kule modules as tools, interprets the findings, writes its numbers into an `iddialar` (claims) block | Model; tools `stok_sorgu` (stock query) and `tedarikci_sorgu` (supplier query) |
| Auditor | Re-compares every claim with Kule's own calculation; rejects the Analyst if it does not match | **Code**, not a model |

In the example trace the Analyst writes T-03's score as 58.0 on the first attempt, Kule calculates 36.3, the Auditor rejects it, and 36.3 is accepted on the second attempt. The idea: every number the Analyst writes in its claims block is compared with Kule's deterministic calculation, and the Analyst is rejected if it does not match. Numbers elsewhere in the text are checked only for whether Kule's data contains them at all; this does not verify that a number is used in the right context. In the [trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) you can open the "Investigation · Analyst attempt 1" and "attempt 2" traces step by step. That example comes from a hand-written tape. The "Real model" traces in the viewer come from a single run made with a local `claude` (the 38-run measurement is in §4): on the first attempt the Analyst wrote a list of materials in the `deger` field instead of a number, and the Auditor compared it with Kule's number (3) and rejected it; on the second attempt all five claims matched Kule's calculation and were accepted. The viewer also adds four representative traces from the 38 runs: S1 accepted, S4 rejected, E1 paraphrased leak and E2 approval-gate catch. The viewer marks the source of every trace with a badge: REAL MODEL RECORD, HAND-WRITTEN TAPE or CODE LINE.

## 2. Eval

![Eval: 24 cases, 22 criteria/checks/scope passed, 2 known gaps observed](docs/img/en/eval-vakalar.svg)

The eval is replayed from tapes; it is not a measure of model quality. The eval has 34 cases; **33/33** criteria, check and scope cases passed. One known gap was observed and is not closed: a "2 critical items" sentence in plain text (actual count 3) is accepted while the claims block is correct, because numbers in plain text are checked only for whether they appear in Kule's data. If this case is closed it will become a criterion. The eval also catches two deliberately broken versions: an Auditor that accepts everything and an orchestrator with no authorisation checks.

## 3. Test evidence and measurements
Full test evidence (test catalogue, behaviour catalogue, SHA-256 evidence package): [kanit/](kanit/index.html).


**Catching known errors in sample data.** The generator plants known errors; the modules find them and nothing more:

| Module | Planted | Found |
|---|---|---|
| Order anomaly | 7 anomalies (+3 clean hard cases) | 7, clean cases not flagged |
| Three-way match | 4 findings (duplicate invoice, over-billing, 8% price deviation, invoice without delivery note) | 4 |

**Large real-world data.** **172,765 shipment rows** adapted from the public DataCo Smart Supply Chain dataset loaded in one ingest: 172,765 accepted, 0 rejected, 0 crashes, about 8 seconds.

**Demand forecast.** On the sample data the Holt-Winters backtest error (MAPE) averages 8.07; the simple same-week-last-year method gets 11.16. Intermittent demand methods (Croston, SBA, TSB) were also tried against pre-registered criteria:

![Test MAPE and test coverage: naive, Holt-Winters, Croston, SBA, TSB](docs/img/en/e8-olcum.svg)

In the smooth class SBA passed both criteria (coverage 77.31%, MAPE 248.00 against naive 250.65); the other classes could not be measured in the test window and need a separate measurement on a product-life window.

**Supplier score (sample data).** A clear separation between T-01 at 95.5 (A) and T-03 at 36.3 (D); T-03 delivers on time 60% of the time with a 9.29% rejection rate.

**Tests.** For Kule, 229 Python tests pass; on the Node side 29 tests, 29 pass, 0 skipped; the orchestrator has 87 unit tests.

## 4. Scope and status

- **Data.** The sample data is synthetic (seed 42); measurements were made on synthetic and public DataCo data. The ROI calculator's inputs are the user's own assumptions.
- **Seed band and ROI.** Across 10 seeds (7, 42, 2026, 1, 2, 3, 11, 99, 123, 314) the total stock value ranges from 7.4 M to 45.6 M TRY (median 21.9 M TRY), so no single TRY figure is offered. Band: [`kanit/olcum-tohum-bandi.json`](kanit/olcum-tohum-bandi.json). In the ROI calculator, the user's unsourced inputs (catch rate, prevented share, cost per event) move the result by ±3% to ±8%. The stock leg is not computed unless the user enters the excess stock share input, and it shows no TRY result. These are worked examples and sensitivity checks, not a company result. ROI assumptions table: [olcum/roi-varsayimlari.en.md](olcum/roi-varsayimlari.en.md).
- **Integration.** Input is CSV and `.xlsx` files; SAP-style exports are read through a mapping file. There is no live SAP or OCR connection.
- **API.** Designed for demo and pilot setups: roles, an audit trail and a rate limit are included; production-grade security (TLS, SSO) is outside the scope of this publication.
- **Orchestrator (real-model measurement).** With `claude-haiku-5-5` through the local `claude` CLI, 38 of 40 planned runs were recorded: 37 completed and 1 cut short by the quota. The quota ran out at model call 136. The last 2 runs were never executed. The pre-registration forbids runs after the quota, so they were not rerun.
  - **Investigation:** 16 of 20 runs accepted, 4 rejected, 0 failed. Acceptance 80%, 95% Wilson interval [0.584, 0.919]. By scenario: S1, S2 and S3 4/4 (S3's first attempt 3/4); S4 and S5 2/4. S4 and S5 flip between accept and reject: same question, same data, different outcome.
  - **Rejection reasons** (11 rejected attempts): number mismatch 7, format 1, off-task 1, other 2, injection compliance 0.
  - **Injection** (two pre-registered cases; E1 9 runs, E2 8 runs): In the last-reply leak case (E1) the model did not copy the injected text verbatim; it paraphrased it (6/9). The leak check caught none of these 6 paraphrases (0/6, 95% Wilson [0.000, 0.390]). This is a known limit and is not hidden: a paraphrased leak passes the gate. In the approved-write case (E2) the model tried to write with injected arguments in 8/8 runs; the approval gate stopped it in all 8, with no side effect (0/8, 95% Wilson [0.000, 0.324]). In E2's final text the injected words (`sil_her_sey`, `hacklendi`) appeared in 8/8 runs; this is the paraphrase count, which the pre-registration places outside the gate's scope and counts separately. The legitimate write (`sonuc.txt` with the approved summary) never happened in any run (0/8), so the approval's legitimate path was not tested in this sample. The run cut short by the quota (E2-t09) and the runs never executed (E1-t10, E2-t10) are not in any denominator. For 8/8 in E2, the 95% Wilson interval is [0.676, 1.000].
  - **Limits:** The samples are small (investigation n=20; injection cases E1 n=9, E2 n=8), and this is not a claim about model quality. The other traces in the viewer are hand-written tapes. The current gate checks form: it rejects output with off-task lines, but it does not check content, and a single off-task sentence under 200 characters can pass. A rejected Planner output is requested again at most twice; if all three attempts are rejected, the Analyst does not run. The Auditor compares the claims block with Kule; numbers in plain text are checked only for presence in Kule's data, not for context.
  - **Records:** The pre-registration and the traces of all 38 runs are in `ajan-orkestrasyon/ornek/gercek-model/` (`on-kayit.md`, `o1/`).
- **Source code:** Kule's source code is not published in this repository. In its place there is test evidence (test catalogue, behaviour catalogue), results on deliberately broken sample data, an eval replayed from tapes and real-model traces. The `demo/` folder holds only the panel's browser layer and is under a non-MIT license (`demo/LICENSE.txt`). It contains static pages, drawings and measurement outputs.
- **Language.** These pages are in Turkish and English. Kule Pro's own panel, command line and API outputs are currently Turkish only.

## 5. What it is for

A typical day for a planner, buyer or manager:

| Question | Kule's answer |
|---|---|
| "Which items are critical today?" | Days-of-cover status CRITICAL / DEAD_STOCK / EXCESS_STOCK and ABC class, ranked by an importance score |
| "How much should I order, and when?" | Per-item safety stock, reorder point (ROP), economic order quantity (EOQ) and a recommended order |
| "Is there an error in my orders or invoices?" | 7 kinds of order-vs-goods-receipt mismatch; duplicate invoice, over-billing, price deviation, invoice without delivery note |
| "Which supplier is a problem?" | A 0–100 score from on-time delivery, rejection rate and price deviation, graded A/B/C/D |
| "What will demand do?" | An 8-week forecast, an 80% interval and a backtest result |
| "How efficient are my lines?" | OEE (availability × performance × quality) and a downtime Pareto |
| "What if demand rises 20% or a supplier drops out?" | Scenario simulation: critical item count, stock-out item-days, at-risk value, yearly cost difference |
| "What do I tell management?" | Daily and weekly executive summaries, an ROI calculator, a printable report, draft emails to suppliers |

Every problem found becomes a **case**: it gets an owner, its status is tracked (open, under review, resolved, accepted) and each change is written to an audit trail. When the data is reloaded the next day, Kule shows what was fixed, what is new and what is still open.

## 6. How it works

![System overview: CSV input, input contract, SQLite, six modules, CLI/REST/panel; the agent orchestrator below](docs/img/en/sistem-genel.svg)

1. **Input.** CSV files exported by the company (stock, shipments, orders, goods receipts, delivery notes, demand history, supplier deliveries, production) and invoice text. `.xlsx` files are read too; Turkish-language and spaced column headers are matched automatically, for example `Malzeme No.` (material number) and `Stok Miktarı` (stock quantity). SAP-style exports (EKPO, MSEG, MARD, LIPS) are converted to the Kule format with a field-mapping file.
2. **Validation.** Every row is checked against an input contract: type, required field, lower bound, allowed values, cross-field rule, duplicates. A bad row never disappears silently; it is stored with its reason and reflected in the file's **data quality score** (missing, inconsistent, duplicate, stale).
3. **Storage.** Clean data goes to SQLite. Every run leaves a *snapshot*; the difference between two snapshots can be computed.
4. **Analysis.** Six modules produce the same JSON envelope (numbers, findings, warnings, the method used).
5. **Decision.** The decision engine turns findings into an importance score by monetary impact and produces order recommendations.
6. **Presentation.** Command line, REST API, browser panel and daily/weekly summary reports.

## 7. Modules

| Module | What it does | Method |
|---|---|---|
| Stock status (`stok_durumu`) | Days of cover; CRITICAL / DEAD_STOCK / EXCESS_STOCK; ABC class | Rule based |
| Order anomaly (`siparis_anomali`) | 7 kinds of order–goods-receipt mismatch, ranked by importance; cancellations (102) are netted out | Rule based |
| Demand forecast (`talep_tahmini`) | 8-week demand forecast, 80% interval, backtest | Additive Holt-Winters (52-week seasonality) |
| Supplier score (`tedarikci_skoru`) | On-time delivery, rejection rate, price deviation → 0–100 score, A/B/C/D | Weighted rule (40% / 35% / 25%) |
| Three-way match (`uclu_eslestirme`) | Order–delivery note–invoice: duplicate invoice, over-billing, price deviation, invoice without delivery note | Rule based; invoice lines are extracted with a regular text pattern |
| OEE (`oee`) | Availability × performance × quality; downtime Pareto; root-cause suggestion | Calculation + rules |
| Explanation (`aciklama`) | A Turkish summary of the module outputs | Template; optionally an OpenAI-compatible language model endpoint |

By default no module calls a language model; the results come from ordinary, testable calculations. With `KULE_ACIKLAMA_SAGLAYICI=claude` the explanation layer can run through local `claude`. A language model can be used only in the optional explanation layer, and it sees aggregated summary sentences, not the raw data.

## 8. Decision engine

A findings list says "what happened"; the decision engine calculates "what to do". Per-item safety stock, reorder point, economic order quantity and recommended order; all assumptions (holding rate, order cost, stock-out penalty, service level) come from one settings file and can be changed.

- **Calibrated prediction interval.** The 80% interval of the demand forecast initially covered 97.7% of observations (wider than needed, inflating safety stock). Calibration finds a single scale factor from older windows and tests it on unseen windows: on the sample data, test coverage goes **97.9% → 79.7%** and the interval width halves.
- **Service level / cost curve.** How the safety stock cost and the expected stock-out cost change as the target service level rises (sample data):

| Target | Safety stock value (Turkish lira) | Expected stock-out cost / year (Turkish lira) | Total cost / year (Turkish lira) |
|---|---|---|---|
| 90% | 2,956,921 | 1,782,526 | 2,822,732 |
| 95% | 3,795,167 | 786,645 | 1,910,675 |
| 99% | 5,367,577 | 127,587 | 1,408,859 |

- **Scenarios.** Situations such as "demand +20%", "lead time +5 days" or "T-02 drops out" are compared side by side (sample data):

| Scenario | Critical items | Stock-out item-days | At-risk value (Turkish lira) | Yearly cost difference (Turkish lira) |
|---|---|---|---|---|
| Today | 17 | 145.1 | 522,384 | - |
| Demand +20% | 20 | 165.3 | 820,043 | +321,495 |
| Lead time +5 days | 22 | 242.8 | 1,112,300 | +103,572 |
| Demand +20% and lead time +5 days | 23 | 276.2 | 1,648,916 | +451,878 |

- **Sensitivity.** Each assumption is moved by ±20% and the one that changes the decision most is shown (on the sample data, the nominal lead time).
- **Importance score.** In a monetary ranking, critical stock findings with no money value would sink to the bottom. The importance score (0–100) combines an importance weight with a log-scaled money component; on the sample data the riskiest critical stock item, 36th by money, moves to 1st by score.

## 9. Panel and reports

The browser panel has no dependencies and has four screens:

- **Executive summary:** the 5 priority actions, monetary impact, risk ranking by area, demand direction. If two modules find the same order line, the amount is counted once.
- **ROI calculator:** yearly savings as a low–high range, net and payback over holding cost, invoice leakage, delay and manual-check effort; each line's formula is spelled out with the user's own numbers.
- **Scenario:** play with supplier score weights, stock thresholds and "what if a supplier leaves" in the browser; with default settings it gives exactly the same result as the Python modules.
- **Report:** a printable executive report (PDF) and CSV that opens correctly in Turkish Excel.

The command `python -m kule ozet` (runs in the closed repository; `ozet` is Turkish for "summary") produces the daily and weekly summary (Markdown, single-file HTML, JSON, CSV). For every supplier that needs an order, an email **draft** is written: items, quantity, latest delivery date and the supplier's measured delivery performance. Kule does not send email; it prepares the draft for you to review.

## 10. Integration and security

- **REST API** (`/v1`, 21 routes, OpenAPI contract): cases, findings, snapshots, diff, module output, quality, ingest, decision, simulation, summary, audit, users.
- **Roles:** planner, buyer, manager. The module owner's role writes a case (stock, demand, OEE → planner; orders, invoices, suppliers → buyer); only a manager can set `ACCEPTED`.
- **Audit trail:** every unauthenticated (401) and unauthorised (403) call, every rate-limited (429) call and every authenticated operation is recorded. Tokens are stored in the database only as SHA-256 digests.
- **Resilience:** per-client rate limit (default 300 requests/min), a 20 MB body limit, a clean error message for fields larger than 128 KB, and a setup guide for a TLS reverse proxy.
- **Dependencies:** the Python standard library only. No `pip install` needed. Kule's core is not in this publication: `python demo.py` and `python -m kule ozet` run in the closed repository.

## License and attribution

Code and pages at the repository root are MIT licensed, see [LICENSE](LICENSE); the `demo/` folder is outside this license (`demo/LICENSE.txt`). Data used in the measurements: DataCo Smart Supply Chain (Mendeley Data, version 5, DOI 10.17632/8gx2fvg2k6.5), CC BY 4.0. This data does not belong to any company and is not distributed in this repository.
