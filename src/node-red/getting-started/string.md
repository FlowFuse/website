---
eleventyNavigation:
  key: String
  order: 2
  parent: Getting Started
meta:
  title: Working with Strings in Node-RED
  description: Learn essential string operations in Node-RED including converting between strings and numbers, splitting and concatenating text, parsing JSON, extracting substrings, trimming whitespace, and more. Step-by-step guide with practical examples.
  keywords: node-red strings, working with strings in node-red, node-red string operations, node-red string manipulation, node-red text processing, node-red change node strings, node-red jsonata string functions, node-red template node strings, node-red function node strings, node-red parsing strings, node-red string conversion, node-red split string, node-red concatenate strings
---

# {{ meta.title }}

Strings are one of the most common data types in Node-RED. Whether you're converting sensor values, parsing API responses, or building dynamic messages, understanding string operations is essential for building reliable flows.

## Converting String to Number

One of the most frequent operations is converting string values to numbers for mathematical calculations or comparisons.

1. Connect your data source (like an Inject node or MQTT input) to a **Change** node
2. In the Change node, set the rule to **"Set"** `msg.payload`
3. Select **"to the value of"** and choose **JSONata expression**
4. Enter: `$number(payload)`
5. Connect the Change node to your destination.

If your payload contains the string `"42"`, it becomes the number `42`. You can now use this in calculations or comparisons.

## Converting Number to String

Converting numbers to strings is useful for displaying values, building messages, or formatting output.

1. Place a **Change** node after your calculation or number source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$string(payload)`
5. Connect to your output (like a Template node for formatting)

A number like `42` becomes the string `"42"`, ready for text operations.

## Splitting Strings

Splitting strings is essential when parsing CSV data, breaking apart delimited values, or extracting specific parts of text.

1. Connect your string data source to a **Split** node
2. Double-click the Split node to open its configuration
3. In the **"Split using"** field, enter your delimiter character (`,` for commas, a space for words, or `\n` for new lines)
4. Click **Done**
5. Connect the Split node to processing nodes that will handle each piece

The Split node creates separate messages for each segment. For example, if you receive a log entry `"2024-12-15 14:30:45 ERROR Database connection failed"` and you split using spaces, it produces separate messages: first `"2024-12-15"`, then `"14:30:45"`, then `"ERROR"`, then `"Database"`, and so on. Each piece flows through your subsequent nodes one at a time, allowing you to extract the timestamp, severity level, and message separately.

## Concatenating Strings

Combining strings is common when building messages, URLs, or formatted output.

**How to concatenate:**

1. Add a **Template** node after the nodes containing your data
2. Double-click to open the Template configuration
3. Write your text and insert variables using `{{variableName}}` syntax
4. Click **Done**
5. Connect to your output destination

Each `{{variable}}` is replaced with actual data. For example, the template `Hello {{payload.name}}, your order #{{payload.orderId}} has shipped to {{payload.city}}.` with data containing name "Sarah", orderId "12345", and city "Portland" produces: `Hello Sarah, your order #12345 has shipped to Portland.`

## Parsing JSON Strings

API responses and stored data often arrive as JSON strings—text that looks like JSON but isn't yet usable as an object.

1. Place a **JSON** node after your data source (like an HTTP request or file read)
2. Double-click to open its configuration
3. Set the **Action** to **"Convert between JSON String & Object"**
4. Click **Done**
5. Connect to your next node in your flow

The JSON node detects your data type automatically. String `'{"temperature":22,"humidity":65}'` becomes object `{temperature: 22, humidity: 65}` so you can access `msg.payload.temperature`. 

## Extracting Substrings

Getting specific parts of a string is useful for parsing fixed-format data, extracting codes, or isolating values.

1. Add a **Change** node after your string source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$substring(payload, start, length)` where:
   - `start` is the position (0 is first character)
   - `length` is how many characters to take
5. Connect to your next processing step

**Examples:**
- `$substring(payload, 0, 5)` on `"Hello World"` gives `"Hello"`
- `$substring(payload, 6, 5)` on `"Hello World"` gives `"World"`
- `$substring(payload, 6)` (no length) on `"Hello World"` gives `"World"` (all remaining characters)

## Trimming Whitespace

Removing unwanted spaces, tabs, or line breaks from strings prevents comparison errors and formatting issues.

1. Place a **Change** node before your comparison or processing logic
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$trim(payload)`
5. Connect to your next node in your flow

