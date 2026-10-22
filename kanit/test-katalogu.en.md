# Test behavior catalog

This catalog states, in short sentences, what the automated tests check. Each item corresponds to one test.

Total 345 tests: Kule core 229, Agent orchestration 87, Kule interface 29.

## Kule core

### Intermittent demand methods

- Intermittent demand forecasts never come out negative.
- If there is no demand at all, the forecast is zero.
- When demand is constant, both intermittent methods return the same value.
- The corrected method pulls the forecast down by a known factor.

### Filling gaps in a series

- A genuine long gap in the series is left unfilled.
- Missing values are filled only inside the series; the start and end are left alone.
- When the full window is selected, every missing point is filled.

### Demand classes

- Demand with erratic sizes is classified in its own category.
- Intermittent and lumpy demand are separated into their own classes.
- Steady demand is classified as smooth.
- An item with no demand is classified as demand-free.

### Calibration and measurement

- The calibration factor and confidence value are computed by the stated rules.
- The error rate is measured only on positive observations.
- Forecast rows are produced without looking at future values.

### End-to-end measurement

- The shape of the measurement output and its decision summary are checked together.

### Row reading

- An oversized field is rejected and the report names the line where it occurs.
- A missing field is left empty and extra fields are dropped.
- Files separated by semicolons are read correctly.
- The line number of an error counts comment lines too.
- Comment and blank lines are skipped and extra spaces in the header are trimmed.

### Method selection

- The candidate method is chosen when it is at least as good as the simple one.
- When the candidate is worse than the simple method, the simple method stays.
- For intermittent demand, the candidate is the corrected intermittent method.
- Where it applies, the corrected method and the simple method give the same flat forecast.
- The candidate stays even when there are zero observations.
- With too little history, the simple method is used as the baseline.

### Shipment data adaptation

- Excluded record statuses do not appear in the output files.
- Column matching and derived dates are computed correctly.
- Weekly totals are grouped into weeks that start on Monday.
- For a cancelled delivery, the realized quantity is left empty.
- Personal data does not appear in the output files.
- The adapted data passes the shipment data contract.
- The output columns match the contract's column set exactly.

### Demo

- The demo runs from start to finish without any setup.

### Carrying over audit records

- During migration, older audit records are kept, and a rate-limit rejection is still read as a valid record.

### Request rate limit

- When the rate limit is exceeded, the audit record notes a rate-limit rejection.
- A request over the limit receives a too-many-requests response.

### Rate limit rules

- Invalid rate limit values are rejected.
- Each client has its own rate counter.
- The rate counter does not grow without limit.
- Requests are rejected once the limit is exceeded and reopen when the time window passes.

### Command line

- Running the command produces four output files.
- When there is no input, the command stops with a clear error and a usage error code.

### Order anomalies

- A duplicate record produces one finding, and the net quantity does not turn into an excess.
- When the delay tolerance is exceeded, the delivery is marked late.
- Cancellation and correction records are treated as clean and produce no false finding.
- In the sample data, the expected anomalies are found, with none missing and none extra.
- A split delivery is treated as clean.
- A record without a planned date produces no incomplete-data finding.
- A cancellation with no matching order has no net effect.
- Clean but difficult cases are not flagged.
- A value exactly at the tolerance limit is accepted; values above it are flagged.
- The amount impact is calculated from the unit price.

### Data contract

- A malformed data envelope is not written to the output.
- A missing field in the envelope is reported clearly.
- A record with a missing key is reported.
- A model-usage flag that is not a true or false value is rejected.
- A model-usage flag set to true is valid under the contract.
- A summary missing a key is reported.
- All module outputs are labeled, and no language model is used.
- A generated envelope conforms to the contract.

### Stock status

- Stock items are classified by cumulative value thresholds.
- Critical stock deliberately added to the sample data is found.
- Dead stock deliberately added to the sample data is found.
- A negative stock quantity is rejected.
- The stock summary is consistent with the records.

### Demand forecasting

- A backtest and a baseline comparison are reported.
- A forecast is rejected for an item with too short a history.
- The demand forecast captures seasonality and trend.
- The window history and interval order are kept correctly.
- Forecast weeks are consecutive Mondays.

### Supplier score

- In the sample data, the supplier ranking gives the expected order.
- A row is rejected when the rejected quantity is greater than the delivered quantity.
- The supplier level is assigned correctly at the boundary values.
- The supplier score is calculated with the defined formula.
- A low price alone does not penalize a supplier.

### Sample data generation

- The same seed produces the same sample data.
- The sample data contains the expected seven kinds of anomaly.

### Data loading

- A missing column produces a clear error.
- A file without a label is treated as real data.
- A file labeled as sample is treated as synthetic data.
- Comment lines are skipped during loading.

### Concurrent access

