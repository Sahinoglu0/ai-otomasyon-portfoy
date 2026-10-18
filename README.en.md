# AI / automation portfolio: Kule Pro and an agent orchestrator

**Language / Dil:** [Türkçe](README.md) · English (this page)

This repository holds the **static sample pages and a detailed write-up** of two pieces of work: a supply chain decision-support tool (Kule Pro) and a thin multi-agent orchestrator, written in-house, that uses the tool's modules as agent tools. The source code is not in this repository (see "What is in this repository" below).

**Live pages** (switch between Turkish and English with the TR / EN button at the bottom right):

- [Landing page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/)
- [Portfolio page](https://sahinoglu0.github.io/ai-otomasyon-portfoy/portfoy/)
- [Agent trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/): sample traces, approval gate, Auditor decisions, eval

> **Honest status.** Kule Pro's internal assessment is **3.0 / 5** (previously 2.7; scored independently by two agents against a pre-registered rubric, with the same result; still an internal assessment, not external validation). The score reflects technical soundness only; **there is no evidence that any company needs this tool**. The data is synthetic or public (DataCo), the ROI is hypothetical, and there is no SAP or OCR connection. The orchestrator **made no real model call**; the tapes are hand-written. Read every number below within these limits.

## 1. The system at a glance

![System overview: CSV input, input contract, SQLite, six modules, CLI/REST/panel; the agent orchestrator below](docs/img/sistem-genel.svg)

**Kule Pro** takes CSV files and checks every row against an input contract (types, required fields, cross-field rules, duplicates); rows that fail are stored together with the reason. Clean data is written to SQLite; every run leaves a *snapshot*, findings become *cases*, and every case change is written to an audit trail. Six modules produce the same JSON envelope:

| Module | What it does | Method |
|---|---|---|
| `stok_durumu` | Days of cover; KRITIK / OLU_STOK / FAZLA_STOK (critical / dead / excess); ABC class | Rule-based |
| `siparis_anomali` | 7 kinds of order–goods receipt mismatch, ranked by severity | Rule-based |
| `talep_tahmini` | 8-week demand forecast, 80% interval, backtest | Additive Holt-Winters (52-week seasonality) |
| `tedarikci_skoru` | On-time delivery, rejection rate, price deviation → 0–100 score, A/B/C/D | Weighted rule (40% / 35% / 25%) |
| `uclu_eslestirme` | Order–delivery note–invoice: double invoice, over-invoicing, price deviation, invoice without delivery note | Rule-based; invoice lines are extracted with a regular text pattern, **no OCR** |
| `oee` | Availability × performance × quality; downtime Pareto | Calculation + rules; the root cause is a *suggestion*, not evidence |

By default **no module calls a language model.** An optional explanation layer can be pointed at an OpenAI-compatible endpoint through environment variables; it has not been tried with a real provider. Outputs are available from the CLI (`python -m kule ...`) and, as a demo setup, from a REST API (21 routes, tokens stored as SHA-256 digests, a role matrix). The API is not production-ready: no TLS (a setup guide exists but was not verified) and no SSO; an in-process rate limit exists (default 300 requests/min per client, 429 when exceeded).

## 2. The agent orchestrator

![Investigation flow: Planner, Analyst, Auditor; approval gate and allow-list](docs/img/ajan-akisi.svg)

The orchestrator is a thin core written with the Python standard library only: a state machine (READY → RUNNING → COMPLETED / FAILED / BUDGET_EXCEEDED), step and token budgets, timeouts, retry with backoff, a tool allow-list, an approval gate for side-effect tools, and a trace that records every event.

Sample scenario: *"Why are warehouse IZM-01 and supplier T-03 critical? Produce an action plan and a draft e-mail to the supplier."*

| Role | What it does | How |
|---|---|---|
| Planner | Splits the question into subtasks | Model, no tools |
| Analyst | Calls Kule modules as tools, interprets the findings, then writes its numbers into a `iddialar` (claims) block | Model; tools `stok_sorgu`, `tedarikci_sorgu` |
| Auditor | Re-checks every claim against Kule's own calculation; rejects the Analyst if it does not match (at most 2 attempts) | **Code**, not a model |

In the sample trace the Analyst first writes the T-03 score as **58.0** while Kule computes **36.3**; the Auditor rejects it. On the second attempt **36.3** is accepted. In the [trace viewer](https://sahinoglu0.github.io/ai-otomasyon-portfoy/ajan-orkestrasyon/iz-goruntuleyici/) you can open "Investigation · Analyst, attempt 1" and "attempt 2" from the sample picker and follow it step by step.

**Important:** these traces are **hand-written tapes.** No language model ran; the viewer says so on every screen with a "HAND-WRITTEN RECORD" label. The recorded token counts are not real cost.

## 3. Eval and known gaps

![Eval: 24 cases, 22 criteria/checks/scope passed, 2 known gaps observed](docs/img/eval-vakalar.svg)

The eval has 24 cases: Auditor (13 criteria + 1 out of scope), authorisation and approval (3 criteria + 1 positive check), injection (2 criteria + **2 known gaps**), end-to-end (2). The result is reported as two separate numbers: **criteria/checks/scope 22/22 passed** and **known gaps 2/2 observed (not closed).**

- **KACAK-enjeksiyon-son-metinde (injection leaks into the final text):** a command embedded in tool output leaks into the Analyst's final reply; because the Auditor only checks numbers, it accepts this text.
- **KACAK-onayli-yazma-enjeksiyonla (approved write via injection):** if approval has been granted, a write started by injection passes the gate; approval is a programmed callback and does not inspect the content.
- **Scope decision:** the Auditor does not check numbers in plain text; Turkish numbers (`58,0`, `%9,29`), dates and list numbers cannot be parsed reliably from prose. A numeric claim has to be written into the claims block.
- In the injection cases the tape *assumes* the model obeyed the injection; what is measured is whether the gate stops the resulting call. Whether a real model would obey an injection cannot be measured by this eval.

The eval also catches two deliberately broken versions (an Auditor that accepts everything; an orchestrator without authorisation and approval checks): in both, the affected cases are flagged as REGRESSION.

## 4. Intermittent demand measurement (KULE-E8)

![Test MAPE and test coverage: naive, Holt-Winters, Croston, SBA, TSB](docs/img/e8-olcum.svg)

Question: is Kule's demand forecast (Holt-Winters) improved by treating weeks without sales as zero in a careful way, or by intermittent demand methods (Croston, SBA, TSB)? The criteria were **written before the results**: `k` was chosen on a calibration window and reported on a separate test window (coverage 75–85% and a MAPE below the naive baseline); all 15 variant × method rows, including the failing ones, are in the report.

Data: DataCo (public, Mendeley Data, CC BY 4.0), 162 weeks, 118 products. **It is not company data.**

- **Smooth class (9 test products, 648 rows):** the current Holt-Winters fails both criteria (coverage 72.84%; MAPE 264.12% against a naive 250.65%). SBA passes both (77.31%; 248.00%) but the margin is **2.6 points**, weak evidence on 9 products.
- **Erratic, intermittent and lumpy classes:** **not measurable**, because the test window has no scored rows. There is no verdict for these classes. Products whose sales have ended drop out of the test window, so the intermittent demand question cannot be answered in this window; a new measurement with a product-lifetime window is needed.
- **Traps:** in the "zero-fill the whole window" variant, 89% of the test rows are zeros of products that have stopped selling, which inflates coverage artificially; that variant is reported as a control and not used for decisions. A partial last week distorts MAPE (the verdict did not change in the sensitivity run). The volume break between 2017-08 and 2017-10 was not analysed.
- The production calibration rule was **not changed** during this measurement; on synthetic data the regression check gave the expected 79.7% coverage (79.69%).

## 5. Limits and open items

| Topic | Status |
|---|---|
| Company need | **No evidence.** The "company need" criterion of the internal score is 2/5. No real company's savings or gain data was used |
| Data | Sample data is synthetic (seed 42). Measurements use public DataCo; only two modules were tested on it |
| ROI | Hypothetical in the panel; the inputs are your assumptions |
| SAP / OCR | None. SAP-style CSV exports can be read through configuration; not tried with real SAP output |
| Orchestrator | No real model call, tapes are hand-written, the Auditor is code; 2 injection gaps are known and open |
| Tests | Kule 224 Python + 29 Node and orchestrator 44 unit tests pass. Kule once showed 1 error in a run; it did not recur in more than 30 clean runs since, and the cause was not found |
| Security | The REST API is a demo setup (no TLS or SSO; an in-process rate limit exists, not a DDoS defence; no account lockout) |
| Docker | Files exist, could not be run in this environment |

## 6. What is in this repository

- `index.html`, `portfoy/`, `ajan-orkestrasyon/iz-goruntuleyici/`: dependency-free static pages. `assets/i18n.js` provides the Turkish/English switch.
- `ajan-orkestrasyon/ornek/`: sample traces and the eval result the viewer reads (all hand-written records).
- `docs/img/`: the diagrams on this page (SVG).
- **The Kule Pro and orchestrator source code is not in this repository.** Only the visible part of the results is here.
- **The language option** covers these pages. The *data* inside the sample traces and eval cases (model texts, inputs) is Turkish sample data and is not translated. Kule Pro's own panel, CLI and API outputs are currently Turkish only.

## License and attribution

Code and pages are MIT licensed, see [LICENSE](LICENSE). Data used in the measurements: DataCo Smart Supply Chain (Mendeley Data), CC BY 4.0. This data does not belong to any company and is not distributed in this repository.
