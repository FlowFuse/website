---
title: "Node-RED - XML Node"
---
# XML

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



::render-flow
---
height: 200
flow: "W3siaWQiOiIyMjc2MjFiMjc5ZDE5YWNlIiwidHlwZSI6InhtbCIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwibmFtZSI6IlhNTCB0byBPYmplY3QiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJhdHRyIjoiIiwiY2hyIjoiIiwieCI6MzgwLCJ5IjoxODAsIndpcmVzIjpbWyI5NTNmYzFmNjRmNGI4OTJlIl1dfSx7ImlkIjoiNDA0OTcyYzdjNTE3ZGVkZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsIm5hbWUiOiJJbmplY3QgWE1MIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiI8cHJvZHVjdCBpZD1cIlAxMjNcIiBjYXRlZ29yeT1cImVsZWN0cm9uaWNzXCI+ICAgPG5hbWU+TGFwdG9wPC9uYW1lPiAgIDxwcmljZT45OTkuOTk8L3ByaWNlPiA8L3Byb2R1Y3Q+IiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoyMjAsInkiOjE4MCwid2lyZXMiOltbIjIyNzYyMWIyNzlkMTlhY2UiXV19LHsiaWQiOiI5NTNmYzFmNjRmNGI4OTJlIiwidHlwZSI6ImRlYnVnIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjUzMCwieSI6MTgwLCJ3aXJlcyI6W119XQ=="
---
::



### Object to XML String



::render-flow
---
height: 200
flow: "W3siaWQiOiIyMjc2MjFiMjc5ZDE5YWNlIiwidHlwZSI6InhtbCIsInoiOiJiNDQ2ZGZhMDRkNzlkMzU5IiwibmFtZSI6Ik9iamVjdCB0byBYTUwiLCJwcm9wZXJ0eSI6InBheWxvYWQiLCJhdHRyIjoiIiwiY2hyIjoiIiwieCI6NDQwLCJ5IjoxODAsIndpcmVzIjpbWyI5NTNmYzFmNjRmNGI4OTJlIl1dfSx7ImlkIjoiNDA0OTcyYzdjNTE3ZGVkZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYjQ0NmRmYTA0ZDc5ZDM1OSIsIm5hbWUiOiJJbmplY3QgT2JqZWN0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJ7ICAgXCJpZFwiOiAxMCwgICBcIm5hbWVcIjogXCJEZW1vIEl0ZW1cIiwgICBcImNhdGVnb3J5XCI6IFwiU2FtcGxlXCIsICAgXCJwcmljZVwiOiA0OTksICAgXCJpblN0b2NrXCI6IHRydWUsICAgXCJyYXRpbmdcIjogNC41LCAgIFwibWFudWZhY3R1cmVyXCI6IFwiRGVtb0NvcnBcIiwgICBcImNyZWF0ZWRBdFwiOiBcIjIwMjUtMDEtMDFUMTA6MDA6MDBaXCIsICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgbWVkaXVtLXNpemVkIEpTT04gb2JqZWN0IGZvciBYTUwgY29udmVyc2lvbiB0ZXN0aW5nLlwiIH0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjoyNzAsInkiOjE4MCwid2lyZXMiOltbIjIyNzYyMWIyNzlkMTlhY2UiXV19LHsiaWQiOiI5NTNmYzFmNjRmNGI4OTJlIiwidHlwZSI6ImRlYnVnIiwieiI6ImI0NDZkZmEwNGQ3OWQzNTkiLCJuYW1lIjoiUmVzdWx0IiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjU5MCwieSI6MTgwLCJ3aXJlcyI6W119XQ=="
---
::




## Node Documentation

<div class="core-node-doc">

<p>Converts between an XML string and its JavaScript object representation, in either direction.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>A JavaScript object or XML string.</dd>
<dt class="optional">options <span class="property-type">object</span></dt>
<dd>This optional property can be used to pass in any of the options supported by the underlying
library used to convert to and from XML. See <a href="https://github.com/Leonidas-from-XIV/node-xml2js/blob/master/README.md#options" target="_blank">the xml2js docs</a>
for more information.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>payload<span class="property-type">object | string</span></dt>
<dd>
<ul>
<li>If the input is a string it tries to parse it as XML and creates a JavaScript object.</li>
<li>If the input is a JavaScript object it tries to build an XML string.</li>
</ul>
</dd>
</dl> <h3>Details</h3> <p>When converting between XML and an object, any XML attributes are added as a property named <code>$</code> by default.
Any text content is added as a property named <code>_</code>. These property names can be specified in the node configuration.</p> <p>For example, the following XML will be converted as shown:</p> <pre>&lt;p class="tag"&gt;Hello World&lt;/p&gt;</pre> <pre>{
"p": {
"$": {
"class": "tag"
},
"_": "Hello World"
}
}</pre>

</div>