---
title: "Node-RED - Exec Node"
---
# Exec

Node-RED is written in Javascript, as are the custom nodes in the
[Flows Library](https://flows.nodered.org/search?type=node). At times it would
be great to use programs written in other languages. In this guide we'll explain
the `exec` node. 

### Exec Node

Node-RED by default comes with the `exec` node. This node allows you to run a
command as if you're on the command line. The exec node has one input, and three
outputs. Let's create a basic example and work from there. Let's connect the
inject to the `exec` input, and connect the three dots to debug nodes. I've set
the command in the exec node to `date`.

!["Wired up exec node"](/node-red/core-nodes/images/wired-up-exec-node.png)

When triggered, you'll see two outputs in the debug pane. One from `Standard out`;
the date and timestamp of the execution and the `Exit code` will output too.
`Standard error` didn't output anything.

Let's explain what happened: the `date` command was executed by the NodeJS without
any input. The command returned the date as a string, and execution of the commmand
completed. There weren't any errors, so the error code is set to zero. Non-zero
exit codes imply didn't go as intended. Output is written to the standard output,
and not standard error. This allows us to handle errors differently from succesful
exections and the output in standard output.

### Exec vs Spawn mode

Let's change the `exec` node to execute `ping google.com`. The ping command
provides the round-trip time to google.com in milliseconds, each second. When
we deploy, the program is stuck. That's because the output is generated each
second and won't complete until there's a failure in the command. Not what you'd
want.

When there's continous output you'll need to select `spawn` mode in the settings
windown of the `exec` node:

![spawn mode for exec in Node-RED](/node-red/core-nodes/images/spawn-mode-exec.png)

This will produce a message per line to the standard out output for further
processing.

### Shell Expansions

As the arguments for the exec nodes are executed as is, shell expansions will
not work. For example when the exec command is `rm -r /path/to/dir/*`, the `*`
will not be expanded and Node-RED will try to remove the file or directory called `*` in the `/path/to/dir` directory.

### FlowFuse

On FlowFuse Cloud, the Node-RED exec nodes are disabled. The Stacks, that is the
containers that Node-RED runs in, don't include any accessible executatables so there would be no benefit to running exec commands. All the data is exposed through Javascript and Node.JS already.


## Node Documentation

<div class="core-node-doc">

<p>Runs a system command and returns its output.</p> <p>The node can be configured to either wait until the command completes, or to
send its output as the command generates it.</p> <p>The command that is run can be configured in the node or provided by the received
message.</p> <h3>Inputs</h3> <dl class="message-properties">
<dt class="optional">payload <span class="property-type">string</span></dt>
<dd>if configured to do so, will be appended to the executed command.</dd>
<dt class="optional">kill <span class="property-type">string</span></dt>
<dd>the type of kill signal to send an existing exec node process.</dd>
<dt class="optional">pid <span class="property-type">number|string</span></dt>
<dd>the process ID of an existing exec node process to kill.</dd>
</dl> <h3>Outputs</h3> <ol class="node-ports">
<li>Standard output
<dl class="message-properties">
<dt>payload <span class="property-type">string</span></dt>
<dd>the standard output of the command.</dd>
</dl>
<dl class="message-properties">
<dt>rc <span class="property-type">object</span></dt>
<dd>exec mode only, a copy of the return code object (also available on port 3)</dd>
</dl>
</li>
<li>Standard error
<dl class="message-properties">
<dt>payload <span class="property-type">string</span></dt>
<dd>the standard error of the command.</dd>
</dl>
<dl class="message-properties">
<dt>rc <span class="property-type">object</span></dt>
<dd>exec mode only, a copy of the return code object (also available on port 3)</dd>
</dl>
</li>
<li>Return code
<dl class="message-properties">
<dt>payload <span class="property-type">object</span></dt>
<dd>an object containing the return code, and possibly <code>message</code>, <code>signal</code> properties.</dd>
</dl>
</li>
</ol> <h3>Details</h3> <p>By default uses the <code>exec</code> system call which calls the command, waits for it to complete, and then
returns the output. For example a successful command should have a return code of <code>{ code: 0 }</code>.</p> <p>Optionally can use <code>spawn</code> instead, which returns the output from stdout and stderr
as the command runs, usually one line at a time. On completion it then returns an object
on the 3rd port. For example, a successful command should return <code>{ code: 0 }</code>.</p> <p>Errors may return extra information on the 3rd port <code>msg.payload</code>, such as a <code>message</code> string,
<code>signal</code> string.</p> <p>The command that is run is defined within the node, with an option to append <code>msg.payload</code> and a further set of parameters.</p> <p>Commands or parameters with spaces should be enclosed in quotes - <code>"This is a single parameter"</code></p> <p>The returned <code>payload</code> is usually a <i>string</i>, unless non-UTF8 characters are detected, in which
case it is a <i>buffer</i>.</p> <p>The node's status icon and PID will be visible while the node is active. Changes to this can be read by the <code>Status</code> node.</p> <p>The <code>Hide console</code> option will hide the process console normally shown on Windows systems.</p> <h4>Killing processes</h4> <p>Sending <code>msg.kill</code> will kill a single active process. <code>msg.kill</code> should be a string containing
the type of signal to be sent, for example, <code>SIGINT</code>, <code>SIGQUIT</code> or <code>SIGHUP</code>.
Defaults to <code>SIGTERM</code> if set to an empty string.</p> <p>If the node has more than one process running then <code>msg.pid</code> must also be set with the value of the PID to be killed.</p> <p>If a value is provided in the <code>Timeout</code> field then, if the process has not completed when the specified number of seconds has elapsed, the process will be killed automatically</p> <p>Tip: if running a Python app you may need to use the <code>-u</code> parameter to stop the output being buffered.</p>

</div>