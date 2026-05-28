---
title: "How to implement loops in Node-RED flows"
description: "Learn how to implement while, for, and for...of loops in Node-RED with core and custom nodes for efficient data processing and automation."
---

# {{meta.title}}

Handling repetitive tasks is a common challenge in automation and data processing. Whether you need to iterate over large datasets, perform calculations, or execute operations based on conditions multiple times, using loops can significantly enhance efficiency and scalability.

In this document, we’ll explore how to replicate different types of loops that are essential in various contexts. We’ll discuss their applications and provide examples to help you effectively implement them in Node-RED.

## What is a Loop?

A [loop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration) is a programming construct that allows you to execute a block of code repeatedly until a certain condition is met. Different types of loops are suited to different scenarios, depending on how and when you want the code to repeat:

- **For Loop**: Executes a block of code a specific number of times. This is useful when you know in advance how many times you need to iterate, such as iterating through a range of numbers or items in a list. It's also known as a fixed number loop.

- **While Loop**: Repeats a block of code as long as a specified condition is true. This type of loop is useful when you don’t know how many times the loop will need to run beforehand. The loop continues executing until the condition becomes false.

- **For...of / ForEach Loop**: These loops are used to iterate over iterable objects such as arrays or maps. They allow you to access each element in a collection. The **for...of** loop is used specifically for iterables, while **forEach** is a method available on arrays that applies a function to each element.

Each type of loop serves a different purpose and can be chosen based on the requirements of the task at hand.

## Implementing Loops in Node-RED

In this section, we’ll explore how to implement loops in Node-RED. First, we’ll demonstrate how to achieve looping with core nodes. Then, we’ll show how to accomplish similar tasks using custom nodes. We’ll also cover some essential operations typically performed using loops, providing practical examples to enhance your Node-RED flows.

### Implementing Loops in Node-RED with Core Nodes

#### While Loop

To demonstrate a while loop in Node-RED, we’ll create a flow that appends random characters to a string until it contains the character "Z". This example will help you understand how to simulate a while loop using Node-RED's core nodes.

1. Drag an **Inject** node onto the canvas. This node will trigger the start of the loop.
2. Add a **Change** node to initialize the string variable. Configure it to set `msg.i` to an empty string (`""`). Connect the **Inject** node to this **Change** node.
3. Place a **Switch** node on the canvas. Set it to check if `msg.i` contains the character "Z" (`msg.i.includes('Z')`). Add an additional rule for when this condition is not met (`otherwise`). Connect the output of the **Change** node to the input of the **Switch** node.
4. Add a **Function** node to append a random uppercase letter to the string. Use the following JavaScript code:
    ```javascript
    msg.i += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Append a random uppercase letter
    return msg;
    ```
    Connect this **Function** node to the second output of the **Switch** node (where the condition is `msg.i` does not contain "Z"). Then, connect the output of this **Function** node back to the input of the **Switch** node to repeat the process.
5. Drag a **Debug** node onto the canvas and connect it to the second output of the **Switch** node. This node will display the current value of `msg.i` in the debug panel.
6. Add another **Change** node to signal completion. Configure it to set `msg.payload` to `"completed"`. Connect this **Change** node to the first output of the **Switch** node (where `msg.i` contains "Z"), and then link it to another **Debug** node to show the completion message.

The flow will continuously append random letters to the string and print the value in the debug panel until the string contains "Z". Once the condition is met, the flow will print a "completed" message and terminate the loop.

```mermaid
graph TD
    A["Inject Node<br>Triggers the start of the loop"] --> B["Change Node<br>Initialize String<br>Sets msg.i = ' '"]
    B --> C["Switch Node<br>Check if msg.i contains 'Z'"]
    C -->|"msg.i contains 'Z'"| D["Change Node<br>Set msg.payload to 'completed'"]
    D --> E["Debug Node<br>Display Completion Message"]
    C -->|"msg.i does not contain 'Z'"| F["Function Node<br>Append Random Character<br>Sets msg.i += random uppercase letter"]
    F --> C
    F --> G["Debug Node<br>Display Current String"]
```



