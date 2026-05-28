---
title: "Node-RED - Write File Node"
---
# Write File

## What is the Write File Node in Node-RED?

The "Write File" node in Node-RED is used to write data to a file on the filesystem. It's commonly employed in flows where you need to save data or logs for later analysis or storage. In FlowFuse Cloud, the Write File node interacts with a cloud-based storage solution, leveraging AWS S3 for file storage. However, in the Node-RED instance running on edge devices using the [ FlowFuse device agent](/platform/device-agent/), this node will interact with the local file system of that device. The content to be written is specified using `msg.payload`.

# Configuring the Write File Node in Node-RED:

- **Filename:** Specify the filename
    - **Path:** Specify the path to the file where data will be saved.
    - **msg:** Use a message property to dynamically set the filename, By default, it will use `msg.filename`, and if `msg.filename` is used, the file will be closed after every write. For the best performance, use a fixed filename.
    - **Expression:** Use a JSON expression to set the filename dynamically based on data in the flow.
    - **Environment Variable (env var):** Use an environment variable to set the filename dynamically.

- **Action:** Choose the action
    - **Append to File:** Adds new data to the existing file.
    - **Overwrite File:** Replaces the content of the file with new data.
    - **Delete File:** Removes the specified file from the filesystem.

- **Add Newline (\n) to Each Payload:** Enabling this option will append a newline character to each payload before writing to the file.

- **Create Directory if it Doesn't Exist:** Enabling this option will create the specified directory if it is not already present in the filesystem.

- **Encoding:** Specifies the character encoding to be used when writing data to the file, when selecting "set by `msg.encoding`" you can set it dynamically.

*Tip: Always use an absolute path for the filename to ensure Node-RED can accurately locate and manipulate the specified file.*

## Output

After the completion of the write operation, the input message passed to the write file node is sent to the output port.

## Use Cases

1. **Data Logging:** Store sensor readings, IoT device data, or system metrics into a file for historical analysis or monitoring trends over time.

2. **Error Logging:** Capture and log error messages, exceptions, or debugging information to a file for troubleshooting and debugging purposes.

3. **User Inputs:** Save user inputs or form submissions to a file, such as user preferences, feedback, or user-generated content.

4. **Reporting:** Generate reports in CSV, JSON, or plain text formats and save them to a file for later retrieval or distribution.

5. **Backup and Recovery:** Create backup files of critical data or system states for disaster recovery or version control purposes.

6. **Integration with External Systems:** Save data retrieved from APIs, databases, or external services to a file for further processing or analysis.

7. **Archiving:** Archive log files, historical data, or outdated documents to maintain a record of past events or changes.

8. **Data Transformation:** Perform data transformation operations and write the transformed data to a file in a different format or structure.

9. **Event Logging:** Log events, notifications, or user interactions to a file for auditing, compliance, or historical tracking purposes.

## Examples

1. In the example flow below, we demonstrate how to create a file and write content to it.



