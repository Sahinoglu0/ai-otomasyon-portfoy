# Kule Pro: a supply chain decision support tool

**Dil / Language:** [Türkçe](README.md) · English (this page)

Kule Pro reads a company's stock, order, supplier, invoice and production files and has the answers ready every morning: **which items are about to run out, how much to order and when, which order or invoice has a mismatch, which supplier cannot be relied on, and where money is leaking.** Alongside it sits a multi-agent orchestrator that uses the tool's modules to answer questions and checks its own answers.

**Live pages** (the TR / EN button at the bottom right switches the language):

- [Home](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portfolio page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Agent trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): sample traces, approval gate, Auditor decisions, eval

## 1. What it is for

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

## 2. How it works

![System overview: CSV input, input contract, SQLite, six modules, CLI/REST/panel; the agent orchestrator below](docs/img/sistem-genel.svg)

1. **Input.** CSV files exported by the company (stock, shipments, orders, goods receipts, delivery notes, demand history, supplier deliveries, production) and invoice text. `.xlsx` files are read too; Turkish and spaced column headers (`Malzeme No.`, `Stok Miktarı`) are matched automatically. SAP-style exports (EKPO, MSEG, MARD, LIPS) are converted to the Kule format with a field-mapping file.
2. **Validation.** Every row is checked against an input contract: type, required field, lower bound, allowed values, cross-field rule, duplicates. A bad row never disappears silently; it is stored with its reason and reflected in the file's **data quality score** (missing, inconsistent, duplicate, stale).
3. **Storage.** Clean data goes to SQLite. Every run leaves a *snapshot*; the difference between two snapshots can be computed.
4. **Analysis.** Six modules produce the same JSON envelope (numbers, findings, warnings, the method used).
5. **Decision.** The decision engine turns findings into an importance score by monetary impact and produces order recommendations.
6. **Presentation.** Command line, REST API, browser panel and daily/weekly summary reports.

## 3. Modules

| Module | What it does | Method |
|---|---|---|
| `stok_durumu` | Days of cover; CRITICAL / DEAD_STOCK / EXCESS_STOCK; ABC class | Rule based |
| `siparis_anomali` | 7 kinds of order–goods-receipt mismatch, ranked by importance; cancellations (102) are netted out | Rule based |
| `talep_tahmini` | 8-week demand forecast, 80% interval, backtest | Additive Holt-Winters (52-week seasonality) |
| `tedarikci_skoru` | On-time delivery, rejection rate, price deviation → 0–100 score, A/B/C/D | Weighted rule (40% / 35% / 25%) |
| `uclu_eslestirme` | Order–delivery note–invoice: duplicate invoice, over-billing, price deviation, invoice without delivery note | Rule based; invoice lines are extracted with a regular text pattern |
| `oee` | Availability × performance × quality; downtime Pareto; root-cause suggestion | Calculation + rules |
| `aciklama` | A Turkish summary of the module outputs | Template; optionally an OpenAI-compatible language model endpoint |

By default no module calls a language model; the results come from ordinary, testable calculations. A language model can be used only in the optional explanation layer, and it sees aggregated summary sentences, not the raw data.

## 4. Decision engine: how much to order, and when

A findings list says "what happened"; the decision engine calculates "what to do". Per-item safety stock, reorder point, economic order quantity and recommended order; all assumptions (holding rate, order cost, stock-out penalty, service level) come from one settings file and can be changed.

- **Calibrated prediction interval.** The 80% interval of the demand forecast initially covered 97.7% of observations (wider than needed, inflating safety stock). Calibration finds a single scale factor from older windows and tests it on unseen windows: on the sample data, test coverage goes **97.9% → 79.7%** and the interval width halves.
- **Service level / cost curve.** How the safety stock cost and the expected stock-out cost change as the target service level rises (sample data):

| Target | Safety stock value | Expected stock-out / year | Total / year |
|---|---|---|---|
| 90% | 2,956,921 TL | 1,782,526 TL | 2,822,732 TL |
| 95% | 3,795,167 TL | 786,645 TL | 1,910,675 TL |
| 99% | 5,367,577 TL | 127,587 TL | 1,408,859 TL |

- **Scenarios.** Situations such as "demand +20%", "lead time +5 days" or "T-02 drops out" are compared side by side (sample data):

| Scenario | Critical items | Stock-out item-days | At-risk value | Yearly cost difference |
|---|---|---|---|---|
| Today | 17 | 145.1 | 522,384 TL | - |
| Demand +20% | 20 | 165.3 | 820,043 TL | +321,495 TL |
| Lead time +5 days | 22 | 242.8 | 1,112,300 TL | +103,572 TL |
| Demand +20% and lead time +5 days | 23 | 276.2 | 1,648,916 TL | +451,878 TL |

- **Sensitivity.** Each assumption is moved by ±20% and the one that changes the decision most is shown (on the sample data, the nominal lead time).
- **Importance score.** In a monetary ranking, critical stock findings with no TL value would sink to the bottom. The importance score (0–100) combines an importance weight with a log-scaled money component; on the sample data the riskiest critical stock item, 36th by money, moves to 1st by score.

## 5. Panel and reports

The browser panel has no dependencies and has four screens:

- **Executive summary:** the 5 priority actions, monetary impact, risk ranking by area, demand direction. If two modules find the same order line, the amount is counted once.
- **ROI calculator:** yearly savings as a low–high range, net and payback over holding cost, invoice leakage, delay and manual-check effort; each line's formula is spelled out with the user's own numbers.
- **Scenario:** play with supplier score weights, stock thresholds and "what if a supplier leaves" in the browser; with default settings it gives exactly the same result as the Python modules.
- **Report:** a printable executive report (PDF) and CSV that opens correctly in Turkish Excel.