::render-flow
---
height: 200
flow: "W3siaWQiOiJlOTBkYzJlNTBlNDA4OTZjIiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiV2hpbGUgTG9vcCIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiY2Y2ZWJmMDJkMDBlYWNhNiIsIjY5NmQ4OWFhNDA1MGNkMTMiLCIwZTJkOWYwNDQ3Y2Y2MjI2IiwiYmI2MDc0Y2RmNDM5OGNiNiIsImUxOTMwNGFiMzExOTkzMTUiLCJjNDY3NTA5YzY2NmVlNDAwIiwiMDZiYjA4ZTNmMGQ3ODg4YSJdLCJ4IjozNCwieSI6MTM5LCJ3IjoxMDkyLCJoIjoyNDJ9LHsiaWQiOiJjZjZlYmYwMmQwMGVhY2E2IiwidHlwZSI6InN3aXRjaCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6ImU5MGRjMmU1MGU0MDg5NmMiLCJuYW1lIjoiRG9lcyB0aGUgbXNnLmkgY29udGFpbnMgWiIsInByb3BlcnR5IjoiaSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiY29udCIsInYiOiJaIiwidnQiOiJzdHIifSx7InQiOiJlbHNlIn1dLCJjaGVja2FsbCI6InRydWUiLCJyZXBhaXIiOmZhbHNlLCJvdXRwdXRzIjoyLCJ4Ijo1OTAsInkiOjI0MCwid2lyZXMiOltbImM0Njc1MDljNjY2ZWU0MDAiXSxbIjBlMmQ5ZjA0NDdjZjYyMjYiLCIwNmJiMDhlM2YwZDc4ODhhIl1dfSx7ImlkIjoiNjk2ZDg5YWE0MDUwY2QxMyIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6ImU5MGRjMmU1MGU0MDg5NmMiLCJuYW1lIjoiRW5kIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMDMwLCJ5IjoxODAsIndpcmVzIjpbXX0seyJpZCI6IjBlMmQ5ZjA0NDdjZjYyMjYiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiJlOTBkYzJlNTBlNDA4OTZjIiwibmFtZSI6Ik91dHB1dCBcImlcIiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImkiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo5MDAsInkiOjI2MCwid2lyZXMiOltdfSx7ImlkIjoiYmI2MDc0Y2RmNDM5OGNiNiIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiJlOTBkYzJlNTBlNDA4OTZjIiwibmFtZSI6IlN0YXJ0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6IiIsInRvcGljIjoiIiwicGF5bG9hZCI6IltcImhlbGxvXCIsXCJydW5cIixcIndoeVwiXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjEzMCwieSI6MjQwLCJ3aXJlcyI6W1siZTE5MzA0YWIzMTE5OTMxNSJdXX0seyJpZCI6ImUxOTMwNGFiMzExOTkzMTUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiZTkwZGMyZTUwZTQwODk2YyIsIm5hbWUiOiJpbml0aWxpemVkIGkgd2l0aCBlbXB0eSBzdHJpbmciLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJpIiwicHQiOiJtc2ciLCJ0byI6IiIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4IjozMjAsInkiOjI0MCwid2lyZXMiOltbImNmNmViZjAyZDAwZWFjYTYiXV19LHsiaWQiOiJjNDY3NTA5YzY2NmVlNDAwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6ImU5MGRjMmU1MGU0MDg5NmMiLCJuYW1lIjoiaWYgbm90IFNldCBwYXlsb2FkIHRvIFwiY29tcGxldGVkXCIiLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IkNvbXBsZXRlZCIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3OTAsInkiOjE4MCwid2lyZXMiOltbIjY5NmQ4OWFhNDA1MGNkMTMiXV19LHsiaWQiOiIwNmJiMDhlM2YwZDc4ODhhIiwidHlwZSI6ImZ1bmN0aW9uIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiZTkwZGMyZTUwZTQwODk2YyIsIm5hbWUiOiJBcHBlbmQgUmFuZG9tIExldHRlciIsImZ1bmMiOiIvLyBhZGQgQVNDSUkgY2hhciBmcm9tIDMyIHRvIDEyNlxubXNnLmkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLnJhbmRvbSgpKjI2ICsgNjUpO1xucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjoiIiwibm9lcnIiOjAsImluaXRpYWxpemUiOiIiLCJmaW5hbGl6ZSI6IiIsImxpYnMiOltdLCJ4Ijo1OTAsInkiOjM0MCwid2lyZXMiOltbImNmNmViZjAyZDAwZWFjYTYiXV19XQ=="
---
::



#### For Loop

In traditional programming, `for` loops iterate a set number of times based on an index or range, while `while` loops execute as long as a condition is `true`.

In Node-RED, you can simulate a `for` loop by managing a counter with nodes to iterate through array elements. By incrementing an index variable, you can access each element and perform operations, effectively mimicking the behavior of a traditional `for` loop.

Here’s how you can set up a `for` loop in Node-RED:

1. Drag an **Inject** node onto the canvas and set the `msg.payload` to `["foo","bar","foobar"]`. This node triggers the start of the loop and provides the array to process.
2. Add a **Change** node to initialize the loop counter. Configure it to set `msg.i` to `0`, and connect the **Inject** node to this **Change** node.
3. Next, drag a **Switch** node onto the canvas. Configure it to check if `msg.i` is equal to the array length (`msg.i == msg.payload.length`). Add an additional rule for when this condition is not met (`otherwise`). Connect the **Change** node to the **Switch** node.
4. Add another **Change** node to increment the counter. Configure it to set `msg.i` to `i + 1` using a JSONata expression. Connect this **Change** node to the output of the **Switch** node where the condition (`msg.i < msg.payload.length`) is true (second output).
5. To access and display the array elements, drag a **Change** node onto the canvas. Configure it to set `msg.payload` to `msg.payload[msg.i]`, accessing the array element at the current index. Connect this **Change** node to the **Switch** node's second output (`otherwise`).
6. Attach a **Debug** node to the output of this **Change** node to print the current array element.
7. For the final step, add another **Change** node to signal when the loop has completed. Configure it to set `msg.payload` to `completed`, and connect it to the first output of the **Switch** node where the loop condition is `msg.i == msg.payload.length`. Finally, attach a **Debug** node to display the completion message.

This flow will iterate through the array, printing each element until all elements have been processed. Once the loop reaches the end of the array, it prints a "completed" message and terminates.

```mermaid
graph TD
    A["Inject Node<br>Sets msg.payload to array"] --> B["Change Node<br>Initialize Counter<br>Sets msg.i = 0"]
    B --> C["Switch Node<br>Check if msg.i == msg.payload.length"]
    C -->|"msg.i < msg.payload.length"| D["Change Node<br>Increment Counter<br>Sets msg.i = msg.i + 1"]
    D --> E["Change Node<br>Access Element<br>Sets msg.payload = msg.payload[msg.i]"]
    E --> F["Debug Node<br>Display Current Element"]
    C -->|"msg.i == msg.payload.length"| G["Change Node<br>Loop Completion<br>Sets msg.payload = 'completed'"]
    G --> H["Debug Node<br>Display Completion Message"]
```



