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
            const response = await fetch('https://flowfuse-expert-api-dev.flowfuse.cloud/v4/website-chat', {
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