Whitespace from both ends is removed. `"  Hello World  "` becomes `"Hello World"`. The space between words stays—only edge spaces are removed.

## Changing Case

Converting string case helps with standardization and comparison since computers treat uppercase and lowercase as different.

1. Add a **Change** node before your comparison or output
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. If you want to convert to uppercase, enter: `$uppercase(payload)`. If you want to convert to lowercase, enter: `$lowercase(payload)`
5. Connect to your next node in your flow

Using `$uppercase(payload)`, the string `"hello world"` becomes `"HELLO WORLD"`. Using `$lowercase(payload)`, the string `"Hello World"` becomes `"hello world"`.

## Replacing Text

Finding and replacing text within strings lets you correct values, standardize formats, or update content.

1. Add a **Change** node after your text source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$replace(payload, "old", "new")` where "old" is text to find and "new" is the replacement
5. Connect to your next node in your flow

All occurrences change. `"I love apples and apples are great"` with `$replace(payload, "apples", "oranges")` gives `"I love oranges and oranges are great"`.

## Checking String Length

Determining string length helps with validation or conditional processing.

1. Add a **Change** node that will store the length
2. Set the rule to **"Set"** `msg.length` (or another property)
3. Select **JSONata expression**
4. Enter: `$length(payload)`
5. Connect to your next node in your flow

The string `"Hello"` returns `5`. Use this value in conditions or validation logic.

## Checking if String Contains Text

Testing whether a string contains specific text helps with filtering and conditional logic.

1. Add a **Change** node to create a test result
2. Set the rule to **"Set"** `msg.contains` (or another property)
3. Select **JSONata expression**
4. Enter: `$contains(payload, "search term")`
5. Connect to a Switch node to route based on true/false

Returns `true` if found, `false` if not. `"The quick brown fox"` with `$contains(payload, "quick")` returns `true`. Use in Switch nodes to route messages differently based on content.

## Complex String Operation

For complex string operations that combine multiple steps or require custom logic, you can use a Function node with JavaScript.

If you're not familiar with JavaScript, but you're using FlowFuse, you can use the [FlowFuse Assistant's](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) function node generator. Simply describe what you want to accomplish, and the assistant will generate the function node code for you.

{% renderFlow %}
[{"id":"5f919bac157bbaba","type":"group","z":"b446dfa04d79d359","name":"Working with Strings in Node-RED","style":{"label":true},"nodes":["434214c441322bbe","fcf34eca7f2b8785","f8d54cb7cf0b91f0","c31e127da8c573fd","44f5de6d92496632","bef98b5d30b8e170","7de4ff738ab83a0b","f98bf55bcc922107","50f03e780bc187ab","a28cc2d7835c6756","4391af8fa4530fa2","282d7d326108526e","0142012763201904","94f3970a8081b7a1","5774d51849ab54b4","e0e6c51d15321b96","cd91adeef7400e4a","078b7024f496984f","d07aace938b2e5e1","71b85740bc407b10","3648f523e83f2e65","b19ab237b23dd875","581f3e7f35247e0a","8807191ae001803c","687e3d5a8812d8b7","e17b21f0ac93d721","fad94fd411088d64","c0adf3a0c71e6d93","e8596731d3d1f63b","d3dcb7e80be71a40","aa0a4d81c492183c","57631b1fb1fb4752","583c56ca26a78c42"],"x":534,"y":419,"w":692,"h":682},{"id":"434214c441322bbe","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"42","payloadType":"str","x":710,"y":460,"wires":[["fcf34eca7f2b8785"]]},{"id":"fcf34eca7f2b8785","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"String to Number","rules":[{"t":"set","p":"payload","pt":"msg","to":"$number(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":890,"y":460,"wires":[["f8d54cb7cf0b91f0"]]},{"id":"f8d54cb7cf0b91f0","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":460,"wires":[]},{"id":"c31e127da8c573fd","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"42","payloadType":"num","x":710,"y":520,"wires":[["44f5de6d92496632"]]},{"id":"44f5de6d92496632","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Number to String","rules":[{"t":"set","p":"payload","pt":"msg","to":"$string(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":890,"y":520,"wires":[["bef98b5d30b8e170"]]},{"id":"bef98b5d30b8e170","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":520,"wires":[]},{"id":"7de4ff738ab83a0b","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"2024-12-15 14:30:45 ERROR Database connection failed","payloadType":"str","x":710,"y":580,"wires":[["50f03e780bc187ab"]]},{"id":"f98bf55bcc922107","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":580,"wires":[]},{"id":"50f03e780bc187ab","type":"split","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Split String","splt":" ","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","property":"payload","x":870,"y":580,"wires":[["f98bf55bcc922107"]]},{"id":"a28cc2d7835c6756","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"name\":\"Sarah\",\"orderId\":\"12345\",\"city\":\"Portland\"}","payloadType":"json","x":710,"y":640,"wires":[["282d7d326108526e"]]},{"id":"4391af8fa4530fa2","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":640,"wires":[]},{"id":"282d7d326108526e","type":"template","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Concatenating Strings","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Hello {{payload.name}}, your order #{{payload.orderId}} has shipped to {{payload.city}}.","output":"str","x":900,"y":640,"wires":[["4391af8fa4530fa2"]]},{"id":"0142012763201904","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"temperature\":22,\"humidity\":65}","payloadType":"str","x":710,"y":700,"wires":[["94f3970a8081b7a1"]]},{"id":"94f3970a8081b7a1","type":"json","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Parsing JSON Strings","property":"payload","action":"","pretty":false,"x":900,"y":700,"wires":[["5774d51849ab54b4"]]},{"id":"5774d51849ab54b4","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":700,"wires":[]},{"id":"e0e6c51d15321b96","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":690,"y":760,"wires":[["078b7024f496984f"]]},{"id":"cd91adeef7400e4a","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":760,"wires":[]},{"id":"078b7024f496984f","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Extracting Substrings","rules":[{"t":"set","p":"payload","pt":"msg","to":"$substring(payload, 0, 5)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":900,"y":760,"wires":[["cd91adeef7400e4a"]]},{"id":"d07aace938b2e5e1","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"  Hello World  ","payloadType":"str","x":690,"y":820,"wires":[["3648f523e83f2e65"]]},{"id":"71b85740bc407b10","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":820,"wires":[]},{"id":"3648f523e83f2e65","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Trimming Whitespace","rules":[{"t":"set","p":"payload","pt":"msg","to":"$trim(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":900,"y":820,"wires":[["71b85740bc407b10"]]},{"id":"b19ab237b23dd875","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":690,"y":880,"wires":[["8807191ae001803c"]]},{"id":"581f3e7f35247e0a","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":880,"wires":[]},{"id":"8807191ae001803c","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Changing Case : Lowercase","rules":[{"t":"set","p":"payload","pt":"msg","to":"$lowercase(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":920,"y":880,"wires":[["581f3e7f35247e0a"]]},{"id":"687e3d5a8812d8b7","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":940,"wires":[]},{"id":"e17b21f0ac93d721","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Changing Case : Uppercase","rules":[{"t":"set","p":"payload","pt":"msg","to":"$uppercase(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":920,"y":940,"wires":[["687e3d5a8812d8b7"]]},{"id":"fad94fd411088d64","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":690,"y":940,"wires":[["e17b21f0ac93d721"]]},{"id":"c0adf3a0c71e6d93","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":1000,"wires":[]},{"id":"e8596731d3d1f63b","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Replacing Text","rules":[{"t":"set","p":"payload","pt":"msg","to":"$replace(payload, \"apples\", \"oranges\")","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":880,"y":1000,"wires":[["c0adf3a0c71e6d93"]]},{"id":"d3dcb7e80be71a40","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"I love apples and apples are great","payloadType":"str","x":710,"y":1000,"wires":[["e8596731d3d1f63b"]]},{"id":"aa0a4d81c492183c","type":"debug","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"length","targetType":"msg","statusVal":"","statusType":"auto","x":1130,"y":1060,"wires":[]},{"id":"57631b1fb1fb4752","type":"change","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"Checking if String Contains Text","rules":[{"t":"set","p":"length","pt":"msg","to":"$contains(payload, \"quick\")","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":930,"y":1060,"wires":[["aa0a4d81c492183c"]]},{"id":"583c56ca26a78c42","type":"inject","z":"b446dfa04d79d359","g":"5f919bac157bbaba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"The quick brown fox","payloadType":"str","x":670,"y":1060,"wires":[["57631b1fb1fb4752"]]}]
{% endrenderFlow %}