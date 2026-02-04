---
eleventyNavigation:
  key: String
  order: 6
  parent: Getting Started
meta:
  title: "Strings in Node-RED: Convert String to Number, Split, Concatenate, Trim, and More"
  description: Learn essential string operations in Node-RED including converting between strings and numbers, splitting and concatenating text, parsing JSON, extracting substrings, trimming whitespace, and more. Step-by-step guide with practical examples.
  keywords: node-red strings, working with strings in node-red, node-red string operations, node-red string manipulation, node-red text processing, node-red change node strings, node-red jsonata string functions, node-red template node strings, node-red function node strings, node-red parsing strings, node-red string conversion, node-red split string, node-red concatenate strings
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

{% renderFlow %}
[{"id":"2ac68ed1d9a7b380","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"42","payloadType":"str","x":530,"y":200,"wires":[["a14a67ac6574ae82"]]},{"id":"a14a67ac6574ae82","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"String to Number","rules":[{"t":"set","p":"payload","pt":"msg","to":"$number(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":710,"y":200,"wires":[["225f4c6a47df2d3c"]]},{"id":"225f4c6a47df2d3c","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":200,"wires":[]}]
{% endrenderFlow %}

## Converting Number to String

Converting numbers to strings is useful for displaying values, building messages, or formatting output.

1. Connect your data source to a **Change** node
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$string(payload)`
5. Connect to where you need the processed data

A number like `42` becomes the string `"42"`, ready for text operations.

{% renderFlow %}
[{"id":"38b9110190ddba53","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"42","payloadType":"num","x":530,"y":260,"wires":[["06a4b6591a791f8d"]]},{"id":"06a4b6591a791f8d","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Number to String","rules":[{"t":"set","p":"payload","pt":"msg","to":"$string(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":710,"y":260,"wires":[["c560426627a56137"]]},{"id":"c560426627a56137","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":260,"wires":[]}]
{% endrenderFlow %}

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

{% renderFlow %}
[{"id":"6a5c13d2e5bf152f","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"2024-12-15 14:30:45 ERROR Database connection failed","payloadType":"str","x":530,"y":320,"wires":[["4d3e4c715e94572b"]]},{"id":"9e90b663c08067fc","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":320,"wires":[]},{"id":"4d3e4c715e94572b","type":"split","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Split String","splt":" ","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","property":"payload","x":690,"y":320,"wires":[["9e90b663c08067fc"]]}]
{% endrenderFlow %}

## Concatenating Strings

Combining strings is common when building messages, URLs, or formatted output.

1. Add a **Template** node after the nodes containing your data
2. Double-click to open the Template configuration
3. Write your text and insert variables using {% raw %}`{{variableName}}`{% endraw %} syntax
4. Click **Done**
5. Connect to where you need the processed data

Each {% raw %}`{{variableName}}`{% endraw %} is replaced with actual data. For example, the template {% raw %}`Hello {{payload.name}}, your order #{{payload.orderId}} has shipped to {{payload.city}}.`{% endraw %} with data containing name "Sarah", orderId "12345", and city "Portland" produces: `Hello Sarah, your order #12345 has shipped to Portland.`

{% renderFlow %}
[{"id":"60cb0a1d79b095a3","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"name\":\"Sarah\",\"orderId\":\"12345\",\"city\":\"Portland\"}","payloadType":"json","x":530,"y":380,"wires":[["88d113db79d20417"]]},{"id":"9ed0bd64daa0cf35","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":380,"wires":[]},{"id":"88d113db79d20417","type":"template","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Concatenating Strings","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Hello {{payload.name}}, your order #{{payload.orderId}} has shipped to {{payload.city}}.","output":"str","x":720,"y":380,"wires":[["9ed0bd64daa0cf35"]]}]
{% endrenderFlow %}

## Parsing JSON Strings

API responses and stored data often arrive as JSON strings—text that looks like JSON but isn't yet usable as an object.

1. Place a **JSON** node after your data source (like an HTTP request or file read)
2. Double-click to open its configuration
3. Set the **Action** to **"Convert between JSON String & Object"**
4. Click **Done**
5. Connect to where you need the processed data

The JSON node detects your data type automatically. String `'{"temperature":22,"humidity":65}'` becomes an object `{temperature: 22, humidity: 65}` so you can access `msg.payload.temperature`. 

{% renderFlow %}
[{"id":"987d6b5ce96f863e","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"temperature\":22,\"humidity\":65}","payloadType":"str","x":530,"y":440,"wires":[["b92eb17c8dac49d8"]]},{"id":"b92eb17c8dac49d8","type":"json","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Parsing JSON Strings","property":"payload","action":"","pretty":false,"x":720,"y":440,"wires":[["a34030e2d9a085fe"]]},{"id":"a34030e2d9a085fe","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":440,"wires":[]}]
{% endrenderFlow %}

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

{% renderFlow %}
[{"id":"1505bbcdda1ef70f","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":510,"y":500,"wires":[["7e13b90c9b8e48de"]]},{"id":"7b985161f48aaf74","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":500,"wires":[]},{"id":"7e13b90c9b8e48de","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Extracting Substrings","rules":[{"t":"set","p":"payload","pt":"msg","to":"$substring(payload, 0, 5)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":720,"y":500,"wires":[["7b985161f48aaf74"]]}]
{% endrenderFlow %}

## Trimming Whitespace

Removing unwanted spaces, tabs, or line breaks from strings prevents comparison errors and formatting issues.

1. Place a **Change** node before your comparison or processing logic
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$trim(payload)`
5. Connect to where you need the processed data

Whitespace from both ends is removed. `"  Hello World  "` becomes `"Hello World"`. The space between words stays—only edge spaces are removed.

{% renderFlow %}
[{"id":"f43fff4b7a32185d","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"  Hello World  ","payloadType":"str","x":510,"y":560,"wires":[["9ed2f66a591cefab"]]},{"id":"603d7024f06979bc","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":560,"wires":[]},{"id":"9ed2f66a591cefab","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Trimming Whitespace","rules":[{"t":"set","p":"payload","pt":"msg","to":"$trim(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":720,"y":560,"wires":[["603d7024f06979bc"]]}]
{% endrenderFlow %}

## Changing Case

Converting string case helps with standardization and comparison since computers treat uppercase and lowercase as different.

1. Add a **Change** node before your comparison or output
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. If you want to convert to uppercase, enter: `$uppercase(payload)`. If you want to convert to lowercase, enter: `$lowercase(payload)`
5. Connect to where you need the processed data

Using `$uppercase(payload)`, the string `"hello world"` becomes `"HELLO WORLD"`. Using `$lowercase(payload)`, the string `"Hello World"` becomes `"hello world"`.

{% renderFlow %}
[{"id":"9b39fb9d0a75e5c2","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":510,"y":620,"wires":[["04389bee4b520eb3"]]},{"id":"3390eac6826821a7","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":620,"wires":[]},{"id":"04389bee4b520eb3","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Changing Case : Lowercase","rules":[{"t":"set","p":"payload","pt":"msg","to":"$lowercase(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":740,"y":620,"wires":[["3390eac6826821a7"]]}]
{% endrenderFlow %}

{% renderFlow %}
[{"id":"2bee50ed8273a7d7","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":680,"wires":[]},{"id":"b2d16a456b083325","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Changing Case : Uppercase","rules":[{"t":"set","p":"payload","pt":"msg","to":"$uppercase(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":740,"y":680,"wires":[["2bee50ed8273a7d7"]]},{"id":"2f20f09b8146b397","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello World","payloadType":"str","x":510,"y":680,"wires":[["b2d16a456b083325"]]}]
{% endrenderFlow %}

## Replacing Text

Finding and replacing text within strings lets you correct values, standardize formats, or update content.

1. Add a **Change** node after your text source
2. Set the rule to **"Set"** `msg.payload`
3. Select **JSONata expression**
4. Enter: `$replace(payload, "old", "new")` where "old" is text to find and "new" is the replacement
5. Connect to where you need the processed data

All occurrences are replaced. `"I love apples and apples are great"` with `$replace(payload, "apples", "oranges")` gives `"I love oranges and oranges are great"`.

{% renderFlow %}
[{"id":"dfbb9d1ce41c8672","type":"debug","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":950,"y":740,"wires":[]},{"id":"33d81d6a0d2d0f0c","type":"change","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"Replacing Text","rules":[{"t":"set","p":"payload","pt":"msg","to":"$replace(payload, \"apples\", \"oranges\")","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":700,"y":740,"wires":[["dfbb9d1ce41c8672"]]},{"id":"a8e1a932d619fa33","type":"inject","z":"c16e1fb8932e7e73","g":"09a33e651efa47a8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"I love apples and apples are great","payloadType":"str","x":530,"y":740,"wires":[["33d81d6a0d2d0f0c"]]}]
{% endrenderFlow %}

## Checking String Length

Determining string length helps with validation or conditional processing.

1. Add a **Change** node that will store the length
2. Set the rule to **"Set"** `msg.length` (or another property)
3. Select **JSONata expression**
4. Enter: `$length(payload)`
5. Connect to where you need the processed data

The string `"Hello"` returns `5`. Use this value in conditions or validation logic.

{% renderFlow %}
[{"id":"3791a3fac7be4833","type":"debug","z":"b446dfa04d79d359","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"length","targetType":"msg","statusVal":"","statusType":"auto","x":1110,"y":1260,"wires":[]},{"id":"fca2213c932b1fea","type":"change","z":"b446dfa04d79d359","name":"Checking String Length","rules":[{"t":"set","p":"length","pt":"msg","to":"$length(payload)","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":910,"y":1260,"wires":[["3791a3fac7be4833"]]},{"id":"706d864345a0c62c","type":"inject","z":"b446dfa04d79d359","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"Hello","payloadType":"str","x":710,"y":1260,"wires":[["fca2213c932b1fea"]]}]
{% endrenderFlow %}

## Checking if String Contains Text

Testing whether a string contains specific text helps with filtering and conditional logic.

1. Add a **Change** node to create a test result
2. Set the rule to **"Set"** `msg.contains` (or another property)
3. Select **JSONata expression**
4. Enter: `$contains(payload, "search term")`
5. Connect to where you need the processed data

Returns `true` if found, `false` if not. `"The quick brown fox"` with `$contains(payload, "quick")` returns `true`. Use in Switch nodes to route messages differently based on content.

{% renderFlow %}
[{"id":"eb5fe8fe6e00e603","type":"debug","z":"b446dfa04d79d359","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":710,"y":1740,"wires":[]},{"id":"daba355f3ca9693f","type":"change","z":"b446dfa04d79d359","name":"Checking if String Contains Text","rules":[{"t":"set","p":"contains","pt":"msg","to":"$contains(payload, \"quick\")","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":510,"y":1740,"wires":[["eb5fe8fe6e00e603"]]},{"id":"ca2ab085f8edec8c","type":"inject","z":"b446dfa04d79d359","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"The quick brown fox","payloadType":"str","x":270,"y":1740,"wires":[["daba355f3ca9693f"]]}]
{% endrenderFlow %}

## Complex String Operations

For complex string operations that combine multiple steps or require custom logic, you can use a Function node with JavaScript.

If you're not familiar with JavaScript, but you're using FlowFuse, you can use the [FlowFuse Expert's](/blog/2025/07/flowfuse-ai-assistant-better-node-red-manufacturing/) function node generator. Simply describe what you want to accomplish, and the assistant will generate the function node code for you.