`python -m kule ozet` produces the daily and weekly summary (Markdown, single-file HTML, JSON, CSV). For every supplier that needs an order, an email **draft** is written: items, quantity, latest delivery date and the supplier's measured delivery performance. Kule does not send email; it prepares the draft for you to review.

## 6. Integration and security

- **REST API** (`/v1`, 21 routes, OpenAPI contract): cases, findings, snapshots, diff, module output, quality, ingest, decision, simulation, summary, audit, users.
- **Roles:** planner, buyer, manager. The module owner's role writes a case (stock, demand, OEE → planner; orders, invoices, suppliers → buyer); only a manager can set `ACCEPTED`.
- **Audit trail:** every unauthenticated (401) and unauthorised (403) call, every rate-limited (429) call and every authenticated operation is recorded. Tokens are stored in the database only as SHA-256 digests.
- **Resilience:** per-client rate limit (default 300 requests/min), a 20 MB body limit, a clean error message for fields larger than 128 KB, and a setup guide for a TLS reverse proxy.
- **Dependencies:** the Python standard library only. No `pip install` needed; `python demo.py` gives a first decision output in a second or two with no setup.

## 7. Measured results

**Catching known errors in sample data.** The generator plants known errors; the modules find them and nothing more:

| Module | Planted | Found |
|---|---|---|
| Order anomaly | 7 anomalies (+3 clean hard cases) | 7, clean cases not flagged |
| Three-way match | 4 findings (duplicate invoice, over-billing, 8% price deviation, invoice without delivery note) | 4 |

**Large real-world data.** **172,765 shipment rows** adapted from the public DataCo Smart Supply Chain dataset loaded in one ingest: 172,765 accepted, 0 rejected, 0 crashes, about 8 seconds.

**Demand forecast.** On the sample data the Holt-Winters backtest error (MAPE) averages 8.07; the simple same-week-last-year method gets 11.16. Intermittent demand methods (Croston, SBA, TSB) were also tried against pre-registered criteria:

![Test MAPE and test coverage: naive, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

In the smooth class SBA passed both criteria (coverage 77.31%, MAPE 248.00 against naive 250.65); the other classes could not be measured in the test window and need a separate measurement on a product-life window.

**Supplier score (sample data).** A clear separation between T-01 at 95.5 (A) and T-03 at 36.3 (D); T-03 delivers on time 60% of the time with a 9.29% rejection rate.

**Tests.** 224 Python and 29 Node tests pass for Kule; the orchestrator has 44 unit tests.

## 8. Agent orchestrator

![Investigation flow: Planner, Analyst, Auditor; approval gate and allow-list](docs/img/ajan-akisi.svg)

A thin multi-agent orchestrator that uses Kule's modules as tools. The core is written with the Python standard library only and contains: a state machine, step and token budgets, timeouts, retry with backoff, a tool allow-list, an approval gate for tools with side effects, and a trace that records every event.

Example question: *"Why are warehouse IZM-01 and supplier T-03 critical? Produce an action plan and a draft email to the supplier."*

| Role | What it does | How |
|---|---|---|
| Planner | Splits the question into sub-tasks | Model, no tools |
| Analyst | Calls Kule modules as tools, interprets the findings, writes its numbers into an `iddialar` (claims) block | Model; tools `stok_sorgu`, `tedarikci_sorgu` |
| Auditor | Re-compares every claim with Kule's own calculation; rejects the Analyst if it does not match | **Code**, not a model |

In the example trace the Analyst writes T-03's score as 58.0 on the first attempt, Kule calculates 36.3, the Auditor rejects it, and 36.3 is accepted on the second attempt. The idea: no number produced by a model reaches the user without being cross-checked against a deterministic calculation. In the [trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) you can open the "Investigation · Analyst attempt 1" and "attempt 2" traces step by step. The traces shown are pre-recorded tapes; the viewer says so on every screen.

### Eval

![Eval: 24 cases, 22 criteria/checks/scope passed, 2 known gaps observed](docs/img/eval-vakalar.svg)

The eval has 24 cases: Auditor (13 criteria + 1 out of scope), authorisation and approval (3 criteria + 1 positive check), injection (2 criteria + 2 deliberately open cases), end-to-end (2). **22/22** criteria, check and scope cases passed; the two injection cases were left open on purpose and are reported as they are (an embedded command in tool output leaking into the final answer; a write started by injection once approval has been given). The eval also catches two deliberately broken versions: an Auditor that accepts everything and an orchestrator with no authorisation checks.

## 9. Scope and status

- **Data.** The sample data is synthetic (seed 42); measurements were made on synthetic and public DataCo data. The ROI calculator's inputs are the user's own assumptions.
- **Integration.** Input is CSV and `.xlsx` files; SAP-style exports are read through a mapping file. There is no live SAP or OCR connection.
- **API.** Designed for demo and pilot setups: roles, an audit trail and a rate limit are included; a TLS reverse-proxy guide is ready, SSO is not included.
- **Orchestrator.** The traces shown are recorded tapes; no live call to a real language model was made in this version.
- **Source code** is not in this repository; it contains static pages, drawings and measurement outputs.
- **Language.** These pages are in Turkish and English. Kule Pro's own panel, command line and API outputs are currently Turkish only.

## License and attribution

Code and pages are MIT licensed, see [LICENSE](LICENSE). Data used in the measurements: DataCo Smart Supply Chain (Mendeley Data), CC BY 4.0. This data does not belong to any company and is not distributed in this repository.
