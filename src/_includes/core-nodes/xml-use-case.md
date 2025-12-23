Converts between XML strings and JavaScript objects.

## Where and why do we use the XML node?

The XML node processes Extensible Markup Language (XML) data. It converts between XML-formatted strings and JavaScript objects, making it essential when working with legacy systems, SOAP APIs, configuration files, or any service that uses XML for data exchange. This bidirectional conversion lets you parse incoming XML data for processing and format JavaScript objects into XML strings for output.

## Modes of operation

The XML node operates in two directions depending on what it detects in the input:

### XML String to Object

When the input is an XML string, the node parses it into a JavaScript object. This mode is essential when receiving data from SOAP APIs, reading XML configuration files, or processing XML payloads from devices and sensors. Once converted to an object, you can access and manipulate the data using standard JavaScript operations.

XML elements become object properties, nested elements create nested objects, and attributes are preserved in the conversion.

### Object to XML String

When the input is a JavaScript object, the node converts it into an XML string. Use this mode when preparing data to send to SOAP services, writing XML configuration files, or transmitting structured data to systems that require XML format. The node generates valid, well-formed XML from your JavaScript object structure.

### Property naming conventions

When converting between XML and an object, any XML attributes are added as a property named `$` by default. Any text content is added as a property named `_`.

**Understanding the `$` property (attributes):**

The `$` property stores all XML attributes as key-value pairs.

```xml
<product id="P123" category="electronics" inStock="true">
```

Becomes:

```javascript
{
  product: {
    $: {
      id: "P123",
      category: "electronics",
      inStock: "true"
    }
  }
}
```

**Understanding the `_` property (text content):**

The `_` property stores the text content of an XML element.

```xml
<message>Hello World</message>
<price>29.99</price>
```

Becomes:

```javascript
{
  message: { _: "Hello World" },
  price: { _: "29.99" }
}
```

**Complex example combining both:**

```xml
<user id="456" role="admin">
  <username>jsmith</username>
  <email verified="true">john@example.com</email>
  <status>Active</status>
</user>
```

Becomes:

```javascript
{
  user: {
    $: {
      id: "456",
      role: "admin"
    },
    username: { _: "jsmith" },
    email: {
      $: { verified: "true" },
      _: "john@example.com"
    },
    status: { _: "Active" }
  }
}
```

## Demo Flow


### XML String to Object

{% renderFlow %}
[{"id":"227621b279d19ace","type":"xml","z":"b446dfa04d79d359","name":"XML to Object","property":"payload","attr":"","chr":"","x":380,"y":180,"wires":[["953fc1f64f4b892e"]]},{"id":"404972c7c517dedd","type":"inject","z":"b446dfa04d79d359","name":"Inject XML","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"<product id=\"P123\" category=\"electronics\">   <name>Laptop</name>   <price>999.99</price> </product>","payloadType":"str","x":220,"y":180,"wires":[["227621b279d19ace"]]},{"id":"953fc1f64f4b892e","type":"debug","z":"b446dfa04d79d359","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":530,"y":180,"wires":[]}]
{% endrenderFlow %}

### Object to XML String

{% renderFlow %}
[{"id":"227621b279d19ace","type":"xml","z":"b446dfa04d79d359","name":"Object to XML","property":"payload","attr":"","chr":"","x":440,"y":180,"wires":[["953fc1f64f4b892e"]]},{"id":"404972c7c517dedd","type":"inject","z":"b446dfa04d79d359","name":"Inject Object","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{   \"id\": 10,   \"name\": \"Demo Item\",   \"category\": \"Sample\",   \"price\": 499,   \"inStock\": true,   \"rating\": 4.5,   \"manufacturer\": \"DemoCorp\",   \"createdAt\": \"2025-01-01T10:00:00Z\",   \"description\": \"A medium-sized JSON object for XML conversion testing.\" }","payloadType":"json","x":270,"y":180,"wires":[["227621b279d19ace"]]},{"id":"953fc1f64f4b892e","type":"debug","z":"b446dfa04d79d359","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":590,"y":180,"wires":[]}]
{% endrenderFlow %}
