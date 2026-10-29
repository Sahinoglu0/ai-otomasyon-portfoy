# Test behavior catalog

This catalog states, in short sentences, what the automated tests check. Each item corresponds to one test.

Total 580 tests: Kule core 411, Agent orchestration 111, Kule interface 58.

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

- A file labeled as open data is not treated as real customer data.
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

- The upload response gives at most five top findings, in order.
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

### Favorita open data adapter

- Negative values are floored to zero in weekly totals, and an incomplete week is left out.

### M5 open data adapter

- The adapted M5 data is labeled as open data.
- M5 daily sales are summed into weeks and an incomplete week is dropped.
- As many series are sampled as requested.
- An adapted long series passes through the demand forecast module without errors.

### Production open data adapter

- Production data is split into blocks and availability is computed from failures.
- Adapted production data passes through the OEE module without errors.
- Performance never exceeds one hundred percent when the ideal cycle time is used.
- Shift and defective item counts come out right on the semiconductor data.

### Purchasing process data adapter

- Records left out of the data are counted by reason.
- The invoice amount is taken from the invoice clearing event.
- An invoice is written only for clean line items.
- Cumulative invoices added one after another to the same item are counted as duplicates.
- Goods receipts and delivery notes are produced only from clean line items.
- Proxy fields and plan fields are filled in the order record.
- The supplier delivery field is written empty on this data.
- The three-way matching criterion is set from the item category.
- The adapted data works with the three-way matching module.
- Duplicate invoice and invoice-without-order finding candidates are caught.
- Only clean three-way items remain in the data.
- Timestamps are cleaned and records in an inconsistent order are filtered out.

### Duplicate invoice rules on purchasing data

- Cumulative sequences that rise by more than one euro are counted as duplicate invoices.
- No finding is raised for legitimate partial invoicing.

### Large data generation

- Anomalies are kept in every copy that is generated.
- The generated large data is labeled as synthetic.
- Streaming invoice output matches the output of the old method.
- Invoice identifiers match the order identifiers.
- An invalid multiplication factor is rejected.
- The decision label and item count stay correct after multiplication.
- Identifiers are unique across copies.
- The command line accepts both a row target and a multiplier.
- Data is generated aiming for the requested row count.
- The row count grows by the multiplier.
- A plain error message is given when the row limit is exceeded.

### Trial endpoint

- The trial endpoint loads the package and compares it with the expected findings.

### Trial package

- Every expected finding is caught exactly.
- The trial document lists every expected finding.
- The file formats in the package differ from each other and are all recognized.
- The trial files in the repository are byte for byte identical to the generator output.
- A negative 102 return is also accepted with a positive quantity.
- Every file in the package carries a sample-data label.
- No row is rejected and the data is counted as sample data.
- The dashboard text is consistent with the package contents.
- Decimal and scientific notation numbers are read correctly from an Excel file.
- The decimal mark in an Excel number cell is converted correctly.

### Rules for the 102 movement

- A matching 102 entry cancels the movement.
- A non-matching 102 entry reduces the net quantity.

### Since-yesterday upload flow

- Loading the second day of trial data shows the difference from the previous day.
- Decision findings appear in the top findings and in the day-to-day difference.

### Since-yesterday comparison

- Reloading on the same day shows every finding as continuing.
- The second-day files match the generator and are labeled.
- The second-day difference matches the known numbers.
- The first report has no previous day to compare with.
- The shared report also carries the day-to-day difference.
- A case with an assigned owner drops off the waiting list.

### Day-to-day difference in decision findings

- On the second day, decision findings are split into new, disappeared and changed.
- In the first report, all decision findings count as new.
- Decision findings are recorded but do not open cases.
- No decision finding is recorded when the decision input is missing.
- The trial package does not count a decision finding twice.
- The shared report writes the change status on decision rows.

### Balance difference

- A balance difference above the tolerance raises a finding.
- A difference of a few cents stays within tolerance and is not a finding.
- Payments and advances reduce the balance.

### Duplicate open item

- A finding is raised when an item with the same reference, amount and vendor is open twice.
- Items with different amounts are not counted as duplicates.