::render-flow
---
height: 200
flow: "W3siaWQiOiJhYTI0N2ZiMWVmMTYzYzkyIiwidHlwZSI6Imdyb3VwIiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwic3R5bGUiOnsic3Ryb2tlIjoiI2IyYjNiZCIsInN0cm9rZS1vcGFjaXR5IjoiMSIsImZpbGwiOiIjZjJmM2ZiIiwiZmlsbC1vcGFjaXR5IjoiMC41IiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiMzMjMzM2IifSwibm9kZXMiOlsiYmZiMjkwMzg2OTE1N2UxZiIsIjAxNTAzZjVhNDkzZDAzY2MiLCIyNTM3ZWJjMjc2NDAzNTkxIiwiOGFkNzY2ZTFkNjc0NjZmNCJdLCJ4IjoxOTQsInkiOjE3OSwidyI6NzEyLCJoIjoxNjJ9LHsiaWQiOiJiZmIyOTAzODY5MTU3ZTFmIiwidHlwZSI6ImZpbGUiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJnIjoiYWEyNDdmYjFlZjE2M2M5MiIsIm5hbWUiOiIiLCJmaWxlbmFtZSI6Ii9teWZpbGUudHh0LyIsImZpbGVuYW1lVHlwZSI6InN0ciIsImFwcGVuZE5ld2xpbmUiOnRydWUsImNyZWF0ZURpciI6ZmFsc2UsIm92ZXJ3cml0ZUZpbGUiOiJmYWxzZSIsImVuY29kaW5nIjoibm9uZSIsIngiOjU0MCwieSI6MzAwLCJ3aXJlcyI6W1siMjUzN2ViYzI3NjQwMzU5MSJdXX0seyJpZCI6IjAxNTAzZjVhNDkzZDAzY2MiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwiZyI6ImFhMjQ3ZmIxZWYxNjNjOTIiLCJuYW1lIjoiV3JpdGUgaW50byBmaWxlIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMTAsInkiOjMwMCwid2lyZXMiOltbImJmYjI5MDM4NjkxNTdlMWYiXV19LHsiaWQiOiIyNTM3ZWJjMjc2NDAzNTkxIiwidHlwZSI6ImRlYnVnIiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwiZyI6ImFhMjQ3ZmIxZWYxNjNjOTIiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo4MDAsInkiOjMwMCwid2lyZXMiOltdfSx7ImlkIjoiOGFkNzY2ZTFkNjc0NjZmNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwiZyI6ImFhMjQ3ZmIxZWYxNjNjOTIiLCJuYW1lIjoiV3JpdGUgdGltZXN0YW1wcyB0byB0aGUgbXlmaWxlLnR4dCBmaWxlLiBJZiB0aGUgZmlsZSBkb2Vzbid0IGV4aXN0LCBpdCB3aWxsIGJlIGNyZWF0ZWQuIiwiaW5mbyI6IiIsIngiOjU1MCwieSI6MjIwLCJ3aXJlcyI6W119XQ=="
---
::



2. In the example flow below, we demonstrate how to delete a file using the Write File node.



::render-flow
---
height: 200
flow: "W3siaWQiOiJiNWVhNmQyYS42ZTdiYiIsInR5cGUiOiJ0YWIiLCJsYWJlbCI6Im9wZW5WYWx2ZSIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiJ9LHsiaWQiOiJhYTI0N2ZiMWVmMTYzYzkyIiwidHlwZSI6Imdyb3VwIiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwic3R5bGUiOnsic3Ryb2tlIjoiI2IyYjNiZCIsInN0cm9rZS1vcGFjaXR5IjoiMSIsImZpbGwiOiIjZjJmM2ZiIiwiZmlsbC1vcGFjaXR5IjoiMC41IiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiMzMjMzM2IifSwibm9kZXMiOlsiYmZiMjkwMzg2OTE1N2UxZiIsIjAxNTAzZjVhNDkzZDAzY2MiLCIyNTM3ZWJjMjc2NDAzNTkxIiwiOGFkNzY2ZTFkNjc0NjZmNCJdLCJ4IjoxOTQsInkiOjE3OSwidyI6NzEyLCJoIjoxNjJ9LHsiaWQiOiJiZmIyOTAzODY5MTU3ZTFmIiwidHlwZSI6ImZpbGUiLCJ6IjoiYjVlYTZkMmEuNmU3YmIiLCJnIjoiYWEyNDdmYjFlZjE2M2M5MiIsIm5hbWUiOiIiLCJmaWxlbmFtZSI6Ii9teWZpbGUudHh0LyIsImZpbGVuYW1lVHlwZSI6InN0ciIsImFwcGVuZE5ld2xpbmUiOnRydWUsImNyZWF0ZURpciI6ZmFsc2UsIm92ZXJ3cml0ZUZpbGUiOiJkZWxldGUiLCJlbmNvZGluZyI6Im5vbmUiLCJ4Ijo1NTAsInkiOjMwMCwid2lyZXMiOltbIjI1MzdlYmMyNzY0MDM1OTEiXV19LHsiaWQiOiIwMTUwM2Y1YTQ5M2QwM2NjIiwidHlwZSI6ImluamVjdCIsInoiOiJiNWVhNmQyYS42ZTdiYiIsImciOiJhYTI0N2ZiMWVmMTYzYzkyIiwibmFtZSI6IkRlbGV0ZSBmaWxlIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjozMDAsInkiOjMwMCwid2lyZXMiOltbImJmYjI5MDM4NjkxNTdlMWYiXV19LHsiaWQiOiIyNTM3ZWJjMjc2NDAzNTkxIiwidHlwZSI6ImRlYnVnIiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwiZyI6ImFhMjQ3ZmIxZWYxNjNjOTIiLCJuYW1lIjoiZGVidWcgMSIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo4MDAsInkiOjMwMCwid2lyZXMiOltdfSx7ImlkIjoiOGFkNzY2ZTFkNjc0NjZmNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImI1ZWE2ZDJhLjZlN2JiIiwiZyI6ImFhMjQ3ZmIxZWYxNjNjOTIiLCJuYW1lIjoiRGVsZXRpbmcgbXlmaWxlLnR4dCB1c2luZyB3cml0ZSBmaWxlIG5vZGUiLCJpbmZvIjoiIiwieCI6NTUwLCJ5IjoyMjAsIndpcmVzIjpbXX1d"
---
::




