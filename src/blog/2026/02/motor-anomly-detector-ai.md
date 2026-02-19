---
title: "Building an AI Vibration Anomaly Detector for Industrial Motors"
subtitle: "Detect motor faults early using AI-driven vibration analysis and anomaly detection."
description: "Learn how to monitor industrial motors continuously, train a custom autoencoder on healthy vibration data, and deploy real-time anomaly detection in Node-RED."
date: 2026-02-19
authors: ["sumit-shinde"]
tags:
- flowfuse
---

Most industrial motors don't fail suddenly. Bearings wear gradually, shafts drift out of alignment, and imbalance develops over weeks. By the time you hear the grinding noise or feel the heat, the damage is already done and you're looking at an unplanned shutdown.

<!--more-->

The problem isn't that these faults are invisible. They show up in vibration patterns long before anything breaks. The problem is that nobody's watching. Manual checks catch maybe 10% of issues, and by then you're already in reactive mode.

This guide walks through building a custom AI model that monitors vibration continuously, learns what normal motor behavior looks like, and flags deviations before they turn into failures deployed directly in Node-RED using FlowFuse.

<lite-youtube
  videoid=""
  style="width: 1024px; overflow: hidden; background-image: url('/blog/2026/02/images/anomaly-detection.png'); background-size: cover; background-position: center;"
  title="Motor Anomaly Detection System Built Using FlowFuse">
</lite-youtube>

## How It Works

An accelerometer on the motor continuously captures vibration across three axes and publishes batches of raw readings to an MQTT broker every half-second. A Node-RED flow picks these up and extracts 33 statistical features per batch — covering energy, peak forces, shape, and distribution across all three axes — then feeds them into a trained autoencoder.