### FBL1N sample data chain

- The sample data chain produces the expected findings.
- The sample data is accepted by the input contract.
- The summary and finding type counts are correct.
- The sample data follows the contract and is labeled synthetic.
- A clean vendor produces no finding.
- Case findings carry a stable fingerprint.

### FBL1N reconciliation in the display layer

- The module runs in the display layer and is skipped when input is missing.

### FBL1N rule boundaries

- Items of different vendors with the same reference are not mixed up.
- Findings are sorted by importance first, then by amount.

### Open item that looks paid

- A finding is raised when an item shown as paid on the statement is still open in SAP.
- A different payment amount is not a separate finding.

### FBL1N file mapping

- An FBL1N file is converted and written in the Kule statement format.

### Amount mismatch

- No finding is raised when amount and currency match.
- When currencies differ, the lira impact is shown as zero.
- The impact of an amount mismatch equals the difference.

### Overdue invoice

- A payment item past its due date is still not a finding.
- An invoice due today is not counted as overdue.
- An open invoice past its due date is found.

### Input limits

- Infinite, not-a-number and over-long numeric values are rejected with a 400 error.
- Length and type limits are checked on text fields.
- An oversized integer in a measurement record gives a 422 error and is not written.
- A deeply nested body gives a 400 error on every write endpoint.
- An overflowing number in the simulation is rejected with a 422 error.
- Nesting close to the limit is still accepted.

### Measurement database migration

- Old upload records are not corrupted by the database migration.

### Measurement endpoints

- A finding accuracy mark is written as an event and does not change the case status.
- Permission and input rules apply to the finding accuracy mark.
- Missing inputs of a skipped module are listed on upload.
- Upload time is measured and kept both in the response and in the database.
- Invalid measurement input gives a 422 error and is not written.
- The measurement list puts the newest first and is persistent.
- The measurement summary reflects the recorded measurements.
- A measurement is written in the name of the access token owner.
- Writing measurements is open to all roles.

### Measurement record

- Invalid measurement input is not written to the record.
- A measurement record carries its period and source.

### Measurement summary

- No median or ratio is produced on an empty database.
- Measurement sources are summarized separately.

### Quarter range and SAP hints

- The quarter range is computed correctly for a single record and for many records.
- SAP hints and follow-up corrections come with the right text.

### Share endpoints

- The share endpoint returns the report both as a web page and as CSV.
- The summary response carries the report date.

### Shared report

- The CSV output opens in Excel without trouble.
- Quotes are escaped in the CSV and formula injection is blocked.
- The file name carries a label for sample data.
- The report page shows the badge, date, source and files in the expected sections at the top.
- Analyses that did not run are always listed on the report page.
- The report page is a single file with no script and no external resource.
- The report page is styled for printing and for narrow screens.
- The shared report contains no person name and no access token.
- SAP transaction names in the shared report match the dashboard.

### Report date endpoints

- An invalid or future report date is rejected with a 400 error.
- The upload response states the report date and where it came from.

### Report date selection

- On real data, lateness is computed against the report date.
- On real data, today's date is used when no date is requested.
- Mixed input is treated as real data.
- On sample data, the fixed date takes precedence over a requested date and is labeled.
- When the input has no date, the requested date or today is used.

### Final fixes

- The open-data label is kept in the SAP adaptation.
- A clear warning is given for a fixed-width list without a frame.
- An unlabeled file stays real data.
- The FBL1N method text states the right number of rules.

### Missing input in the morning report

- The database path also works with SAP files without errors.
- The missing-input summary lists the gaps and writes them as text.
- The upload response adds a SAP hint to each module.
- No decision item or decision finding is produced when only SAP files are loaded.
- With SAP files the decision analysis is skipped and the other analyses run.
- Without shipment data, the importance and text of a critical stock finding are given correctly.
- Without shipment data, the stock analysis checks safety stock only.
- With complete input the decision analysis runs, and only analyses that are truly missing are listed.

### SAP file formats

