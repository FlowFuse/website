---
title: "Calling a Python script from Node-RED (2026)"
subtitle: "A step-by-step guide to executing Python scripts from Node-RED, passing arguments, and capturing output."
description: "Learn how to run a Python script from Node-RED using the Exec node. Step-by-step guide covering script execution, passing arguments, reading sensor data, and troubleshooting—combine Node-RED's visual flows with Python's libraries."
lastUpdated: 2026-06-03
date: 2024-07-10
authors: ["sumit-shinde"]
image: /blog/2024/07/images/calling-python-script-from-node-red.png
keywords: node red and python, node red call python script, node red exec node python script, node red execute python script, node red for python, node red python example, node red python script, node red run python script, node red with python, python in node red
tags:
  - post
  - node-red
  - node red python
  - how-to
cta:
  type: sign-up
  title: "Build Powerful IoT Solutions With Node-RED and Python"
  description: "FlowFuse gives you a production-ready platform to deploy and manage Node-RED flows—with the flexibility to integrate Python scripts, external libraries, and any data source your project needs. Deploy to edge devices, collaborate with your team, and scale from one device to thousands. Start free today."
meta:
  howto:
    name: "How to Run a Python Script from Node-RED Using the Exec Node"
    description: "Use the Node-RED Exec node to execute a Python script, capture its output as msg.payload, pass arguments, and parse printed JSON—combining Node-RED's visual flows with Python's libraries."
    totalTime: "PT20M"
    tool:
      - "Node-RED"
      - "Python"
      - "Exec node"
    steps:
      - name: "Verify Python is installed"
        text: "Open a terminal and run 'python --version' or 'python3 --version'. Note which command works—you must use the same one in the Exec node command. Install Python from python.org if it is not present."
        url: "installing-python"
      - name: "Execute a Python script with the Exec node"
        text: "Drag an Exec node onto the canvas and set its command to 'python -u ./your_script.py' (use python3 if required). The -u flag prevents output buffering. Wire an Inject node to its input and a Debug node to its first output, then deploy and trigger the Inject node. The script's stdout appears as msg.payload."
        url: "executing-python-script-from-node-red"
      - name: "Read sensor data by calling a Python script on an interval"
        text: "Set an Inject node to repeat on an interval, wire it to an Exec node that runs your sensor script, then add a JSON node (set to 'Always convert to JSON object') after the Exec node to parse the printed JSON. Wire a Debug node at the end to inspect the structured sensor readings."
        url: "reading-temperature-sensor-using-python-script"
      - name: "Pass arguments to the Python script from Node-RED"
        text: "Append arguments directly to the Exec command (e.g. 'python -u ./example.py -30'). In the Python script, read them with sys.argv—sys.argv[1] is the first argument. You can also enable 'Append msg.payload' on the Exec node to pass dynamic values from the incoming message."
        url: "executing-python-script-with-arguments-from-node-red"
  faq:
    - question: "How do I run a Python script from Node-RED?"
      answer: "Use the Exec node, which runs system commands. Set its command to 'python ./your_script.py' (or 'python3' depending on your system), connect an Inject node to trigger it, and a Debug node to view the output. The script's stdout is returned on the Exec node's first output, the error stream on the second, and the return code on the third."
    - question: "What is the difference between the Exec node and a Function node for Python?"
      answer: "The Function node runs JavaScript inside Node-RED and cannot execute Python directly. The Exec node runs an external system command, so it's the right choice for launching a Python interpreter against a script file. Use Exec whenever you need Python's libraries or existing scripts."
    - question: "Should I use 'python' or 'python3' in the Exec command?"
      answer: "It depends on how Python is installed. Run 'python --version' in a terminal; if that works, use 'python your_script.py'. If only 'python3 --version' works, use 'python3 your_script.py'. Match the command in the Exec node to whichever one resolves on the machine running Node-RED."
    - question: "Why should I add the -u flag when running Python from the Exec node?"
      answer: "The -u flag forces unbuffered output, so Python writes results immediately instead of holding them in a buffer. Without it, you may see delayed, missing, or out-of-order output in Node-RED, especially for scripts that print as they run. A command like 'python -u ./example.py' avoids these buffering issues."
    - question: "How do I pass arguments or input to a Python script from Node-RED?"
      answer: "Append arguments to the Exec command, for example 'python -u ./example.py 42'. In the script, read them with the sys module: sys.argv[1] is the first argument (sys.argv[0] is the script name). You can also enable 'Append msg.payload' on the Exec node to pass dynamic values from the incoming message as arguments."
    - question: "How do I get data back from the Python script into Node-RED?"
      answer: "Have the script print its result to stdout—the Exec node captures that on its first output as msg.payload. If the script prints JSON, add a JSON node set to 'Always convert to JSON object' after the Exec node to parse it into a usable object for the rest of your flow."
    - question: "Why is my Python script not producing output in Node-RED?"
      answer: "Common causes: output buffering (add the -u flag), the wrong interpreter (python vs python3), an incorrect file path or working directory, or a script that runs an infinite loop and never exits so the Exec node never receives a completed result. Check the Exec node's second (stderr) and third (return code) outputs to diagnose errors."
    - question: "Can Node-RED run a Python script that reads from a sensor?"
      answer: "Yes. Run Node-RED on a device wired to the sensor (such as a Raspberry Pi with a DHT11), have a Python script read the sensor and print the reading as JSON, then trigger that script from the Exec node on an interval using an Inject node. Make sure the script reads once and exits rather than looping internally, so Node-RED controls the polling."
    - question: "Do I need to install Python separately to use it with Node-RED?"
      answer: "Yes. Node-RED does not bundle a Python runtime, so Python must be installed on the same machine that runs Node-RED. Any third-party libraries your script imports (for example adafruit-circuitpython for sensors) also need to be installed in that environment."
