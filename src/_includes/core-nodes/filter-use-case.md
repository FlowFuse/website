## What's the Filter node in Node-RED used for?

The Filter node, previously called "Report by Exception" (RBE), has two modes of
operation, called deadband and narrowband. These modes allow users to limit network
traffic, write operations to historians, or limit reporting of values outside
a range that is worth reporting on. It's very versatile, once you fully understand the
node.

The Filter node is part of the core nodes in Node-RED, meaning it is installed
by default.

### Deadband Mode

In deadband mode, the data transmission is triggered only when the measured
value changes beyond a specified threshold value. This threshold value is known
as the deadband, and it is used to prevent frequent data transmissions when the
value fluctuates around a certain point. The deadband is typically set to a
percentage of the measurement range or an absolute value.

For example, if the temperature sensor measures a range of 0-100 degrees Celsius,
and the deadband is set to 2 degrees, then the system will only report temperature
changes greater than 2 degrees. This helps reduce unnecessary network traffic
and save processing power.

### Narrowband Mode

In narrowband mode, the data transmission is triggered only when the measured
value falls outside a specified range of values. This range is known as the
narrowband or hysteresis, and it is used to prevent unnecessary data
transmissions when the value fluctuates within a certain range.

For example, if the temperature sensor measures a range of 0-100 degrees Celsius,
and the narrowband is set to 5 degrees, then the system will only report
temperature changes greater than 5 degrees above or below the last reported
value.

Both deadband and narrowband modes are used to optimize data transmission and
reduce the number of unnecessary data transmissions.

## Examples

### Report all changes

With 3 messages send to the filter node; 1, 2, 2, the following flow will send 
through the first messages, `1` and `2` respectively. Then filter out the last
`2` message as no changes were observed since it sent on the previous message.

![Filter Only report changes](./images/filter-only-report-changes.png)

```json
[{"id":"5adf6b757e2a7bb2","type":"rbe","z":"97a2668540e2f3ba","name":"Only report changes","func":"rbe","gap":"","start":"","inout":"out","septopics":true,"property":"payload","topi":"topic","x":420,"y":100,"wires":[["6682a9e8826ad09b"]]},{"id":"f60dc26f8d634312","type":"inject","z":"97a2668540e2f3ba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1,2,2]","payloadType":"json","x":130,"y":100,"wires":[["5b2b61bb112b23e7"]]},{"id":"6682a9e8826ad09b","type":"debug","z":"97a2668540e2f3ba","name":"Print changes","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":620,"y":100,"wires":[]},{"id":"5b2b61bb112b23e7","type":"split","z":"97a2668540e2f3ba","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":250,"y":100,"wires":[["5adf6b757e2a7bb2"]]}]
```

### Report changes, ignore the initial value

With 3 messages send to the filter node; 1, 2, 2, the initial value is used as
sentinel value. Each change afterwards is send onwards. In this case printing just
2 once. The first message; `1` is remembered, and the next message afterwards is
the only change in the stream of values.

![Filter ignore first message](./images/filter-report-changes-ignore-init.png)

```json
[{"id":"d5c20441fc01294b","type":"rbe","z":"97a2668540e2f3ba","name":"Ignore first message, only report changes","func":"rbei","gap":"","start":"","inout":"out","septopics":true,"property":"payload","topi":"topic","x":480,"y":180,"wires":[["c5845cc63c81f81d"]]},{"id":"eef24d9b8c3f98c7","type":"inject","z":"97a2668540e2f3ba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1,2,2]","payloadType":"json","x":130,"y":180,"wires":[["9e8e79801228c3bb"]]},{"id":"c5845cc63c81f81d","type":"debug","z":"97a2668540e2f3ba","name":"Print changes","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":740,"y":180,"wires":[]},{"id":"9e8e79801228c3bb","type":"split","z":"97a2668540e2f3ba","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":250,"y":180,"wires":[["d5c20441fc01294b"]]}]
```

### Report changes larger than a certain percentage "Deadband"

If the filter node is configured to "block unless value change is great or equal than"
mode with a 50% threshold configured as "compared to last valid output value" and it's
send `1, 2, 2, 1` it will send on the messages `2, 1`.

The initial message `1` is set as sentinel value. The second message `2` is an
increase of 100% against the sentinel which updates the sentinel value to two,
and sends it on.
The third message is equal to the sentinel value and thus filtered. The last value, `1`,
is a 50% change compared to the sentinel value of `2` and send forward.

![Filter deadband](./images/filter-report-changes-over.png)

```json
[{"id":"af9390a840a0b28a","type":"rbe","z":"97a2668540e2f3ba","name":"Report changes over ","func":"deadbandEq","gap":"50%","start":"","inout":"out","septopics":true,"property":"payload","topi":"topic","x":420,"y":260,"wires":[["f76f04bfb73ad8db"]]},{"id":"2a28d48e44fd6450","type":"inject","z":"97a2668540e2f3ba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1,2,2,1]","payloadType":"json","x":130,"y":260,"wires":[["9155ade283e76ab6"]]},{"id":"f76f04bfb73ad8db","type":"debug","z":"97a2668540e2f3ba","name":"Print changes","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":620,"y":260,"wires":[]},{"id":"9155ade283e76ab6","type":"split","z":"97a2668540e2f3ba","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":250,"y":260,"wires":[["af9390a840a0b28a"]]}]
```

### Report only on one specific value

As the filter node can block all messages where the change is too large, it can
used to only report a single value when it occurs. For example, to only report
integers that are equal to 2, the start value is set to 2 and the change cannot be
greater of equal to 1.

![Filter send only a distinct value through](./images/filter-send-one-value.png)

```json
[{"id":"6b70bed3e7360f58","type":"rbe","z":"97a2668540e2f3ba","name":"Only send 2's","func":"narrowbandEq","gap":"1","start":"2","inout":"out","septopics":false,"property":"payload","topi":"topic","x":400,"y":340,"wires":[["5f02aa2b43499ca8"]]},{"id":"a5b05fcbe6fdf53e","type":"inject","z":"97a2668540e2f3ba","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"[1,2,2]","payloadType":"json","x":130,"y":340,"wires":[["e58f98ecb220d7f3"]]},{"id":"5f02aa2b43499ca8","type":"debug","z":"97a2668540e2f3ba","name":"Print the same values","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":600,"y":340,"wires":[]},{"id":"e58f98ecb220d7f3","type":"split","z":"97a2668540e2f3ba","name":"","splt":"\\n","spltType":"str","arraySplt":1,"arraySpltType":"len","stream":false,"addname":"","x":250,"y":340,"wires":[["6b70bed3e7360f58"]]}]
```