---
title: "Strings in Node-RED: Convert String to Number, Split, Concatenate, Trim, and More"
description: "Learn essential string operations in Node-RED including converting between strings and numbers, splitting and concatenating text, parsing JSON, extracting substrings, trimming whitespace, and more. Step-by-step guide with practical examples."
---

# {{ meta.title }}

Strings are one of the most common data types in Node-RED. Whether you're converting sensor values, parsing API responses, or building dynamic messages, understanding string operations is essential for building reliable flows.

## Converting String to Number

One of the most frequent operations is converting string values to numbers for mathematical calculations or comparisons.

1. Connect your data source to a **Change** node
2. In the **Change** node, set the rule to **"Set"** `msg.payload`
3. Select **"to the value of"** and choose **JSONata expression**
4. Enter: `$number(payload)`
5. Connect to where you need the processed data

If your payload contains the string `"42"`, it becomes the number `42`. You can now use this in calculations or comparisons.



::render-flow
---
height: 200
flow: "W3siaWQiOiIyYWM2OGVkMWQ5YTdiMzgwIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiI0MiIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6NTMwLCJ5IjoyMDAsIndpcmVzIjpbWyJhMTRhNjdhYzY1NzRhZTgyIl1dfSx7ImlkIjoiYTE0YTY3YWM2NTc0YWU4MiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlN0cmluZyB0byBOdW1iZXIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRudW1iZXIocGF5bG9hZCkiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjcxMCwieSI6MjAwLCJ3aXJlcyI6W1siMjI1ZjRjNmE0N2RmMmQzYyJdXX0seyJpZCI6IjIyNWY0YzZhNDdkZjJkM2MiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5NTAsInkiOjIwMCwid2lyZXMiOltdfV0="
---
::



## Converting Number to String

Converting numbers to strings is useful for displaying values, building messages, or formatting output.

1. Connect your data source to a **Change** node
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$string(payload)`
5. Connect to where you need the processed data

A number like `42` becomes the string `"42"`, ready for text operations.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzOGI5MTEwMTkwZGRiYTUzIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiI0MiIsInBheWxvYWRUeXBlIjoibnVtIiwieCI6NTMwLCJ5IjoyNjAsIndpcmVzIjpbWyIwNmE0YjY1OTFhNzkxZjhkIl1dfSx7ImlkIjoiMDZhNGI2NTkxYTc5MWY4ZCIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6Ik51bWJlciB0byBTdHJpbmciLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiRzdHJpbmcocGF5bG9hZCkiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjcxMCwieSI6MjYwLCJ3aXJlcyI6W1siYzU2MDQyNjYyN2E1NjEzNyJdXX0seyJpZCI6ImM1NjA0MjY2MjdhNTYxMzciLCJ0eXBlIjoiZGVidWciLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5NTAsInkiOjI2MCwid2lyZXMiOltdfV0="
---
::



## Splitting Strings

Splitting strings is essential when parsing CSV data, breaking apart delimited values, or extracting specific parts of text.

1. Connect your string data source to a **Split** node
2. Double-click the Split node to open its configuration
3. In the **"Split using"** field, enter your delimiter character:
   - `,` for comma-separated values (CSV)
   - ` ` (space) for splitting words
   - `\n` for splitting by lines
   - `\t` for tab-separated values (TSV)
   - `;` for semicolon-separated data
   - `|` for pipe-delimited data
4. Click **Done**
5. Connect to where you need the processed data

The Split node creates separate messages for each segment. For example, if you receive a log entry `"2024-12-15 14:30:45 ERROR Database connection failed"` and you split using spaces, it produces separate messages: first `"2024-12-15"`, then `"14:30:45"`, then `"ERROR"`, then `"Database"`, and so on. Each piece flows through your subsequent nodes one at a time, allowing you to extract the timestamp, severity level, and message separately.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2YTVjMTNkMmU1YmYxNTJmIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIyMDI0LTEyLTE1IDE0OjMwOjQ1IEVSUk9SIERhdGFiYXNlIGNvbm5lY3Rpb24gZmFpbGVkIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4Ijo1MzAsInkiOjMyMCwid2lyZXMiOltbIjRkM2U0YzcxNWU5NDU3MmIiXV19LHsiaWQiOiI5ZTkwYjY2M2MwODA2N2ZjIiwidHlwZSI6ImRlYnVnIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTUwLCJ5IjozMjAsIndpcmVzIjpbXX0seyJpZCI6IjRkM2U0YzcxNWU5NDU3MmIiLCJ0eXBlIjoic3BsaXQiLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlNwbGl0IFN0cmluZyIsInNwbHQiOiIgIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwieCI6NjkwLCJ5IjozMjAsIndpcmVzIjpbWyI5ZTkwYjY2M2MwODA2N2ZjIl1dfV0="
---
::



## Concatenating Strings

Combining strings is common when building messages, URLs, or formatted output.

1. Add a **Template** node after the nodes containing your data
2. Double-click to open the Template configuration
3. Write your text and insert variables using `{{variableName}}` syntax
4. Click **Done**
5. Connect to where you need the processed data

Each `{{variableName}}` is replaced with actual data. For example, the template `Hello {{payload.name}}, your order #{{payload.orderId}} has shipped to {{payload.city}}.` with data containing name "Sarah", orderId "12345", and city "Portland" produces: `Hello Sarah, your order #12345 has shipped to Portland.`