- A purchase order list with Turkish labels, a byte order mark and decimal commas is read.
- A purchase order list with English labels, comma separators and month-day dates is read.
- A material movement list with a header line and an old encoding, including minus signs, is read.
- A leading minus sign and return movements are read correctly.
- A stock list with technical names, a different column order and extra columns is read.
- Total rows and empty rows are counted and skipped.
- A year-month-day date, an empty date and a six-digit item number are read.
- A technical-name file is also read with Windows line endings.
- Numbers with a decimal point are not guessed; a warning is given.
- Missing columns are named in a plain error message.
- A warning is given when the row limit threshold is passed.
- The label list in the mapping is validated.
- The number of sample files and their label are correct.

### SAP encodings and separators

- When no header is recognized, the encoding and separator are reported and no column is blamed.
- A plain error is given for a broken 16-bit encoding.
- A file in the old Turkish encoding with tab separators and Turkish labels is read.
- A fixed-width list with a line frame is read.
- A big-endian 16-bit file with a byte order mark and tab separators is read.
- When a column is truly missing, the error shows the missing columns and the file headers.
- A little-endian 16-bit file with a byte order mark and semicolon separators is read.
- A little-endian 16-bit file with a byte order mark and tab separators is read.
- A little-endian 16-bit file without a byte order mark and with tab separators is read.
- A tab-separated file in the standard encoding is read.
- A plain message is given for a web page or Excel file with an .xls extension.

### Multi-sheet Excel files

- When no sheet has the expected column, the first sheet is used and a warning is given.
- In a multi-sheet file the right sheet is chosen and a warning is given.
- A warning is given when the Excel row limit is reached.
- No warning is given below the row limit.
- A sheet can be chosen by name.
- No warning is given for a single-sheet file.

### Statement and shipment mapping

- On a statement with debit and credit columns, type, amount, return, carry-over and default currency come out right.
- With no outgoing movement, no shipment file is written and the existing file is not overwritten.
- Without a warehouse column, shipments are skipped and goods receipts are written.
- English headers and the currency column are recognized.
- Both goods receipts and shipments are derived from a single material movement file.
- An error is given when the required goods receipt column is missing and there is no other target.

### Statement contract

- Two partial payments on one invoice are not counted as duplicates; returns and carry-overs are accepted.
- The database migration keeps old statement rows.

### Partial payment, return and carry-over

- An invoice counts as paid when split payments add up to its amount.
- A carried-over credit reduces the balance.
- Returns and carry-overs enter the balance and do not count as payments.
- A partial payment raises a finding if SAP has no record of it, and none if it does.

### Morning report with the full SAP set

- Reconciliation is skipped without a statement, and the reason is given.
- With the full SAP set, FBL1N reconciliation and the coverage analysis run.

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

### Merging the correction block

- A malformed correction block is rejected.
- A rejected claim is removed together with its line, and accepted claims stay.

### Identifier-based check

- A record identifier is built from the warehouse, material or supplier field, and a general one is used when none exist.
- In identifier mode, a number next to an identifier without a claim is rejected.
- Numbers with swapped places are rejected, and the ones in the right places are accepted.

### Partial re-request

- The second request asks again only for what was rejected and does not hand over Kule's value as a hint.

### Rephrasing option

- The option is passed on to the rephrasing flag of the check.
- The rephrasing option is off by default and the second-round arm does not change.

### Analyst options

- The values of the second-round arm and the default analyst options are fixed.

### Schema output

- The tool request and the final answer are read from the schema field.
- Parameters that do not match the schema are rejected.
- When there is no schema output, the result is left as it is.
- The schema applies only to the analyst and is off by default.

### Default behavior is preserved

- The system message, tool output and report format do not change by default.
- The reject list comes back empty in the default check.

### Resuming a measurement run

- A measurement run that was cut off continues where it stopped.

### Confidence interval calculations

- The lower confidence bound of a ninety percent success rate is computed correctly.
- The sample size needed for a ninety percent rate is found correctly.
- The upper bound of the error rate is computed correctly when no error was seen.
- With no data, the confidence interval covers the whole range.
- The confidence interval is computed correctly when sixteen of twenty queries are accepted.

### Call counter

- The duration of a successful call is measured and written to the log.
- An input mismatch stops the run.
- A call that hits the quota is not entered in the measurement record.