- Simultaneous writes and reads lose no records.

### Request size limit

- When the size limit is exceeded, the message arrives in full on every attempt.

### Identity and audit

- Successful requests also appear in the audit record with the person and their permission.
- A user can be created, used and revoked.
- Access keys and request content are not written to the audit record or the database.
- Requests without a key, with an invalid key or with a revoked key are rejected as unauthorized and recorded.
- A request to an unknown address without a key is refused as unauthorized, and the list of addresses is not exposed.

### Documentation

- The documentation check catches missing or wrongly typed fields.
- The role table in the documentation matches the code exactly.
- The interface description in the documentation is up to date.
- Every endpoint is documented and the links in the documentation resolve.
- Case statuses and error codes are the same in the documentation and in the code.

### Packaging

- The container packaging files are complete and consistent with each other.
- The package definition and the packaged data are consistent.

### Panel files

- The embedded fallback page and the live scripts load in the right order.
- Files outside the panel and source files are not served to users.
- The panel files are served to users.
- Old-version addresses are kept separate from the panel.

### Roles and permissions

- A user's own permissions match the role table.
- Every module has a defined owner.
- Which roles can reach each endpoint matches the table.

### SAP data intake

- Data received from SAP is accepted successfully.

### SAP mapping

- SAP fields are converted correctly into Kule fields.
- When a connection code is missing, this is stated clearly.
- A value that cannot be converted is not guessed; the intake is rejected.
- The name of a missing SAP column appears in the error message.
- The mapping file is checked before it is used.
- The SAP command returns an exit code that matches its outcome.
- Data coming through SAP produces the same findings.
- Number and date values are converted in the correct format.

### Interface contract

- Addresses meant to be open can be reached without a key.
- An unknown address or method is rejected appropriately.
- The number of findings matches the number of cases, and the sample data is labeled.
- A negative content length is rejected without blocking the system.
- The weekly summary is produced correctly and an invalid date is reported.
- In data intake, an oversized field is rejected without being processed.
- Data intake checks the file name and its content.
- Data intake calculates the difference between two days correctly.
- Acceptance can be done only by a manager, and a reason is required.
- Read requests return responses in the documented format.
- The simulation runs with default and custom settings.
- Draft requests and requests with strange identifiers are rejected as bad requests and recorded.
- In the case flow, the person acting is the owner of the key.

### Explanation generation

- When a key is provided, the language model is used but the key does not appear in the output.
- Without a key, a template is used and a warning is shown.
- If the language model returns an error, the template is used instead.
- The language model is chosen by the configured model setting.
- When the model mode is explicitly requested, the real model name and token count are recorded.
- If the language model is unavailable, the template is used and the reason is stated in the warning.
- A missing environment setting produces a warning.
- On a language model error, the template is used and the key is masked.
- With default settings, the language model is not called.

### Invoice extraction

- A line without a header is rejected.
- A row matching the pattern and an amount with a decimal comma are read correctly.
- A row that does not match the pattern is rejected, and the other rows are processed.

### Production efficiency

- The efficiency formulas give the correct result for known values.
- The root cause is identified by the dominant reason.
- In the sample data, the least efficient line is the expected one.
- The Pareto list descends and its cumulative percentage reaches one hundred.
- An inconsistent production record is rejected.

### Three-way matching

- A duplicate invoice does not count the excess quantity a second time.
- When the invoiced quantity is below the delivery note, the remainder counts as not yet invoiced.
- When an invoice exceeds the delivery note, the excess is flagged.
- A price difference at the tolerance limit is accepted.
- An invoice without a delivery note is flagged only as an invoice without a delivery note.
- In the sample data, the expected three-way matching findings all appear.
- An invoice with no order is flagged.

### Additional sample data generation

- Additional sample data files are produced.
- Additional sample data generation gives the same result every time.

### Settings

- Settings from the file and the command line are merged, and an invalid value is reported on the command line.
- Invalid setting values are rejected.

### Output encoding

- When output is redirected, Turkish characters are encoded correctly.

### Decision formulas

- Status thresholds give the right class at their limits.
- Out-of-stock status and recommendations are produced correctly.
- Safety stock, reorder point and economic order quantity are calculated correctly.
- The demand and lead-time calculation is correct.
- No decision is produced for an item with no demand.
- The spare part quantity is based on the forecast.
- The annual cost is calculated correctly.

### Data acceptance

- Corrupt data is not accepted into the database.
- Different seed values produce different but valid results.
- When the database is missing, a clear error is given.

### Calibration

- Calibration does not see the data in the test window; the factor stays the same even if the last 24 weeks change.
- An item with a short history is not calibrated.
- Calibration is done first over a wide range, then over the target range.

### Calibration input

- Calibration can be done from the demand in the database without stock data.
- Input without demand data gives a clear error.