An [autoencoder](https://en.wikipedia.org/wiki/Autoencoder) compresses input through a bottleneck layer and reconstructs it on the other side (`Input(33) → Dense(16) → Dense(8) → Dense(16) → Output(33)`). Trained exclusively on healthy motor data, it learns to reconstruct normal vibration patterns with low error. When something changes — a bearing starts to wear, alignment drifts, imbalance builds — the pattern shifts, reconstruction error rises, and the system flags an anomaly. This approach works because you almost certainly don't have examples of every fault mode, but you do have examples of normal operation.

## Building the System

The implementation has three main stages: setting up the hardware to collect vibration data, training the autoencoder model on normal operation, and deploying the trained model in Node-RED for real-time inference.

### Part 1: Data Requirements

This guide assumes you already have a vibration sensor publishing batches of acceleration readings (x, y, z axes) at regular intervals. For this guide, we used an ESP32 wired to an ADXL345 accelerometer if your setup differs, the rest of the steps remain the same as long as your sensor publishes the same payload format.

#### Expected Payload Format

Each message contains a half-second snapshot of motor vibration. The sensor captures 256 measurements per axis and packages them into a single JSON payload:

```json
{
  "motor_id": "motor-01",
  "ts": 1718000000000,
  "x": [0.12, 0.11, 0.13, 0.14, ...],   // 256 acceleration readings
  "y": [0.04, 0.05, 0.04, 0.03, ...],   // 256 acceleration readings
  "z": [0.98, 0.97, 0.99, 0.96, ...]    // 256 acceleration readings
}
```

At 500 Hz sampling, those 256 values represent roughly half a second of continuous vibration data across three axes. This batching approach is important because it gives the AI model enough context to detect patterns. A single data point means nothing, but 256 points reveal the signature of how the motor is actually behaving.

> **If your sensor uses different settings:** The feature extraction math works regardless of sample count or sampling rate — just update the number of samples per batch in your sensor firmware to match what you publish. If your sensor samples at 200 Hz and sends 128 values per batch, each window represents 640 ms instead of 500 ms. The model doesn't care about absolute timing, only the shape of the vibration signature.

#### MQTT Broker

You'll need an MQTT broker to route messages between the sensor, the training script, and Node-RED. Make sure your sensor is publishing to a consistent MQTT topic so Node-RED can subscribe and process the incoming data.

> **Tip:** If you're using [FlowFuse](/) for enterprise Node-RED, a built-in MQTT broker is available on **Pro** and **Enterprise** tiers no external setup required. [Contact us](/contact-us) for more information.

### Part 2: Training the Autoencoder

Before deploying anything in Node-RED, you need a trained model that understands what normal motor vibration looks like. This is done using a single Python script that connects to your MQTT broker, collects vibration data while the motor runs normally, and automatically trains and exports the model when you're done.

#### Prerequisites

Create and activate a virtual environment. The steps below were tested on a Mac (Apple Silicon) running Python 3.11 adapt as needed for your system:

```bash
python3 -m venv venv
source venv/bin/activate
```

> **Note:** On Windows, replace `source venv/bin/activate` with `venv\Scripts\activate`.

Then install the dependencies:

```bash
pip3 install numpy paho-mqtt torch onnx onnxruntime scikit-learn
```

#### Collect and Train

Create a file called `train_model.py`. This script subscribes to your MQTT broker, collects vibration data while the motor runs normally, and automatically trains the autoencoder when you press Ctrl+C.

> **Important:** Start the motor first, then run the script. The model needs to learn what normal running vibration looks like — collecting data with the motor stopped or barely running will produce a model that scores idle conditions as normal and fails to detect anomalies.

Before running, update the six variables at the top of the script to match your broker and sensor topic. The comments next to each variable explain what to set.

```python
"""
Motor Vibration Anomaly Detection — Data Collection + Training
"""

import json
import signal
import sys
import numpy as np
import torch
import torch.nn as nn
import onnx
import onnxruntime as ort
from onnx import numpy_helper, TensorProto, helper
import paho.mqtt.client as mqtt
from paho.mqtt.client import CallbackAPIVersion

# ── Update these to match your setup ────────────────────────────────────────
BROKER    = "broker.flowfuse.cloud"          # Your MQTT broker address or IP
PORT      = 1883                             # 1883 for plain MQTT, 8883 for TLS
USERNAME  = "aimodel@yeONmjGYBj"            # Leave as "" if broker has no auth
PASSWORD  = "30304499"                       # Leave as "" if broker has no auth
CLIENT_ID = "aimodel@yeONmjGYBj"            # Any unique string for this client
TOPIC     = "factory/motor-01/vibration/raw" # Must match the topic your sensor publishes to
# ────────────────────────────────────────────────────────────────────────────

MIN_WINDOWS = 300   # Minimum samples before training
MIN_STD     = 0.1   # Prevents near-constant features from exploding normalisation
CLIP        = 5.0   # Hard clip after normalisation

training_data = []
stop_flag = [False]

def extract_features(sig):
    """Extract 11 time-domain features from a signal array."""
    sig  = np.asarray(sig, dtype=np.float64)
    mean = np.mean(sig)
    std  = np.std(sig) + 1e-9

    rms              = np.sqrt(np.mean(sig ** 2))
    peak             = np.max(np.abs(sig))
    peak_to_peak     = np.max(sig) - np.min(sig)
    crest_factor     = peak / (rms + 1e-9)
    variance         = np.var(sig)
    std_dev          = np.std(sig)
    skewness         = np.mean(((sig - mean) / std) ** 3)
    kurtosis         = np.mean(((sig - mean) / std) ** 4) - 3
    mean_abs         = np.mean(np.abs(sig)) + 1e-9
    shape_factor     = rms / mean_abs
    impulse_factor   = peak / mean_abs
    mean_sqrt_abs    = np.mean(np.sqrt(np.abs(sig)))
    clearance_factor = peak / (mean_sqrt_abs ** 2 + 1e-9)

    return [rms, peak, peak_to_peak, crest_factor, variance,
            std_dev, skewness, kurtosis, shape_factor,
            impulse_factor, clearance_factor]

def featurize(payload):
    """Concatenate features from X, Y, Z → 33-element vector."""
    return (extract_features(payload["x"]) +
            extract_features(payload["y"]) +
            extract_features(payload["z"]))

def on_connect(client, userdata, flags, reason_code, properties):
    if reason_code == 0:
        print(f"Connected to {BROKER}")
        client.subscribe(TOPIC)
        print(f"Subscribed to {TOPIC}")
        print("Run motor normally. Press Ctrl+C when done collecting.\n")
    else:
        print(f"Connection failed: {reason_code}")

def on_message(client, userdata, msg):
    if stop_flag[0]:
        return
    try:
        payload = json.loads(msg.payload.decode())
        training_data.append(featurize(payload))
        n = len(training_data)
        print(f"  Collected {n} windows")
    except Exception as e:
        print(f"\nError: {e}")

def train_and_export():
    N = 33
    print(f"\n\nCollected {len(training_data)} windows. Starting training...")
    X = np.array(training_data, dtype=np.float32)

    # Scaler with minimum std floor to prevent normalisation explosion
    mean = X.mean(axis=0)
    std  = X.std(axis=0)

    clamped = std < MIN_STD
    if clamped.any():
        print(f"  Clamping {clamped.sum()} near-constant features to std={MIN_STD}")
        std[clamped] = MIN_STD

    X_norm = np.clip((X - mean) / std, -CLIP, CLIP)
    print(f"  Normalised range: [{X_norm.min():.3f}, {X_norm.max():.3f}]")

    scaler = {"mean": mean.tolist(), "std": std.tolist(), "clip": CLIP}
    with open("scaler_params.json", "w") as f:
        json.dump(scaler, f, indent=2)
    print("  Saved scaler_params.json")

    # Autoencoder
    class Autoencoder(nn.Module):
        def __init__(self, n):
            super().__init__()
            self.encoder = nn.Sequential(
                nn.Linear(n, 16), nn.ReLU(),
                nn.Linear(16, 8), nn.ReLU(),
            )
            self.decoder = nn.Sequential(
                nn.Linear(8, 16), nn.ReLU(),
                nn.Linear(16, n),
            )
        def forward(self, x):
            return self.decoder(self.encoder(x))

    model   = Autoencoder(N)
    opt     = torch.optim.Adam(model.parameters(), lr=1e-3)
    loss_fn = nn.MSELoss()
    data_t  = torch.tensor(X_norm, dtype=torch.float32)

    model.train()
    for epoch in range(1, 201):
        opt.zero_grad()
        loss = loss_fn(model(data_t), data_t)
        loss.backward()
        opt.step()
        if epoch % 40 == 0:
            print(f"  Epoch {epoch}/200  loss={loss.item():.6f}")

    # Calculate threshold as mean + 3 standard deviations of training errors
    model.eval()
    with torch.no_grad():
        recon  = model(data_t).numpy()
        errors = np.mean((recon - X_norm) ** 2, axis=1)
        thresh = float(errors.mean() + 3 * errors.std())

    with open("threshold.json", "w") as f:
        json.dump({"threshold": thresh}, f, indent=2)
    print(f"  Threshold (mean+3σ): {thresh:.6f}")
    print("  Saved threshold.json")

    # Export to ONNX (manual build to avoid version conflicts)
    layers   = [("encoder.0","enc0"),("encoder.2","enc2"),
                ("decoder.0","dec0"),("decoder.2","dec2")]
    has_relu = [True, True, True, False]
    inits, nodes = [], []
    cur = "features"

    for (prefix, tag), relu in zip(layers, has_relu):
        w = model.state_dict()[f"{prefix}.weight"].numpy().T.astype(np.float32)
        b = model.state_dict()[f"{prefix}.bias"].numpy().astype(np.float32)
        inits += [numpy_helper.from_array(w, name=f"w_{tag}"),
                  numpy_helper.from_array(b, name=f"b_{tag}")]
        mm = f"mm_{tag}"; add = f"add_{tag}"
        nodes += [helper.make_node("MatMul", [cur, f"w_{tag}"], [mm]),
                  helper.make_node("Add",    [mm,  f"b_{tag}"], [add])]
        cur = add
        if relu:
            r = f"relu_{tag}"
            nodes.append(helper.make_node("Relu", [cur], [r]))
            cur = r

    graph = helper.make_graph(
        nodes, "autoencoder",
        [helper.make_tensor_value_info("features", TensorProto.FLOAT, [None, N])],
        [helper.make_tensor_value_info(cur, TensorProto.FLOAT, [None, N])],
        initializer=inits,
    )
    proto = helper.make_model(graph, opset_imports=[helper.make_opsetid("", 11)])
    proto.ir_version = 7
    onnx.checker.check_model(proto)
    onnx.save(proto, "motor_autoencoder.onnx")
    print("  Exported motor_autoencoder.onnx")

    # Sanity check — verify normal data scores below threshold
    sess = ort.InferenceSession("motor_autoencoder.onnx")
    out  = sess.run(None, {"features": X_norm[:5].astype(np.float32)})[0]
    mse  = float(np.mean((out - X_norm[:5]) ** 2))
    print(f"\n  Sanity MSE (5 normal samples): {mse:.6f}  threshold: {thresh:.6f}")
    if mse < thresh:
        print("  ✓ Model correct — normal data below threshold.")
    else:
        print("  ⚠ Sanity MSE above threshold — collect more data and retrain.")

    print("\nDone. Copy these 3 files to your Node-RED server:")
    print("  motor_autoencoder.onnx  scaler_params.json  threshold.json")

def handle_sigint(sig, frame):
    stop_flag[0] = True
    if len(training_data) < MIN_WINDOWS:
        print(f"\n\nNeed at least {MIN_WINDOWS} windows. Restart and collect longer.")
        sys.exit(1)
    train_and_export()
    sys.exit(0)

signal.signal(signal.SIGINT, handle_sigint)

client = mqtt.Client(callback_api_version=CallbackAPIVersion.VERSION2,
                     client_id=CLIENT_ID)
client.username_pw_set(USERNAME, PASSWORD)
client.on_connect = on_connect
client.on_message = on_message
client.connect(BROKER, PORT, keepalive=60)
client.loop_forever()
```

Let it collect for 5–10 minutes (aim for 300+ windows), then press **Ctrl+C once** and wait. The script will automatically train the model and export three files:

- `motor_autoencoder.onnx` — the trained model in a portable format
- `scaler_params.json` — the scaling parameters used to normalise input data
- `threshold.json` — the reconstruction error threshold above which a reading is flagged as anomalous

> **Tip:** Watch for the sanity check output at the end. If it shows `✓ Model correct`, the model is working. If it shows a warning, collect more data with the motor running and retrain.

### Part 3: Deploying in Node-RED

The hard part is done. The model knows what healthy looks like now it's time to put it on watch duty. This section builds the Node-RED flow that runs continuously, scoring every vibration payload in real time and raising the alarm the moment something looks wrong.

#### Installing the AI Nodes

FlowFuse provides a dedicated AI nodes package for Node-RED that includes ONNX runtime support, exactly what you need to load and run your trained model. Install it from the palette manager:

1. Open Node-RED Editor and go to **Menu → Manage Palette**
2. Search for `@flowfuse-nodes/nr-ai-nodes`
3. Click **Install**

Once installed, you will see new nodes added to the palette under the FlowFuse AI category. For this guide, we will be using the ONNX node.

![FlowFuse AI nodes visible in the Node-RED palette under the FlowFuse AI category](./images/ai-nodes.png "FlowFuse AI nodes visible in the Node-RED palette under the FlowFuse AI category")

#### Loading the Model Files

Before building the flow, place your three model files somewhere Node-RED can access them. The path below is the default for FlowFuse Device Agent deployments:

```bash
sudo mkdir -p /opt/flowfuse-device/models
sudo cp motor_autoencoder.onnx /opt/flowfuse-device/models/
sudo cp scaler_params.json /opt/flowfuse-device/models/
sudo cp threshold.json /opt/flowfuse-device/models/
```

> **If you're running plain Node-RED** (not via FlowFuse Device Agent), choose any directory your Node-RED process can read, such as `/home/pi/models/` on a Raspberry Pi or `C:\nodered\models\` on Windows. Just update the file paths in the function node and ONNX node configuration to match wherever you place the files.

#### Building the Inference Flow

The flow has five stages: receive the payload, extract features, scale and prepare, run inference, and score the result. Function nodes are used only where the math genuinely requires it.

**1. Subscribe to MQTT**

Add an mqtt-in node and configure it with the broker where your data is being published. Subscribe to the same topic that your sensor is publishing to — this must match the `TOPIC` value you used in `train_model.py`.

Set the output to auto-detect so the JSON payload is parsed automatically. No separate JSON node is required.

If you are using the built-in FlowFuse MQTT broker, use the [FlowFuse MQTT nodes](/node-red/flowfuse/mqtt/). These nodes automatically connect to the broker when you drag them into the flow. Just enter the topic to subscribe.

**2. Extract Features**

Add a **function** node. In the **Setup** tab, add the module `fs`. Then paste the following into the **On Message** tab:

> **If you changed the model file path**, update the two `readFileSync` paths in this function to match your chosen directory.

```javascript
function extractFeatures(sig) {
    const arr = sig.map(Number);
    const n = arr.length;
    const mean = arr.reduce((a, b) => a + b, 0) / n;
    const std = Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n) + 1e-9;
    const absArr = arr.map(Math.abs);
    const rms = Math.sqrt(arr.reduce((a, b) => a + b * b, 0) / n);
    const peak = Math.max(...absArr);
    const meanAbs = absArr.reduce((a, b) => a + b, 0) / n + 1e-9;
    const meanSqrtAbs = absArr.reduce((a, b) => a + Math.sqrt(b), 0) / n;
    return [
        rms, peak, Math.max(...arr) - Math.min(...arr),
        peak / (rms + 1e-9),
        arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n,
        Math.sqrt(arr.reduce((a, b) => a + (b - mean) ** 2, 0) / n),
        arr.reduce((a, b) => a + ((b - mean) / std) ** 3, 0) / n,
        arr.reduce((a, b) => a + ((b - mean) / std) ** 4, 0) / n - 3,
        rms / meanAbs, peak / meanAbs, peak / (meanSqrtAbs ** 2 + 1e-9),
    ];
}

if (!flow.get('scaler')) {
    const sc = JSON.parse(fs.readFileSync('/opt/flowfuse-device/models/scaler_params.json'));
    const th = JSON.parse(fs.readFileSync('/opt/flowfuse-device/models/threshold.json'));
    flow.set('scaler', sc);
    flow.set('threshold', th.threshold);
}

const scaler = flow.get('scaler');
const CLIP = scaler.clip || 5.0;
const MIN_STD = 0.1;

const raw = [
    ...extractFeatures(msg.payload.x),
    ...extractFeatures(msg.payload.y),
    ...extractFeatures(msg.payload.z)
];

const normalised = raw.map((v, i) => {
    const s = Math.max(scaler.std[i], MIN_STD);
    const n = (v - scaler.mean[i]) / s;
    return Math.max(-CLIP, Math.min(CLIP, n));
});

msg.input = {
    data: new Float32Array(normalised),
    type: "float32",
    dims: [1, 33]
};
msg.payload = msg.input;
msg.threshold = flow.get('threshold');
return msg;
```

This function extracts 11 time-domain features per axis (33 total), loads the scaler on first run, and normalises the feature vector before passing it to the model. The `MIN_STD` floor and `±CLIP` clamp prevent near-constant features from producing extreme values when they vary slightly — a common cause of false positives with vibration sensors.

> **Note:** The scaler and threshold are cached in flow context after the first message, so the files are only read once. If you update the model files, restart the Node-RED flow to reload them.

**3. Run the Model**

Add an **onnx** node and configure it:

- **Model path:** `/opt/flowfuse-device/models/motor_autoencoder.onnx` (update this if you used a different directory)
- **Input:** `msg.payload`

The autoencoder compresses the 33-feature input through its bottleneck and reconstructs it on the other side. The output tensor is accessible in the next node as `msg.payload.add_dec2`.

**4. Score the Reconstruction Error**

Add a second **function** node and paste the following:

```javascript
if (!context.get('initialized')) {
    flow.set('score_history', []);
    context.set('initialized', true);
}

const reconstructed = msg.payload.add_dec2.cpuData;
const input = Array.from(msg.input.data);
const threshold = msg.threshold;

const mse = input.reduce((s, v, i) => s + (reconstructed[i] - v) ** 2, 0) / input.length;

let history = flow.get('score_history') || [];
history.push(mse);
if (history.length > 10) history.shift();
flow.set('score_history', history);

const smoothed = history.reduce((a, b) => a + b, 0) / history.length;

msg.anomaly_score = smoothed;
msg.is_anomaly    = smoothed > threshold;
msg.severity      = smoothed > threshold * 2 ? 'CRITICAL' : smoothed > threshold ? 'WARNING' : 'NORMAL';
msg.payload       = { anomaly_score: smoothed, threshold, is_anomaly: msg.is_anomaly, severity: msg.severity };
return msg;
```

This function computes the mean squared error between the model's reconstruction and the original normalised input, applies a 10-window rolling average to reduce sensitivity to transient spikes, and classifies the result as `NORMAL`, `WARNING`, or `CRITICAL`.

> **Recovery time:** After an anomaly clears, the score returns to normal once the rolling window fills with healthy readings — typically 10 × your publish interval. If your sensor publishes every 500 ms, recovery takes around 5 seconds. Reduce the history window size for faster recovery, or increase it for fewer false alarms.

Once done, deploy the flow. After deployment, it should look like the image below:

![Completed Node-RED inference flow showing MQTT input, feature extraction function node, ONNX node, and anomaly scoring function node](./images/flow.png "Completed Node-RED inference flow showing MQTT input, feature extraction function node, ONNX node, and anomaly scoring function node")

**5. Act on the Result**

Connect the output of the flow to whatever fits your operation. For simple testing or troubleshooting, attach a debug node to see results in real time. For production, use an mqtt-out node to publish anomaly alerts downstream, or build a live dashboard using the [FlowFuse Dashboard](https://dashboard.flowfuse.com) package to visualise the anomaly score over time and clearly indicate motor state.

#### What the Output Looks Like

Each message that passes through the flow produces a structured result like this:

```json
{
  "anomaly_score": 0.842,
  "threshold": 0.703,
  "is_anomaly": true,
  "severity": "WARNING"
}
```

When `is_anomaly` is `false`, the motor is behaving exactly as the model expects. When it changes to `true`, the vibration pattern has shifted beyond the acceptable range — giving you time to act before the problem becomes a failure. A severity of `CRITICAL` means the score has crossed twice the threshold, indicating a more significant deviation.

## Adapting This to Your Environment

This guide was built around a specific hardware and software stack, but the system is designed to be portable. Here's a reference for the most common things you'll need to change.

### Sensor Hardware

Any accelerometer that can publish x, y, z arrays over MQTT will work. The payload field names (`x`, `y`, `z`) are referenced in both the training script's `featurize()` function and the Node-RED feature extraction function — update both if your sensor uses different key names. The `motor_id` and `ts` fields are ignored by the model and can be omitted or renamed without effect.

### Sampling Rate and Window Size

The guide assumes 256 samples per batch at 500 Hz. If your sensor uses different settings, the feature extraction math still works unchanged — the features are statistics of whatever array you pass in. What does change is the timing: recovery time, publish interval descriptions, and how much vibration context each window captures. Aim for at least 100–200 ms of data per window; anything shorter may not carry enough signature for reliable detection.

### Threshold Tuning

The `mean + 3σ` threshold calculated during training is a solid starting point, but every motor environment is different. If you're seeing too many false positives — the score regularly spikes above the threshold during normal operation — collect more training data or increase the multiplier by editing `threshold.json` directly. If faults are being missed, reduce it. You can also tune the rolling window size in the scoring function: a window of 5 is more responsive, a window of 20 is more stable.

### When to Retrain

The model captures what normal looks like at the time you collect training data. You should retrain if the motor's operating conditions change significantly — for example, after a maintenance overhaul, a change in load profile, a new mounting position, or seasonal temperature shifts that affect vibration baseline. Retraining is the same process: run `train_model.py` with the motor operating under the new normal conditions, then replace the three model files and restart the Node-RED flow.

Most motor failures are predictable. The vibration signature is there weeks before the damage is done. FlowFuse, the industrial data platform that helps you connect, collect, and act on machine data, brings the entire pipeline together in one place: sensor ingestion, feature extraction, and custom-trained AI inference, all without managing separate infrastructure. [Try it free](contact-us).