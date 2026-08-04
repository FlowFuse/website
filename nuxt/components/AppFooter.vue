<template>
    <footer class="ff-footer bg-gray-100 w-full" data-nav-zone="footer">
        <div class="pt-20 pb-12 px-6 max-w-screen-xl mx-auto">
            <!-- Sections synced with the top nav: Platform / Solutions / Resources / Company -->
            <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr_1fr] gap-x-8 gap-y-12 text-sm">
                <!-- Platform -->
                <section class="pt-5" data-nav-section="Platform">
                    <p class="text-lg font-medium text-gray-900 mb-6">Platform</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-8">
                        <div class="lg:col-start-1 lg:row-start-1">
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Product</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/platform/features/">Features</a></li>
                                <li><a href="/platform/security/">Security Statement</a></li>
                                <li><a href="/pricing/">Pricing</a></li>
                            </ul>
                        </div>
                        <div class="lg:col-start-1 lg:row-start-2">
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Components</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/platform/dashboard/">FlowFuse Dashboard</a></li>
                                <li><a href="/platform/device-agent/">Device Agent</a></li>
                                <li><a href="/node-red/">Node-RED</a></li>
                                <li><a href="/docs/user/expert/">FlowFuse Expert</a></li>
                                <li><a href="/integrations/">Integrations</a></li>
                                <li><a href="/blueprints/">Blueprint Library</a></li>
                            </ul>
                        </div>
                        <div class="lg:col-start-2 lg:row-start-1 lg:row-span-2">
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Capabilities</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/ai/">Industrial AI</a></li>
                                <li><a href="/use-cases/it-ot-middleware/">IT/OT middleware</a></li>
                                <li><a href="/use-cases/uns/">Unified Namespace</a></li>
                                <li><a href="/use-cases/mes/">MES</a></li>
                                <li><a href="/use-cases/scada/">SCADA</a></li>
                                <li><a href="/use-cases/edge-connectivity/">Edge Connectivity</a></li>
                                <li><a href="/use-cases/data-integration/">Data Integration</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <!-- Solutions -->
                <section class="pt-5" data-nav-section="Solutions">
                    <p class="text-lg font-medium text-gray-900 mb-6">Solutions</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">By Use Case</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/use-cases/production-monitoring/">Production Monitoring</a></li>
                                <li><a href="/use-cases/shop-floor-communication/">Shop Floor Communication</a></li>
                                <li><a href="/use-cases/">See all use cases</a></li>
                            </ul>
                        </div>
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">By Industry</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/industries/automotive/">Automotive</a></li>
                                <li><a href="/industries/food-beverage/">Food &amp; Beverage</a></li>
                                <li><a href="/industries/life-sciences/">Life Sciences</a></li>
                                <li><a href="/industries/electronics-appliances/">Electronics &amp; Appliances</a></li>
                                <li><a href="/industries/renewables/">Renewables</a></li>
                                <li><a href="/industries/semiconductors/">Semiconductors</a></li>
                                <li><a href="/industries/aerospace-components/">Aerospace Components</a></li>
                                <li><a href="/industries/aviation-aerospace/">Aviation &amp; Aerospace</a></li>
                                <li><a href="/industries/">See all industries</a></li>
                            </ul>
                        </div>
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">By Integration</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/node-red/flowfuse/hub/redis/">Redis</a></li>
                                <li><a href="/node-red/flowfuse/edge/opcua/">OPC UA</a></li>
                                <li><a href="/node-red/flowfuse/edge/rtsp/">RTSP</a></li>
                                <li><a href="/node-red/flowfuse/edge/cip-suite/">EtherNet/IP</a></li>
                                <li><a href="/node-red/flowfuse/mqtt/">MQTT</a></li>
                                <li><a href="/node-red/flowfuse/ai/onxx/">ONNX</a></li>
                                <li><a href="/node-red/flowfuse/ai/llm-nodes/">LLM Nodes</a></li>
                                <li><a href="/node-red/flowfuse/mcp/">MCP</a></li>
                                <li><a href="/integrations/">See all integrations</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <!-- Resources -->
                <section class="pt-5" data-nav-section="Resources">
                    <p class="text-lg font-medium text-gray-900 mb-6">Resources</p>
                    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-8 gap-y-8">
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Learn</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/blog/">Blog</a></li>
                                <li><a href="/webinars/">Webinars</a></li>
                                <li><a href="/resources/publications/">Publications</a></li>
                                <li><a href="https://node-red-academy.learnworlds.com/">Node-RED Academy</a></li>
                            </ul>
                        </div>
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Reference</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/docs/">Docs</a></li>
                                <li><a href="/changelog/">Changelog</a></li>
                                <li><a href="https://github.com/FlowFuse/flowfuse">Github</a></li>
                                <li><a href="https://discourse.nodered.org/c/vendors/flowfuse/24/">Support forums</a></li>
                            </ul>
                        </div>
                        <div>
                            <p class="uppercase text-xs font-semibold text-gray-400 tracking-widest mb-4">Customers</p>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/customer-stories/">Customer Stories</a></li>
                                <li><a href="/blog/#sign-up" onclick="capture('cta-blog-subscribe', {'position': 'footer'})">Sign Up to Mailing List</a></li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
            <!-- Company -->
            <section class="mt-12 border-t border-gray-300 pt-9" data-nav-section="Company">
                <!-- Mirrors the upper section's [2fr_3fr_1fr] tracks so the logo lines up
                     under Platform, the three groups under Solutions' sub-columns, and the
                     last group under Resources. -->
                <div class="grid grid-cols-1 lg:grid-cols-[2fr_3fr_1fr] gap-x-8 gap-y-8 text-sm">
                    <div>
                        <a href="/" class="ff-logo-link ff-footer-logo block w-40 no-underline hover:no-underline" aria-label="FlowFuse home">
                            <svg class="h-full w-full" viewBox="0 0 402 70" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <linearGradient id="ffWaveWordmarkFooter" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="402" y2="0">
                                  <stop offset="0" stop-color="#1F2937" />
                                  <stop offset="0.25" stop-color="#1F2937" />
                                  <stop offset="0.5" stop-color="#1F2937" />
                                  <stop offset="0.75" stop-color="#1F2937" />
                                  <stop offset="1" stop-color="#1F2937" />
                                </linearGradient>
                              </defs>
                              <mask id="ffFooterMask0" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402" height="70">
                                <path d="M402 0H0V70H402V0Z" fill="white" />
                              </mask>
                              <g mask="url(#ffFooterMask0)">
                                <mask id="ffFooterMask1" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="402"
                                  height="70">
                                  <path d="M402 0H0V70H402V0Z" fill="white" />
                                </mask>
                                <g mask="url(#ffFooterMask1)">
                                  <path
                                    d="M118.95 9.98H95.3695C93.7495 9.98 92.4595 10.47 91.4795 11.44C90.4995 12.41 90.0195 13.71 90.0195 15.32V55.38C90.0195 57.05 90.4495 58.24 91.3095 58.94C92.1695 59.64 93.5495 59.99 95.4395 59.99C96.3595 59.99 97.2495 59.92 98.1095 59.79C98.9695 59.66 99.6195 59.53 100.05 59.43V39.87H113.6C114.73 39.87 115.62 39.51 116.27 38.78C116.92 38.05 117.24 37.01 117.24 35.66C117.24 34.85 117.12 34.11 116.88 33.43C116.64 32.76 116.38 32.2 116.11 31.77H100.05V18.15H116.35C117.48 18.15 118.37 17.79 119.02 17.06C119.67 16.33 119.99 15.27 119.99 13.86C119.99 13.05 119.88 12.3 119.67 11.59C119.45 10.89 119.21 10.35 118.94 9.97"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M130.979 9.98001C130.059 9.98001 129.199 10.06 128.389 10.22C127.579 10.38 126.959 10.52 126.529 10.62V55.53C126.529 57.2 126.969 58.36 127.859 59.01C128.749 59.66 130.079 59.98 131.869 59.98C132.839 59.98 133.719 59.91 134.499 59.78C135.279 59.65 135.889 59.5 136.319 59.34V14.52C136.319 12.85 135.889 11.68 135.029 11C134.169 10.33 132.819 9.99001 130.979 9.99001"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M175.521 22.61C172.531 20.94 169.041 20.1 165.041 20.1C161.041 20.1 157.611 20.94 154.601 22.61C151.591 24.28 149.241 26.63 147.571 29.65C145.901 32.67 145.061 36.26 145.061 40.41C145.061 44.56 145.881 48.15 147.531 51.17C149.171 54.19 151.501 56.53 154.521 58.17C157.531 59.81 161.041 60.64 165.041 60.64C169.041 60.64 172.611 59.82 175.601 58.17C178.591 56.52 180.901 54.18 182.551 51.13C184.191 48.08 185.011 44.51 185.011 40.41C185.011 36.31 184.171 32.67 182.501 29.65C180.831 26.63 178.501 24.28 175.511 22.61M172.271 49.6C170.521 51.78 168.111 52.88 165.041 52.88C161.971 52.88 159.561 51.8 157.811 49.65C156.061 47.49 155.181 44.42 155.181 40.42C155.181 36.42 156.071 33.41 157.851 31.19C159.631 28.98 162.031 27.87 165.041 27.87C168.051 27.87 170.521 28.98 172.271 31.19C174.021 33.4 174.901 36.48 174.901 40.42C174.901 44.36 174.021 47.42 172.271 49.6Z"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M281.95 9.98H258.37C256.75 9.98 255.46 10.47 254.48 11.44C253.51 12.41 253.02 13.71 253.02 15.32V55.38C253.02 57.05 253.45 58.24 254.31 58.94C255.17 59.64 256.55 59.99 258.44 59.99C259.36 59.99 260.25 59.92 261.11 59.79C261.97 59.66 262.62 59.53 263.05 59.43V39.87H276.6C277.73 39.87 278.62 39.51 279.27 38.78C279.92 38.05 280.24 37.01 280.24 35.66C280.24 34.85 280.12 34.11 279.88 33.43C279.64 32.76 279.38 32.2 279.11 31.77H263.05V18.15H279.35C280.48 18.15 281.37 17.79 282.02 17.06C282.67 16.33 282.99 15.27 282.99 13.86C282.99 13.05 282.88 12.3 282.67 11.59C282.45 10.89 282.21 10.35 281.94 9.97"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M243.98 21.39C243.12 20.8 242.01 20.5 240.66 20.5C239.04 20.5 237.59 20.88 236.29 21.63C235.59 26.59 234.71 31.61 233.66 36.68C232.61 41.75 231.59 46.53 230.62 51H230.22C229.95 49.76 229.45 47.87 228.72 45.34C227.99 42.81 227.14 39.91 226.17 36.64C225.2 33.38 224.17 30.02 223.09 26.56C222.77 25.59 222.13 24.87 221.19 24.42C220.25 23.96 219.08 23.73 217.67 23.73C216.59 23.73 215.64 23.84 214.83 24.05C214.02 24.27 213.26 24.59 212.56 25.02C211.48 28.63 210.42 32.2 209.36 35.7C208.31 39.21 207.39 42.32 206.61 45.05C205.83 47.77 205.27 49.76 204.95 51H204.63C204.41 50.14 204.11 48.88 203.74 47.24C203.36 45.6 202.93 43.64 202.45 41.37C201.96 39.1 201.46 36.57 200.95 33.76C200.44 30.95 199.94 28.01 199.46 24.94C199.19 23.32 198.65 22.18 197.84 21.5C197.03 20.83 195.92 20.49 194.52 20.49C193.39 20.49 192.37 20.71 191.48 21.14C190.59 21.57 189.88 22.06 189.34 22.6C189.72 24.65 190.19 27 190.76 29.64C191.33 32.28 191.95 35.01 192.62 37.81C193.29 40.62 193.97 43.33 194.64 45.94C195.31 48.56 195.97 50.86 196.62 52.86C197.27 54.86 197.84 56.4 198.32 57.47C198.75 58.33 199.53 59 200.67 59.45C201.8 59.91 203.1 60.14 204.56 60.14C205.85 60.14 206.95 60 207.84 59.73C208.73 59.46 209.44 59.11 209.99 58.68C210.64 56.9 211.4 54.67 212.29 52C213.18 49.33 214.1 46.44 215.04 43.34C215.98 40.24 216.83 37.2 217.59 34.24C218.4 37.15 219.23 40.11 220.09 43.1C220.95 46.09 221.8 48.87 222.64 51.44C223.48 54 224.22 56.09 224.87 57.71C225.41 59.33 227.33 60.14 230.61 60.14C231.85 60.14 233 59.99 234.05 59.69C235.1 59.4 235.88 59.06 236.36 58.68C236.79 57.6 237.3 56.15 237.9 54.31C238.49 52.48 239.13 50.4 239.8 48.08C240.47 45.76 241.14 43.36 241.78 40.88C242.43 38.4 243 36.05 243.52 33.84C244.03 31.63 244.45 29.67 244.78 27.97C245.1 26.27 245.26 25.07 245.26 24.37C245.26 22.97 244.83 21.97 243.97 21.38"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M316.89 20.67C315.97 20.67 315.11 20.75 314.3 20.91C313.49 21.07 312.87 21.21 312.44 21.31V51.17C311.79 51.55 310.87 51.91 309.69 52.26C308.5 52.61 307.05 52.78 305.32 52.78C302.62 52.78 300.52 52.15 299.01 50.88C297.5 49.61 296.74 47.55 296.74 44.69V25.27C296.74 23.49 296.32 22.28 295.48 21.63C294.64 20.98 293.31 20.66 291.47 20.66C290.5 20.66 289.61 20.74 288.8 20.9C287.99 21.06 287.4 21.2 287.02 21.3V44.85C287.02 48.52 287.75 51.51 289.2 53.83C290.66 56.15 292.76 57.85 295.51 58.93C298.26 60.01 301.5 60.55 305.22 60.55C308.3 60.55 311.02 60.24 313.4 59.62C315.77 59 317.71 58.23 319.22 57.32C320.35 56.62 321.14 55.86 321.57 55.06C322 54.25 322.22 53.23 322.22 51.98V25.27C322.22 23.49 321.79 22.28 320.93 21.63C320.07 20.98 318.72 20.66 316.88 20.66"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M347.659 36.62L343.449 35.57C341.779 35.19 340.589 34.67 339.889 33.99C339.189 33.32 338.839 32.52 338.839 31.6C338.839 30.3 339.459 29.32 340.699 28.64C341.939 27.97 343.609 27.63 345.719 27.63C347.119 27.63 348.509 27.78 349.889 28.07C351.269 28.37 352.519 28.74 353.649 29.2C354.779 29.66 355.669 30.1 356.319 30.53C356.909 30.1 357.409 29.53 357.819 28.83C358.219 28.13 358.429 27.32 358.429 26.4C358.429 25.05 357.849 23.91 356.689 22.96C355.529 22.02 353.939 21.29 351.909 20.78C349.889 20.27 347.579 20.01 344.989 20.01C340.019 20.01 336.169 21.1 333.419 23.29C330.669 25.48 329.289 28.24 329.289 31.59C329.289 34.61 330.219 37.04 332.079 38.87C333.939 40.71 336.809 42.05 340.699 42.92L345.469 44.13C347.199 44.51 348.459 45.06 349.269 45.79C350.079 46.52 350.479 47.5 350.479 48.74C350.479 51.6 348.159 53.03 343.519 53.03C340.979 53.03 338.719 52.64 336.719 51.86C334.719 51.08 332.969 50.2 331.459 49.23C330.759 49.72 330.189 50.33 329.759 51.09C329.329 51.85 329.109 52.68 329.109 53.6C329.109 55.71 330.489 57.4 333.239 58.7C335.989 60 339.519 60.64 343.839 60.64C349.119 60.64 353.159 59.57 355.939 57.44C358.719 55.31 360.109 52.38 360.109 48.66C360.109 45.53 359.119 42.99 357.149 41.02C355.179 39.05 352.009 37.58 347.639 36.61"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M400.87 40.23C401.63 39.5 402 38.38 402 36.87C402 33.63 401.24 30.75 399.73 28.21C398.22 25.67 396.13 23.68 393.46 22.22C390.79 20.76 387.7 20.04 384.19 20.04C381.6 20.04 379.16 20.46 376.87 21.29C374.58 22.12 372.55 23.38 370.8 25.05C369.05 26.72 367.67 28.8 366.67 31.28C365.67 33.76 365.17 36.65 365.17 39.94C365.17 44.47 366.06 48.27 367.84 51.35C369.62 54.43 372.12 56.73 375.32 58.27C378.53 59.81 382.21 60.58 386.37 60.58C389.07 60.58 391.45 60.31 393.53 59.77C395.61 59.23 397.26 58.46 398.51 57.46C399.75 56.46 400.37 55.29 400.37 53.94C400.37 53.08 400.14 52.28 399.68 51.55C399.22 50.82 398.64 50.24 397.94 49.81C396.75 50.62 395.2 51.36 393.29 52.04C391.37 52.71 389.29 53.05 387.02 53.05C383.62 53.05 380.82 52.21 378.6 50.54C376.85 49.22 375.65 47.31 374.98 44.84L397.69 41.55C399.04 41.39 400.09 40.95 400.85 40.22M374.36 37.99C374.53 34.74 375.47 32.2 377.2 30.39C379.06 28.45 381.39 27.48 384.2 27.48C387.01 27.48 388.98 28.25 390.43 29.79C391.89 31.33 392.69 33.15 392.86 35.25L374.36 37.99Z"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M38.6096 42.28C45.7596 45.31 52.6296 48.9 60.0596 50.56C63.3596 51.11 66.7096 51.38 69.9996 51.38V33.16H67.2496C57.0696 33.16 47.6796 38.41 38.5996 42.27"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M17.43 48.08C14.13 47.81 10.82 47.81 7.53 47.81H0V64.54C0 67.56 2.45 70.01 5.47 70.01H64.53C67.55 70.01 70 67.56 70 64.54V62.43C62.86 62.43 55.39 61.51 48.78 58.75C38.34 55.17 28.71 48.36 17.43 48.08Z"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M64.53 0H5.47C2.45 0 0 2.45 0 5.47V36.49C6.61 36.49 13.58 36.76 20.18 36.21C29.26 35.39 37.23 30.42 45.76 27.11C53.46 23.8 61.75 21.86 70 22.14V5.47C70 2.45 67.55 0 64.53 0Z"
                                    fill="url(#ffWaveWordmarkFooter)" />
                                  <path
                                    d="M70 33.17V22.13C61.75 21.86 53.46 23.8 45.76 27.1C37.23 30.41 29.26 35.38 20.18 36.2C13.58 36.76 6.61 36.48 0 36.48V47.79H7.54C10.83 47.79 14.14 47.79 17.44 48.06C28.72 48.33 38.34 55.15 48.79 58.73C55.4 61.49 62.87 62.41 70.01 62.41V51.37C66.72 51.37 63.37 51.1 60.07 50.55C52.64 48.88 45.77 45.3 38.62 42.27C47.7 38.4 57.08 33.16 67.27 33.16H70.02L70 33.17Z"
                                    fill="white" />
                                </g>
                              </g>
                            </svg>
                        </a>
                    </div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
                        <div>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/platform/why-flowfuse/">Why FlowFuse</a></li>
                                <li><a href="/about/">About us</a></li>
                                <li><a href="https://boards.greenhouse.io/flowfuse">Jobs</a></li>
                                <li><a href="/platform/security/#certifications">Security certifications</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/handbook/">Handbook</a></li>
                                <li><a href="/partners/">Partnerships</a></li>
                            </ul>
                        </div>
                        <div>
                            <ul class="flex flex-col gap-2.5">
                                <li><a href="/professional-services/">Professional Services</a></li>
                                <li><a href="https://status.flowfuse.com/">Service Status</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul class="flex flex-col gap-2.5">
                            <li><a href="/support/">Request Support</a></li>
                            <li><a href="/contact-us/">Contact Us</a></li>
                        </ul>
                    </div>
                </div>
            </section>