::render-flow
---
height: 200
flow: "W3siaWQiOiIzYjU0NmUwNjEyNjczNDc4IiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiRm9yTG9vcCIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiOGVlMTZjMWQwNmZjYTlmZSIsIjY0YTRhNzMyOTYzMWQ3Y2UiLCJlNjdhMzQyODVhN2U2OTc5IiwiZTIwNzRjZjAxZWQ0NTFmZCIsIjgxMWNlZGJlN2NiODk0MTUiLCI4YmJjY2MyZDEwYzM2YmZlIiwiODI2ZDgxOWEwNjgxMDE4NCIsImU3ZWJmN2Y2NmNkYTEzNzAiXSwieCI6MTQsInkiOjE1OSwidyI6MTI5MiwiaCI6MjQyfSx7ImlkIjoiOGVlMTZjMWQwNmZjYTlmZSIsInR5cGUiOiJzd2l0Y2giLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiIzYjU0NmUwNjEyNjczNDc4IiwibmFtZSI6ImlmIG1zZy5pID09IG1zZy5wYXlsb2FkLmxlbmd0aCIsInByb3BlcnR5IjoiaSIsInByb3BlcnR5VHlwZSI6Im1zZyIsInJ1bGVzIjpbeyJ0IjoiZXEiLCJ2IjoicGF5bG9hZC5sZW5ndGgiLCJ2dCI6Im1zZyJ9LHsidCI6ImVsc2UifV0sImNoZWNrYWxsIjoidHJ1ZSIsInJlcGFpciI6ZmFsc2UsIm91dHB1dHMiOjIsIngiOjU1MCwieSI6MjgwLCJ3aXJlcyI6W1siOGJiY2NjMmQxMGMzNmJmZSJdLFsiZTdlYmY3ZjY2Y2RhMTM3MCIsIjgyNmQ4MTlhMDY4MTAxODQiXV19LHsiaWQiOiI2NGE0YTczMjk2MzFkN2NlIiwidHlwZSI6ImRlYnVnIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiM2I1NDZlMDYxMjY3MzQ3OCIsIm5hbWUiOiJFbmQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJ0cnVlIiwidGFyZ2V0VHlwZSI6ImZ1bGwiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEyMTAsInkiOjIwMCwid2lyZXMiOltdfSx7ImlkIjoiZTY3YTM0Mjg1YTdlNjk3OSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjNiNTQ2ZTA2MTI2NzM0NzgiLCJuYW1lIjoiT3V0cHV0IFwiaVwiIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEwODAsInkiOjM0MCwid2lyZXMiOltdfSx7ImlkIjoiZTIwNzRjZjAxZWQ0NTFmZCIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiIzYjU0NmUwNjEyNjczNDc4IiwibmFtZSI6IlN0YXJ0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6IiIsInRvcGljIjoiIiwicGF5bG9hZCI6IltcImhlbGxvXCIsXCJydW5cIixcIndoeVwiXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjExMCwieSI6MjgwLCJ3aXJlcyI6W1siODExY2VkYmU3Y2I4OTQxNSJdXX0seyJpZCI6IjgxMWNlZGJlN2NiODk0MTUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiM2I1NDZlMDYxMjY3MzQ3OCIsIm5hbWUiOiJpbml0aWxpemVkIGkgd2l0aCAwIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiaSIsInB0IjoibXNnIiwidG8iOiIwIiwidG90IjoibnVtIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjI4MCwieSI6MjgwLCJ3aXJlcyI6W1siOGVlMTZjMWQwNmZjYTlmZSJdXX0seyJpZCI6IjhiYmNjYzJkMTBjMzZiZmUiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiM2I1NDZlMDYxMjY3MzQ3OCIsIm5hbWUiOiJJZiAnaScgZXF1YWxzIGFycmF5IGxlbmd0aCwgc2V0IHBheWxvYWQgdG8gXCJjb21wbGV0ZWRcIi4iLCJydWxlcyI6W3sidCI6InNldCIsInAiOiJwYXlsb2FkIiwicHQiOiJtc2ciLCJ0byI6IkNvbXBsZXRlZCIsInRvdCI6InN0ciJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo5MTAsInkiOjIwMCwid2lyZXMiOltbIjY0YTRhNzMyOTYzMWQ3Y2UiXV19LHsiaWQiOiI4MjZkODE5YTA2ODEwMTg0IiwidHlwZSI6ImNoYW5nZSIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjNiNTQ2ZTA2MTI2NzM0NzgiLCJuYW1lIjoiQWNjZXNzIGFycmF5IGVsZW1lbnQgd2l0aCBpIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiJwYXlsb2FkW21zZy5pXSIsInRvdCI6Im1zZyJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo4NjAsInkiOjM0MCwid2lyZXMiOltbImU2N2EzNDI4NWE3ZTY5NzkiXV19LHsiaWQiOiJlN2ViZjdmNjZjZGExMzcwIiwidHlwZSI6ImNoYW5nZSIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjNiNTQ2ZTA2MTI2NzM0NzgiLCJuYW1lIjoiaW5jcmVtZW50IGkgYnkgMSIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImkiLCJwdCI6Im1zZyIsInRvIjoiaSsxIiwidG90IjoianNvbmF0YSJ9XSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo1NDAsInkiOjM2MCwid2lyZXMiOltbIjhlZTE2YzFkMDZmY2E5ZmUiXV19XQ=="
---
::



#### For...of / ForEach Loop

In traditional programming, `for...of` and `forEach` loops are commonly used to iterate through arrays or object properties, allowing for individual element processing. Since Node-RED doesn’t include these specific constructs, you can replicate their functionality by using a combination of nodes, particularly the **[Split](/node-red/core-nodes/split/)** and **[Join](/node-red/core-nodes/join/)** nodes.

Here’s how you can replicate this functionality in Node-RED:

