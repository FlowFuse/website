The "Template" node is used to create and manipulate text templates. For example for generating HTML, configuration files, our other text based strings.
The Template node allows you to generate dynamic content by injecting data into predefined templates using the Mustache templating language.
When there's no need for dynamic templates, the `Format` can be set to `Plain Text`, which has a slight performance benefit.

## How the Template node works

### Input Data

You can connect the Template node to a source of data, such as an MQTT input, HTTP input, or any other node that provides data. This input data will be used to populate the template.

### Template Definition
In the Template node configuration, you define the template using text based formatting languages like HTML with the Mustache syntax.
Mustache is a simple and "logic-less" templating language that allows you to insert variables and expressions into your template.

For example, you can define a template like this: `<p>Hello {{payload.name}}!</p>`.

![HTML Template with Mustache](./images/template-mustache.png "HTML template with Mustache")

```json
[{"id":"97d742eec1cb7dbf","type":"inject","z":"a6b7ede2e13fcbdf","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"name\": \"FlowFuse\"}","payloadType":"json","x":180,"y":60,"wires":[["c85d70b41f374f02"]]},{"id":"c85d70b41f374f02","type":"template","z":"a6b7ede2e13fcbdf","name":"Template using payload.name","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"Hello {{payload.name}}!","output":"str","x":450,"y":60,"wires":[["6df7215459dfb240"]]},{"id":"6df7215459dfb240","type":"debug","z":"a6b7ede2e13fcbdf","name":"Print \"Hello, FlowFuse!\"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":60,"wires":[]}]
```

This example will print `Hello FlowFuse!`.

### Output

When the Template node receives input data, it processes the data and replaces Mustache placeholders with the corresponding values from the input data. The resulting HTML or text is then sent as output to the next node in the flow.