### Importance score

- The importance score is calculated with the defined formula.
- Even with a value of zero, critical stock does not sink to the bottom of the importance ranking.

### Sample data scenarios

- The sample data keeps the rules that must not change.
- The sample data shows that results respond to changes in input.
- The sample data includes items and the cases added on purpose.
- The sample scenarios are consistent with each other.
- The service level curve rises steadily.
- The simulation table is produced in the expected form.
- If a supplier is removed, demand moves to an alternative supplier.

### Management summary

- The summary files are written.
- The email is prepared only as a draft.
- The summary includes the expected sections.
- The code has no route that sends the email.

### Accepting consecutive views

- Two days of data are accepted in sequence.
- A finding that touches a rejected order line carries a data doubt.

### Breaking test

- The breaking test gives repeatable results with a fixed seed.

### Database migration

- An empty database is brought to the latest version, and repeating the migration does nothing.
- A newer schema version is rejected.
- Migrating from an older version keeps the data.
- The table columns match the input contract.

### Command line errors

- Running the command with an oversized field returns the input error code.
- An oversized input in the decision command returns the error code.
- An oversized field in the SAP sample returns the error code.
- An oversized field in the SAP adaptation returns the error code.
- An oversized field in a data intake request returns the error code.
- An oversized field in SAP data intake returns the error code.
- When a table file exceeds the field limit, the error code is returned.
- The intake, case and difference commands give the expected results.
- A missing input folder is reported with the error code.

### Case lifecycle

- A resolved case is reopened if its finding reappears.
- A case is moved forward by hand and each step stays in the audit trail.
- An invalid status change and an acceptance without a reason are rejected.
- An accepted case is not reopened even if the finding persists.
- A vanished finding is resolved automatically, but the case stays open if its module did not run.
- Cases can be listed, filtered and sorted.
- Changes in importance are tracked.
- A recurring finding merges into the same case.
- A new finding opens a case; the time target is set by its importance.

### Data loading checks

- Inconsistencies between fields are caught.
- An out-of-date file is flagged.
- A file with a missing column counts as a structure error; its module is skipped and the others run.
- Faulty rows are rejected and the rest of the file is loaded.
- The clean sample data has no rejections at all.
- Module results obtained through the database match those read directly from the files.

### Table header matching

- An ambiguous header produces a clear warning; no choice is made silently.
- The ambiguity warning is shown together with the header matching.
- If one column fits two fields, a warning is given for the second field.
- A table is matched by column names, and duplicate columns are separated.
- A missing column is reported as a structure error without being guessed.
- Turkish headers and headers with spaces are matched correctly during intake.

### Table file loading

- A table file is loaded and stays marked as synthetic data.

### Reading table files

- If the size limit is clearly exceeded, the file is not read.
- The same source does not feed two fields at once.
- Header matching handles alternative names and ambiguity.
- Standard, Turkish and spaced headers are read.
- An empty file gives an empty result.
- A corrupt table file gives a clear error.
- A table file with a missing sheet part gives an error.
- Shared text, inline text, numbers and empty cells are read correctly.
- Column addresses are resolved correctly.

## Agent orchestration

### Live model query

- In live mode, a wrong number is rejected, a correct answer is accepted, and a record is written.
- A live model error produces a clean failure report.
- Tape mode runs with a hand-written label, unchanged.
- The recording file can be replayed exactly later.

### Agent and provider together

- The tool loop completes with the live provider, and the trace carries the model information.

### Model provider

- A too-many-requests response is classified as a temporary error.
- A tool block becomes a call and is separated from the text.
- Command-line tools and external tool servers are kept off, and input goes through standard input.
- A corrupt tool block is reported as a permanent error.
- If the model command is missing, a clear error is given.
- The transcript shows the tool result and the previous call.
- From a plain text reply, the model, token count and delay are read.
- Output that is not in the expected structure counts as a permanent error.
- If no model is specified, no model option is added.
- A session error is a permanent error and the message is kept short.

### Tool output leakage

- If an embedded command from tool output leaks into the final reply, the checker rejects the reply.
- A structured copy inside the claim block does not count as a leak.
- A reply made only of numbers is accepted.

### Approval summary

- A simple approval does not unlock writing.
- If the approved summary does not match the executed input, nothing is written.
- If the approved summary matches, the write goes ahead.
- The summary does not depend on the order of its keys.

### Measuring known gaps

- If a known gap is closed, the related measurement case fails.
- The gap is observed even without an approval event.

### Evaluation command

- The evaluation command completes successfully on a sound baseline.

### Evaluation cases

- An injected text enters the loop and the tool is blocked from running.
- Closed gaps are counted as criteria.
- The scope and leak cases document what is observed.
- The recorded token count comes from the model steps.
- The summary gives criteria counts and known-gap counts separately.
- The summary line does not count a known gap as a pass.
- On sound code, all cases pass.