1. Drag an **Inject** node onto the canvas and set the `msg.payload` to `["foo", "bar", "foobar"]`.
2. Drag a **Split** node onto the canvas. Keep the default settings. If you are working with a string, ensure you select the appropriate delimiter for splitting.
3. Optionally, use a **Change** or **Function** node to perform operations on each element if needed.
4. Drag a **Debug** node onto the canvas and connect it to the **Split** node’s output.

When you click the **Inject** button, the **Split** node will process each element of the array individually, and the **Debug** node will display each one in the debug window.

To explore how you can map, sort, filter, and reduce data using this approach, check out our guide: [How to Filter, Map, Sort, and Reduce Data in Node-RED](/node-red/getting-started/programming/data-tranformation/).

```mermaid
graph TD
    A["Inject Node"] --> B["Split Node"]
    B -->|Outputs Each Element Individually| C["Debug Node"]
    
    A["Inject Node\nSets msg.payload to array"]
    B["Split Node\nSplits array into individual elements"]
    C["Debug Node\nDisplays each element"]
```



::render-flow
---
height: 200
flow: "W3siaWQiOiIyZTY3YjI3MzlmMzY0YTcxIiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJzdHlsZSI6eyJzdHJva2UiOiIjOTk5OTk5Iiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6Im5vbmUiLCJmaWxsLW9wYWNpdHkiOiIxIiwibGFiZWwiOnRydWUsImxhYmVsLXBvc2l0aW9uIjoibnciLCJjb2xvciI6IiNhNGE0YTQifSwibm9kZXMiOlsiMmFkZDI3MDVkMjYyMDEwZCIsIjQwMzMzYzczNjg0NGEwYzEiLCIzMzM3YmEwMjRhMzYzYTE1IiwiMmY3ZDJhYWIxMmIzYjRlOSJdLCJ4IjoyNTQsInkiOjIxOSwidyI6NTMyLCJoIjoxNjJ9LHsiaWQiOiIyYWRkMjcwNWQyNjIwMTBkIiwidHlwZSI6ImluamVjdCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjJlNjdiMjczOWYzNjRhNzEiLCJuYW1lIjoiQXJyYXkiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IltcImZvb1wiLFwiYmFyXCIsXCJmb29iYXJcIl0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjozNTAsInkiOjM0MCwid2lyZXMiOltbIjQwMzMzYzczNjg0NGEwYzEiXV19LHsiaWQiOiI0MDMzM2M3MzY4NDRhMGMxIiwidHlwZSI6InNwbGl0IiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiMmU2N2IyNzM5ZjM2NGE3MSIsIm5hbWUiOiIiLCJzcGx0IjoiXFxuIiwic3BsdFR5cGUiOiJzdHIiLCJhcnJheVNwbHQiOjEsImFycmF5U3BsdFR5cGUiOiJsZW4iLCJzdHJlYW0iOmZhbHNlLCJhZGRuYW1lIjoiIiwicHJvcGVydHkiOiJwYXlsb2FkIiwieCI6NTMwLCJ5IjozMjAsIndpcmVzIjpbWyIzMzM3YmEwMjRhMzYzYTE1Il1dfSx7ImlkIjoiMzMzN2JhMDI0YTM2M2ExNSIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjJlNjdiMjczOWYzNjRhNzEiLCJuYW1lIjoiIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoidHJ1ZSIsInRhcmdldFR5cGUiOiJmdWxsIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4Ijo2OTAsInkiOjMyMCwid2lyZXMiOltdfSx7ImlkIjoiMmY3ZDJhYWIxMmIzYjRlOSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiIyZTY3YjI3MzlmMzY0YTcxIiwibmFtZSI6Ik9iamVjdCIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IntcImZpcnN0XCI6XCJIZWxsbyBXb3JsZFwiLFwic2Vjb25kXCI6OCxcInRoaXJkXCI6dHJ1ZX0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4IjozNTAsInkiOjI2MCwid2lyZXMiOltbIjQwMzMzYzczNjg0NGEwYzEiXV19XQ=="
---
::



#### Implementing Loops with the Function Node

Implementing loops with the **[Function](/node-red/core-nodes/function/)** node is straightforward if you're familiar with JavaScript, as it allows you to write custom code. However, a common issue is figuring out how to send a message on each iteration without ending the loop after the first iteration. In this section, we’ll show you how to implement loops in the `Function` node correctly, ensuring that each iteration is processed and sent out properly without prematurely breaking the loop.

For demonstration purposes, we will implement a `for` loop.

1. Drag the **Inject** node onto the canvas and set the `msg.payload` to `[1, "hello", "%", true]`.
2. Drag the **Function** node onto the canvas and add the following JavaScript code:
   ```javascript
   for (let i = 0; i < msg.payload.length; i++) {
       // Create a new message for each item
       let newMsg = { ...msg }; // Copy the original msg object
       newMsg.payload = msg.payload[i]; // Set payload to the current item
       node.send(newMsg); // Send the message
   }
   ```
3. Drag a **Debug** node onto the canvas and connect it to the output of the **Function** node.

When you deploy the flow and click the **Inject** button, each item in the array will be sent as a separate message and printed in the debug panel. This works because the `node.send()` method allows you to send messages asynchronously. Unlike `return`, which ends the execution of the **Function** node immediately, `node.send()` continues to process and send each message without halting the loop.

