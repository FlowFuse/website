---
title: "Node-RED - CSV Node"
---
# CSV

Converts between CSV formatted text and JavaScript objects.

## Where and why do we use the CSV node?

The CSV node processes comma-separated values (CSV) data. It converts CSV strings into JavaScript objects for processing, or transforms objects back into CSV format for export. This is essential when working with spreadsheet data, database exports, or any tabular information that needs to be read, modified, or generated.

## Modes of operation

The CSV node operates in two directions depending on the input it receives:

### CSV to Object

When the input is a CSV string, the node parses it into JavaScript objects. Each row becomes an object with properties named after the column headers. This mode lets you process spreadsheet data programmatically, apply calculations, filter rows, or transform the data structure.

The node can handle CSV strings with or without headers. When headers are present, they become the property names in the output objects. Without headers, you can specify column names manually.

### Object to CSV

When the input is a JavaScript object or array of objects, the node converts it into CSV format. This mode is useful for generating reports, exporting processed data, or creating files for import into spreadsheet applications.

You can control whether to include headers in the output and specify which columns to export.

## How the node handles messages

The CSV node processes the `msg.payload` property. For CSV input, it outputs one message per row (or a single message with an array of all rows, depending on configuration). For object input, it generates a CSV string in the output `msg.payload`.

The node supports various CSV formats and can handle quoted fields, different delimiters, and special characters. It preserves data types when configured to do so, converting strings to numbers or booleans as appropriate.

When parsing CSV with headers, the node stores the column names in `msg.columns`. This property can be modified to control which columns appear in the output when converting back to CSV.

## Examples

### Processing energy consumption data

Suppose you have a CSV file that details the energy consumption of various manufacturing stations in a factory. The file includes the station name, the month, and the total electricity consumed. You want to add a new column that displays the number of parts produced per station, based on the assumption that each part consumes a specific amount of electricity.

CSV Input:
```
Station,Month,Consumption
Rio,January,4000
New York,January,1000
Tokio,January,3000
```

This flow reads the CSV data, converts it to objects, adds a calculated PartsProduced column, and converts it back to CSV format.



::render-flow
---
height: 200
flow: "W3siaWQiOiIxIiwidHlwZSI6ImluamVjdCIsInoiOiIzYTc0YWQ4OGVjYzQ1YmNiIiwibmFtZSI6IlN0YXJ0IiwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjkwLCJ5Ijo2MCwid2lyZXMiOltbIjIiXV19LHsiaWQiOiIyIiwidHlwZSI6InRlbXBsYXRlIiwieiI6IjNhNzRhZDg4ZWNjNDViY2IiLCJuYW1lIjoiQ1NWIERhdGEiLCJmaWVsZCI6InBheWxvYWQiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IlN0YXRpb24sTW9udGgsQ29uc3VtcHRpb25cblJpbyxKYW51YXJ5LDQwMDBcbk5ldyBZb3JrLEphbnVhcnksMTAwMFxuVG9raW8sSmFudWFyeSwzMDAwIiwieCI6MjQwLCJ5Ijo2MCwid2lyZXMiOltbIjMiXV19LHsiaWQiOiIzIiwidHlwZSI6ImNzdiIsInoiOiIzYTc0YWQ4OGVjYzQ1YmNiIiwibmFtZSI6IkNTViBJbiIsInNlcCI6IiwiLCJoZHJpbiI6dHJ1ZSwiaGRyb3V0IjoiIiwibXVsdGkiOiJvbmUiLCJyZXQiOiJcXG4iLCJ0ZW1wIjoiIiwic2tpcCI6IjAiLCJzdHJpbmdzIjp0cnVlLCJpbmNsdWRlX2VtcHR5X3N0cmluZ3MiOmZhbHNlLCJpbmNsdWRlX251bGxfdmFsdWVzIjpmYWxzZSwieCI6NDEwLCJ5Ijo2MCwid2lyZXMiOltbIjQiLCI1Il1dfSx7ImlkIjoiNCIsInR5cGUiOiJkZWJ1ZyIsInoiOiIzYTc0YWQ4OGVjYzQ1YmNiIiwibmFtZSI6IkRlYnVnIEpTT04iLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJwYXlsb2FkIiwidGFyZ2V0VHlwZSI6Im1zZyIsIngiOjU5MCwieSI6NjAsIndpcmVzIjpbXX0seyJpZCI6IjUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjNhNzRhZDg4ZWNjNDViY2IiLCJuYW1lIjoiQWRkIFBhcnRzUHJvZHVjZWQiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJjb2x1bW5zIiwicHQiOiJtc2ciLCJ0byI6Im1zZy5jb2x1bW5zICYgXCIsIFBhcnRzUHJvZHVjZWRcIiIsInRvdCI6Impzb25hdGEifSx7InQiOiJzZXQiLCJwIjoicGF5bG9hZC5QYXJ0c1Byb2R1Y2VkIiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQuQ29uc3VtcHRpb24gLyAxMCIsInRvdCI6Impzb25hdGEifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MjMwLCJ5IjoxNDAsIndpcmVzIjpbWyI2Il1dfSx7ImlkIjoiNiIsInR5cGUiOiJjc3YiLCJ6IjoiM2E3NGFkODhlY2M0NWJjYiIsIm5hbWUiOiJDU1Ygb3V0Iiwic2VwIjoiLCIsImhkcmluIjoiIiwiaGRyb3V0IjoiYWxsIiwibXVsdGkiOiJvbmUiLCJyZXQiOiJcXG4iLCJ0ZW1wIjoiIiwic2tpcCI6IjAiLCJzdHJpbmdzIjp0cnVlLCJpbmNsdWRlX2VtcHR5X3N0cmluZ3MiOmZhbHNlLCJpbmNsdWRlX251bGxfdmFsdWVzIjpmYWxzZSwieCI6NDIwLCJ5IjoxNDAsIndpcmVzIjpbWyI3Il1dfSx7ImlkIjoiNyIsInR5cGUiOiJkZWJ1ZyIsInoiOiIzYTc0YWQ4OGVjYzQ1YmNiIiwibmFtZSI6IkRlYnVnIEZpbmFsIENTViIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwieCI6NjEwLCJ5IjoxNDAsIndpcmVzIjpbXX1d"
---
::



