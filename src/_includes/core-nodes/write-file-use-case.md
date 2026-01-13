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

{% renderFlow %}
[{"id":"aa247fb1ef163c92","type":"group","z":"b5ea6d2a.6e7bb","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["bfb2903869157e1f","01503f5a493d03cc","2537ebc276403591","8ad766e1d67466f4"],"x":194,"y":179,"w":712,"h":162},{"id":"bfb2903869157e1f","type":"file","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"","filename":"/myfile.txt/","filenameType":"str","appendNewline":true,"createDir":false,"overwriteFile":"false","encoding":"none","x":540,"y":300,"wires":[["2537ebc276403591"]]},{"id":"01503f5a493d03cc","type":"inject","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"Write into file","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":310,"y":300,"wires":[["bfb2903869157e1f"]]},{"id":"2537ebc276403591","type":"debug","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":800,"y":300,"wires":[]},{"id":"8ad766e1d67466f4","type":"comment","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"Write timestamps to the myfile.txt file. If the file doesn't exist, it will be created.","info":"","x":550,"y":220,"wires":[]}]
{% endrenderFlow %}

2. In the example flow below, we demonstrate how to delete a file using the Write File node.

{% renderFlow %}
[{"id":"b5ea6d2a.6e7bb","type":"tab","label":"openValve","disabled":false,"info":""},{"id":"aa247fb1ef163c92","type":"group","z":"b5ea6d2a.6e7bb","style":{"stroke":"#b2b3bd","stroke-opacity":"1","fill":"#f2f3fb","fill-opacity":"0.5","label":true,"label-position":"nw","color":"#32333b"},"nodes":["bfb2903869157e1f","01503f5a493d03cc","2537ebc276403591","8ad766e1d67466f4"],"x":194,"y":179,"w":712,"h":162},{"id":"bfb2903869157e1f","type":"file","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"","filename":"/myfile.txt/","filenameType":"str","appendNewline":true,"createDir":false,"overwriteFile":"delete","encoding":"none","x":550,"y":300,"wires":[["2537ebc276403591"]]},{"id":"01503f5a493d03cc","type":"inject","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"Delete file","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":300,"y":300,"wires":[["bfb2903869157e1f"]]},{"id":"2537ebc276403591","type":"debug","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":800,"y":300,"wires":[]},{"id":"8ad766e1d67466f4","type":"comment","z":"b5ea6d2a.6e7bb","g":"aa247fb1ef163c92","name":"Deleting myfile.txt using write file node","info":"","x":550,"y":220,"wires":[]}]
{% endrenderFlow %}
