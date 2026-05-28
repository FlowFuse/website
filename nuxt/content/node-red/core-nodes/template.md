---
title: "Node-RED - Template Node"
---
# Template

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



::render-flow
---
height: 200
flow: "W3siaWQiOiI5N2Q3NDJlZWMxY2I3ZGJmIiwidHlwZSI6ImluamVjdCIsInoiOiJhNmI3ZWRlMmUxM2ZjYmRmIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcIm5hbWVcIjogXCJGbG93RnVzZVwifSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjE4MCwieSI6NjAsIndpcmVzIjpbWyJjODVkNzBiNDFmMzc0ZjAyIl1dfSx7ImlkIjoiYzg1ZDcwYjQxZjM3NGYwMiIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJhNmI3ZWRlMmUxM2ZjYmRmIiwibmFtZSI6IlRlbXBsYXRlIHVzaW5nIHBheWxvYWQubmFtZSIsImZpZWxkIjoicGF5bG9hZCIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6ImhhbmRsZWJhcnMiLCJzeW50YXgiOiJtdXN0YWNoZSIsInRlbXBsYXRlIjoiPHA+SGVsbG8geyUgcmF3ICV9YHt7cGF5bG9hZC5uYW1lfX0heyUgZW5kcmF3ICV9PC9wPiIsIm91dHB1dCI6InN0ciIsIngiOjQ1MCwieSI6NjAsIndpcmVzIjpbWyI2ZGY3MjE1NDU5ZGZiMjQwIl1dfSx7ImlkIjoiNmRmNzIxNTQ1OWRmYjI0MCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhNmI3ZWRlMmUxM2ZjYmRmIiwibmFtZSI6IlByaW50IFwiPHA+SGVsbG8sIEZsb3dGdXNlITwvcD5cIiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo3NTAsInkiOjYwLCJ3aXJlcyI6W119XQ=="
---
::



This example will output `<p>Hello FlowFuse!</p>`.

### Output

When the Template node receives input data, it processes the data and replaces Mustache placeholders with the corresponding values from the input data. The resulting HTML or text is then sent as output to the next node in the flow.

## Building JSON

The template node can be configured to parse the result of the input and template
as JSON, to further use the message as an object, not as string.

#### Input data

```js

{
    payload: ['ACME', 1]
}

```

#### Template node configuration
* Template:
    ```text
    
    {
        "product": "{{payload.0}}",
        "version": {{payload.1}}
    }
    
    ```
* Format: `Mustache template`
* Output as: `Parsed JSON`

#### Output

```json

{ "product": "ACME", "version": 1 }

```

### Generating JavaScript object from YAML

Node-RED can also parse YAML 
#### Input data
```js

{
    topic: 'FlowFuse',
    payload: 3000
}

```

#### template node configuration
* Template:
    ```text
    
    options:
        title: {{topic}}
        port: {{payload}}
    
    ```
* Format: `Mustache template`
* Output as: `Parsed JSON`

#### Output
```json

{ "title": "FlowFuse", "port": 3000 }

```

## Comments

When a template gets larger, it might be useful to add comments to the template
which will not appear in the output. Comments work about the same as the normal
syntax, with a `!` after the opening curly brackets: 

```mustache

{{! this won't show }}
This text will be in the output

```

Will result in `This text will be in the output`. Note there's no empty line character `\n`.

### Mustache partials

Mustache by default supports partials to include. This is an unsupported feature
in Node-RED.

## Node Documentation

<div class="core-node-doc">

<p>Sets a property based on the provided template.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt>msg <span class="property-type">object</span></dt>
<dd>A msg object containing information to populate the template.</dd>
<dt class="optional">template <span class="property-type">string</span></dt>
<dd>A template to be populated from <code>msg.payload</code>. If not configured in the edit panel,
this can be set as a property of msg.</dd>
</dl> <h3>Outputs</h3> <dl class="message-properties">
<dt>msg <span class="property-type">object</span></dt>
<dd>a msg with a property set by populating the configured template with properties from the incoming msg.</dd>
</dl> <h3>Details</h3> <p>By default this uses the <i><a href="http://mustache.github.io/mustache.5.html" target="_blank">mustache</a></i>
format, but this can be switched off if required.</p> <p>For example, when a template of:
<pre>Hello {{payload.name}}. Today is {{date}}</pre>
<p>receives a message containing:
<pre>{
date: "Monday",
payload: {
name: "Fred"
}
}</pre>
<p>The resulting property will be:
<pre>Hello Fred. Today is Monday</pre>
<p>It is possible to use a property from the flow context or global context. Just use <code>{{flow.name}}</code> or
<code>{{global.name}}</code>, or for persistable store <code>store</code> use <code>{{flow[store].name}}</code> or
<code>{{global[store].name}}</code>.
<p><b>Note: </b>By default, <i>mustache</i> will escape any non-alphanumeric or HTML entities in the values it substitutes.
To prevent this, use <code>{{{triple}}}</code> braces.</p>
<p>If you need to use <code>{{ }}</code> within your content, you can change the characters
used to mark the templated sections. For example, to use <code>[[ ]]</code>
instead, add the following line to the top of the template:</p>
<pre>{{=[[ ]]=}}</pre>
<h4>Using environment variables</h4>
<p>The template node can access environment variables using the syntax:</p>
<pre>My favourite colour is {{env.COLOUR}}.</pre>

</p></p></p></p>

</div>