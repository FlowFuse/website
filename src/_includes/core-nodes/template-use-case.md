The "Template" node is used to create and manipulate text templates. For example for generating HTML, configuration files, our other text based strings.
The Template node allows you to generate dynamic content by injecting data into predefined templates using the Mustache templating language.
When there's no need for dynamic templates, the `Format` can be set to `Plain Text`, which has a slight performance benefit.

## How the Template node works

### Input Data

You can connect the Template node to a source of data, such as an MQTT input, HTTP input, or any other node that provides data. This input data will be used to populate the template.

### Template Definition

In the Template node configuration, you define the template using text based formatting languages like HTML with the Mustache syntax.
Mustache is a simple and "logic-less" templating language that allows you to insert variables and expressions into your template.

For example, you can define a template like this: {% raw %}`<p>Hello {{payload.name}}!</p>`{% endraw %}.

{% renderFlow %}
[{"id":"97d742eec1cb7dbf","type":"inject","z":"a6b7ede2e13fcbdf","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"{\"name\": \"FlowFuse\"}","payloadType":"json","x":180,"y":60,"wires":[["c85d70b41f374f02"]]},{"id":"c85d70b41f374f02","type":"template","z":"a6b7ede2e13fcbdf","name":"Template using payload.name","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"<p>Hello {% raw %}`{{payload.name}}!{% endraw %}</p>","output":"str","x":450,"y":60,"wires":[["6df7215459dfb240"]]},{"id":"6df7215459dfb240","type":"debug","z":"a6b7ede2e13fcbdf","name":"Print \"<p>Hello, FlowFuse!</p>\"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":750,"y":60,"wires":[]}]
{% endrenderFlow %}

This example will output `<p>Hello FlowFuse!</p>`.

### Output

When the Template node receives input data, it processes the data and replaces Mustache placeholders with the corresponding values from the input data. The resulting HTML or text is then sent as output to the next node in the flow.

## Building JSON

The template node can be configured to parse the result of the input and template
as JSON, to further use the message as an object, not as string.

#### Input data

```js
{%- raw -%}
{
    payload: ['ACME', 1]
}
{% endraw %}
```

#### Template node configuration
* Template:
    ```text
    {%- raw -%}
    {
        "product": "{{payload.0}}",
        "version": {{payload.1}}
    }
    {% endraw %}
    ```
* Format: `Mustache template`
* Output as: `Parsed JSON`

#### Output

```json
{%- raw -%}
{ "product": "ACME", "version": 1 }
{% endraw %}
```

### Generating JavaScript object from YAML

Node-RED can also parse YAML 
#### Input data
```js
{%- raw -%}
{
    topic: 'FlowFuse',
    payload: 3000
}
{% endraw %}
```

#### template node configuration
* Template:
    ```text
    {%- raw -%}
    options:
        title: {{topic}}
        port: {{payload}}
    {% endraw %}
    ```
* Format: `Mustache template`
* Output as: `Parsed JSON`

#### Output
```json
{%- raw -%}
{ "title": "FlowFuse", "port": 3000 }
{% endraw %}
```

## Comments

When a template gets larger, it might be useful to add comments to the template
which will not appear in the output. Comments work about the same as the normal
syntax, with a `!` after the opening curly brackets: 

```mustache
{%- raw -%}
{{! this won't show }}
This text will be in the output
{% endraw %}
```

Will result in `This text will be in the output`. Note there's no empty line character `\n`.

### Mustache partials

Mustache by default supports partials to include. This is an unsupported feature
in Node-RED.