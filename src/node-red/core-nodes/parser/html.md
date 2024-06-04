---
eleventyNavigation:
  key: HTML
  parent : Parser
---

# Node-RED HTML Node

## The HTML core node

For parsing HTML in Node-RED you can use the HTML node. Unlike for example
the [YAML node](/node-red/core-nodes/parser/yaml), it's a parser only. This node
does not format as HTML. Use the [template node](/node-red/core-nodes/function/template/)
for that use case.

### Examples

If for example you'd want to parse the text in a `h1` tag in HTML from a website, you'll need to get that page and parse the payload of the HTTP Request
node in the HTML node.

{% renderFlow %}
[{"id":"fe3ffa918ba45f27","type":"html","z":"99a0b45110d553ec","name":"Select H1 element","property":"payload","outproperty":"payload","tag":"h1","ret":"html","as":"single","x":610,"y":40,"wires":[["07dd1efff04d231a"]]},{"id":"339359b6a6793b3d","type":"http request","z":"99a0b45110d553ec","name":"Get Node-RED.org homepage","method":"GET","ret":"txt","paytoqs":"ignore","url":"https://nodered.org/","tls":"","persist":false,"proxy":"","insecureHTTPParser":false,"authType":"","senderr":true,"headers":[],"x":350,"y":40,"wires":[["fe3ffa918ba45f27"]]},{"id":"e7dcdcff49c14ab1","type":"inject","z":"99a0b45110d553ec","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":120,"y":40,"wires":[["339359b6a6793b3d"]]},{"id":"07dd1efff04d231a","type":"debug","z":"99a0b45110d553ec","name":"Print H1 content","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":820,"y":40,"wires":[]}]
{% endrenderFlow %}