## Kule interface

### Kule dashboard interface

- The page contains no wording that implies a need has been proven.
- A web page or Excel file with an .xls extension is flagged as not CSV, and a text file gets no warning.
- Table files are read correctly, including byte-order marks, semicolon separators, decimal commas and quote escapes.
- The Excel row limit warning appears only on text that reaches the limit.
- When the seasonal method does worse than the simple baseline, the page says so.
- The status transition rules in the interface are identical to those on the server.
- Return on investment matches a manual calculation.
- The return-on-investment defaults are chosen with a stated confidence level for each input.
- A list whose source is already loaded is marked as loaded, the server warning is the reason, and unloaded ones go to the end.
- The empty-state steps tell where to get each SAP list and what it unlocks.
- The since-yesterday badge shows new items, changed amounts and days open, and carries the first five fingerprints.
- Text that is not in a SAP format is not recognized.
- A SAP file is recognized with Turkish, English or technical headers, a description line and a byte order mark.
- Case deadlines are classified correctly as remaining, due today, overdue or closed.
- Files in different 16-bit encodings, with no mark, in the standard and in the old encoding are decoded, and a tab-separated material movement is recognized.
- Actions are listed by importance, impact type and amount; inconsistent ones come last in their own level.
- The source citation and reference link appear on the page.
- The same order line is counted once in the total amount.
- Changing a weight changes the ranking; the weights are scaled to sum to one.
- Header normalization gives exactly the same result as the server side.
- For finding accuracy, the last mark in the event order wins, and nothing is returned when there is no mark.
- A statement, an outbound material movement and an FBL1N list are recognized as the right type.
- A case can be accepted only by a manager; invalid status changes are not allowed.
- Missing lists are grouped per file: addable ones first, then the analysis they unlock and other gaps.
- A file with missing columns is recognized and its missing fields are listed.
- The saved time is used as a single value in the labor saving calculation, and other arms do not change.
- In the labor saving, the lower bound differs from the upper bound, and an old single-number record is still read.
- A critical item with a safety reason stays critical even when it falls below the threshold.
- If calibration cannot be measured on real data, the page says so; out-of-target zero filling is not accepted.
- The input to SAP file table matches the mapping file exactly.
- The edges of the target range count as on target, while a value just above them does not.
- The two data sources appear as separate badges, with wording that matches the real-data page.
- The first five findings come in order with an owner and a hint, and a module with no SAP hint has an empty hint.
- The quarter range is used in the saved time calculation, and a single record counts as a single estimate.
- New measurement records update the value in the calculation, it falls back to the assumption when no records remain, and a manually entered value is left alone.
- The accepted-cases column appears only when requested or when it has entries.
- The dashboard shows at most twenty rejected rows.
- Rejections, quality score, intake time and shipment findings appear in writing on the page.
- The risk count matches the calculation's own summary.
- The error message is plain and comes with hints about columns, formats, sessions, network and limits.
- The numbers on the page match the evidence files exactly; this check is skipped when no evidence is present.
- When no comparison summary exists, the comparison row is omitted and the page still renders.
- The responsible role and SAP hint are consistent with the module owner list on the server.
- A time input is a number from zero to 1440 and accepts a decimal comma, and anything else is treated as empty.
- The time indicator is always labeled as an assumption, and no text is shown for invalid input.
- The recognition table uses the same source and the same set of fields as the mapping file.
- Every Turkish and English label in the recognition table is defined in the mapping.
- When a supplier is removed, its volume is spread across the remaining suppliers and its findings close.
- The score and level computed with default weights match the main calculation.
- The default stock thresholds produce the expected status classes.
- Sections without data are shown faded, with the reason listed.
- When there is no data, the page shows an empty state without failing.
- Write permission is determined from the list the server provides.
- A fixed-width list with a line frame is recognized as a material movement.
- No content on the page can run as script.
- With no records in the measurement links, the value is empty and cannot be used, and zero is never written.
- In the measurement links only monthly cases and saved time can be used, and few records or an unfinished month trigger a warning.
- In the sample data, the excess stock share is read from the stock result.
