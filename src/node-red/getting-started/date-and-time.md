---
eleventyNavigation:
  key: Date & Time
  parent: Getting Started
meta:
  title: Working with Dates and Times in Node-RED
  description: Learn how to handle dates and times in Node-RED without coding. Master timestamps, formatting, timezones, calculations, and time-based automation with visual nodes. 
  keywords: 
---

# {{meta.title}}

Working with dates and times comes up constantly in Node-RED. Whether you're logging events, scheduling tasks, checking business hours, displaying the current time, or pulling historical data, it all relies on handling timestamps correctly.

The best part is that you can manage all of this using visual nodes, without writing any code.

This guide walks you through everything you need to know about working with dates and times in Node-RED. You'll learn how to generate timestamps, format them for display, work with different timezones, and perform time-based calculations.

## What We'll Cover

We'll start with the absolute basics and work our way up:

  - Getting the current time in Node-RED
  - Formatting Dates for Display
  - Handling time zones
  - Doing math with dates (adding days, calculating differences)

## Getting the Current Time in Node-RED

Node-RED doesn't enforce a single way to handle dates. Look at flows from different developers and you'll see different approaches—some prefer timestamps, others use ISO strings, and many format dates in their own custom ways. This flexibility means you can choose what works best for your project.

The most straightforward way to get the current time is with the **inject** node or **change** node.

### Using Inject and Change Nodes

Both the **inject** node and **change** node can generate timestamps. Use **inject** when you want to trigger a flow with a timestamp, and use **change** when you need to add a timestamp to a message that's already flowing through.

#### Basic Timestamp Options (Step-by-Step):

1.  Open an **inject** or **change** node configuration window.
2.  Locate the dropdown menu next to `msg.payload`.
3.  Select **timestamp**. This setting gives you the current time as milliseconds since the epoch (e.g., `1702310400000`).
4.  To see other formats, click the small arrow on the right side to expand more options:

    - **milliseconds since epoch** - A number representing the timestamp (`1702310400000`)
    - **YYYY-MM-DDTHH:mm:ss.sssZ** - An ISO 8601 string (`"2024-12-11T15:45:30.000Z"`)
    - **JavaScript Date object** - Shows as `[object Object]` in the debug panel

> **Tip:** For most work, use **milliseconds since epoch**. It's the simplest format and works everywhere.

#### Using JSONata:

Both inject and change nodes support JSONata expressions, which gives you more control:

  - `$millis()` - Gets the current timestamp (Unix Epoch in milliseconds)
  - `$now()` - Gets the current time as an ISO string
  - `$moment()` - Gets a date object using the Moment library

In the inject/change node, select **JSONata expression** from the payload type dropdown, then enter your expression.

This JSONata approach works identically in both nodes—use whichever fits your flow better.

