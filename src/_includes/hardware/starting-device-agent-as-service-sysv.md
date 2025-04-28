### Starting the FlowFuse Device Agent as a Service

The system on this device typically utilizes SysVinit as its service management framework, responsible for starting, stopping, and managing background services during system boot and shutdown. On SysVinit-based systems, the FlowFuse Device Agent can be configured to run as a service at system startup by creating and enabling a custom init script.

Create a script file named flowfuse-device-agent-init with the following content:

```
#!/bin/sh
### BEGIN INIT INFO
# Provides:          flowfuse-device-agent
# Required-Start:    $network SoftPAC
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start the FlowFuse Device Agent at boot
# Description:       Allow FlowFuse to manage Node-RED on this device
### END INIT INFO

PROGRAM="/usr/bin/flowfuse-device-agent"
PIDFILE="/var/run/flowfuse-device-agent.pid"

start() {
    echo "Starting flowfuse-device-agent..."
    $PROGRAM &
    echo $! > $PIDFILE
    echo "flowfuse-device-agent started."
}

stop() {
    echo "Stopping flowfuse-device-agent..."
    kill $(cat $PIDFILE)
    rm -f $PIDFILE
    echo "flowfuse-device-agent stopped."
}

status() {
    if [ -f $PIDFILE ]; then
        PID=$(cat $PIDFILE)
        if ps -p $PID > /dev/null; then
            echo "flowfuse-device-agent is running (PID: $PID)."
        else
            echo "flowfuse-device-agent is not running."
        fi
    else
        echo "flowfuse-device-agent is not running."
    fi
}

case "$1" in
    start)
        start
        ;;
    stop)
        stop
        ;;
    restart)
        stop
        start
        ;;
    status)
        status
        ;;
    *)
        echo "Usage: /etc/init.d/flowfuse-device-agent {start|stop|restart|status}"
        exit 1
        ;;
esac

exit 0
```

Run the following commands to install and enable the service:

```bash
sudo cp flowfuse-device-agent-init /etc/init.d/flowfuse-device-agent
sudo chmod +x /etc/init.d/flowfuse-device-agent
sudo update-rc.d flowfuse-device-agent defaults
```

This will register the script to start the FlowFuse Device Agent automatically at boot.