::render-flow
---
height: 200
flow: "W3siaWQiOiI2MGNiMGExZDc5YjA5NWEzIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7XCJuYW1lXCI6XCJTYXJhaFwiLFwib3JkZXJJZFwiOlwiMTIzNDVcIixcImNpdHlcIjpcIlBvcnRsYW5kXCJ9IiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6NTMwLCJ5IjozODAsIndpcmVzIjpbWyI4OGQxMTNkYjc5ZDIwNDE3Il1dfSx7ImlkIjoiOWVkMGJkNjRkYWEwY2YzNSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjk1MCwieSI6MzgwLCJ3aXJlcyI6W119LHsiaWQiOiI4OGQxMTNkYjc5ZDIwNDE3IiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJDb25jYXRlbmF0aW5nIFN0cmluZ3MiLCJmaWVsZCI6InBheWxvYWQiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkhlbGxvIHt7cGF5bG9hZC5uYW1lfX0sIHlvdXIgb3JkZXIgI3t7cGF5bG9hZC5vcmRlcklkfX0gaGFzIHNoaXBwZWQgdG8ge3twYXlsb2FkLmNpdHl9fS4iLCJvdXRwdXQiOiJzdHIiLCJ4Ijo3MjAsInkiOjM4MCwid2lyZXMiOltbIjllZDBiZDY0ZGFhMGNmMzUiXV19XQ=="
---
::



## Parsing JSON Strings

API responses and stored data often arrive as JSON strings—text that looks like JSON but isn't yet usable as an object.

1. Place a **JSON** node after your data source (like an HTTP request or file read)
2. Double-click to open its configuration
3. Set the **Action** to **"Convert between JSON String & Object"**
4. Click **Done**
5. Connect to where you need the processed data

The JSON node detects your data type automatically. String `'{"temperature":22,"humidity":65}'` becomes an object `{temperature: 22, humidity: 65}` so you can access `msg.payload.temperature`. 



::render-flow
---
height: 200
flow: "W3siaWQiOiI5ODdkNmI1Y2U5NmY4NjNlIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7XCJ0ZW1wZXJhdHVyZVwiOjIyLFwiaHVtaWRpdHlcIjo2NX0iLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjUzMCwieSI6NDQwLCJ3aXJlcyI6W1siYjkyZWIxN2M4ZGFjNDlkOCJdXX0seyJpZCI6ImI5MmViMTdjOGRhYzQ5ZDgiLCJ0eXBlIjoianNvbiIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiUGFyc2luZyBKU09OIFN0cmluZ3MiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJhY3Rpb24iOiIiLCJwcmV0dHkiOmZhbHNlLCJ4Ijo3MjAsInkiOjQ0MCwid2lyZXMiOltbImEzNDAzMGUyZDlhMDg1ZmUiXV19LHsiaWQiOiJhMzQwMzBlMmQ5YTA4NWZlIiwidHlwZSI6ImRlYnVnIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTUwLCJ5Ijo0NDAsIndpcmVzIjpbXX1d"
---
::



## Extracting Substrings

Getting specific parts of a string is useful for parsing fixed-format data, extracting codes, or isolating values.

1. Add a **Change** node after your string source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$substring(payload, start, length)` where:
   - `start` is the position (0 is first character)
   - `length` is how many characters to take
5. Connect to where you need the processed data

**Examples:**
- `$substring(payload, 0, 5)` on `"Hello World"` gives `"Hello"`
- `$substring(payload, 6, 5)` on `"Hello World"` gives `"World"`
- `$substring(payload, 6)` (no length) on `"Hello World"` gives `"World"` (all remaining characters)



::render-flow
---
height: 200
flow: "W3siaWQiOiIxNTA1YmJjZGRhMWVmNzBmIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJIZWxsbyBXb3JsZCIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6NTEwLCJ5Ijo1MDAsIndpcmVzIjpbWyI3ZTEzYjkwYzliOGU0OGRlIl1dfSx7ImlkIjoiN2I5ODUxNjFmNDhhYWY3NCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjk1MCwieSI6NTAwLCJ3aXJlcyI6W119LHsiaWQiOiI3ZTEzYjkwYzliOGU0OGRlIiwidHlwZSI6ImNoYW5nZSIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiRXh0cmFjdGluZyBTdWJzdHJpbmdzIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiIkc3Vic3RyaW5nKHBheWxvYWQsIDAsIDUpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3MjAsInkiOjUwMCwid2lyZXMiOltbIjdiOTg1MTYxZjQ4YWFmNzQiXV19XQ=="
---
::



## Trimming Whitespace

Removing unwanted spaces, tabs, or line breaks from strings prevents comparison errors and formatting issues.

1. Place a **Change** node before your comparison or processing logic
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$trim(payload)`
5. Connect to where you need the processed data

