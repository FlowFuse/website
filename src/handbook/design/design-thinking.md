---
navTitle: Design Thinking
---

# Design Thinking

At FlowFuse, we practice Design Thinking when considering our UI design and wider decisions influencing the overall user experience of FlowFuse.

> Design Thinking is a non-linear, iterative process that teams use to understand users, challenge assumptions, redefine problems and create innovative solutions to prototype and test.
>
> -- <cite>[_Design Thinking, Interaction Design Foundation_](https://www.interaction-design.org/literature/topics/design-thinking)</cite>

As designers and developers, empathising with our users will lead to a better product. When proposing new feature ideas, concepts and changes to existing UX, arguments should always be considered from the perspective of our users. 

Whilst most of the output from our Design Thinking workshops and sessions can be
found within [FigJam](./tools#figjam-(more-info)), we have also written up some of our Design Thinking Findings to the Handbook.

## User Personas

Personas are fictional characters that represent the different users we expect to interact with FlowFuse as a brand and/or platform. At FlowFuse, we have many personas that will evolve over time, we have written up some of our Personas [here](../engineering/product/personas/).

<div class="grid grid-cols-2 gap-4">
    <div class="rounded-md bg-gray-900 text-white p-4 border-2 border-black">
        <div class="py-2 text-center border-b-2 border-red-400">
            <img class="w-32 rounded-md border-2 border-white m-auto" src="../images/personas/sahib.jpg">
            <label class="block mt-2 font-bold">Sahib, Startup CTO</label>
        </div>
        <div class="py-2">
            <div class="flex flex-col">
                <label class="font-bold">Age:</label>
                <span class="leading-6">33</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Occupation:</label>
                <span class="leading-6">CTO, New Startup Inc.</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Software Skillset:</label>
                <span class="leading-6">Computer Science, MSc</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Node-RED Experience:</label>
                <span class="leading-6">Using it extensively in New Startup Inc.</span>
            </div>
        </div>
    </div>
    <div class="rounded-md bg-gray-900 text-white p-4 border-2 border-black">
        <div class="py-2 text-center border-b-2 border-red-400">
            <img class="w-32 rounded-md border-2 border-white m-auto" src="../images/personas/danielle.jpg">
            <label class="block mt-2 font-bold">Danielle, the Developer</label>
        </div>
        <div class="py-2">
            <div class="flex flex-col">
                <label class="font-bold">Age:</label>
                <span class="leading-6">24</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Occupation:</label>
                <span class="leading-6">Software Developer, New Startup Inc. (works for Sahib)</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Software Skillset:</label>
                <span class="leading-6">Computer Science & AI, BSc</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Node-RED Experience:</label>
                <span class="leading-6">Never used it, aware of it via day job and network</span>
            </div>
        </div>
    </div>
    <div class="rounded-md bg-gray-900 text-white p-4 border-2 border-black">
        <div class="py-2 text-center border-b-2 border-red-400">
            <img class="w-32 rounded-md border-2 border-white m-auto" src="../images/personas/chris.jpg">
            <label class="block mt-2 font-bold">Chris, the Consultant</label>
        </div>
        <div class="py-2">
            <div class="flex flex-col">
                <label class="font-bold">Age:</label>
                <span class="leading-6">44</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Occupation:</label>
                <span class="leading-6">Consultant Chris' Consultancy Inc.</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Software Skillset:</label>
                <span class="leading-6">System Integrator, 10+ yrs experience</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Node-RED Experience:</label>
                <span class="leading-6">Very familiar, uses it for quick and reliable dev on customer projects</span>
            </div>
        </div>
    </div>
    <div class="rounded-md bg-gray-900 text-white p-4 border-2 border-black">
        <div class="py-2 text-center border-b-2 border-red-400">
            <img class="w-32 rounded-md border-2 border-white m-auto" src="../images/personas/neil.jpg">
            <label class="block mt-2 font-bold">Neil, Node-RED Developer</label>
        </div>
        <div class="py-2">
            <div class="flex flex-col">
                <label class="font-bold">Age:</label>
                <span class="leading-6">28</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Occupation:</label>
                <span class="leading-6">Software Developer, Company N</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Software Skillset:</label>
                <span class="leading-6">Computer Science, BSc</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Node-RED Experience:</label>
                <span class="leading-6">Actively developing Node-RED nodes</span>
            </div>
        </div>
    </div>
    <div class="rounded-md bg-gray-900 text-white p-4 border-2 border-black">
        <div class="py-2 text-center border-b-2 border-red-400">
            <img class="w-32 rounded-md border-2 border-white m-auto" src="../images/personas/harry.jpg">
            <label class="block mt-2 font-bold">Harry, the Hobbyist</label>
        </div>
        <div class="py-2">
            <div class="flex flex-col">
                <label class="font-bold">Age:</label>
                <span class="leading-6">52</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Occupation:</label>
                <span class="leading-6">Practical Engineer (Not Software)</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Software Skillset:</label>
                <span class="leading-6">Self-taught</span>
            </div>
            <div class="flex flex-col mt-1">
                <label class="font-bold">Node-RED Experience:</label>
                <span class="leading-6">Experienced - Active member of the Node-RED community</span>
            </div>
        </div>
    </div>
</div>