### Regression check

- A broken checker is caught as a regression.
- A broken approval gate is caught by the injection cases.
- In a comparison, a case that used to pass and no longer does is counted as a regression.
- With a sound baseline, the command returns a success code.

### Recording and playback

- Record mode writes the tape and carries the live label.
- Replies play in order, and an error is given when the tape runs out.

### Compatible interface

- Without a key, a clear error is given and no fake reply is produced.
- A tool result is mapped to the tool role.
- A too-many-requests response counts as temporary, and a bad-request response as permanent.
- Requests and replies are matched correctly.

### Agent loop

- When the step budget is exceeded, the status is marked as budget exceeded.
- A tool error does not stop the run; the model sees the error as the result.
- An invalid status change is rejected.
- A temporary error is retried after a wait.
- When the retry allowance runs out, the run fails.
- An unauthorized tool is rejected, not run, and logged.
- When the token budget is exceeded, the run stops.
- A permanent error is not retried.
- A tool with side effects does not run without approval, and runs with it.
- A timeout counts as a temporary error.

### End-to-end scenarios

- A simple approval does not unlock writing in the scenario either.
- In live mode without a key, the command gives a clear error.
- In tape mode, the command returns the expected exit codes.
- If a tool result in the trace is changed by hand, the replay reports the difference.
- Replaying from the trace produces the same result.
- The tape run completes and an unauthorized tool does not run.
- If approval is given, the file is written.

### Checker

- Claims with a broken format are rejected without a crash.
- A claim resting on an unknown source is rejected.
- An empty claim block is rejected.
- A broken claim block is rejected.
- Correct claims are accepted.
- A reply without a claim block is rejected.
- A claim about a field that is not a single record is rejected.
- A wrong number is rejected and the mismatch is recorded.

### Plain text checks

- A number in plain text with no supporting evidence is rejected.

### Numbers in text

- Ranges and ordinary numbers are counted as numbers.
- A thousands separator makes a whole number, and a comma is a decimal separator.
- An identifier number is not counted as a number.
- A list item number is not counted as a number.
- A decimal number matches within a rounding margin.
- A whole number is searched for exactly in the evidence.
- Dates and times are not counted as numbers.

### Kule tools

- The stock query reads from the real output.
- The supplier query's score comes from the calculation itself.

### Investigation flow

- The recorded tapes are available.
- In the end-to-end flow, the first attempt is rejected and the second passes.

### Planner gate

- An overly long item is rejected.
- Output that contains an email address is rejected.
- A planner that goes outside its task is rejected end to end, and the analyst does not run.
- The recorded investigation passes the gate, and the rules stay in place.
- Output without items is rejected.
- An output that goes outside the task is re-requested with feedback; the second output passes.
- Output containing a table or an action plan is rejected.
- Output made only of a subtask list is accepted.

## Kule interface

### Kule dashboard interface

- The page contains no wording that implies a need has been proven.
- Table files are read correctly, including byte-order marks, semicolon separators, decimal commas and quote escapes.
- When the seasonal method does worse than the simple baseline, the page says so.
- The status transition rules in the interface are identical to those on the server.
- Return on investment matches a manual calculation.
- The return-on-investment defaults are chosen with a stated confidence level for each input.
- Case deadlines are classified correctly as remaining, due today, overdue or closed.
- Actions are listed by importance, impact type and amount; inconsistent ones come last in their own level.
- The source citation and reference link appear on the page.
- The same order line is counted once in the total amount.
- Changing a weight changes the ranking; the weights are scaled to sum to one.
- A case can be accepted only by a manager; invalid status changes are not allowed.
- A critical item with a safety reason stays critical even when it falls below the threshold.
- If calibration cannot be measured on real data, the page says so; out-of-target zero filling is not accepted.
- The edges of the target range count as on target, while a value just above them does not.
- The two data sources appear as separate badges, with wording that matches the real-data page.
- The accepted-cases column appears only when requested or when it has entries.
- Rejections, quality score, intake time and shipment findings appear in writing on the page.
- The risk count matches the calculation's own summary.
- The numbers on the page match the evidence files exactly; this check is skipped when no evidence is present.
- When no comparison summary exists, the comparison row is omitted and the page still renders.
- When a supplier is removed, its volume is spread across the remaining suppliers and its findings close.
- The score and level computed with default weights match the main calculation.
- The default stock thresholds produce the expected status classes.
- Sections without data are shown faded, with the reason listed.
- When there is no data, the page shows an empty state without failing.
- Write permission is determined from the list the server provides.
- No content on the page can run as script.
- In the sample data, the excess stock share is read from the stock result.