<!-- Legal + social bottom row -->
            <div class="mt-12 pt-6 border-t border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-gray-500" data-nav-section="Legal and social">
                <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span>Copyright {{ new Date().getFullYear() }} FlowFuse Inc. All Rights Reserved.</span>
                    <span aria-hidden="true">&middot;</span>
                    <a href="/privacy-policy/">Privacy</a>
                    <span aria-hidden="true">&middot;</span>
                    <a href="/terms/">Terms</a>
                    <span aria-hidden="true">&middot;</span>
                    <a class="cursor-pointer" type="button" data-cc="show-preferencesModal">Cookie preferences</a>
                </div>
                <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <a href="https://www.facebook.com/FlowFuse/" class="block">
                <span class="sr-only">Visit our Facebook page</span>
                <svg class="fill-current h-5 hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M21.4286 0H2.57143C1.88944 0 1.23539 0.270918 0.753154 0.753154C0.270918 1.23539 0 1.88944 0 2.57143L0 21.4286C0 22.1106 0.270918 22.7646 0.753154 23.2468C1.23539 23.7291 1.88944 24 2.57143 24H9.92411V15.8405H6.54911V12H9.92411V9.07286C9.92411 5.74339 11.9063 3.90429 14.9421 3.90429C16.3961 3.90429 17.9164 4.16357 17.9164 4.16357V7.43143H16.2413C14.5907 7.43143 14.0759 8.45571 14.0759 9.50625V12H17.7605L17.1713 15.8405H14.0759V24H21.4286C22.1106 24 22.7646 23.7291 23.2468 23.2468C23.7291 22.7646 24 22.1106 24 21.4286V2.57143C24 1.88944 23.7291 1.23539 23.2468 0.753154C22.7646 0.270918 22.1106 0 21.4286 0Z"/></svg>
              </a>
              <a href="https://github.com/FlowFuse" class="block">
                <span class="sr-only">Visit our GitHub page</span>
                <svg class="fill-current hover:text-red-hero h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
              <a href="https://discord.gg/2RrvW8dkrF" class="block">
                <span class="sr-only">Join our Discord</span>
                <svg class="fill-current hover:text-red-hero h-5" width="22" height="17" viewBox="0 0 22 17" xmlns="http://www.w3.org/2000/svg"><path d="M18.6361 1.39641C17.1907 0.734661 15.6648 0.265193 14.0973 0C13.8828 0.38343 13.6888 0.777928 13.5159 1.18184C11.8463 0.930252 10.1484 0.930252 8.47881 1.18184C8.30587 0.77797 8.1118 0.383476 7.8974 0C6.32897 0.267433 4.80205 0.738015 3.35518 1.39987C0.482757 5.64967 -0.29591 9.79391 0.0934235 13.8793C1.77558 15.1222 3.6584 16.0674 5.66003 16.6739C6.11074 16.0677 6.50956 15.4246 6.85226 14.7514C6.20135 14.5083 5.57311 14.2084 4.9748 13.8551C5.13227 13.7409 5.28627 13.6232 5.43508 13.509C7.17601 14.3277 9.07613 14.7522 11 14.7522C12.9238 14.7522 14.8239 14.3277 16.5648 13.509C16.7154 13.6319 16.8694 13.7495 17.0251 13.8551C16.4257 14.209 15.7963 14.5095 15.1442 14.7532C15.4865 15.426 15.8853 16.0686 16.3364 16.6739C18.3398 16.0698 20.224 15.1251 21.9065 13.881C22.3633 9.14329 21.1261 5.03711 18.6361 1.39641ZM7.34541 11.3668C6.26047 11.3668 5.36414 10.3822 5.36414 9.17097C5.36414 7.95971 6.22932 6.96648 7.34195 6.96648C8.45458 6.96648 9.34399 7.95971 9.32496 9.17097C9.30593 10.3822 8.45112 11.3668 7.34541 11.3668ZM14.6545 11.3668C13.5678 11.3668 12.675 10.3822 12.675 9.17097C12.675 7.95971 13.5401 6.96648 14.6545 6.96648C15.7689 6.96648 16.6514 7.95971 16.6323 9.17097C16.6133 10.3822 15.7602 11.3668 14.6545 11.3668Z"/></svg>
              </a>
              <a href="https://www.reddit.com/r/flowfuse" class="block">
                <span class="sr-only">Visit our Reddit community</span>
                <svg class="fill-current h-5 hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z"/></svg>
              </a>
              <a href="/blog/index.xml" class="block">
                <span class="sr-only">Subscribe to our RSS feed</span>
                <svg class="fill-current hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M6.503 20.752c0 1.794-1.456 3.248-3.251 3.248-1.796 0-3.252-1.454-3.252-3.248 0-1.794 1.456-3.248 3.252-3.248 1.795.001 3.251 1.454 3.251 3.248zm-6.503-12.572v4.811c6.05.062 10.96 4.966 11.022 11.009h4.817c-.062-8.71-7.118-15.758-15.839-15.82zm0-3.368c10.58.046 19.152 8.594 19.183 19.188h4.817c-.03-13.231-10.755-23.954-24-24v4.812z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/flowfuse" class="block">
                <span class="sr-only">Visit our LinkedIn page</span>
                <svg class="fill-current h-5 hover:text-red-hero" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0v24h24v-24h-24zm8 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.397-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              <a href="https://www.youtube.com/channel/UCbBzP8NZbv3WDtlt4UouA-g" class="block">
                <span class="sr-only">Visit our YouTube channel</span>
                <svg class="fill-current h-5 hover:text-red-hero" width="28" height="20" viewBox="0 0 28 20" xmlns="http://www.w3.org/2000/svg"><path d="M27.3016 2.97749C26.9889 1.80488 26.0709 0.88338 24.9028 0.569489C22.7854 0 14.3001 0 14.3001 0C14.3001 0 5.81476 0 3.69957 0.569489C2.53142 0.88338 1.61342 1.80488 1.30072 2.97749C0.733398 5.10074 0.733398 9.53333 0.733398 9.53333C0.733398 9.53333 0.733398 13.9659 1.30072 16.0892C1.61342 17.2618 2.53142 18.1833 3.69957 18.4972C5.81476 19.0667 14.3001 19.0667 14.3001 19.0667C14.3001 19.0667 22.7854 19.0667 24.9006 18.4972C26.0687 18.1833 26.9867 17.2618 27.2994 16.0892C27.8667 13.9659 27.8667 9.53333 27.8667 9.53333C27.8667 9.53333 27.8667 5.10074 27.2994 2.97749H27.3016ZM11.5863 13.6184V5.44826L18.6354 9.53333L11.5863 13.6184Z"/></svg>
              </a>
                </div>
            </div>
        </div>
    </footer>
</template>