tldr: "To run a Python script from Node-RED, use the Exec node with a command like 'python -u ./your_script.py'. Trigger it with an Inject node and read the result from a Debug node—the Exec node returns the script's stdout as msg.payload, plus separate outputs for errors and the return code. Add the -u flag to avoid output buffering, pass arguments by appending them to the command (read in Python via sys.argv), and parse printed JSON with a JSON node. Python must be installed on the same machine as Node-RED. This pairs Node-RED's visual flow logic with Python's libraries for tasks like sensor reading, data processing, and machine learning."
---

Python's robust data processing capabilities and extensive libraries are well-known in programming. When combined with Node-RED, these technologies can synergize to elevate data analytics and automation. This guide walks you through integrating Python scripts with Node-RED. You'll gain practical insights, troubleshooting tips, and effective techniques for executing scripts, enabling you to leverage this powerful combination for your IoT projects.

<!--more-->

## Why use python with Node-RED

Integrating Python and Node-RED can significantly enhance your IoT and automation initiatives by leveraging their distinct strengths. Node-RED excels in creating easy workflows, efficiently processing data streams, and integrating hardware, APIs, and. Meanwhile, Python offers a rich set of libraries for advanced tasks such as machine learning and AI, pivotal in realizing Industry 4.0 concepts.

This combination allows developers to build robust and flexible solutions. For instance, while Node-RED manages data flow and device communication, Python can perform complex analytics, and predictive modeling, or integrate with AI frameworks. This integration bridges the gap between data collection and actionable insights, enabling systems to make informed decisions autonomously.

## Installing Python

When executing Python scripts, it's essential to have the Python runtime installed on your system. Before proceeding, make sure you have it installed. You can follow the [official guide](https://wiki.python.org/moin/BeginnersGuide/Download) for instructions.

To verify if Python is installed, open your terminal and execute:

```bash
python --version
```

!["Screenshot of terminal showing the python version installed, conforming it is installed"](./images/calling-python-script-from-node-red-py-conformation.png "Screenshot of terminal showing the python version installed, conforming it is installed"){data-zoomable}

The above command displays the version of Python installed on your system as shown in the above image. If the above command doesn't work, try:

```bash
python3 --version
```

The specific command to use depends on how Python was installed and configured on your system. However, make sure to use `python <filename>.py` if the first command works, or `python3 <filename>.py` if the second command works, while executing Python scripts.

