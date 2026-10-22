# ROI and decision assumptions (EN)

> Every number in this table is an **assumption** or comes from a secondary source. None of them is a measurement from a real company.
> The TL results are computed on sample data; they are not the result for any real company.
> Source column: **assumption** (chosen by the owner) · **secondary** (a source was found, not verified) · **sample** (company size; varies by company) · **user** (no source; the company must enter its own value).

Data: these tables were produced on the sample data by moving each value in the decision settings file by ±20% and running the ROI calculator's sensitivity check. The source code is closed in this publication; the tables are readable as they are above.

## 1. Decision engine (decision settings file)

Sensitivity: each value moved by ±20%; the change in **total cost** (sample data) and how many of the top 10 priorities change.

| Input | Value | Source | Reasonable range | Sensitivity of the result (±20% or stated value) |
|---|---|---|---|---|
| Carrying cost rate (annual) | 0.10 | secondary (APQC median, not verified) | 0.08–0.12; literature upper 0.25 | −20%: cost −12.9% · +20%: +12.1% · 0.25: **+80.6%** (top 10 unchanged; 2 items change priority) |
| Order cost | 500 TL | assumption | ±20% | −20%: −0.9% · +20%: +1.5% |
| Stockout penalty rate | 0.5 | assumption | ±20% | ±20%: ±6.3% |
| Nominal lead time | 14 days | assumption | ±20% | −20%: cost −3.7%, URGENT −2, 8 of top 10 remain, 7 items change priority · +20%: cost +3.5%, URGENT +3 |
| Service level (A/B/C/spare part) | 0.97 / 0.95 / 0.90 / 0.95 | assumption | ±2 points | −2 points: **+18.2%** · +2 points: −13.8% |
| Money weight (importance score) | 40 | assumption | ±20% | result unchanged (0.0%) |
| Alternative switch extra days | 7 | assumption | single value | not measured (not moved in this run) |
| No-alternative extra days | 30 | assumption | single value | not measured (not moved in this run) |
| Calibration target coverage | 0.80 | assumption | single value | not measured |
| Warning thresholds | 95 / 55 / 1000 TL / 25000 TL | assumption | single value | not measured (affects warning counts, not the ROI) |

Reading: the carrying cost rate and the service level move the decision result most. Both should be measured with company data before any TL result is shown.

## 2. ROI calculator

Values moved by ±20% (for range inputs, low and high together). Baseline: low **798,000 TL/year**, high **3,296,000 TL/year**. Percentages are the change in the total ROI.

| Input | Value | Source | Reasonable range | Low total change, % (input −20% / +20%) | High total change, % (input −20% / +20%) |
|---|---|---|---|---|---|
| Average stock value | 50,000,000 TL | sample | single value | not measured: depends on the excess stock share input, which is not entered | not measured |
| Excess + dead stock share | (not entered) | user | single value | not measured | not measured |
| Excess stock reduction in year one | 10–25% | user | 10–25% | not measured: depends on the excess stock share input | not measured |
| Annual carrying cost (share of stock) | 10–30% | secondary (APQC; textbook) | 10–30% | not measured: depends on the excess stock share input | not measured |
| Annual purchase volume | 200,000,000 TL | sample | single value | −0.8 / +0.8 | −7.8 / +7.8 |
| Duplicate / erroneous payment share | 0.03–0.8% | secondary (Berkeley, APQC) | 0.03–0.8% | −0.8 / +0.8 | −7.8 / +7.8 |
| Share caught before payment | 50–80% | user | 50–80% | −0.8 / +0.8 | −7.8 / +7.8 |
| Annual delay / stockout events | 120 | sample | single value | −4.5 / +4.5 | −3.3 / +3.3 |
| Cost per event | 15,000 TL | user | single value | −4.5 / +4.5 | −3.3 / +3.3 |
| Share prevented by early warning | 10–30% | user | 10–30% | −4.5 / +4.5 | −3.3 / +3.3 |
| Annual unplanned downtime | 300 hours | sample | single value | −7.5 / +7.5 | −5.5 / +5.5 |
| Production value per hour | 20,000 TL/hour | user (secondary high end: 5,000–260,000) | single value | −7.5 / +7.5 | −5.5 / +5.5 |
| Downtime reduction through early warning | 5–15% | user | 5–15% | −7.5 / +7.5 | −5.5 / +5.5 |
| Manual control cases per month | 400 | sample | single value | −7.2 / +7.2 | −3.5 / +3.5 |
| Time per case | 20 min | user | single value | −7.2 / +7.2 | −3.5 / +3.5 |
| Time reduction share | 30–60% | user | 30–60% | −7.2 / +7.2 | −3.5 / +3.5 |
| Fully loaded hour cost | 600 TL | sample | single value | −7.2 / +7.2 | −3.5 / +3.5 |
| Annual operating cost of the tool | 600,000 TL | sample | single value | not measured: affects only the net ROI, not the gross range | same |

Reading: the stock arm cannot be computed until the excess stock share input is entered; for now that part of the ROI is zero. The stock figure should not be presented until the company enters that value. The largest movers are the purchase volume, leakage share and catch share on the high side (±7.8%) and the downtime inputs on the low side (±7.5%). User-entered inputs with no source (catch share, prevention share) also move the result.

## 3. What was not measured

- The decision engine's alternative lead times, calibration and warning thresholds were not moved in this run.
- For ROI inputs without a source (for example cost per event, prevention share), there is no real company range; the ranges in this table are for discussion only.
- The [seed band](../kanit/olcum-tohum-bandi.json) does not change these inputs; it only shows how sensitive the sample data is to the seed.