By using `node.send()` inside the loop, you ensure that each iteration produces a separate message, and the Function node can handle multiple messages efficiently. For more information on on this, refer to [Documentation on Sending messages asynchronously](https://nodered.org/docs/user-guide/writing-functions#sending-messages-asynchronously).



::render-flow
---
height: 200
flow: "W3siaWQiOiI1MGJlMmJhYzNiMDU4YmU1IiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiIiwic3R5bGUiOnsibGFiZWwiOnRydWV9LCJub2RlcyI6WyI5N2MyODhmMzI5NTVjNmFiIiwiN2E4NDA0YzQ0YWMwNzQ5YiIsIjBkN2I5Y2I1MTY2OWFkOWIiXSwieCI6NDE0LCJ5Ijo0OTksInciOjYxMiwiaCI6ODJ9LHsiaWQiOiI5N2MyODhmMzI5NTVjNmFiIiwidHlwZSI6ImluamVjdCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjUwYmUyYmFjM2IwNThiZTUiLCJuYW1lIjoiQXJyYXkiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IlsxLCBcImhlbGxvXCIsIFwiJVwiLCB0cnVlXSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjUxMCwieSI6NTQwLCJ3aXJlcyI6W1siN2E4NDA0YzQ0YWMwNzQ5YiJdXX0seyJpZCI6IjdhODQwNGM0NGFjMDc0OWIiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI1MGJlMmJhYzNiMDU4YmU1IiwibmFtZSI6IkZvciBMb29wIiwiZnVuYyI6ImZvciAobGV0IGkgPSAwOyBpIDwgbXNnLnBheWxvYWQubGVuZ3RoOyBpKyspIHtcbiAgICAvLyBDcmVhdGUgYSBuZXcgbWVzc2FnZSBmb3IgZWFjaCBpdGVtXG4gICAgbGV0IG5ld01zZyA9IHsgLi4ubXNnIH07IC8vIENvcHkgdGhlIG9yaWdpbmFsIG1zZyBvYmplY3RcbiAgICBuZXdNc2cucGF5bG9hZCA9IG1zZy5wYXlsb2FkW2ldOyAvLyBTZXQgcGF5bG9hZCB0byB0aGUgY3VycmVudCBpdGVtXG4gICAgbm9kZS5zZW5kKG5ld01zZylcbn0iLCJvdXRwdXRzIjoxLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjcwMCwieSI6NTQwLCJ3aXJlcyI6W1siMGQ3YjljYjUxNjY5YWQ5YiJdXX0seyJpZCI6IjBkN2I5Y2I1MTY2OWFkOWIiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI1MGJlMmJhYzNiMDU4YmU1IiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTIwLCJ5Ijo1NDAsIndpcmVzIjpbXX1d"
---
::



### Implementing Loops in Node-RED with Custom node

Throughtout this section we will show you how you can implement loops in Node-RED with custom nodes easily, there are plenty of custom nodes that can be used to achieve the loop but we will going use the popular one [node-red-contrib-loop](https://flows.nodered.org/node/node-red-contrib-loop), before moving further make sure to install it by palette manager also for demostration purpose we will use same example we used in the above sections with loops.

#### While Loop

1. Drag the **Inject** node onto the canvas.
2. Drag the **Loop** node onto the canvas, double-click it, and set the kind to **Condition**. Set the condition to `msg.payload.includes("Z") != true` as JavaScript. The condition kind offers a lot of flexibility as it allows adding conditions in JavaScript, regex, and JSONata.

3. Set the "When test" option:
  - Choose "after" if you want the loop to execute at least once before checking the condition, similar to how a while loop operates when it checks the condition after the first iteration.
  - Choose "before" if you want the loop to check the condition before executing, functioning like a traditional while loop that only runs if the condition is true at the start.

4. Drag the **Function** node onto the canvas. Add the following JavaScript code to it and connect its input to the second output of the **Loop** node:

    ```javascript
    msg.i += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Append a random uppercase letter
    return msg;
    ```

5. Drag the **Delay** node onto the canvas, set the delay to 0.5 milliseconds. When using the condition kind of loop, it is important to use the **Delay** node with this loop custom node to avoid creating an infinite loop. Connect the **Delay** node's input to the output of the **Function** node, and connect its output to the input of the **Loop** node.
6. Drag a **Debug** node onto the canvas and connect its input to the output of the **Function** node. This will print the current `msg.payload` after each iteration.
7. Drag another **Debug** node onto the canvas and connect its input to the first output of the **Loop** node. This will print when the loop exits, indicating that the condition has been met.



::render-flow
---
height: 200
flow: "W3siaWQiOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiV2hpbGUgTG9vcCIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiM2JhOTMxYjEuZmI0OGQ2IiwiMmQyOTdkZmEuNmU2NjBhIiwiNWFlZjI4ZS4wZjllN2Q4IiwiOTBjNDkwMDguMDUzYTU4IiwiOWE3MjU2NjguMzMwMTQ4IiwiZTg4YjBlOGMuZDM5ODU4IiwiOWM0OGYzMzYuNDcxZWEiLCI2NjE0NGFmNC5kMWVjOWMiLCI3NWM2YjMyNi5lOTM0ZDQiLCI3N2FjNjc2My44ZTU0YjgiLCI5OWIyNjViNC5lMmQzYzgiXSwieCI6MTc0LCJ5IjoxMzksInciOjY3MiwiaCI6MzIyfSx7ImlkIjoiM2JhOTMxYjEuZmI0OGQ2IiwidHlwZSI6Imxvb3AiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IiIsImtpbmQiOiJjb25kIiwiY291bnQiOiIxMCIsImluaXRpYWwiOiIxIiwic3RlcCI6IjEiLCJjb25kaXRpb24iOiJtc2cucGF5bG9hZC5pbmNsdWRlcyhcIlpcIikgIT0gdHJ1ZSIsImNvbmRpdGlvblR5cGUiOiJqcyIsIndoZW4iOiJhZnRlciIsImVudW1lcmF0aW9uIjoiZW51bSIsImVudW1lcmF0aW9uVHlwZSI6Im1zZyIsImxpbWl0IjoiIiwibG9vcFBheWxvYWQiOiJsb29wLWtlZXAiLCJmaW5hbFBheWxvYWQiOiJmaW5hbC1sYXN0IiwieCI6NTAwLCJ5IjoyODAsIndpcmVzIjpbWyI1YWVmMjhlLjBmOWU3ZDgiXSxbImU4OGIwZThjLmQzOTg1OCJdXX0seyJpZCI6IjJkMjk3ZGZhLjZlNjYwYSIsInR5cGUiOiJpbmplY3QiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJzdHIiLCJ4IjoyNzAsInkiOjI4MCwid2lyZXMiOltbIjNiYTkzMWIxLmZiNDhkNiJdXX0seyJpZCI6IjVhZWYyOGUuMGY5ZTdkOCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjdlZjRkNDFjZjc0Zjc1YzMiLCJuYW1lIjoiIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoibG9vcCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjcyMCwieSI6MjgwLCJ3aXJlcyI6W119LHsiaWQiOiI5MGM0OTAwOC4wNTNhNTgiLCJ0eXBlIjoiY29tbWVudCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjdlZjRkNDFjZjc0Zjc1YzMiLCJuYW1lIjoiRXhhbXBsZTogQ29uZGl0aW9uYWwgbG9vcCIsImluZm8iOiIiLCJ4IjozMTAsInkiOjE4MCwid2lyZXMiOltdfSx7ImlkIjoiOWE3MjU2NjguMzMwMTQ4IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IlNob3cgZmluYWwgc3RhdHVzIiwiaW5mbyI6IiIsIngiOjc0MCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiJlODhiMGU4Yy5kMzk4NTgiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IiIsImZ1bmMiOiIvLyBhZGQgQVNDSUkgY2hhciBmcm9tIDMyIHRvIDEyNlxubXNnLnBheWxvYWQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShNYXRoLnJhbmRvbSgpKjI2ICsgNjUpO1xucmV0dXJuIG1zZzsiLCJvdXRwdXRzIjoxLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwieCI6MzQwLCJ5IjozODAsIndpcmVzIjpbWyI2NjE0NGFmNC5kMWVjOWMiLCI5YzQ4ZjMzNi40NzFlYSJdXX0seyJpZCI6IjljNDhmMzM2LjQ3MWVhIiwidHlwZSI6ImRlYnVnIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiN2VmNGQ0MWNmNzRmNzVjMyIsIm5hbWUiOiIiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6NzMwLCJ5IjozODAsIndpcmVzIjpbXX0seyJpZCI6IjY2MTQ0YWY0LmQxZWM5YyIsInR5cGUiOiJkZWxheSIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjdlZjRkNDFjZjc0Zjc1YzMiLCJuYW1lIjoiIiwicGF1c2VUeXBlIjoiZGVsYXkiLCJ0aW1lb3V0IjoiMC41IiwidGltZW91dFVuaXRzIjoibWlsbGlzZWNvbmRzIiwicmF0ZSI6IjEiLCJuYlJhdGVVbml0cyI6IjEiLCJyYXRlVW5pdHMiOiJzZWNvbmQiLCJyYW5kb21GaXJzdCI6IjEiLCJyYW5kb21MYXN0IjoiNSIsInJhbmRvbVVuaXRzIjoic2Vjb25kcyIsImRyb3AiOmZhbHNlLCJhbGxvd3JhdGUiOmZhbHNlLCJvdXRwdXRzIjoxLCJ4Ijo1MzAsInkiOjM1NSwid2lyZXMiOltbIjNiYTkzMWIxLmZiNDhkNiJdXX0seyJpZCI6Ijc1YzZiMzI2LmU5MzRkNCIsInR5cGUiOiJjb21tZW50IiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiN2VmNGQ0MWNmNzRmNzVjMyIsIm5hbWUiOiJTaG93IHN0cmluZyIsImluZm8iOiIiLCJ4Ijo3MzAsInkiOjQyMCwid2lyZXMiOltdfSx7ImlkIjoiNzdhYzY3NjMuOGU1NGI4IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IkFkZCBjaGFyIHRvIHN0cmluZyIsImluZm8iOiIiLCJ4IjozNzAsInkiOjQyMCwid2lyZXMiOltdfSx7ImlkIjoiOTliMjY1YjQuZTJkM2M4IiwidHlwZSI6ImNvbW1lbnQiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI3ZWY0ZDQxY2Y3NGY3NWMzIiwibmFtZSI6IlJlcGVhdCB1bnRpbCBzdHJpbmcgZG9lc24ndCBmaW5pc2ggd2l0aCBcIlpcIiIsImluZm8iOiIiLCJ4Ijo0ODAsInkiOjI0MCwid2lyZXMiOltdfV0="
---
::



#### For Loop

1. Drag an **Inject** node onto the canvas and set the `msg.payload` to `["foo", "bar", "foobar"]`. This node will trigger the start of the loop and provide the array we want to process.
2. Drag a **Change** node onto the canvas. Configure it to set `msg.count` to `msg.payload.length`, which will store the length of the array. Connect the **Inject** node to this **Change** node.
3. Drag a **Loop** node onto the canvas, double-click on it, and set the kind to **Fixed**. Leave the "count" field empty as we are setting it dynamically using `msg.count`. Set the initial value to `0` and the step value to `1`. Set the loop payload to the original `msg.payload`.
4. Next, drag a **Change** node onto the canvas and configure it to either clear or set `msg.payload` to itself. This ensures that the payload remains unchanged. Connect its input to the output of the **Loop** node and then connect its output back to the input of the **Loop** node. This setup allows the loop to repeat.
5. Then, drag another **Change** node onto the canvas. Configure this node to set `msg.payload` to `msg.payload[msg.loop.value]`, which extracts the current array element using the loop’s counter (`msg.loop.value`). The **Loop** node generates properties like `value`, which is the counter we are incrementing.
6. Finally, drag a **Debug** node onto the canvas and connect it to the output of the previous **Change** node to print the current array element in each iteration.



::render-flow
---
height: 200
flow: "W3siaWQiOiJhYzRiZmVhZDMwYmU3MzgwIiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiRm9yIExvb3AiLCJzdHlsZSI6eyJsYWJlbCI6dHJ1ZX0sIm5vZGVzIjpbIjJmZmMzZDA3LjIzZTZmYSIsIjZlMTExOGIxLjQ0OWRiOCIsImVhODUyNjY3ZDcyNGNmYjEiLCI4ODBhMjUwMWY3ZDE1M2JhIiwiYmQ1OGE5NTYuYzAzNmIiLCI2MGE4ZjEzOC4wOTA5YSIsIjQ0ZjFhMjk0MDMxNTdiYmEiXSwieCI6NzQsInkiOjE5OSwidyI6MTEzMiwiaCI6MjAyfSx7ImlkIjoiMmZmYzNkMDcuMjNlNmZhIiwidHlwZSI6ImluamVjdCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6ImFjNGJmZWFkMzBiZTczODAiLCJuYW1lIjoiIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJbXCJmb29cIixcImJhclwiLFwiZm9vYmFyXCJdIiwicGF5bG9hZFR5cGUiOiJqc29uIiwieCI6MjEwLCJ5IjoyNjAsIndpcmVzIjpbWyI4ODBhMjUwMWY3ZDE1M2JhIl1dfSx7ImlkIjoiNmUxMTE4YjEuNDQ5ZGI4IiwidHlwZSI6Imxvb3AiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiJhYzRiZmVhZDMwYmU3MzgwIiwibmFtZSI6IiIsImtpbmQiOiJmY250IiwiY291bnQiOiIiLCJpbml0aWFsIjoiMCIsInN0ZXAiOiIxIiwiY29uZGl0aW9uIjoiIiwiY29uZGl0aW9uVHlwZSI6ImpzIiwid2hlbiI6ImJlZm9yZSIsImVudW1lcmF0aW9uIjoiZW51bSIsImVudW1lcmF0aW9uVHlwZSI6Im1zZyIsImxpbWl0IjoiIiwibG9vcFBheWxvYWQiOiJsb29wLW9yaWciLCJmaW5hbFBheWxvYWQiOiJmaW5hbC1sYXN0IiwieCI6NzEwLCJ5IjoyNjAsIndpcmVzIjpbWyI0NGYxYTI5NDAzMTU3YmJhIl0sWyJiZDU4YTk1Ni5jMDM2YiJdXX0seyJpZCI6ImVhODUyNjY3ZDcyNGNmYjEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiYWM0YmZlYWQzMGJlNzM4MCIsIm5hbWUiOiJBY2Nlc3MgYXJyYXkgZWxlbWVudCB3aXRoIGxvb3AgY291bnRlciIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6InBheWxvYWQiLCJwdCI6Im1zZyIsInRvIjoicGF5bG9hZFttc2cubG9vcC52YWx1ZV0iLCJ0b3QiOiJtc2cifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6ODQwLCJ5IjozNjAsIndpcmVzIjpbWyI2MGE4ZjEzOC4wOTA5YSJdXX0seyJpZCI6Ijg4MGEyNTAxZjdkMTUzYmEiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiYWM0YmZlYWQzMGJlNzM4MCIsIm5hbWUiOiJTZXQgUGFzcyBDb3VudCIsInJ1bGVzIjpbeyJ0Ijoic2V0IiwicCI6ImNvdW50IiwicHQiOiJtc2ciLCJ0byI6InBheWxvYWQubGVuZ3RoIiwidG90IjoibXNnIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjQ0MCwieSI6MjYwLCJ3aXJlcyI6W1siNmUxMTE4YjEuNDQ5ZGI4Il1dfSx7ImlkIjoiYmQ1OGE5NTYuYzAzNmIiLCJ0eXBlIjoiY2hhbmdlIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiYWM0YmZlYWQzMGJlNzM4MCIsIm5hbWUiOiJSZXBlYXQiLCJydWxlcyI6W10sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6NTIwLCJ5IjozNjAsIndpcmVzIjpbWyI2ZTExMThiMS40NDlkYjgiLCJlYTg1MjY2N2Q3MjRjZmIxIl1dfSx7ImlkIjoiNjBhOGYxMzguMDkwOWEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiJhYzRiZmVhZDMwYmU3MzgwIiwibmFtZSI6IiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InBheWxvYWQiLCJ0YXJnZXRUeXBlIjoibXNnIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMDkwLCJ5IjozNjAsIndpcmVzIjpbXX0seyJpZCI6IjQ0ZjFhMjk0MDMxNTdiYmEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiJhYzRiZmVhZDMwYmU3MzgwIiwibmFtZSI6IkVuZCBMb29wIiwiYWN0aXZlIjp0cnVlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoicGF5bG9hZCIsInRhcmdldFR5cGUiOiJtc2ciLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEwMDAsInkiOjI0MCwid2lyZXMiOltdfV0="
---
::



#### For...of / ForEach Loop

1. Drag an **Inject** node onto the canvas and set the `msg.payload` to `[6, 14, 36, -8, 100]`. This node will trigger the loop and provide the array of numbers to process.
2. Drag a **Loop** node onto the canvas. Set the **Kind** to **Enumeration** and choose `msg.payload` as the enumeration source. This configuration will loop through each value in the array. Set the "loop payload" to the "value".
3. Drag a **Change** node onto the canvas and configure it to either clear or set `msg.payload` to itself. This ensures that the payload remains unchanged during each iteration. Connect its input to the second output of the **Loop** node, then connect its output back to the input of the **Loop** node to create the loop.
4. Finally, drag a **Debug** node onto the canvas and connect it to the second output of the **Loop** node. This will display the current value being processed in the loop.

With the **Enumeration** kind, you can iterate through different types of data such as arrays, strings, objects, and more, making this loop versatile for handling various data structures.



::render-flow
---
height: 200
flow: "W3siaWQiOiI2NWQ4NTRjOTA5ODM5M2U4IiwidHlwZSI6Imdyb3VwIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJuYW1lIjoiRm9yIG9mLyBmb3IgZWFjaCIsInN0eWxlIjp7ImxhYmVsIjp0cnVlfSwibm9kZXMiOlsiMzg2MzBmZjEuMjE3MjEiLCJmMDA5ZTBlOS4yNDU3NiIsImNmNTJiNmRkLjVmZWJiOCIsIjMzMDMxYzBlLjFiMTE1YyIsImIyOGIwNmYxLjM4ZWI0OCIsIjZlNTkzZmYyLmRjOTRjIl0sIngiOjMzNCwieSI6MjE5LCJ3Ijo3MjIsImgiOjIyMn0seyJpZCI6IjM4NjMwZmYxLjIxNzIxIiwidHlwZSI6ImluamVjdCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjY1ZDg1NGM5MDk4MzkzZTgiLCJuYW1lIjoiT2JqZWN0IiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn0seyJwIjoidG9waWMiLCJ2dCI6InN0ciJ9XSwicmVwZWF0IjoiIiwiY3JvbnRhYiI6IiIsIm9uY2UiOmZhbHNlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoie1wiZmlyc3RcIjpcIkhlbGxvIFdvcmxkXCIsXCJzZWNvbmRcIjo4LFwidGhpcmRcIjp0cnVlfSIsInBheWxvYWRUeXBlIjoianNvbiIsIngiOjQzMCwieSI6MjYwLCJ3aXJlcyI6W1siZjAwOWUwZTkuMjQ1NzYiXV19LHsiaWQiOiJmMDA5ZTBlOS4yNDU3NiIsInR5cGUiOiJsb29wIiwieiI6ImEzYWE4NDA5NTdmNjU4YzYiLCJnIjoiNjVkODU0YzkwOTgzOTNlOCIsIm5hbWUiOiIiLCJraW5kIjoiZW51bSIsImNvdW50IjoiIiwiaW5pdGlhbCI6IiIsInN0ZXAiOiIiLCJjb25kaXRpb24iOiIiLCJjb25kaXRpb25UeXBlIjoianMiLCJ3aGVuIjoiYmVmb3JlIiwiZW51bWVyYXRpb24iOiJwYXlsb2FkIiwiZW51bWVyYXRpb25UeXBlIjoibXNnIiwibGltaXQiOiIiLCJsb29wUGF5bG9hZCI6Imxvb3AtdmFsIiwiZmluYWxQYXlsb2FkIjoiZmluYWwtb3JpZyIsIngiOjc0MCwieSI6MzAwLCJ3aXJlcyI6W1siY2Y1MmI2ZGQuNWZlYmI4Il0sWyIzMzAzMWMwZS4xYjExNWMiLCI2ZTU5M2ZmMi5kYzk0YyJdXX0seyJpZCI6ImNmNTJiNmRkLjVmZWJiOCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjY1ZDg1NGM5MDk4MzkzZTgiLCJuYW1lIjoiTG9vcCBFbmQiLCJhY3RpdmUiOnRydWUsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJsb29wIiwidGFyZ2V0VHlwZSI6Im1zZyIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTUwLCJ5IjoyODAsIndpcmVzIjpbXX0seyJpZCI6IjMzMDMxYzBlLjFiMTE1YyIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI2NWQ4NTRjOTA5ODM5M2U4IiwibmFtZSI6IlJlcGVhdCIsInJ1bGVzIjpbXSwiYWN0aW9uIjoiIiwicHJvcGVydHkiOiIiLCJmcm9tIjoiIiwidG8iOiIiLCJyZWciOmZhbHNlLCJ4Ijo3MzAsInkiOjQwMCwid2lyZXMiOltbImYwMDllMGU5LjI0NTc2Il1dfSx7ImlkIjoiYjI4YjA2ZjEuMzhlYjQ4IiwidHlwZSI6ImluamVjdCIsInoiOiJhM2FhODQwOTU3ZjY1OGM2IiwiZyI6IjY1ZDg1NGM5MDk4MzkzZTgiLCJuYW1lIjoiQXJyYXkiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IltcImZvb1wiLFwiYmFyXCIsXCJmb29iYXJcIl0iLCJwYXlsb2FkVHlwZSI6Impzb24iLCJ4Ijo0MzAsInkiOjMyMCwid2lyZXMiOltbImYwMDllMGU5LjI0NTc2Il1dfSx7ImlkIjoiNmU1OTNmZjIuZGM5NGMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiYTNhYTg0MDk1N2Y2NThjNiIsImciOiI2NWQ4NTRjOTA5ODM5M2U4IiwibmFtZSI6IiIsImFjdGl2ZSI6dHJ1ZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6InRydWUiLCJ0YXJnZXRUeXBlIjoiZnVsbCIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6OTQwLCJ5Ijo0MDAsIndpcmVzIjpbXX1d"
---
::