## Executing Python Script from Node-RED

Let's now see how to call a Python script from Node-RED. First, we'll create a basic script file that contains a function to print text in the console based on input. Currently, the function uses hardcoded input. To create this file using Node-RED, import the following flow, deploy it, and press the inject button:

{% renderFlow %}
[{"id":"b9d7d6aff0016631","type":"inject","z":"FFF0000000000001","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":240,"y":100,"wires":[["2e1daccf2a7b3d0f"]]},{"id":"d2d1450deaa588f4","type":"file","z":"FFF0000000000001","name":"","filename":".\\example.py","filenameType":"str","appendNewline":true,"createDir":false,"overwriteFile":"true","encoding":"none","x":570,"y":100,"wires":[["e140a8508fb10d96"]]},{"id":"e140a8508fb10d96","type":"debug","z":"FFF0000000000001","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":760,"y":100,"wires":[]},{"id":"2e1daccf2a7b3d0f","type":"template","z":"FFF0000000000001","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"def main():\n    # Hardcoded value\n    user_input = 20  \n    \n    # Check if the input is numeric\n    if isinstance(user_input, int) or (isinstance(user_input, str) and user_input.isdigit()):\n        number = int(user_input) if isinstance(user_input, str) else user_input\n        \n        # Conditionally render based on the input value\n        if number < 0:\n            print(\"Negative number entered\")\n        elif number == 0:\n            print(\"Zero entered\")\n        else:\n            print(\"Positive number entered\")\n    else:\n        print(\"Invalid input. Please enter a valid number.\")\n\nif __name__ == \"__main__\":\n    main()\n","output":"str","x":400,"y":100,"wires":[["d2d1450deaa588f4"]]}]
{% endrenderFlow %}

Now, let's execute this Python script from Node-RED. To do that, we will use Node-RED's [Exec](/node-red/core-nodes/exec/) node, which allows running commands on your system.

1. Drag an Inject node onto the canvas.
2. Drag an Exec node onto the canvas and Configure the command to `python ./example.py -u`. The -u flag prevents potential output buffering issues when executing Python scripts via exec.

!["Screenshot of the Exec node executing python file"](./images/calling-python-scrpt-from-node-red-exec-node.png "Screenshot of the Exec node executing python file"){data-zoomable}

3. Drag a Debug node onto the canvas.
4. Connect the output of the Inject node to the input of the Exec node, and the output of the Exec node to the input of Debug node.

{% renderFlow %}
[{"id":"2e26b84c0ce17312","type":"exec","z":"FFF0000000000001","command":"python ./example.py -u","addpay":"","append":"","useSpawn":"false","timer":"","winHide":false,"oldrc":false,"name":"","x":460,"y":300,"wires":[["89589c56117004e0"],["7fdb901b144749c2"],["3f49b49308941782"]]},{"id":"739e08c1ec77c2a1","type":"inject","z":"FFF0000000000001","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":240,"y":300,"wires":[["2e26b84c0ce17312"]]},{"id":"89589c56117004e0","type":"debug","z":"FFF0000000000001","name":"Output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":260,"wires":[]},{"id":"7fdb901b144749c2","type":"debug","z":"FFF0000000000001","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":690,"y":300,"wires":[]},{"id":"3f49b49308941782","type":"debug","z":"FFF0000000000001","name":"Return code","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":710,"y":340,"wires":[]}]
{% endrenderFlow %}

Now, when you deploy this flow and click on the inject node to execute the file, you should see the text 'Positive number entered' and `{ code: 0 }`, which indicates your script has been successfully executed.

## Reading Temperature Sensor using Python script

Having explored how to run a Python script within Node-RED with the basic practical example, let's move to a real-world scenario. We'll demonstrate how to read sensor data using Python, despite Node-RED providing numerous community-built nodes for this purpose. This approach provides deeper insights into integrating external scripts, showcasing the flexibility of Node-RED for custom solutions.

Before proceeding, ensure that Node-RED is running on a device connected to a temperature sensor. For detailed instructions, refer to [Setting Up Node-RED on Different Hardware](/node-red/hardware/), In this case, we are running Node-RED on a Raspberry Pi 5 with a DHT11 sensor connected to it.

1. Drag an Inject node onto the canvas, and set repeat to 1 seconds of interval.
2. Drag an Exec node and set the path to `python <filename>.py`, replace the filename with the name of the file which reads the sensor data, and make sure the python file doesn't contain the loop.
3. Drag the JSON node onto the canvas and set the action to "Always convert to JSON object".
4. Drag the Debug node onto the canvas.
5. Connect the output of the Inject node to the input of the Exec node and output of the Exec node to the input of the JSON node, and finally the JSON node's output to the input of the Debug node.

Below is the complete flow which creates the Python file to read the DHT11 sensor and executes that file after 1 second of interval. After deploying the flow you should able to see the sensor data on the debug sidebar as shown in the below image.

!["Image showing the Node-RED flow executing the python script that reads the sensor data"](./images/calling-python-scrpt-from-node-red-output.gif "Image showing the Node-RED flow executing the python script that reads the sensor data"){data-zoomable}

Note: The Python script uses the [adafruit-circuitpython](https://docs.circuitpython.org/projects/dht/en/latest/index.html) to read the sensor data so make sure to install it. Additionally, the code contained in the template node in the following flow considers that your sensor's signal pin is connected to GPIO 4.

{% renderFlow %}
[{"id":"94bc6fa766c4b397","type":"file","z":"FFF0000000000001","name":"","filename":"~/sensor.py","filenameType":"str","appendNewline":false,"createDir":false,"overwriteFile":"true","encoding":"none","x":610,"y":520,"wires":[["9b08eee57f666de5"]]},{"id":"37453becdf842bd7","type":"template","z":"FFF0000000000001","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"import time\nimport board\nimport adafruit_dht\nimport json\n\ndef publish():\n    dhtDevice = adafruit_dht.DHT11(board.D4)\n    try:\n        temperature_c = dhtDevice.temperature\n        humidity = dhtDevice.humidity\n\n        # Create JSON object\n        data = {\n            \"temperature_c\": temperature_c,\n            \"humidity\": humidity\n        }\n\n        # Convert JSON object to string and print\n        print(json.dumps(data))\n\n    except RuntimeError as error:\n        print(error.args[0])\n    except Exception as error:\n        dhtDevice.exit()\n        raise error\n    finally:\n        dhtDevice.exit()\n\ndef run():\n    publish()\n\nif __name__ == '__main__':\n    run()\n","output":"str","x":380,"y":520,"wires":[["94bc6fa766c4b397"]]},{"id":"5b3642d39c122576","type":"debug","z":"FFF0000000000001","name":"debug 2","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":880,"y":660,"wires":[]},{"id":"88144cbc887aada9","type":"inject","z":"FFF0000000000001","name":"","props":[],"repeat":"1","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":150,"y":660,"wires":[["c896267214914641"]]},{"id":"1b1d792011ffac2c","type":"inject","z":"FFF0000000000001","name":"","props":[{"p":"kill","v":"g","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","x":150,"y":520,"wires":[["37453becdf842bd7"]]},{"id":"c896267214914641","type":"exec","z":"FFF0000000000001","command":"python ~/sensor.py -u","addpay":"payload","append":"","useSpawn":"false","timer":"5","winHide":false,"oldrc":false,"name":"","x":400,"y":660,"wires":[["1d02a33a018f0f8d"],[],[]]},{"id":"1d02a33a018f0f8d","type":"json","z":"FFF0000000000001","name":"","property":"payload","action":"","pretty":false,"x":650,"y":660,"wires":[["5b3642d39c122576"]]},{"id":"9b08eee57f666de5","type":"debug","z":"FFF0000000000001","name":"debug 3","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":880,"y":520,"wires":[]},{"id":"343a9f704951f3ed","type":"comment","z":"FFF0000000000001","name":"Create python file that reads the sensor data","info":"","x":510,"y":440,"wires":[]},{"id":"216eb1333b2c264c","type":"comment","z":"FFF0000000000001","name":"Execute the python file that read the data","info":"","x":500,"y":580,"wires":[]}]
{% endrenderFlow %}

## Executing Python Script with Arguments from Node-RED

Now, let's revisit our first example. In that example, we executed a simple Python file with a hardcoded value. Now, we'll learn how to pass arguments or inputs to the Python script when executing from Node-RED. For this, we'll need to update the file. Import the following flow, deploy it, and click on the inject button to create the file.

{% renderFlow %}
[{"id":"b9d7d6aff0016631","type":"inject","z":"FFF0000000000001","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":300,"y":440,"wires":[["2e1daccf2a7b3d0f"]]},{"id":"d2d1450deaa588f4","type":"file","z":"FFF0000000000001","name":"","filename":"./example.py","filenameType":"str","appendNewline":true,"createDir":false,"overwriteFile":"true","encoding":"none","x":630,"y":440,"wires":[["e140a8508fb10d96"]]},{"id":"e140a8508fb10d96","type":"debug","z":"FFF0000000000001","name":"debug 1","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":820,"y":440,"wires":[]},{"id":"2e1daccf2a7b3d0f","type":"template","z":"FFF0000000000001","name":"","field":"payload","fieldType":"msg","format":"handlebars","syntax":"mustache","template":"import sys\n\ndef main():\n    if len(sys.argv) != 2:\n        print(\"Usage: python your_script.py <number>\")\n        return\n    \n    user_input = sys.argv[1]\n    \n    # Check if the input is numeric\n    if user_input.isdigit() or (user_input[0] == '-' and user_input[1:].isdigit()):\n        number = int(user_input)\n        \n        # Conditionally render based on the input value\n        if number < 0:\n            print(\"Negative number entered\")\n        elif number == 0:\n            print(\"Zero entered\")\n        else:\n            print(\"Positive number entered\")\n    else:\n        print(\"Invalid input. Please enter a valid number.\")\n\nif __name__ == \"__main__\":\n    main()\n","output":"str","x":460,"y":440,"wires":[["d2d1450deaa588f4"]]}]
{% endrenderFlow %}

1. Drag the Inject node onto the canvas.
2. Drag the Exec node onto the canvas, set the command to `python -u ./example.py <arg>`, and replace the `<arg>` with your argument.
3. Now Drag the Debug node onto the canvas.
4. Connect the output of the Inject node to the input of the Exec node, and the output of the Exec node to the input of the Debug node.

If you examine the Python file we've created, you'll notice the use of the 'sys' module, which allows us to read command-line arguments. In our context, we execute the command `python ./example.py -30`. By accessing `sys.argv[1]`, we retrieve the argument -30. The index 1 is used because `sys.argv[0]` provides the filename of the script being executed. Additionally, Python supports passing multiple arguments, so that you can pass as many arguments as you want.

{% renderFlow %}
[{"id":"2e26b84c0ce17312","type":"exec","z":"FFF0000000000001","command":"python -u ./example.py  -30","addpay":"","append":"","useSpawn":"false","timer":"","winHide":false,"oldrc":false,"name":"","x":520,"y":580,"wires":[["89589c56117004e0"],["7fdb901b144749c2"],["3f49b49308941782"]]},{"id":"739e08c1ec77c2a1","type":"inject","z":"FFF0000000000001","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":280,"y":580,"wires":[["2e26b84c0ce17312"]]},{"id":"89589c56117004e0","type":"debug","z":"FFF0000000000001","name":"Output","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":540,"wires":[]},{"id":"7fdb901b144749c2","type":"debug","z":"FFF0000000000001","name":"Error","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":730,"y":580,"wires":[]},{"id":"3f49b49308941782","type":"debug","z":"FFF0000000000001","name":"Return code","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"payload","targetType":"msg","statusVal":"","statusType":"auto","x":750,"y":620,"wires":[]}]
{% endrenderFlow %}

## Conclusion

In this guide, we've demonstrated how to seamlessly execute Python scripts from Node-RED, along with troubleshooting tips and instructions on passing arguments to scripts. By leveraging Python's extensive libraries for data processing, machine learning, and other tasks in conjunction with Node-RED, developers can build powerful IoT solutions with ease.
