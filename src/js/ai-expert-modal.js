document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('ai-expert-modal');
    const closeBtn = document.getElementById('close-modal');
    const tellMeHowBtn = document.getElementById('tell-me-how-btn');
    const chatMessages = document.getElementById('chat-messages');
    const modalInput = document.getElementById('modal-input');
    let transferPayload = []
    let flowsStore = {}

    // Debug: Check if button was found
    if (!tellMeHowBtn) {
        console.error('FlowFuse Expert: Tell Me How button not found!');
    }

    // Message storage array
    let messages = [];

    // Session ID for chat isolation
    let sessionId = null;

    // Variables for stopping generation
    let currentAbortController = null;
    let isGenerating = false;

    // Transaction ID for preventing race conditions
    let lastTransactionId = null;

    // Auto-scroll management
    let autoScrollEnabled = true;
    const scrollThreshold = 50; // pixels from bottom to consider "at bottom"

    // Loading messages system
    const loadingMessages = [
        "Please wait, this can take up to 20 seconds",
        "Searching through our documentation",
        "Thinking through your question"
    ];
    let currentLoadingMessageIndex = 0;
    let loadingMessageInterval = null;

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
                 .then(() => {
                     console.log('copied');
                 })
                 .catch(err => {
                    console.error('Failed to copy text:', err);
                 });
    }

    let flowInteractionHandler = function (e) {
        if (e.target.closest('.copy')) {
            const flowTarget = e.target.closest('[data-flow-id]')?.getAttribute('data-flow-id');
            if (flowTarget && flowsStore[flowTarget]) {
                copyToClipboard(flowsStore[flowTarget]);
                const copyButton = e.target.closest('.copy');
                const copySvg = copyButton.querySelector('.copy-svg');
                const checkSvg = copyButton.querySelector('.check-svg');
                copySvg.classList.add('hidden');
                checkSvg.classList.remove('hidden');
                setTimeout(() => {
                    copySvg.classList.remove('hidden');
                    checkSvg.classList.add('hidden');
                }, 2000);
            }
        }

        if (e.target.closest('.expand')) {
            const flowSection = e.target.closest('[data-flow-id]');
            if (flowSection) {
                const preElement = flowSection.querySelector('pre');
                const preContainer = preElement?.parentElement;
                const downChevron = flowSection.querySelector('.down-arrow');
                const upChevron = flowSection.querySelector('.up-arrow');
                if (preElement && preContainer) {
                    preElement.classList.toggle('hidden');
                    preContainer.classList.toggle('mt-3');
                    downChevron.classList.toggle('hidden');
                    upChevron.classList.toggle('hidden');
                }
            }
        }
    };

    // Centralized function to manage input state based on isGenerating
    function updateInputState() {
        const clearBtn = document.getElementById('clear-conversation');
        const stopBtn = document.getElementById('stop-generation');
        const sendBtn = document.getElementById('send-message');
        const exportBtn = document.getElementById('continue-to-app');

        if (isGenerating) {
            modalInput.disabled = true;
            // Disable clear button during generation
            if (clearBtn) clearBtn.disabled = true;
            // Show stop button, hide send button
            if (stopBtn) stopBtn.classList.remove('hidden');
            if (sendBtn) sendBtn.classList.add('hidden');
        } else {
            modalInput.disabled = false;
            modalInput.focus();
            // Enable clear button only if there are messages
            const hasMessages = messages.length > 0;
            if (clearBtn) clearBtn.disabled = !hasMessages;
            // Hide stop button, show send button if there are messages
            if (stopBtn) stopBtn.classList.add('hidden');
            if (sendBtn) {
                // Enable/disable send button based on textarea content
                const hasContent = modalInput.value.trim().length > 0;
                sendBtn.disabled = !hasContent;
                sendBtn.classList.remove('hidden');
            }
            exportBtn.disabled= false;
        }
    }

    // Check if user is at bottom of scroll container
    function isAtBottom() {
        const container = chatMessages.parentElement; // Get the scrollable container
        return container.scrollHeight - container.scrollTop - container.clientHeight < scrollThreshold;
    }

    // Scroll to bottom if auto-scroll is enabled
    function scrollToBottom() {
        if (autoScrollEnabled) {
            const container = chatMessages.parentElement;
            container.scrollTop = container.scrollHeight;
        }
    }

    // Set up scroll detection on the chat container
    const chatContainer = chatMessages.parentElement;
    chatContainer.addEventListener('scroll', function() {
        // Check if user is at bottom
        if (isAtBottom()) {
            // Re-enable auto-scroll when user scrolls to bottom
            autoScrollEnabled = true;
        } else {
            // Disable auto-scroll when user scrolls up
            autoScrollEnabled = false;
        }
    });

    // Open modal
    if (tellMeHowBtn) {
        tellMeHowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const textarea = document.querySelector('textarea[aria-label="Describe your workflow"]');
            const userText = textarea ? textarea.value : '';
            const promptText = userText.trim();
            openModal(promptText);
        });
    }

    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });

    // Handle prompt pill clicks
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('prompt-pill') && e.target.dataset.prompt) {
            e.preventDefault();
            const promptText = e.target.dataset.prompt;
            openModal(promptText);
        }
    });

    const prompts = [
        {
            "title": "Build Unified Namespace Architecture",
            "prompt": "Create a Unified Namespace (UNS) architecture using MQTT that organizes industrial data by ISA-95 hierarchy (Enterprise > Site > Area > Line > Cell), subscribe to data from multiple sources (PLCs, OPC-UA servers, REST APIs), transform it into a standardized topic structure, and publish to a central MQTT broker for use by dashboards, MES systems, and analytics platforms."
        },
        {
            "title": "Convert Data to Sparkplug B",
            "prompt": "Subscribe to industrial data from MQTT, OPC-UA servers, or PLCs, transform it into Sparkplug B format with proper namespace, data types, and birth/death certificates, and publish to MQTT broker for consumption by historians, SCADA systems like Ignition, or cloud analytics platforms."
        },
        {
            "title": "Track Machine Downtime & Reasons",
            "prompt": "Monitor PLC tags or machine signals to detect when equipment transitions to stopped state, capture downtime start/end timestamps, prompt operators to categorize downtime reasons (maintenance, changeover, material shortage, etc.), calculate total downtime duration, and log events to database or publish to MQTT for OEE analysis and reporting."
        },
        {
            "title": "Calculate OEE Metrics",
            "prompt": "Read production count, machine state, and target rate from PLC tags or MQTT topics, calculate Overall Equipment Effectiveness (OEE) using the formula: Availability × Performance × Quality, track good parts vs total parts produced, identify downtime periods, aggregate metrics by shift or day, and display results on dashboard or send to MES system for reporting."
        },
        {
            "title": "Monitor PLCs & Alert on Issues",
            "prompt": "Continuously monitor PLC connections, OPC-UA server availability, and critical machine tags, detect connection failures or tag value anomalies, send immediate notifications via email, Slack, Microsoft Teams, or SMS when issues occur, log all alerts to database with timestamps, and create recovery workflows to attempt reconnection or escalate to maintenance teams."
        },
        {
            "title": "Send PLC/SCADA Data to Cloud",
            "prompt": "Connect to PLCs via Modbus TCP, OPC-UA, or SCADA systems, read process variables and machine states at regular intervals (e.g., every 10-30 seconds), transform and batch the data, send to cloud platforms (AWS IoT Core, Azure IoT Hub, or Azure Event Hub) via MQTT or HTTPS, with local caching to handle network outages and ensure no data loss."
        },
        {
            "title": "Build Production Dashboard",
            "prompt": "Query production data from PLCs, databases, or MQTT topics, display real-time metrics including current production count, target vs actual, cycle time, machine status, and downtime, create visualizations using gauges, trend charts, and status indicators, organize by production line or cell, and deploy to operator terminals or hallway monitors for shop floor visibility."
        },
        {
            "title": "Track Cycle Time per Machine",
            "prompt": "Monitor machine cycle start and cycle complete signals from PLCs, calculate time duration for each cycle, track setup time separately from run time, aggregate cycle times by part number or production order, calculate machine utilization percentage, log data to SQL database with timestamps, and use for cost of goods sold (COGS) calculations and ERP accuracy improvement."
        },
        {
            "title": "Monitor Errors & Notify Team",
            "prompt": "Subscribe to error tags from PLCs, OPC-UA servers, or application logs, detect when error conditions occur or error codes change, parse error details and severity levels, send formatted notifications to appropriate channels (email for low priority, Slack or Teams for medium, SMS for critical), log all errors to database for trend analysis, and integrate with ticketing systems like JIRA for automated work order creation."
        },
        {
            "title": "Sync MES & ERP Systems",
            "prompt": "Query production data from MES system (work orders, production counts, quality results, downtime events), transform to match ERP data schema (SAP, Microsoft Dynamics, or other), push updates to ERP via REST API or database writes, handle bi-directional sync for work order status and inventory levels, implement error handling and retry logic, and maintain audit trail of all synchronization events."
        },
        {
            "title": "Sync Database to Cloud APIs",
            "prompt": "Poll local SQL database (PostgreSQL, MySQL, SQL Server) for new or updated records, extract production data, quality metrics, or inventory changes, transform to JSON format, send via HTTPS POST to cloud REST APIs or Azure Event Hub, use Project Link nodes to securely connect cloud FlowFuse instance to on-premise database, implement change detection to avoid duplicate sends, and handle API rate limits with queuing."
        },
        {
            "title": "Display OEE Dashboard",
            "prompt": "Subscribe to production count, downtime events, and quality data from MQTT or database, calculate real-time OEE metrics (Availability, Performance, Quality), display current OEE percentage with gauge widget, show trend charts for OEE over time (last hour, shift, day), break down OEE components to identify bottlenecks, add shift selection and date range filters, and enable PDF report generation for end-of-shift summaries."
        },
        {
            "title": "Stream to AWS/Azure IoT Hub",
            "prompt": "Connect to industrial data sources (Modbus, OPC-UA, MQTT), sample data at configured intervals, format as JSON payloads with device metadata and timestamps, publish to AWS IoT Core or Azure IoT Hub via MQTT with TLS encryption, implement device twin synchronization for configuration management, trigger cloud-side Lambda or Azure Functions for serverless data processing, and store in cloud time-series database."
        },
        {
            "title": "Write PLC Data to Database",
            "prompt": "Connect to PLC via Modbus TCP, OPC-UA, or Ethernet/IP protocol, read specified tags (temperatures, pressures, production counts, machine states), poll at regular intervals (e.g., every 10 seconds or on change), transform tag values to database-friendly format, write to SQL database (PostgreSQL, MySQL, SQL Server) using INSERT or UPSERT operations, create time-series table structure with timestamps, and implement connection pooling for performance."
        },
        {
            "title": "Connect SCADA to MES",
            "prompt": "Subscribe to SCADA system data points via OPC-UA or MQTT, extract real-time process variables, alarms, and batch data, transform to MES-compatible format (ISA-95 model), push production events to MES system (work order progress, downtime, quality checks) via REST API or database writes, enable bi-directional communication for MES to update SCADA setpoints or recipe parameters, and handle state synchronization."
        },
        {
            "title": "Convert OPC-UA to MQTT",
            "prompt": "Connect to OPC-UA server as client, browse available nodes or configure specific NodeIDs to monitor, subscribe to data changes, extract tag name, value, quality, and timestamp, map OPC-UA node hierarchy to MQTT topic structure (e.g., site/area/line/device/tag), publish to MQTT broker with QoS 1 for guaranteed delivery, preserve data types and units, and implement reconnection logic for reliability."
        },
        {
            "title": "Publish PLC Data to MQTT",
            "prompt": "Read PLC tags via Modbus, OPC-UA, or proprietary protocol, sample values at defined intervals or on change of value, format as JSON payloads with metadata (device ID, location, timestamp), publish to MQTT broker organized by topic hierarchy (enterprise/site/area/cell/tag), use retained messages for current state values, implement MQTT birth/death messages to indicate connection status, and ensure secure TLS connection."
        },
        {
            "title": "Create OPC-UA Server Gateway",
            "prompt": "Connect to devices using Modbus TCP, Modbus RTU, Ethernet/IP, or serial protocols, read device data points and map to OPC-UA address space, configure OPC-UA server node with proper namespace and node structure, expose PLC data as OPC-UA server for SCADA systems or historians to connect to, implement security (username/password or certificates), and provide standardized interface to legacy equipment."
        },
        {
            "title": "Store REST API Data in Database",
            "prompt": "Poll REST API endpoints at scheduled intervals (e.g., every 5 minutes), parse JSON or XML responses, extract relevant fields (order status, inventory levels, customer data), transform to match database schema, write to SQL database tables using INSERT or UPDATE operations, handle pagination for large datasets, implement error handling for API failures, and log API response times for monitoring."
        },
        {
            "title": "Store MQTT Data in InfluxDB/Historian",
            "prompt": "Subscribe to MQTT topics containing sensor data, production metrics, or machine states, parse message payloads (JSON or binary), extract timestamp and tag values, write to time-series database (InfluxDB, TimescaleDB, or proprietary historian) with proper tags for filtering (site, line, machine), implement batching for write efficiency, handle backpressure during high data rates, and configure retention policies for data lifecycle management."
        },
        {
            "title": "Display Real-Time Sensor Dashboard",
            "prompt": "Subscribe to temperature, pressure, flow, vibration, or other sensor data from MQTT or database queries, display real-time values with gauge widgets showing current readings and min/max ranges, create trend charts showing last hour or shift of data, add threshold indicators and color-coded alerts when values exceed limits, organize by sensor location or equipment, and update displays every 1-5 seconds for true real-time visibility."
        },
        {
            "title": "Send Data to Azure Event Hub",
            "prompt": "Collect telemetry, alerts, and production events from edge devices and PLCs, batch messages to optimize throughput, format as JSON with event metadata, publish to Azure Event Hub partition using AMQP or HTTPS protocol, implement local caching to queue messages during network outages, configure retry logic with exponential backoff, and integrate with downstream Azure services like Stream Analytics or Azure Functions for processing."
        },
        {
            "title": "Build Operator Terminal Display",
            "prompt": "Query current machine status, active work order, production count, and cycle progress from PLC or MES system, display on tablet or HMI screens at operator workstations, show work instructions that automatically advance based on production step, provide buttons for operators to log downtime reasons or quality issues, display real-time alerts and notifications, and update every few seconds to keep operators informed of production state."
        },
        {
            "title": "Monitor Energy Consumption",
            "prompt": "Read energy meter data via Modbus TCP or BACnet protocol, collect kWh consumption, power factor, current, and voltage measurements every 30-60 seconds, calculate energy usage by time period (hour, shift, day), display consumption trends with line charts, compare energy usage across machines or production lines, calculate cost based on utility rates, set threshold alerts for unusual consumption spikes, and export data for sustainability reporting."
        },
        {
            "title": "Alert When Thresholds Exceeded",
            "prompt": "Monitor sensor values (temperature, pressure, vibration, current) or KPIs (OEE, cycle time, downtime) from MQTT topics or database queries, compare against configured threshold limits (high/low warning and critical levels), detect when values exceed thresholds for sustained duration to avoid false alarms, send formatted notifications to Slack channels or Microsoft Teams with alert details, severity level, and current value, and include links to dashboards for troubleshooting."
        },
        {
            "title": "Upload Data Files to S3/Azure Blob",
            "prompt": "Export production data from local database to CSV or JSON files on scheduled intervals (hourly, daily), compress files to reduce transfer size, upload to AWS S3 bucket or Azure Blob Storage using secure credentials, organize by date-based folder structure (year/month/day), verify successful upload with checksums, delete local files after confirmed cloud storage, and trigger downstream cloud analytics pipelines or data lake ingestion."
        },
        {
            "title": "Combine PLC Tags to Machine State",
            "prompt": "Read multiple PLC tags (motor running, conveyor active, door closed, e-stop status, alarm active), apply business logic to determine overall machine state (running, idle, setup, maintenance, fault), create derived 'machine state' tag published to MQTT or written to database, implement state transition rules with minimum duration to avoid flapping, log all state changes with timestamps, and use aggregated state for OEE calculations and dashboards."
        },
        {
            "title": "Track Production vs Target",
            "prompt": "Retrieve production target from MES, ERP, or manual entry for current shift and part number, monitor actual production count from PLC trigger or part counter, calculate real-time percentage of target achieved (actual/target × 100), display on dashboard with progress bar and numeric indicator, calculate projected end-of-shift count based on current rate, alert supervisors when falling behind target (e.g., <90% by midshift), and log performance metrics to database."
        },
        {
            "title": "Sync Edge to Cloud Database",
            "prompt": "Run FlowFuse instance on edge device or factory network, collect production data locally to SQL database or InfluxDB, use FlowFuse Project Link to establish secure connection to cloud instance, periodically sync new or updated records from edge database to cloud database (AWS RDS, Azure SQL, or cloud-hosted PostgreSQL), implement incremental sync with change tracking to minimize data transfer, handle bi-directional sync if cloud sends configuration or setpoints back to edge."
        },
        {
            "title": "Push ERP Data to MES",
            "prompt": "Connect to ERP system (SAP, Microsoft Dynamics, Oracle) via REST API or database connector, query work orders, bill of materials, routing steps, and production schedules, transform ERP data structure to match MES system requirements (ISA-95 format), push to MES via API calls or database inserts, handle data mapping for part numbers, operations, and resource assignments, implement scheduled sync (every 5-15 minutes) or event-driven triggers, and log all transfers for audit trail."
        },
        {
            "title": "Convert Modbus to MQTT",
            "prompt": "Connect to Modbus TCP or Modbus RTU devices (PLCs, sensors, drives), configure register addresses to read (holding registers, input registers, coils), poll devices at regular intervals (1-10 seconds), parse register values and apply scaling/offsets to engineering units, map each register to MQTT topic using hierarchical naming (site/line/device/register), publish to MQTT broker with JSON payloads including value, unit, timestamp, and quality status, and implement device offline detection."
        },
        {
            "title": "Dashboard for Multiple Production Lines",
            "prompt": "Query production status for all machines or lines from MQTT topics or database, display grid layout with one card per machine showing current status (running/stopped/fault), production count, cycle time, and last downtime reason, color-code machines by state (green=running, yellow=idle, red=fault), auto-refresh every 5-10 seconds, provide drill-down to individual machine details, filter by department or production area, and deploy to large monitors visible from shop floor."
        },
        {
            "title": "Monitor Vibration for Maintenance",
            "prompt": "Collect vibration sensor data from IIoT gateways or data loggers via MQTT, analyze vibration frequency and amplitude, compare against baseline and threshold values to detect anomalies indicating bearing wear or imbalance, use FFT analysis or machine learning models to identify failure patterns, create alerts when vibration exceeds warning thresholds, automatically generate work orders in CMMS system, and log all vibration trends to InfluxDB for historical analysis."
        },
        {
            "title": "Generate PDF Production Reports",
            "prompt": "At end of shift, query production database for shift metrics (total production, downtime events, OEE, quality results, operator notes), populate PDF template with charts, tables, and summary statistics, include shift identifier (day/night, A/B/C crew), add company branding and formatting, generate PDF file with timestamp in filename, save to network share or send via email to supervisors and management, and archive reports to cloud storage (S3) for long-term retention."
        },
        {
            "title": "Connect SCADA to Cloud",
            "prompt": "Subscribe to SCADA system data via OPC-UA server or MQTT publish, extract process values, alarms, batch events, and operator actions, buffer data locally to handle network interruptions, transform to cloud-compatible JSON format, push to cloud platform (AWS, Azure, GCP) via HTTPS REST API or cloud-specific IoT services, implement security with TLS encryption and token-based authentication, and enable cloud-based analytics and long-term storage without impacting SCADA performance."
        },
        {
            "title": "Manage Production Recipes",
            "prompt": "Store production recipes (setpoints, parameters, steps) in database or MES system, provide UI for operators to select recipe by part number or product SKU, retrieve recipe parameters (temperatures, speeds, pressures, times), send setpoints to PLC via OPC-UA writes or Modbus register writes, verify PLC confirms receipt and parameters are applied, log recipe changes and timestamps, implement version control for recipe updates, and track which recipe was used for each production batch."
        },
        {
            "title": "Monitor OPC-UA Connection Health",
            "prompt": "Continuously monitor OPC-UA server connections, detect when client connection drops or server becomes unavailable, implement automatic reconnection with exponential backoff, send alerts via email or Slack when connection lost for more than configured threshold (e.g., 5 minutes), log connection status changes with timestamps to database, track connection uptime percentage for SLA reporting, and create dashboard showing status of all OPC-UA connections across the facility."
        },
        {
            "title": "Structure Data Using ISA-95",
            "prompt": "Organize industrial data according to ISA-95 hierarchical model: Enterprise > Site > Area > Production Line > Work Cell > Equipment, map data sources (PLCs, OPC-UA, databases) to appropriate hierarchy levels, create MQTT topic structure or database schema following ISA-95 naming (e.g., Enterprise/Site/Area/Line/Cell/Equipment/Tag), ensure production events, work orders, and material flows align with model, enable consistent data access across MES, ERP, and analytics systems."
        },
        {
            "title": "Track Quality & Calculate Yield",
            "prompt": "Monitor quality inspection results from vision systems, CMMs, or operator input terminals, log good parts count and reject count with failure codes, calculate first-pass yield (good parts / total parts × 100%), track defects by category (dimensional, cosmetic, functional), correlate quality issues with production parameters (speed, temperature) to identify root causes, display quality trends on dashboard, alert when yield drops below threshold (e.g., <95%), and integrate with MES for batch genealogy."
        },
        {
            "title": "Build Andon/Alert Board",
            "prompt": "Subscribe to machine fault signals, operator call buttons, and material shortage alerts, display active alerts on large screen visible across production floor, prioritize by severity (critical red, warning yellow, info green), show alert location (line, cell, machine), include timestamp and duration, enable operators to acknowledge or close alerts via touch interface, log all alerts to database with response times, and send notifications to supervisors for unacknowledged alerts older than threshold time."
        },
        {
            "title": "Gateway Modbus to OPC-UA",
            "prompt": "Connect to Modbus TCP or RTU devices, read holding registers and input registers, create OPC-UA server with namespace matching device type, map Modbus registers to OPC-UA nodes with proper data types and engineering units, enable SCADA systems and historians to connect via standardized OPC-UA client, implement security (username/password or certificates), and provide modern OPC-UA interface to legacy Modbus equipment without device replacement."
        },
        {
            "title": "Collect LoRaWAN Sensor Data",
            "prompt": "Receive LoRaWAN gateway data via MQTT or HTTP webhook, decode sensor payloads (temperature, humidity, pressure, GPS, battery level), validate data quality and timestamp, calculate derived values (leak detection, environmental conditions), publish processed data to central MQTT broker or write to time-series database, set up alerts for out-of-range values or low battery warnings, and create dashboard for remote monitoring of distributed sensors across facility or outdoor sites."
        },
        {
            "title": "Bridge Serial Devices to MQTT",
            "prompt": "Connect to serial devices (RS-232, RS-485) using USB-to-serial adapters or serial ports, configure baud rate, parity, and protocol (ASCII, binary), parse incoming serial data streams, extract sensor values or device status, format as JSON payloads, publish to MQTT broker organized by device ID and data type, handle bi-directional communication to send commands to serial devices, and implement error handling for communication timeouts or checksum failures."
        },
        {
            "title": "Track Production Costs & Margins",
            "prompt": "Capture actual cycle time and setup time from PLC signals, retrieve labor rates and machine hour rates from ERP, calculate actual production cost per part (labor cost + machine cost + material cost), compare against standard cost from ERP, identify variances and margin impact, track by work order or part number, aggregate costs by shift or day, display on dashboard showing profitability by product line, and export cost data to finance systems for accurate COGS calculation."
        },
        {
            "title": "Bridge Bluetooth Devices to MQTT",
            "prompt": "Scan for Bluetooth Low Energy (BLE) devices broadcasting sensor data or beacon signals, connect and pair with devices using device IDs, subscribe to BLE characteristics for temperature, humidity, proximity, or custom data, parse BLE advertisement packets or notification data, convert to JSON format with device metadata, publish to MQTT broker for integration with broader IoT platform, handle device reconnection when out of range, and manage battery-powered device sleep cycles."
        }
    ]
    const INITIAL_SUGGESTIONS_COUNT = 5
    const ADDITIONAL_SUGGESTIONS_COUNT = 10

    // Populate prompt pills dynamically - pick 5 random prompts
    const promptsWrapper = document.querySelector('.ai-prompts > .wrapper');
    if (promptsWrapper) {
        // Randomly select 5 prompts
        const shuffled = [...prompts].sort(() => 0.5 - Math.random());
        const selectedPrompts = shuffled.slice(0, INITIAL_SUGGESTIONS_COUNT);
        function createPromptButton({appendClass, attr, text, title}) {
            const button = document.createElement('button');
            button.className = `${appendClass} text-left px-4 py-2 bg-white backdrop-blur rounded-full text-sm text-gray-600 hover:bg-white hover:shadow-sm transition-all border border-indigo-600 whitespace-nowrap overflow-hidden text-ellipsis`;
            if (attr) {
                button.setAttribute('data-prompt', attr);
            }
            if (title) {
                button.title = title;
            }
            button.textContent = text;

            return button
        }

        selectedPrompts.forEach(prompt => {
            promptsWrapper.appendChild(createPromptButton({
                appendClass: 'prompt-pill',
                attr: prompt.prompt,
                text: prompt.title,
                title: prompt.title
            }));
        });

        // add the show more button
        const showMoreButton = createPromptButton({
            appendClass: 'show-more-pill',
            text: 'Show more...',
        })
        promptsWrapper.appendChild(showMoreButton);

        showMoreButton.addEventListener('click', () => {
            // Get the remaining prompts that weren't in the initial selection
            const remainingPrompts = prompts.filter(p => !selectedPrompts.includes(p));

            // Randomly select 8 from the remaining prompts
            const shuffledRemaining = [...remainingPrompts].sort(() => 0.5 - Math.random());
            const additionalPrompts = shuffledRemaining.slice(0, ADDITIONAL_SUGGESTIONS_COUNT);

            // Add the 8 new prompts before the "Show more..." button
            additionalPrompts.forEach(prompt => {
                const additionalPromptButton = createPromptButton({
                    appendClass: 'prompt-pill',
                    attr: prompt.prompt,
                    text: prompt.title,
                    title: prompt.title
                });
                promptsWrapper.insertBefore(additionalPromptButton, showMoreButton);
            });

            showMoreButton.classList.add('hidden');
        })
    }

    function openModal(userText) {
        // Generate new session ID for this chat session
        sessionId = crypto.randomUUID();
        transferPayload = []

        // Reset auto-scroll to enabled when opening modal
        autoScrollEnabled = true;

        // Ensure input is enabled when modal opens
        isGenerating = false;

        // Only show welcome message if there are no messages yet AND no user text provided
        if (messages.length === 0 && !userText) {
            showWelcomeMessage();
        }
        updateInputState();

        // Check if View Transitions API is supported
        if (document.startViewTransition && typeof document.startViewTransition === 'function') {

            // Get elements for transition
            const homeTextarea = document.querySelector('textarea[aria-label="Describe your workflow"]');
            const homeTextareaWrapper = homeTextarea ? homeTextarea.closest('.textarea-wrapper') : null;
            // Target the entire input area div that contains textarea and footer text
            const modalInputSection = modal.querySelector('.p-4.bg-white.rounded-b-none.md\\:rounded-b-lg');


            // Set transition name on home wrapper BEFORE starting transition (for "before" snapshot)
            if (homeTextareaWrapper) {
                homeTextareaWrapper.style.viewTransitionName = 'morphing-content';
            }

            // Use View Transitions API for smooth morphing
            try {
                const transition = document.startViewTransition(() => {

                    // Remove transition name from home wrapper
                    homeTextareaWrapper.style.viewTransitionName = '';

                    // Hide the home wrapper
                    homeTextareaWrapper.style.display = 'none';

                    // Move modal to document.body and show it
                    document.body.appendChild(modal);
                    modal.classList.remove('hidden');
                    modal.classList.add('flex');

                    // Give the modal input section the transition name (for "after" snapshot)
                    if (modalInputSection) {
                        modalInputSection.style.viewTransitionName = 'morphing-content';
                    }

                });


            transition.finished.then(() => {

                // Prevent body scroll
                document.body.style.overflow = 'hidden';

                // Clean up transition names after animation
                if (homeTextareaWrapper) {
                    homeTextareaWrapper.style.viewTransitionName = '';
                }
                if (modalInputSection) {
                    modalInputSection.style.viewTransitionName = '';
                }

                // Start chat if user provided text
                if (userText) {
                    startChat(userText);
                }
            }).catch(err => {
                console.error('Transition failed:', err);
            });
            } catch (error) {
                console.error('Error starting transition:', error);
                // Fallback to immediate modal show
                if (homeTextareaWrapper) {
                    homeTextareaWrapper.style.display = 'none';
                }
                document.body.appendChild(modal);
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                document.body.style.overflow = 'hidden';
                if (userText) {
                    modalInput.value = userText;
                    startChat(userText);
                }
            }
        } else {
            // Fallback for browsers without View Transitions support
            const homeTextarea = document.querySelector('textarea[aria-label="Describe your workflow"]');
            const homeTextareaWrapper = homeTextarea ? homeTextarea.closest('.textarea-wrapper') : null;


            // Hide home textarea to avoid duplication
            if (homeTextareaWrapper) {
                homeTextareaWrapper.style.display = 'none';
            }

            // Show modal immediately (no animation)
            document.body.appendChild(modal);
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';

            if (userText) {
                startChat(userText);
            }
        }
    }

    function closeModal() {
        const homeTextarea = document.querySelector('textarea[aria-label="Describe your workflow"]');
        const homeTextareaWrapper = homeTextarea ? homeTextarea.closest('.textarea-wrapper') : null;
        const modalInputSection = modal.querySelector('.p-4.bg-white.rounded-b-none.md\\:rounded-b-lg');

        // Check if View Transitions API is supported
        if (document.startViewTransition && typeof document.startViewTransition === 'function') {
            // Set transition name on modal input section (for "before" snapshot)
            if (modalInputSection) {
                modalInputSection.style.viewTransitionName = 'morphing-content';
            }

            // Use View Transitions for smooth reverse morph
            const transition = document.startViewTransition(() => {
                // Remove transition name from modal
                if (modalInputSection) {
                    modalInputSection.style.viewTransitionName = '';
                }

                // Hide modal
                modal.classList.add('hidden');
                modal.classList.remove('flex');

                // Show home wrapper with transition name (for "after" snapshot)
                if (homeTextareaWrapper) {
                    homeTextareaWrapper.style.display = '';
                    homeTextareaWrapper.style.viewTransitionName = 'morphing-content';
                }
            });

            transition.finished.then(() => {
                // Clean up after transition
                document.body.style.overflow = '';
                if (homeTextareaWrapper) {
                    homeTextareaWrapper.style.viewTransitionName = '';
                }

                // Reset modal state
                clearMessages();
                modalInput.value = '';
                sessionId = null;  // Clear session ID
                transferPayload = []
                lastTransactionId = null;  // Clear transaction ID
            });
        } else {
            // Fallback for browsers without View Transitions
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = '';

            // Restore home textarea
            if (homeTextareaWrapper) {
                homeTextareaWrapper.style.display = '';
            }

            // Reset state
            clearMessages();
            modalInput.value = '';
            sessionId = null;  // Clear session ID
            transferPayload = []
            lastTransactionId = null;  // Clear transaction ID
        }
        flowsStore = {}
        document.removeEventListener('click', flowInteractionHandler)

    }

    async function startChat(message) {
        // Mark as generating and update UI
        isGenerating = true;
        updateInputState();

        // Add user message
        addMessage(message, 'human');

        // Start AI response
        const aiMessageIndex = addProgressiveMessage('', 'ai');

        try {
            // Make API call
            const response = await sendChatMessage(message);

            // Check if response is valid
            if (!response || !response.answer) {
                console.error('Invalid response from server:', response);
                throw new Error('Invalid response from server');
            }

            // Check if this response is from the most recent transaction
            if (response.transactionId !== lastTransactionId) {
                // Ignore response from cancelled/outdated request
                return;
            }

            // Handle multi-message vs single message responses
            const answers = Array.isArray(response.answer) ? response.answer : [response.answer];
            if (answers.length >= 1) {
                // Stop loading animation first
                const loadingElement = chatMessages.children[aiMessageIndex];
                if (loadingElement) {
                    const loadingBubble = loadingElement.querySelector('.ai-loading');
                    if (loadingBubble) {
                        stopLoadingMessageRotation();
                    }
                }

                // Wait a bit to ensure loading dots are visible
                await new Promise(resolve => setTimeout(resolve, 300));

                // Remove the loading message from DOM and array
                messages.splice(aiMessageIndex, 1);
                const aiMessageElements = chatMessages.children;
                if (aiMessageElements[aiMessageIndex]) {
                    chatMessages.removeChild(aiMessageElements[aiMessageIndex]);
                }

                // Now add each message from the response
                answers.forEach(answer => {
                    addAIMessageFromObject(answer);
                });
            } else {
                // Fallback for old single message format - treat as single chat message
                const messageText = typeof response.answer === 'string' ? response.answer : response.answer[0]?.content || 'No response';
                const words = messageText.split(' ');
                let currentText = '';

                for (let i = 0; i < words.length; i++) {
                    // Check if generation was stopped or transaction changed
                    if (!isGenerating || response.transactionId !== lastTransactionId) {
                        break;
                    }

                    currentText += (i > 0 ? ' ' : '') + words[i];
                    updateMessage(aiMessageIndex, currentText);

                    // Small delay between words for streaming effect
                    await new Promise(resolve => setTimeout(resolve, 50));
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                // Update message to show it was stopped
                updateMessage(aiMessageIndex, messages[aiMessageIndex].content + ' Stopped your request');
            } else {
                // Handle other errors
                updateMessage(aiMessageIndex, 'Sorry, an error occurred while generating the response.');
            }
        }

        // Mark generation as complete
        isGenerating = false;
        currentAbortController = null;
        updateInputState();
    }

    function addMessage(content, type) {
        // Add to messages array
        const message = { content, type };
        messages.push(message);

        // Create DOM element
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${type === 'human' ? 'justify-end' : 'justify-start'} mb-4 overflow-auto`;

        const messageBubble = document.createElement('div');
        messageBubble.className = `max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            type === 'human'
                ? 'bg-indigo-600 text-white rounded-br-sm'
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
        }`;

        // If it's an AI message with empty content, show loading animation
        if (type === 'ai' && content === '') {
            messageBubble.innerHTML = `
                <div class="ai-loading-message">
                    <span class="loading-text hidden"></span>
                    <div class="inline-flex">
                        <span class="loading-dot"></span>
                        <span class="loading-dot"></span>
                        <span class="loading-dot"></span>
                    </div>
                </div>
            `;
            messageBubble.classList.add('ai-loading');

            // Start loading sequence: dots first, then messages
            startLoadingSequence(messageBubble);
        } else {
            messageBubble.textContent = content;
        }

        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom using auto-scroll function
        scrollToBottom();

        // Return the index of the newly added message
        return messages.length - 1;
    }

    function clearMessages() {
        // Clear messages array
        messages = [];

        // Clear DOM
        chatMessages.innerHTML = '';
    }

    async function showWelcomeMessage() {
        // Add welcome message using addMessage to maintain array/DOM sync
        const messageIndex = addMessage('', 'ai');

        // Get the message bubble element that was just created
        const messageDiv = chatMessages.children[messageIndex];
        const messageBubble = messageDiv.querySelector('div:last-child');

        // Animate the typing of the welcome message
        const welcomeText = 'Hello! I am here to help you get started with FlowFuse and Node-RED. Please tell me what you are hoping to achieve.';
        const words = welcomeText.split(' ');
        let currentText = '';

        for (let i = 0; i < words.length; i++) {
            currentText += (i > 0 ? ' ' : '') + words[i];
            messageBubble.textContent = currentText;
            messages[messageIndex].content = currentText; // Update the messages array too
            scrollToBottom();

            // Small delay between words for typing effect
            await new Promise(resolve => setTimeout(resolve, 50));
        }
    }

    async function clearConversation() {
        // Stop any ongoing generation
        if (currentAbortController) {
            currentAbortController.abort();
        }
        isGenerating = false;

        // Clear transaction ID to ignore any subsequent responses
        lastTransactionId = null;

        // Stop loading message rotation
        stopLoadingMessageRotation();

        // Clear all messages
        clearMessages();

        // Reset session ID for fresh conversation
        sessionId = crypto.randomUUID();

        // Reset auto-scroll
        autoScrollEnabled = true;

        // Show welcome message with typing animation
        await showWelcomeMessage();

        // Hide right buttons
        const stopBtn = document.getElementById('stop-generation');
        const sendBtn = document.getElementById('send-message');
        if (stopBtn) stopBtn.classList.add('hidden');

        // Update input state (clear button will be disabled since messages array is empty)
        updateInputState();
        flowsStore = {}
    }

    async function sendChatMessage(query) {
        const exportBtn = document.getElementById('continue-to-app');
        exportBtn.disabled = true

        // Generate unique transaction ID for this request
        const transactionId = crypto.randomUUID();
        lastTransactionId = transactionId;

        try {
            // Create abort controller for this request
            currentAbortController = new AbortController();

            // Note: This API may only work in production (flowfuse.com domain)
            // For local development, we'll get simulated responses
            const response = await fetch('https://flowfuse-expert-api.flowfuse.cloud/v4/website-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Chat-Session-ID': sessionId,
                    'X-Chat-Transaction-ID': transactionId
                },
                body: JSON.stringify({ query }),
                signal: currentAbortController.signal
            });

            if (!response.ok) {
                // Treat HTTP errors as API unavailable - fall through to simulation
                throw new Error(`API unavailable: ${response.status}`);
            }

            transferPayload.push({query})
            const data = await response.json();

            exportBtn.classList.remove('hidden')

            transferPayload.push(data)

            // Extract transaction ID from response header (if available)
            const responseTransactionId = response.headers.get('X-Chat-Transaction-ID') || transactionId;

            return {
                answer: data.answer,
                transactionId: responseTransactionId,
                isMultiMessage: Array.isArray(data.answer)
            };
        } catch (error) {
            // Handle abort error (user clicked stop)
            if (error.name === 'AbortError') {
                throw error; // Re-throw abort errors to be handled by caller
            }

            console.warn('Chat API not available (likely due to CORS in development):', error);

            // Fallback to simulated response for local development
            const simulatedResponses = {
                default: "Sorry, something went wrong trying to answer your question. Please try again.",
                summary: "We discussed FlowFuse implementation strategies and Node-RED workflow development."
            };

            // Check if query contains "rich" to test rich response format
            if (query.toLowerCase().includes('rich') || query.toLowerCase().includes('test')) {
                const simulatedMessagesArray = [
                    {
                        kind: "guide",
                        title: "Convert MQTT raw values to voltage and save in FlowFuse Tables",
                        summary: "This guide explains how to convert raw MQTT values (0-4096) to voltage values (0-12V) and save them in FlowFuse Tables with an ID derived from the MQTT topic using Node-RED in FlowFuse.",
                        steps: [
                            {
                                title: "Subscribe to MQTT topic",
                                detail: "Use the MQTT input node in Node-RED to subscribe to the relevant MQTT topic that provides raw values."
                            },
                            {
                                title: "Extract ID from MQTT topic",
                                detail: "Use a Function node to parse the MQTT topic string and compute an ID. For example, extract a unique part of the topic to use as the ID."
                            },
                            {
                                title: "Convert raw value to voltage",
                                detail: "In the same or a subsequent Function node, convert the raw value (0-4096) to voltage (0-12V) using the formula: voltage = (raw_value / 4096) * 12."
                            },
                            {
                                title: "Save data in FlowFuse Tables",
                                detail: "Use the FlowFuse Tables node to insert the data object into a table. Configure the node with the appropriate table name and ensure the ID is used as a key."
                            }
                        ],
                        resources: [
                            {
                                title: "Using MQTT with Node-RED",
                                url: "https://flowfuse.com/blog/2024/06/how-to-use-mqtt-in-node-red/",
                                type: "docs"
                            },
                            {
                                title: "FlowFuse Tables for Industrial IoT",
                                url: "https://flowfuse.com/blog/2025/08/time-series-dashboard-flowfuse-postgresql/",
                                type: "blog"
                            },
                            {
                                title: "Latest Features Changelog",
                                url: "https://flowfuse.com/changelog/",
                                type: "changelog"
                            }
                        ],
                        nodePackages: [
                            {
                                name: "@flowfuse/node-red-dashboard"
                            },
                            {
                                name: "node-red-contrib-mqtt-broker"
                            }
                        ]
                    },
                    {
                        kind: "chat",
                        title: "Additional Information",
                        content: "I hope this guide helps you get started! Let me know if you have any questions about implementing this workflow or need clarification on any of the steps."
                    }
                ];

                const simulatedResult = {
                    answer: simulatedMessagesArray,
                    transactionId: transactionId,
                    isMultiMessage: true
                };
                return simulatedResult;
            }

            // Check if this is a summary request
            const simulatedAnswer = query.includes('summary') ? simulatedResponses.summary : simulatedResponses.default;

            const simulatedResult = {
                answer: [{
                    kind: "chat",
                    content: simulatedAnswer
                }],
                transactionId: transactionId,
                isMultiMessage: true
            };
            return simulatedResult;
        }
    }

    function updateMessage(messageIndex, newContent) {
        // Update the message in the array
        if (messageIndex >= 0 && messageIndex < messages.length) {
            messages[messageIndex].content = newContent;

            // Find the correct DOM element index
            // If there's a welcome message, we need to offset by 1
            const hasWelcomeMessage = chatMessages.children.length > messages.length;
            const domIndex = hasWelcomeMessage ? messageIndex + 1 : messageIndex;

            // Update the corresponding DOM element
            const messageElements = chatMessages.children;
            if (messageElements[domIndex]) {
                const messageBubble = messageElements[domIndex].querySelector('div');
                messageBubble.textContent = newContent;
            }

            // Scroll to bottom during streaming updates
            scrollToBottom();
        }
    }

    function addProgressiveMessage(content, type) {
        // Add initial message and return its index
        addMessage(content, type);
        return messages.length - 1; // Return index of the newly added message
    }

    function addAIMessageFromObject(aiMessage) {
        if (typeof aiMessage === 'string') {
            aiMessage = { kind: 'chat', content: aiMessage };
        }
        // Add to messages array
        const message = { content: '', type: 'ai', isHTML: true };
        messages.push(message);

        // Create DOM element
        const messageDiv = document.createElement('div');
        messageDiv.className = 'flex justify-start mb-4';

        const messageBubble = document.createElement('div');
        let paddingClass = (aiMessage.kind === 'guide' || aiMessage.kind === 'resources') ? 'py-4' : 'py-2';
        messageBubble.className = `max-w-[90%] px-4 ${paddingClass} rounded-lg bg-gray-100 text-gray-800 rounded-bl-sm rich-content overflow-auto`;

        // Render content based on message kind
        let htmlContent = '';
        if (aiMessage.kind === 'guide' || aiMessage.kind === 'resources') {
            htmlContent = renderRichContent(aiMessage);
        } else if (aiMessage.kind === 'chat') {
            htmlContent = renderChatContent(aiMessage);
        }

        // Update message content and DOM
        const sanitizedHtml = DOMPurify.sanitize(htmlContent, { ADD_ATTR: ['target'] });
        message.content = sanitizedHtml;
        messageBubble.innerHTML = sanitizedHtml;

        messageDiv.appendChild(messageBubble);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        scrollToBottom();

        return messages.length - 1; // Return index of the newly added message
    }

    function startLoadingSequence(messageBubble) {
        // Clear any existing interval
        if (loadingMessageInterval) {
            clearInterval(loadingMessageInterval);
        }

        // Show just dots for the first 5 seconds
        setTimeout(() => {
            // After 5 seconds, start showing messages with dots
            const loadingTextElement = messageBubble.querySelector('.loading-text');
            if (loadingTextElement && messageBubble.classList.contains('ai-loading')) {
                // Show the first message
                currentLoadingMessageIndex = 0;
                loadingTextElement.textContent = loadingMessages[currentLoadingMessageIndex];
                loadingTextElement.classList.remove('hidden');
                loadingTextElement.classList.add('inline', 'mr-2');

                // Start rotating messages every 5 seconds
                loadingMessageInterval = setInterval(() => {
                    if (messageBubble.classList.contains('ai-loading')) {
                        currentLoadingMessageIndex = (currentLoadingMessageIndex + 1) % loadingMessages.length;
                        const textElement = messageBubble.querySelector('.loading-text');
                        if (textElement) {
                            textElement.textContent = loadingMessages[currentLoadingMessageIndex];
                        }
                    }
                }, 6000);
            }
        }, 8000);
    }

    function stopLoadingMessageRotation() {
        if (loadingMessageInterval) {
            clearInterval(loadingMessageInterval);
            loadingMessageInterval = null;
        }
    }

    function renderChatContent(chatMessage) {
        let html = '';

        // Content (no title for chat messages)
        if (chatMessage.content) {
            const sanitizedContent = DOMPurify.sanitize(chatMessage.content, { ADD_ATTR: ['target'] });
            html += `<p class="text-gray-700">${sanitizedContent}</p>`;
        }

        return html;
    }

    function addUTMParameters(url) {
        try {
            const urlObj = new URL(url);
            urlObj.searchParams.set('utm_campaign', '215266513-FlowFuse Expert');
            return urlObj.toString();
        } catch (e) {
            // If URL parsing fails, return original URL
            return url;
        }
    }

    function renderRichContent(richAnswer) {
        let html = '';

        // Setup Guide label for guide messages
        let headerText = 'Result'

        if (richAnswer.kind === 'guide') headerText = 'Setup Guide'
        if (richAnswer.kind === 'resources') headerText = 'Resources';

        html += `<div class="bg-indigo-100 text-indigo-700 text-sm px-3 py-2 rounded-full inline-block mb-3">${headerText}</div>`;

        // Title
        if (richAnswer.title) {
            html += `<h3 class="text-lg font-semibold text-gray-900 mb-2">${richAnswer.title}</h3>`;
        }

        // Summary text (if any)
        if (richAnswer.summary) { // typically a guide has a summary
            html += `<p class="text-gray-700 mb-4">${richAnswer.summary}</p>`;
        }

        // Content text (if any)
        if (richAnswer.content) { // typically a resources response has this field
            html += `<p class="text-gray-700 mb-4">${richAnswer.content}</p>`;
        }

        // Steps
        if (richAnswer.steps && richAnswer.steps.length > 0) {
            html += '<div class="mb-4">';
            html += '<h4 class="text-base font-medium text-gray-900 mb-3">Steps:</h4>';
            html += '<ol class="space-y-3">';

            richAnswer.steps.forEach((step, index) => {
                html += `
                <li class="flex">
                    <span class="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full text-sm flex items-center justify-center mr-3 mt-0.5">${index + 1}</span>
                    <div>
                        <h5 class="font-medium text-gray-900">${step.title}</h5>
                        <p class="text-gray-600 text-sm mt-1">${step.detail}</p>
                    </div>
                </li>`;
            });

            html += '</ol>';
            html += '</div>';
        }

        // Node Packages
        if (richAnswer.nodePackages && richAnswer.nodePackages.length > 0) {
            html += '<div class="mb-4">';
            html += '<h4 class="text-base font-medium text-gray-900 mb-3">Required Node Packages</h4>';
            html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-2">';
            richAnswer.nodePackages.forEach(pkg => {
                const url = pkg.url || pkg.metadata?.source;
                const defLocation = 'https://flows.nodered.org/search?type=node';
                const packageName = pkg.name || pkg.id || pkg.metadata?.id;
                const nodeUrl = url || (packageName ? `https://flows.nodered.org/node/${packageName}` : defLocation);
                const nodeUrlWithUTM = addUTMParameters(nodeUrl);
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(nodeUrl).hostname}`;

                html += `
                <a href="${nodeUrlWithUTM}" target="_blank" rel="noopener noreferrer"
                   class="block p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 active:bg-indigo-100 active:border-indigo-500 transition-all duration-200">
                    <div class="flex items-start gap-2">
                        <img src="${faviconUrl}" class="w-4 h-4 flex-shrink-0 mt-0.5" alt="">
                        <div class="flex-1 min-w-0 overflow-hidden">
                            <h6 class="font-mono text-gray-900 text-sm truncate">${packageName || nodeUrl}</h6>
                            <p class="text-xs text-gray-500 mt-1 mb-0 truncate">${nodeUrl}</p>
                        </div>
                    </div>
                </a>`;
            });

            html += '</div>';
            html += '</div>';
        }

        // Resources
        if (richAnswer.resources && richAnswer.resources.length > 0) {
            html += '<div>';
            html += '<h4 class="text-base font-medium text-gray-900 mb-3">Related Resources</h4>';
            html += '<div class="grid grid-cols-1 md:grid-cols-2 gap-2">';

            richAnswer.resources.forEach(resource => {
                const url = resource.url || resource.metadata?.source;
                const title = resource.title || resource.metadata?.title || url;
                const faviconUrl = `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
                const resourceUrlWithUTM = addUTMParameters(url);

                html += `
                <a href="${resourceUrlWithUTM}" target="_blank" rel="noopener noreferrer"
                   class="block p-3 bg-white border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 active:bg-indigo-100 active:border-indigo-500 transition-all duration-200">
                    <div class="flex items-start gap-2">
                        <img src="${faviconUrl}" class="w-4 h-4 flex-shrink-0 mt-0.5" alt="">
                        <div class="flex-1 min-w-0 overflow-hidden">
                            <h6 class="font-medium text-gray-900 text-sm truncate">${title}</h6>
                            <p class="text-xs text-gray-500 mt-1 truncate">${url}</p>
                        </div>
                    </div>
                </a>`;
            });

            html += '</div>';
            html += '</div>';
        }

        // Flows
        if (richAnswer.flows && richAnswer.flows.length > 0) {
            html += '<div class="overflow-auto">';
            html += '<h4 class="text-base font-medium text-gray-900 mb-3">Example Flows</h4>';
            html += '<ul class="space-y-2 overflow-auto">';

            richAnswer.flows.forEach(flow => {
                if (!flow || typeof flow !== 'object' || !flow.metadata || !Array.isArray(flow.metadata.flows) || flow.metadata.flows.length === 0) return;
                const flowId = `flow-${crypto.randomUUID()}`
                let flowsJSON = JSON.stringify(flow.metadata.flows, null, 2);
                flowsStore[flowId] = flowsJSON;
                html += `
                <li class="overflow-auto" data-flow-id="${flowId}">
                    <div class="flex flex-col p-3 bg-white border border-gray-200 rounded-lg overflow-auto">
                        <div class="flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24">
                                  <rect width="24" height="24" fill="gray" rx="4"/>
                                  <g clip-path="url(#a)">
                                    <path fill="#fff" d="M0 12v-1.647c5.09 0 5.81-.9 6.44-1.695.72-.9 1.46-1.6 3.88-1.6v1.648c-1.76 0-2.04.354-2.51.948C6.79 10.937 5.5 12 0 12Z"/>
                                    <path fill="#fff" d="M8.6 16.941c-2.9 0-3.47-1.513-3.88-2.614C4.25 13.072 3.85 12 0 12v-1.647c4.67 0 5.67 1.618 6.34 3.419.38 1.015.57 1.522 2.26 1.522v1.647Z"/>
                                    <path fill="#fff" d="M16.78 19H9.9c-.95 0-1.72-.737-1.72-1.647v-2.47c0-.91.77-1.648 1.72-1.648h6.88c.95 0 1.72.738 1.72 1.647v2.47c0 .91-.77 1.648-1.72 1.648Zm0-4.118H9.9v2.47h6.88v-2.47Zm1.5-4.117H11.4c-.95 0-1.72-.738-1.72-1.647v-2.47c0-.91.77-1.648 1.72-1.648h6.88c.95 0 1.72.737 1.72 1.647v2.47c0 .91-.77 1.648-1.72 1.648Zm0-4.118H11.4v2.47h6.88v-2.47Z"/>
                                  </g>
                                  <defs>
                                    <clipPath id="a">
                                      <path fill="#fff" d="M0 5h20v14H0z"/>
                                    </clipPath>
                                  </defs>
                            </svg>
                            <div class="flex flex-1 flex-col overflow-auto">
                                <div class="flex items-start justify-between gap-2">
                                    <h6>${flow.title}</h6>
                                    <div class="actions flex items-start gap-4">
                                        <button class="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 expand flex items-center plain transition-colors duration-200 rounded px-2 py-1">
                                            <span>JSON</span>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 down-arrow" viewBox="0 0 20 20" fill="currentColor">
                                              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 up-arrow hidden" viewBox="0 0 20 20" fill="currentColor">
                                              <path fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                                            </svg>
                                        </button>
                                        <button class="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 copy plain transition-colors duration-200 rounded p-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"  class="h-6 w-6 copy-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="h-6 w-6 hidden check-svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <p class="text-xs" style="margin-bottom: 0;">
                                    <span>Category: </span>
                                    <span>${flow.metadata?.category}</span>
                                </p>
                            </div>
                        </div>
                        <div class="overflow-auto rounded-md text-gray-300 ml-6" style="max-height: 300px; background-color: #404040;">
                            <pre class="overflow-auto hidden py-2 px-4">${flowsJSON}</pre>
                        </div>
                    </div>
               </li>`
            });

            html += '</ul>';
            html += '</div>';
        }

        return html;
    }

    // Stop generation
    const stopGenerationBtn = document.getElementById('stop-generation');
    if (stopGenerationBtn) {
        stopGenerationBtn.addEventListener('click', function() {
        // Stop the current generation
        isGenerating = false;

        // Clear transaction ID to ignore any subsequent responses
        lastTransactionId = null;

        // Stop loading message rotation
        stopLoadingMessageRotation();

        // Abort the current API request if it exists
        if (currentAbortController) {
            currentAbortController.abort();
        }

        updateInputState();
        });
    }

    // Send message
    const sendMessageBtn = document.getElementById('send-message');
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', async function() {
        const message = modalInput.value.trim();
        if (!message) return; // Don't send empty messages

        // Clear the input
        modalInput.value = '';

        // Add user message
        addMessage(message, 'human');

        // Mark as generating and update UI
        isGenerating = true;
        updateInputState();

        // Start AI response
        const aiMessageIndex = addProgressiveMessage('', 'ai');

        try {
            // Make API call
            const response = await sendChatMessage(message);

            // Check if response is valid
            if (!response || !response.answer) {
                throw new Error('Invalid response from server');
            }

            // Check if this response is from the most recent transaction
            if (response.transactionId !== lastTransactionId) {
                // Ignore response from cancelled/outdated request
                return;
            }

            // Handle multi-message vs single message responses
            if (response.isMultiMessage && Array.isArray(response.answer)) {
                // Stop loading animation first
                const loadingElement = chatMessages.children[aiMessageIndex];
                if (loadingElement) {
                    const loadingBubble = loadingElement.querySelector('.ai-loading');
                    if (loadingBubble) {
                        stopLoadingMessageRotation();
                    }
                }

                // Wait a bit to ensure loading dots are visible
                await new Promise(resolve => setTimeout(resolve, 300));

                // Remove the loading message from DOM and array
                messages.splice(aiMessageIndex, 1);
                const aiMessageElements = chatMessages.children;
                if (aiMessageElements[aiMessageIndex]) {
                    chatMessages.removeChild(aiMessageElements[aiMessageIndex]);
                }

                // Now add each message from the response
                response.answer.forEach(messageObj => {
                    addAIMessageFromObject(messageObj);
                });
            } else {
                // Fallback for old single message format - treat as single chat message
                const messageText = typeof response.answer === 'string' ? response.answer : response.answer[0]?.content || 'No response';
                const words = messageText.split(' ');
                let currentText = '';

                for (let i = 0; i < words.length; i++) {
                    // Check if generation was stopped or transaction changed
                    if (!isGenerating || response.transactionId !== lastTransactionId) {
                        break;
                    }

                    currentText += (i > 0 ? ' ' : '') + words[i];
                    updateMessage(aiMessageIndex, currentText);
                    await new Promise(resolve => setTimeout(resolve, 30));
                }
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                // Update message to show it was stopped
                updateMessage(aiMessageIndex, messages[aiMessageIndex].content + ' Stopped your request');
            } else {
                // Handle other errors
                updateMessage(aiMessageIndex, 'Sorry, an error occurred while generating the response.');
            }
        }

        // Mark generation as complete
        isGenerating = false;
        currentAbortController = null;
        updateInputState();
        });
    }

    // Update send button when typing
    modalInput.addEventListener('input', function() {
        updateInputState();
    });

    // Enter key to send message
    modalInput.addEventListener('keydown', async function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = modalInput.value.trim();
            if (message) {
                modalInput.value = '';


                // Re-enable auto-scroll when user sends a new message
                autoScrollEnabled = true;

                // Add user message
                addMessage(message, 'human');

                // Mark as generating and update UI
                isGenerating = true;
                updateInputState();

                // Start AI response
                const aiMessageIndex = addProgressiveMessage('', 'ai');

                try {
                    // Make API call
                    const response = await sendChatMessage(message);

                    // Check if response is valid
                    if (!response || !response.answer) {
                        throw new Error('Invalid response from server');
                    }

                    // Check if this response is from the most recent transaction
                    if (response.transactionId !== lastTransactionId) {
                        // Ignore response from cancelled/outdated request
                        return;
                    }

                    // Handle multi-message vs single message responses
                    if (response.isMultiMessage && Array.isArray(response.answer)) {
                        // Stop loading animation first
                        const loadingElement = chatMessages.children[aiMessageIndex];
                        if (loadingElement) {
                            const loadingBubble = loadingElement.querySelector('.ai-loading');
                            if (loadingBubble) {
                                stopLoadingMessageRotation();
                            }
                        }

                        // Wait a bit to ensure loading dots are visible
                        await new Promise(resolve => setTimeout(resolve, 300));

                        // Remove the loading message from DOM and array
                        messages.splice(aiMessageIndex, 1);
                        const aiMessageElements = chatMessages.children;
                        if (aiMessageElements[aiMessageIndex]) {
                            chatMessages.removeChild(aiMessageElements[aiMessageIndex]);
                        }

                        // Now add each message from the response
                        response.answer.forEach(messageObj => {
                            addAIMessageFromObject(messageObj);
                        });
                    } else {
                        // Fallback for old single message format - treat as single chat message
                        const messageText = typeof response.answer === 'string' ? response.answer : response.answer[0]?.content || 'No response';
                        const words = messageText.split(' ');
                        let currentText = '';

                        for (let i = 0; i < words.length; i++) {
                            // Check if generation was stopped or transaction changed
                            if (!isGenerating || response.transactionId !== lastTransactionId) {
                                break;
                            }

                            currentText += (i > 0 ? ' ' : '') + words[i];
                            updateMessage(aiMessageIndex, currentText);
                            await new Promise(resolve => setTimeout(resolve, 30));
                        }
                    }
                } catch (error) {
                    if (error.name === 'AbortError') {
                        // Update message to show it was stopped
                        updateMessage(aiMessageIndex, messages[aiMessageIndex].content + ' Stopped your request');
                    } else {
                        // Handle other errors
                        updateMessage(aiMessageIndex, 'Sorry, an error occurred while generating the response.');
                    }
                }

                // Mark generation as complete
                isGenerating = false;
                currentAbortController = null;
                updateInputState();
            }
        }
    });

    // Add click handler for flow copy buttons & code blocks
    document.addEventListener('click', flowInteractionHandler);


    // Clear conversation event listener
    const clearConversationBtn = document.getElementById('clear-conversation');
    if (clearConversationBtn) {
        clearConversationBtn.addEventListener('click', clearConversation);
    }

    let target
    let messageHandler
    // Determine app URL based on hostname
    const appURL = window.location.hostname === 'localhost'
        ? 'http://localhost:3000'
        : 'https://app.flowfuse.com';

    document.getElementById('continue-to-app').addEventListener('click', function handler() {
        // Reuse existing target window or create new one if it doesn't exist or was closed
        if (!target || target.closed) {
            target = window.open(appURL, 'flowfuse-app');
        } else {
            // If window exists and is open, bring it to focus
            target.focus();
        }

        // Only create the messageHandler if it doesn't exist
        if (!messageHandler) {
            messageHandler = function(event) {
                // Verify the origin for security
                if (event.origin !== appURL) {
                       return;
                 }
                // Check message type
                if (event.data.type === 'onLoad' && event.data.status === 'ready') {
                    // Now you can send messages to the target
                    target.postMessage({
                            source : 'flowfuse-website',
                            scope  : 'flowfuse-expert',
                            action : 'set-context',
                            payload: {
                                data: transferPayload,
                                sessionId
                            }
                        },
                        appURL
                    )
                } else if (event.data.type === 'flowfuse-expert-response' && event.data.action === 'confirm') {
                    // Remove message handler after successful context response
                    window.removeEventListener('message', messageHandler)
                    messageHandler = null
                    closeModal()
                }
            };
            // Add the event listener only once
            window.addEventListener('message', messageHandler);
        }
    });
});