## Node Documentation

<div class="core-node-doc">

<p>Converts between a CSV formatted string and its JavaScript object representation, in either direction.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | array | string</span></dt>
<dd>A JavaScript object, array or CSV string.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | array | string</span></dt>
<dd>
<ul>
<li>If the input is a string it tries to parse it as CSV and creates a JavaScript object of key/value pairs for each line.
The node will then either send a message for each line, or a single message containing an array of objects.</li>
<li>If the input is a JavaScript object it tries to build a CSV string.</li>
<li>If the input is an array of simple values, it builds a single line CSV string.</li>
<li>If the input is an array of arrays, or an array of objects, a multiple-line CSV string is created.</li>
</ul>
</dd>
</dl> <h3>Details</h3> <p>The column template can contain an ordered list of column names. When converting CSV to an object, the column names
will be used as the property names. Alternatively, the column names can be taken from the first row of the CSV.
<p>When the RFC parser is selected, the column template must be compliant with RFC4180.</p>
</p> <p>When converting to CSV, the columns template is used to identify which properties to extract from the object and in what order.</p> <p>If the columns template is blank then you can use a simple comma separated list of properties supplied in <code>msg.columns</code> to
determine what to extract and in what order. If neither are present then all the object properties are output in the order
in which the properties are found in the first row.</p> <p>If the input is an array then the columns template is only used to optionally generate a row of column titles.</p> <p>If 'parse numerical values' option is checked, string numerical values will be returned as numbers, ie. middle value '1,"1.5",2'.</p> <p>If 'include empty strings' option is checked, empty strings will be returned in result, ie. middle value '"1","",3'.</p> <p>If 'include null values' option is checked, null values will be returned in result, ie. middle value '"1",,3'.</p> <p>The node can accept a multi-part input as long as the <code>parts</code> property is set correctly, for example from a file-in node or split node.</p> <p>If outputting multiple messages they will have their <code>parts</code> property set and form a complete message sequence.</p> <p>If the node is set to only send column headers once, then setting <code>msg.reset</code> to any value will cause the node to resend the headers.</p> <p><b>Note:</b> the column template must be comma separated - even if a different separator is chosen for the data.</p> <p><b>Note:</b> in RFC mode, catchable errors will be thrown for malformed CSV headers and invalid input payload data</p>

</div>