Whitespace from both ends is removed. `"  Hello World  "` becomes `"Hello World"`. The space between words stays—only edge spaces are removed.



::render-flow
---
height: 200
flow: "W3siaWQiOiJmNDNmZmY0YjdhMzIxODVkIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIgIEhlbGxvIFdvcmxkICAiLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjUxMCwieSI6NTYwLCJ3aXJlcyI6W1siOWVkMmY2NmE1OTFjZWZhYiJdXX0seyJpZCI6IjYwM2Q3MDI0ZjA2OTc5YmMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlJlc3VsdCIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5NTAsInkiOjU2MCwid2lyZXMiOltdfSx7ImlkIjoiOWVkMmY2NmE1OTFjZWZhYiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYzE2ZTFmYjg5MzJlN2U3MyIsImciOiIwOWEzM2U2NTFlZmE0N2E4IiwibmFtZSI6IlRyaW1taW5nIFdoaXRlc3BhY2UiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IiR0cmltKHBheWxvYWQpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3MjAsInkiOjU2MCwid2lyZXMiOltbIjYwM2Q3MDI0ZjA2OTc5YmMiXV19XQ=="
---
::



## Changing Case

Converting string case helps with standardization and comparison since computers treat uppercase and lowercase as different.

1. Add a **Change** node before your comparison or output
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. If you want to convert to uppercase, enter: `$uppercase(payload)`. If you want to convert to lowercase, enter: `$lowercase(payload)`
5. Connect to where you need the processed data

Using `$uppercase(payload)`, the string `"hello world"` becomes `"HELLO WORLD"`. Using `$lowercase(payload)`, the string `"Hello World"` becomes `"hello world"`.



::render-flow
---
height: 200
flow: "W3siaWQiOiI5YjM5ZmI5ZDBhNzVlNWMyIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJIZWxsbyBXb3JsZCIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6NTEwLCJ5Ijo2MjAsIndpcmVzIjpbWyIwNDM4OWJlZTRiNTIwZWIzIl1dfSx7ImlkIjoiMzM5MGVhYzY4MjY4MjFhNyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjk1MCwieSI6NjIwLCJ3aXJlcyI6W119LHsiaWQiOiIwNDM4OWJlZTRiNTIwZWIzIiwidHlwZSI6ImNoYW5nZSIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiQ2hhbmdpbmcgQ2FzZSA6IExvd2VyY2FzZSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJGxvd2VyY2FzZShwYXlsb2FkKSIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NzQwLCJ5Ijo2MjAsIndpcmVzIjpbWyIzMzkwZWFjNjgyNjgyMWE3Il1dfV0="
---
::





::render-flow
---
height: 200
flow: "W3siaWQiOiIyYmVlNTBlZDgyNzNhN2Q3IiwidHlwZSI6ImRlYnVnIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTUwLCJ5Ijo2ODAsIndpcmVzIjpbXX0seyJpZCI6ImIyZDE2YTQ1NmIwODMzMjUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJDaGFuZ2luZyBDYXNlIDogVXBwZXJjYXNlIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiIkdXBwZXJjYXNlKHBheWxvYWQpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3NDAsInkiOjY4MCwid2lyZXMiOltbIjJiZWU1MGVkODI3M2E3ZDciXV19LHsiaWQiOiIyZjIwZjA5YjgxNDZiMzk3IiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJIZWxsbyBXb3JsZCIsInBheWxvYWRUeXBlIjoic3RyIiwieCI6NTEwLCJ5Ijo2ODAsIndpcmVzIjpbWyJiMmQxNmE0NTZiMDgzMzI1Il1dfV0="
---
::



## Replacing Text

Finding and replacing text within strings lets you correct values, standardize formats, or update content.