{% renderFlow %}
[{"id":"9341cec1a1f9e50e","type":"group","z":"d7101f3a4d45deed","name":"Getting the Current Time in Node-RED","style":{"label":true},"nodes":["89cb30afb7fec451","51937bef067f5257","547ec4b9d6a389c9"],"x":108,"y":73,"w":804,"h":694},{"id":"89cb30afb7fec451","type":"group","z":"d7101f3a4d45deed","g":"9341cec1a1f9e50e","name":"Using Change node ( JSONata  )","style":{"label":true},"nodes":["b5bdfd1b2a3b9c27","444d17c32b8bd1c1","276e0fcf607c944d","07fbc83f895b7aa4","ac8e5e28a896f52c","8d4143fb8361c469","aff528c64b9568ad"],"x":134,"y":539,"w":752,"h":202},{"id":"b5bdfd1b2a3b9c27","type":"inject","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"Inject","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":230,"y":640,"wires":[["444d17c32b8bd1c1","276e0fcf607c944d","07fbc83f895b7aa4"]]},{"id":"444d17c32b8bd1c1","type":"change","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"milliseconds since epoch","rules":[{"t":"set","p":"payload","pt":"msg","to":"$millis()","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":580,"wires":[["ac8e5e28a896f52c"]]},{"id":"276e0fcf607c944d","type":"change","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"YYYY-MM-DDTHH:mm:ss.sssZ","rules":[{"t":"set","p":"payload","pt":"msg","to":"$now()","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":520,"y":640,"wires":[["8d4143fb8361c469"]]},{"id":"07fbc83f895b7aa4","type":"change","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"JavaScript Date object","rules":[{"t":"set","p":"payload","pt":"msg","to":"$moment()","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":700,"wires":[["aff528c64b9568ad"]]},{"id":"ac8e5e28a896f52c","type":"debug","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":580,"wires":[]},{"id":"8d4143fb8361c469","type":"debug","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":640,"wires":[]},{"id":"aff528c64b9568ad","type":"debug","z":"d7101f3a4d45deed","g":"89cb30afb7fec451","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":700,"wires":[]},{"id":"51937bef067f5257","type":"group","z":"d7101f3a4d45deed","g":"9341cec1a1f9e50e","name":"Using Change node ( Timestamp option )","style":{"label":true},"nodes":["375d143d48695d37","72fcba815fa5cfdd","4e50e0a2e436b658","d41aa61b456bd3a1","f5bec9511bc8f77f","9d3fb7b89adafa8d","7e60fb224e4ff747"],"x":134,"y":319,"w":752,"h":202},{"id":"375d143d48695d37","type":"inject","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"Inject","props":[],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":230,"y":420,"wires":[["72fcba815fa5cfdd","4e50e0a2e436b658","d41aa61b456bd3a1"]]},{"id":"72fcba815fa5cfdd","type":"change","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"milliseconds since epoch","rules":[{"t":"set","p":"payload","pt":"msg","to":"","tot":"date"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":360,"wires":[["f5bec9511bc8f77f"]]},{"id":"4e50e0a2e436b658","type":"change","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"YYYY-MM-DDTHH:mm:ss.sssZ","rules":[{"t":"set","p":"payload","pt":"msg","to":"iso","tot":"date"}],"action":"","property":"","from":"","to":"","reg":false,"x":520,"y":420,"wires":[["9d3fb7b89adafa8d"]]},{"id":"d41aa61b456bd3a1","type":"change","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"JavaScript Date object","rules":[{"t":"set","p":"payload","pt":"msg","to":"object","tot":"date"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":480,"wires":[["7e60fb224e4ff747"]]},{"id":"f5bec9511bc8f77f","type":"debug","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":360,"wires":[]},{"id":"9d3fb7b89adafa8d","type":"debug","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":420,"wires":[]},{"id":"7e60fb224e4ff747","type":"debug","z":"d7101f3a4d45deed","g":"51937bef067f5257","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":480,"wires":[]},{"id":"547ec4b9d6a389c9","type":"group","z":"d7101f3a4d45deed","g":"9341cec1a1f9e50e","name":"Using Inject Nodes ( Timestamp Option )","style":{"label":true},"nodes":["499ab581537f5598","b9bd4fdc2f424cbf","b969db92319355f3","ccc969cd1ed85eda","ab178e4e3109f9b0","cdb0cfd879846420"],"x":134,"y":99,"w":752,"h":202},{"id":"499ab581537f5598","type":"inject","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"milliseconds since epoch","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":310,"y":140,"wires":[["b9bd4fdc2f424cbf"]]},{"id":"b9bd4fdc2f424cbf","type":"debug","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":140,"wires":[]},{"id":"b969db92319355f3","type":"inject","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"YYYY-MM-DDTHH:mm:ss.sssZ","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"iso","payloadType":"date","x":340,"y":200,"wires":[["ccc969cd1ed85eda"]]},{"id":"ccc969cd1ed85eda","type":"debug","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":200,"wires":[]},{"id":"ab178e4e3109f9b0","type":"inject","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"JavaScript Date object","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"object","payloadType":"date","x":300,"y":260,"wires":[["cdb0cfd879846420"]]},{"id":"cdb0cfd879846420","type":"debug","z":"d7101f3a4d45deed","g":"547ec4b9d6a389c9","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":260,"wires":[]}]
{% endrenderFlow %}

> For more advanced date/time operations and formatting, see the [JSONata documentation](https://docs.jsonata.org/date-time-functions).

## Formatting Dates for Display

Raw timestamps like `1702310400000` or ISO strings like `2024-12-11T15:45:30.000Z` work great for machines, but people need something readable: "December 11, 2024" or "3:45 PM" or "5 minutes ago."

Node-RED gives you two excellent options: the moment nodes for heavy lifting, and JSONata for quick, built-in one-offs.

### The Moment Nodes

The Moment node handles formatting, timezones, relative time, and date math. It is built on the popular **Moment.js** library.

#### Installation

1.  Click the menu in the top-right corner (the three horizontal lines).
2.  Select **Manage palette** from the dropdown.
3.  Open the **Install** tab.
4.  Search for `node-red-contrib-moment`.
5.  Click **Install** next to the package.

Once installed, you’ll see two new nodes in the palette: **Date/Time Formatter** and **Humanizer**. For this guide, we’ll be using the **Date/Time Formatter** node.

#### Your First Format

1.  Drag a **Date/Time Formatter** node onto the canvas and double-click to open its configuration.
2.  Look at the three key fields: **Input** (where your date lives, usually `msg.payload`), **Format** (your pattern), and **Output** (where the result goes, usually `msg.payload`).
3.  Type this into the **Format** field: `MMMM D, YYYY`.
4.  Connect an inject node (set to timestamp) to the **Date/Time Formatter** node, then connect the **Date/Time Formatter** node to a debug node.
5.  Click the inject button.

The debug panel will show something like `"December 11, 2024"`.

#### Format Patterns

The letters in your format string are placeholders that get replaced with parts of the date. You can mix them however you want.

| Category | Code | Example (Dec 11, 2024 at 3:45 PM) | Description |
| :--- | :--- | :--- | :--- |
| **Years** | `YYYY` | 2024 | Full year |
| | `YY` | 24 | Two-digit year |
| **Months** | `MMMM` | December | Full month name |
| | `MMM` | Dec | Short month name |
| | `MM` | 12 | Month number (leading zero) |
| **Days** | `DD` | 11 | Day of month (leading zero) |
| | `D` | 11 | Day of month (no leading zero) |
| | `dddd` | Wednesday | Full day name |
| **Time** | `HH` | 15 | 24-hour clock (leading zero) |
| | `hh` | 03 | 12-hour clock (leading zero) |
| | `mm` | 45 | Minutes (leading zero) |
| | `A` | PM | AM/PM marker (uppercase) |

**Common Patterns:**

  - `YYYY-MM-DD` → 2024-12-11 (Good for logs and databases)
  - `MMMM D, YYYY` → December 11, 2024 (Formal style)
  - `h:mm A` → 3:45 PM (Standard time)
  - `HH:mm:ss` → 15:45:30 (24-hour time)

#### Adding Custom Text

You can include literal text in your format by wrapping it in square brackets. The text inside the brackets will appear exactly as you wrote it.

```
MMMM D, YYYY [at] h:mm A
```

This gives you something like **"December 11, 2024 at 3:45 PM"**.

More examples:

  - `[Last updated:] MMM D [at] h:mm A` → Last updated: Dec 11 at 3:45 PM

#### Relative Time

Sometimes you want to show how long ago something happened instead of the exact time. If you want **"5 minutes ago"** instead of a specific time, put this in the **Output Format** field:

```
fromNow
```

The **Date/Time Formatter** node will calculate the time difference and give you results like:

  - "a few seconds ago"
  - "5 minutes ago"
  - "3 days ago"

This works really well for activity feeds, notifications, or any "last updated" display.

### JSONata Formatting

If you don't want to add another node to your flow, you can use JSONata instead. It's already built into the **change** node, so you don't need to install anything.

1.  Open a **change** node and set it to modify `msg.payload`.
2.  In the "to" dropdown, pick **JSONata expression**.
3.  Use JSONata's date functions to format your timestamp.

Basic syntax for a timestamp in `msg.payload`:

```
$fromMillis(payload, '[M]/[D]/[Y]')
```

This takes the timestamp in `msg.payload` and converts it to **"12/11/2024"**.

#### JSONata Codes

JSONata uses square brackets, but the codes are different from the **Date/Time Formatter** node.

  - `[Y]` or `[Y0001]` → 2024 (Year)
  - `[M]` or `[M01]` → 12 (Month, with leading zero)
  - `[D]` or `[D01]` → 11 (Day, with leading zero)
  - `[h]` or `[h01]` → 3 (12-hour)
  - `[m01]` → 45 (Minutes)
  - `[P]` → AM or PM

**Common Patterns:**

  - `$fromMillis(payload, '[M]/[D]/[Y]')` → 12/11/2024
  - `$fromMillis(payload, '[h]:[m01] [P]')` → 3:45 PM

{% renderFlow %}
[{"id":"1e8a1110d36d3f33","type":"group","z":"d7101f3a4d45deed","name":"Formatting Dates for Display","style":{"label":true},"nodes":["f019c2f5ed9d8104","1699577150167eb5"],"x":108,"y":793,"w":804,"h":414},{"id":"f019c2f5ed9d8104","type":"group","z":"d7101f3a4d45deed","g":"1e8a1110d36d3f33","name":"The Moment Nodes","style":{"label":true},"nodes":["bd06565765141868","898b23fa51f95edf","f734d9e8979b20b2","f3a3a5a9974816d3","2de95300ee070276","d5f3d8aeaaeffa7d","b713b196b48c62d3"],"x":134,"y":819,"w":752,"h":202},{"id":"bd06565765141868","type":"moment","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"MMMM D, YYYY","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"MMMM D, YYYY","locale":"en-US","output":"payload","outputType":"msg","outTz":"Africa/Abidjan","x":460,"y":860,"wires":[["898b23fa51f95edf"]]},{"id":"898b23fa51f95edf","type":"debug","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":860,"wires":[]},{"id":"f734d9e8979b20b2","type":"inject","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":920,"wires":[["f3a3a5a9974816d3","d5f3d8aeaaeffa7d","bd06565765141868"]]},{"id":"f3a3a5a9974816d3","type":"moment","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"MMMM D, YYYY [at] h:mm A","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"MMMM D, YYYY [at] h:mm A","locale":"en-US","output":"payload","outputType":"msg","outTz":"Africa/Abidjan","x":510,"y":920,"wires":[["2de95300ee070276"]]},{"id":"2de95300ee070276","type":"debug","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":920,"wires":[]},{"id":"d5f3d8aeaaeffa7d","type":"moment","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"fromNow","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"fromNow","locale":"en-US","output":"payload","outputType":"msg","outTz":"Africa/Abidjan","x":430,"y":980,"wires":[["b713b196b48c62d3"]]},{"id":"b713b196b48c62d3","type":"debug","z":"d7101f3a4d45deed","g":"f019c2f5ed9d8104","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":980,"wires":[]},{"id":"1699577150167eb5","type":"group","z":"d7101f3a4d45deed","g":"1e8a1110d36d3f33","name":"JSONata Formatting","style":{"label":true},"nodes":["678f13a9fad9c397","cf810cbd301fddb0","9443cb33ea42e25b","255b135032862816","2d3b9aee8b0ebe5b"],"x":134,"y":1039,"w":752,"h":142},{"id":"678f13a9fad9c397","type":"inject","z":"d7101f3a4d45deed","g":"1699577150167eb5","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":1120,"wires":[["cf810cbd301fddb0","2d3b9aee8b0ebe5b"]]},{"id":"cf810cbd301fddb0","type":"change","z":"d7101f3a4d45deed","g":"1699577150167eb5","name":"$fromMillis(payload, '[M]/[D]/[Y]')","rules":[{"t":"set","p":"payload","pt":"msg","to":"$fromMillis(payload, '[M]/[D]/[Y]')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":520,"y":1080,"wires":[["9443cb33ea42e25b"]]},{"id":"9443cb33ea42e25b","type":"debug","z":"d7101f3a4d45deed","g":"1699577150167eb5","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1080,"wires":[]},{"id":"255b135032862816","type":"debug","z":"d7101f3a4d45deed","g":"1699577150167eb5","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1140,"wires":[]},{"id":"2d3b9aee8b0ebe5b","type":"change","z":"d7101f3a4d45deed","g":"1699577150167eb5","name":"$fromMillis(payload, '[h]:[m01] [P]')","rules":[{"t":"set","p":"payload","pt":"msg","to":"$fromMillis(payload, '[h]:[m01] [P]')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":530,"y":1140,"wires":[["255b135032862816"]]},{"id":"5e97a86213b906bf","type":"global-config","env":[],"modules":{"node-red-contrib-moment":"5.0.0"}}]
{% endrenderFlow %}

## Handling Time Zones

When you're working inside Node-RED, the timezone for any operation follows the system timezone of the machine running Node-RED. If your server is in New York, timestamps will show Eastern time. If it's in London, you'll see GMT/BST.

But what if you need to display times in a different timezone? The **Date/Time Formatter** node handles all of this.

### Converting to a Different Timezone

Open your **Date/Time Formatter** node and you'll see two timezone fields:

  - **Input Timezone** - The timezone your timestamp is currently in.
  - **Output Timezone** - The timezone you want to convert to.

Type in the timezone you want—like `America/New_York` or `Asia/Tokyo`.

#### Finding Timezone Names:

The **Date/Time Formatter** node uses the IANA timezone database. These are names like:

  - `America/New_York` (Eastern time)
  - `Europe/London` (GMT/BST)
  - `Asia/Tokyo` (Japan time)

You can find the complete list at [wikipedia.org/wiki/List\_of\_tz\_database\_time\_zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Working Example

Let's display the current time in three different timezones:

1.  Add an **Inject** node (set to timestamp).
2.  Add three **Date/Time Formatter** nodes after it.
3.  Set a common **Output Format** in all three: `MMMM D, YYYY h:mm A z`
4.  Set the **Output Timezone** in each:
      - First node: `America/New_York`
      - Second node: `Europe/London`
      - Third node: `Asia/Tokyo`
5.  Connect a **debug** node to each **Date/Time Formatter** node.

When you click **Inject**, you’ll see the formatted time in three different timezones.

### JSONata Timezone Handling

JSONata can also handle timezones by providing the offset in the third parameter of `$fromMillis()`:

```
$fromMillis(payload, '[M]/[D]/[Y] [h]:[m01] [P]', '-0500')
```

The offset is a string like `-0500` (5 hours behind UTC). This works, but you have to know the offset and manage daylight saving time yourself. The **Date/Time Formatter** node handles all of that automatically.

{% renderFlow %}
[{"id":"894fb9d3ddfa14d7","type":"group","z":"d7101f3a4d45deed","name":"Handling Time Zones","style":{"label":true},"nodes":["4d735b1f71f79189","0c31bb975d166128"],"x":108,"y":1233,"w":804,"h":474},{"id":"4d735b1f71f79189","type":"group","z":"d7101f3a4d45deed","g":"894fb9d3ddfa14d7","name":"Converting to a Different Timezone Using Moment nodes","style":{"label":true},"nodes":["995cf0548ac66af1","963db1d838c1a34d","faefd25e268f68e9","9259ebfd137a16b0","32f2b829e7a6de84","6a4a272401d45e61","48bf3927e175904c"],"x":134,"y":1259,"w":752,"h":202},{"id":"995cf0548ac66af1","type":"inject","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":1360,"wires":[["963db1d838c1a34d","6a4a272401d45e61","48bf3927e175904c"]]},{"id":"963db1d838c1a34d","type":"moment","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"America/New_York","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"MMMM D, YYYY h:mm A z","locale":"en-US","output":"payload","outputType":"msg","outTz":"America/New_York","x":470,"y":1300,"wires":[["faefd25e268f68e9"]]},{"id":"faefd25e268f68e9","type":"debug","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1300,"wires":[]},{"id":"9259ebfd137a16b0","type":"debug","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1360,"wires":[]},{"id":"32f2b829e7a6de84","type":"debug","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1420,"wires":[]},{"id":"6a4a272401d45e61","type":"moment","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"Europe/London","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"MMMM D, YYYY h:mm A z","locale":"en-US","output":"payload","outputType":"msg","outTz":"Europe/London","x":460,"y":1360,"wires":[["9259ebfd137a16b0"]]},{"id":"48bf3927e175904c","type":"moment","z":"d7101f3a4d45deed","g":"4d735b1f71f79189","name":"Asia/Tokyo","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":0,"adjType":"days","adjDir":"add","format":"MMMM D, YYYY h:mm A z","locale":"en-US","output":"payload","outputType":"msg","outTz":"Asia/Tokyo","x":440,"y":1420,"wires":[["32f2b829e7a6de84"]]},{"id":"0c31bb975d166128","type":"group","z":"d7101f3a4d45deed","g":"894fb9d3ddfa14d7","name":"Converting to a Different Timezone Using JSONata","style":{"label":true},"nodes":["ee7822f24a2792cb","0a006c9e87656cfc","31122b7227db8ce7","c62c7e7b3b450e85","6dfde983c76894c3","74e37a7cc2080238","f0c786e6db30ffad"],"x":134,"y":1479,"w":752,"h":202},{"id":"ee7822f24a2792cb","type":"inject","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":1580,"wires":[["6dfde983c76894c3","74e37a7cc2080238","f0c786e6db30ffad"]]},{"id":"0a006c9e87656cfc","type":"debug","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1520,"wires":[]},{"id":"31122b7227db8ce7","type":"debug","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1580,"wires":[]},{"id":"c62c7e7b3b450e85","type":"debug","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1640,"wires":[]},{"id":"6dfde983c76894c3","type":"change","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"America/New_York ( Winter )","rules":[{"t":"set","p":"payload","pt":"msg","to":"$fromMillis(payload, '[M]/[D]/[Y] [h]:[m01] [P]', '-0500')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":510,"y":1520,"wires":[["0a006c9e87656cfc"]]},{"id":"74e37a7cc2080238","type":"change","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"Europe/London ( Winter )","rules":[{"t":"set","p":"payload","pt":"msg","to":"$fromMillis(payload, '[M]/[D]/[Y] [h]:[m01] [P]', '+0000')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":490,"y":1580,"wires":[["31122b7227db8ce7"]]},{"id":"f0c786e6db30ffad","type":"change","z":"d7101f3a4d45deed","g":"0c31bb975d166128","name":"Asia/Tokyo ( Winter )","rules":[{"t":"set","p":"payload","pt":"msg","to":"$fromMillis(payload, '[M]/[D]/[Y] [h]:[m01] [P]', '+0900')","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":480,"y":1640,"wires":[["c62c7e7b3b450e85"]]},{"id":"dcb2806bdd099173","type":"global-config","env":[],"modules":{"node-red-contrib-moment":"5.0.0"}}]
{% endrenderFlow %}

## Doing Math with Dates

You'll need date calculations for things like historical dashboards showing the last 7 days of data or checking how many days until a deadline.

### Adding and Subtracting Time

Open the **Date/Time Formatter** node and you'll see the **Adjustment** field. This lets you modify the incoming date by a specific unit of time.

  - On the left, there's a dropdown for `+` or `-`.
  - On the right, there's a dropdown with units: **days, hours, minutes, weeks, months, years,** etc.

#### Adjustment Examples:

| Goal | Operation | Value | Unit |
| :--- | :--- | :--- | :--- |
| **Tomorrow** | `+` | 1 | days |
| **Yesterday** | `-` | 1 | days |
| **2 hours ago** | `-` | 2 | hours |
| **Next week** | `+` | 7 | days |

**How to Set it Up:**

1.  Drag an **Inject** node onto the workspace (set payload to **timestamp**).
2.  Connect a **Date/Time Formatter** node and double-click to open it.
3.  Configure your desired adjustment (e.g., `+ 1 days`).
4.  Set the **Output Format** field, maybe to `YYYY-MM-DD`.
5.  Connect the Formatter to a **Debug** node and Deploy the flow.

Hit the Inject button to see the adjusted date.

There’s a lot more you can do with the Moment node, including advanced formatting options and additional date/time transformations. For more information, read the node’s [README documentation](https://flows.nodered.org/node/node-red-contrib-moment).

### Calculating Time Differences

Sometimes you need to know the duration between two timestamps. The moment node doesn't directly calculate differences, so for this, you'll want to use a **Change** node with JSONata.

JSONata can calculate differences with simple subtraction, as timestamps are in milliseconds.

#### JSONata Difference Formula

The basic formula is to subtract the earlier timestamp from the later one, then divide to convert the result into your desired unit.

| Unit | Division Value (ms) | Example Formula |
| :--- | :--- | :--- |
| **Seconds** | `1000` | `(ts1 - ts2) / 1000` |
| **Minutes** | `60000` | `(ts1 - ts2) / 60000` |
| **Hours** | `3600000` | `(ts1 - ts2) / 3600000` |
| **Days** | `86400000` | `(ts1 - ts2) / 86400000` |

#### Working Example (Difference in Days)

This example calculates the difference between a timestamp seven days ago and the current time (7 days).

1.  Drag an **Inject** node onto the workspace (set payload to **timestamp**).

2.  Drag a **Change** node and connect it. Use this node to set up our two reference times (`msg.start_time` and `msg.end_time`).

      - **Rule 1:**
          - **Action:** `Move`
          - **From:** `msg.payload`
          - **To:** `msg.end_time`
      - **Rule 2:**
          - **Action:** `Set`
          - **Property:** `msg.start_time`
          - **To:** `JSONata expression`
          - **Expression:** `msg.end_time - (7 * 86400000)` (This calculates a timestamp exactly 7 days earlier).

3.  Drag a second **Change** node and connect it. This node performs the final calculation.

      - **Action:** `Set`
      - **Property:** `msg.days_difference`
      - **To:** `JSONata expression`
      - **Expression:**

        ```
        (msg.end_time - msg.start_time) / 86400000
        ```

4.  Connect this second Change node to a **Debug** node and **Deploy** the flow.

Hit the **Inject** button. The **Debug** tab will show the number of days difference (**7**).

{% renderFlow %}
[{"id":"48b48dea5aef0701","type":"group","z":"d7101f3a4d45deed","name":"Doing Math with Dates","style":{"label":true},"nodes":["a2137766a67faf67","bb370162520e95d7"],"x":108,"y":1733,"w":804,"h":254},{"id":"a2137766a67faf67","type":"group","z":"d7101f3a4d45deed","g":"48b48dea5aef0701","name":"Using Moment nodes","style":{"label":true},"nodes":["aa71711160b1b545","f76e05557f807562","bfd33b878fefe852"],"x":134,"y":1759,"w":752,"h":82},{"id":"aa71711160b1b545","type":"inject","z":"d7101f3a4d45deed","g":"a2137766a67faf67","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":1800,"wires":[["f76e05557f807562"]]},{"id":"f76e05557f807562","type":"moment","z":"d7101f3a4d45deed","g":"a2137766a67faf67","name":"+ 1 days","topic":"","input":"payload","inputType":"msg","inTz":"Africa/Abidjan","adjAmount":"1","adjType":"days","adjDir":"add","format":"YYYY-MM-DD","locale":"en-US","output":"payload","outputType":"msg","outTz":"Africa/Abidjan","x":430,"y":1800,"wires":[["bfd33b878fefe852"]]},{"id":"bfd33b878fefe852","type":"debug","z":"d7101f3a4d45deed","g":"a2137766a67faf67","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1800,"wires":[]},{"id":"bb370162520e95d7","type":"group","z":"d7101f3a4d45deed","g":"48b48dea5aef0701","name":"Using JSONata","style":{"label":true},"nodes":["551b26f1bfda2d88","4881ffafeb5da64c","82c0370128a1f80d"],"x":134,"y":1879,"w":752,"h":82},{"id":"551b26f1bfda2d88","type":"inject","z":"d7101f3a4d45deed","g":"bb370162520e95d7","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":250,"y":1920,"wires":[["82c0370128a1f80d"]]},{"id":"4881ffafeb5da64c","type":"debug","z":"d7101f3a4d45deed","g":"bb370162520e95d7","name":"Result","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"days_difference","targetType":"msg","statusVal":"","statusType":"auto","x":780,"y":1920,"wires":[]},{"id":"82c0370128a1f80d","type":"change","z":"d7101f3a4d45deed","g":"bb370162520e95d7","name":"Difference in Days","rules":[{"t":"move","p":"payload","pt":"msg","to":"end_time","tot":"msg"},{"t":"set","p":"payload","pt":"msg","to":"","tot":"str"},{"t":"set","p":"start_time","pt":"msg","to":"msg.end_time - (7 * 86400000)","tot":"jsonata"},{"t":"set","p":"days_difference","pt":"msg","to":"(msg.end_time - msg.start_time) / 86400000","tot":"jsonata"}],"action":"","property":"","from":"","to":"","reg":false,"x":470,"y":1920,"wires":[["4881ffafeb5da64c"]]},{"id":"7740a59884985dc8","type":"global-config","env":[],"modules":{"node-red-contrib-moment":"5.0.0"}}]
{% endrenderFlow %}