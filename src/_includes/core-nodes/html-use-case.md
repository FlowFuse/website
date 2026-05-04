Extracts elements from an HTML document.

## Where and why do we use the HTML node?

The HTML node parses HTML documents and extracts specific elements using CSS selectors. This is essential when you need to scrape data from web pages, extract specific content from HTML responses, or process HTML documents to retrieve structured information. Unlike the [template node](/node-red/core-nodes/template/) which generates HTML, this node is purely for parsing and extraction.

## How it works

The HTML node uses CSS selectors to find and extract elements from HTML content in `msg.payload`. You specify which elements to extract using standard CSS selector syntax (like `h1`, `.classname`, `#id`, or more complex selectors). The node supports a combination of CSS and jQuery selectors - see the [css-select documentation](https://github.com/fb55/css-select) for the full syntax.

The selector can be configured in the node's edit panel or provided dynamically via `msg.select`.

## Modes of operation

The HTML node can output extracted content in different ways:

### Single Message with Array

Returns one message where `msg.payload` contains an array of all matched elements. Use this when you want to process all results together or need to know the total count of matches.

### Multiple Messages

Sends separate messages for each matched element. Each message contains one matched element in `msg.payload` and includes a `msg.parts` property for sequence tracking. Use this when you want to process each match individually through subsequent nodes.

### Return Format

For each matched element, you can choose to return:
- **HTML markup** - the complete HTML including tags and attributes
- **Text content** - just the text with all HTML tags stripped

## How the node handles messages

The HTML node processes the HTML string in `msg.payload`. After parsing and extracting the specified elements, it outputs the results according to the configured mode.

When outputting multiple messages, the node automatically adds the `msg.parts` property to enable proper handling by downstream nodes like Join. This property includes the sequence identifier, message index, and total count.

The node uses CSS selector syntax with jQuery extensions, so you can use:
- Tag selectors: `h1`, `div`, `span`
- Class selectors: `.classname`
- ID selectors: `#elementid`
- Attribute selectors: `[href]`, `[data-value="123"]`
- Complex selectors: `div.content > p`, `ul li:first-child`
- jQuery extensions: `:first`, `:last`, `:even`, `:odd`

## Examples

### Extracting page titles

This example fetches the Node-RED homepage and extracts the text from the `h1` tag. The HTTP Request node retrieves the page, and the HTML node parses it to find the heading.

{% renderFlow %}
[{"id":"fe3ffa918ba45f27","type":"html","z":"99a0b45110d553ec","name":"Select H1 element","property":"payload","outproperty":"payload","tag":"h1","ret":"html","as":"single","x":610,"y":40,"wires":[["07dd1efff04d231a"]]},{"id":"339359b6a6793b3d","type":"http request","z":"99a0b45110d553ec","name":"Get Node-RED.org homepage","method":"GET","ret":"txt","paytoqs":"ignore","url":"https://nodered.org/","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":true,"headers":[],"x":350,"y":40,"wires":[["fe3ffa918ba45f27"]]},{"id":"e7dcdcff49c14ab1","type":"inject","z":"99a0b45110d553ec","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":120,"y":40,"wires":[["339359b6a6793b3d"]]},{"id":"07dd1efff04d231a","type":"debug","z":"99a0b45110d553ec","name":"Print H1 content","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":820,"y":40,"wires":[]}]
{% endrenderFlow %}