1. Add a **Change** node after your text source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$replace(payload, "old", "new")` where "old" is text to find and "new" is the replacement
5. Connect to where you need the processed data

All occurrences are replaced. `"I love apples and apples are great"` with `$replace(payload, "apples", "oranges")` gives `"I love oranges and oranges are great"`.



::render-flow
---
height: 200
flow: "W3siaWQiOiJkZmJiOWQxY2U0MWM4NjcyIiwidHlwZSI6ImRlYnVnIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJSZXN1bHQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTUwLCJ5Ijo3NDAsIndpcmVzIjpbXX0seyJpZCI6IjMzZDgxZDZhMGQyZDBmMGMiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImMxNmUxZmI4OTMyZTdlNzMiLCJnIjoiMDlhMzNlNjUxZWZhNDdhOCIsIm5hbWUiOiJSZXBsYWNpbmcgVGV4dCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoiJHJlcGxhY2UocGF5bG9hZCwgXCJhcHBsZXNcIiwgXCJvcmFuZ2VzXCIpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3MDAsInkiOjc0MCwid2lyZXMiOltbImRmYmI5ZDFjZTQxYzg2NzIiXV19LHsiaWQiOiJhOGUxYTkzMmQ2MTlmYTMzIiwidHlwZSI6ImluamVjdCIsInoiOiJjMTZlMWZiODkzMmU3ZTczIiwiZyI6IjA5YTMzZTY1MWVmYTQ3YTgiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJJIGxvdmUgYXBwbGVzIGFuZCBhcHBsZXMgYXJlIGdyZWF0IiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4Ijo1MzAsInkiOjc0MCwid2lyZXMiOltbIjMzZDgxZDZhMGQyZDBmMGMiXV19XQ=="
---
::



## Checking String Length

Determining string length helps with validation or conditional processing.

1. Add a **Change** node that will store the length
2. Set the rule to **"Set"** `msg.length` (or another property)
3. Select **JSONata expression**
4. Enter: `$length(payload)`
5. Connect to where you need the processed data

The string `"Hello"` returns `5`. Use this value in conditions or validation logic.



::render-flow
---
height: 200
flow: "W3siaWQiOiIzNzkxYTNmYWM3YmU0ODMzIiwidHlwZSI6ImRlYnVnIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoibGVuZ3RoIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTExMCwieSI6MTI2MCwid2lyZXMiOltdfSx7ImlkIjoiZmNhMjIxM2M5MzJiMWZlYSIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsIm5hbWUiOiJDaGVja2luZyBTdHJpbmcgTGVuZ3RoIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoibGVuZ3RoIiwicHQiOiJtc2ciLCJ0byI6IiRsZW5ndGgocGF5bG9hZCkiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjkxMCwieSI6MTI2MCwid2lyZXMiOltbIjM3OTFhM2ZhYzdiZTQ4MzMiXV19LHsiaWQiOiI3MDZkODY0MzQ1YTBjNjJjIiwidHlwZSI6ImluamVjdCIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiSGVsbG8iLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjcxMCwieSI6MTI2MCwid2lyZXMiOltbImZjYTIyMTNjOTMyYjFmZWEiXV19XQ=="
---
::



## Checking if String Contains Text

Testing whether a string contains specific text helps with filtering and conditional logic.

1. Add a **Change** node to create a test result
2. Set the rule to **"Set"** `msg.contains` (or another property)
3. Select **JSONata expression**
4. Enter: `$contains(payload, "search term")`
5. Connect to where you need the processed data

Returns `true` if found, `false` if not. `"The quick brown fox"` with `$contains(payload, "quick")` returns `true`. Use in Switch nodes to route messages differently based on content.



::render-flow
---
height: 200
flow: "W3siaWQiOiJlYjVmZThmZTZlMDBlNjAzIiwidHlwZSI6ImRlYnVnIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjcxMCwieSI6MTc0MCwid2lyZXMiOltdfSx7ImlkIjoiZGFiYTM1NWYzY2E5NjkzZiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsIm5hbWUiOiJDaGVja2luZyBpZiBTdHJpbmcgQ29udGFpbnMgVGV4dCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNvbnRhaW5zIiwicHQiOiJtc2ciLCJ0byI6IiRjb250YWlucyhwYXlsb2FkLCBcInF1aWNrXCIpIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1MTAsInkiOjE3NDAsIndpcmVzIjpbWyJlYjVmZThmZTZlMDBlNjAzIl1dfSx7ImlkIjoiY2EyYWIwODVmOGVkZWM4YyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IlRoZSBxdWljayBicm93biBmb3giLCJwYXlsb2FkVHlwZSI6InN0ciIsIngiOjI3MCwieSI6MTc0MCwid2lyZXMiOltbImRhYmEzNTVmM2NhOTY5M2YiXV19XQ=="
---
::



## Complex String Operations

For complex string operations that combine multiple steps or require custom logic, you can use a Function node with JavaScript.

If you're not familiar with JavaScript, but you're using FlowFuse, you can use the [FlowFuse Expert's](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) function node generator. Simply describe what you want to accomplish, and the assistant will generate the function node code for you.