## Node Documentation

<div class="core-node-doc">

<p>Writes <code>msg.payload</code> to a file, either adding to the end or replacing the existing content.
Alternatively, it can delete the file.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">filename <span class="property-type">string</span></dt>
<dd>The name of the file to be updated can be provided in the node configuration, or as a message property. 
By default it will use <code>msg.filename</code> but this can be customised in the node.
</dd>
<dt class="optional">encoding <span class="property-type">string</span></dt>
<dd>If encoding is configured to be set by msg, then this optional property can set the encoding.

<h3>Output</h3>
<p>On completion of write, input message is sent to output port.</p>
<h3>Details</h3>
<p>Each message payload will be added to the end of the file, optionally appending
a newline (\n) character between each one.</p>
<p>If <code>msg.filename</code> is used the file will be closed after every write.
For best performance use a fixed filename.</p>
<p>It can be configured to overwrite the entire file rather than append. For example,
when writing binary data to a file, such as an image, this option should be used
and the option to append a newline should be disabled.</p>
<p>Encoding of data written to a file can be specified from list of encodings.</p>
<p>Alternatively, this node can be configured to delete the file.</p>


<script type="text/html" data-help-name="file in">
<p>Reads the contents of a file as either a string or binary buffer.</p>
<h3>Inputs</h3>
<dl class="message-properties">
<dt class="optional">filename <span class="property-type">string</span></dt>
<dd>The name of the file to be read can be provided in the node configuration, or as a message property. 
By default it will use <code>msg.filename</code> but this can be customised in the node.
</dd>
</dl>
<h3>Outputs</h3>
<dl class="message-properties">
<dt>payload <span class="property-type">string | buffer</span></dt>
<dd>The contents of the file as either a string or binary buffer.</dd>
<dt class="optional">filename <span class="property-type">string</span></dt>
<dd>If not configured in the node, this optional property sets the name of the file to be read.</dd>
</dl>
<h3>Details</h3>
<p>The filename should be an absolute path, otherwise it will be relative to
the working directory of the Node-RED process.</p>
<p>On Windows, path separators may need to be escaped, for example: <code>\\Users\\myUser</code>.</p>
<p>Optionally, a text file can be split into lines, outputting one message per line, or a binary file
split into smaller buffer chunks - the chunk size being operating system dependant, but typically 64k (Linux/Mac) or 41k (Windows).</p>
<p>When split into multiple messages, each message will have a <code>parts</code>
property set, forming a complete message sequence.</p>
<p>Encoding of input data can be specified from list of encodings if output format is string.</p>
<p>Errors should be caught and handled using a Catch node.</p>
</script>
</dd></dl>

</div>