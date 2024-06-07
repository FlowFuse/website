---
eleventyNavigation:
  key: XML
  parent : Parser
---

# Node-RED XML Node

The XML node in Node-RED is a node that can be used to parse and generate XML data.

The XML node will parse the input to JSON when the input is recognized as XML.
When it's formatted as JSON, the node will output XML. This allows bi-directional
convertion of XML and JSON data, which can be useful for integrating with other systems and services that only support one of these formats.

The XML core node has generally 2 use-cases:

* **Parsing and extracting XML data:** The XML node can be used to parse XML data and extract specific elements and attributes. This can be useful for tasks such as reading data from XML files, parsing XML messages from devices, or extracting data from XML (usually SOAP) APIs.
* **Generating XML data:** The XML node can be used to generate XML data from scratch. This can be useful for tasks such as creating XML files, generating XML messages to send to devices, or creating XML documents to be consumed by other systems and services.

As the node can construct and deconstruct, the modification of XML is an implicit
capability.

## Examples

### Parsing XML data

Providing the following data in the XML node:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<weatherdata>
  <current>
    <temperature>25.5</temperature>
    <humidity>65</humidity>
    <wind>10</wind>
  </current>
</weatherdata>
```

The `XML` node parses the XML data and converts it to JSON.

```json
{
  "weatherdata": {
    "current": {
      "temperature": 25.5,
      "humidity": 65,
      "wind": 10
    }
  }
}
```
