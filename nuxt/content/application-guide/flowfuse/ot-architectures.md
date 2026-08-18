---
title: OT architectures
guide: flowfuse
navOrder: 5.2
navTitle: OT architectures
parent: architectures
slug: ot-architectures
---

# OT architectures

::guide-tabs
  :::guide-tab{label="Edge · server in IT"}
    ::::arch-diagram
    ---
    :edges: '[{"from":"r1","to":"server","accent":"slate"},{"from":"r2","to":"server","label":"manages across the boundary","accent":"slate"},{"from":"r3","to":"server","accent":"slate"},{"from":"r1","to":"p1"},{"from":"r2","to":"p2","label":"reads"},{"from":"r3","to":"p3"}]'
    :groups: '[{"id":"it","label":"IT infrastructure","accent":"green","nodes":["server"]},{"id":"ot","label":"OT environment","accent":"red","nodes":["r1","r2","r3","p1","p2","p3"]}]'
    :legend: '[{"swatch":"green","label":"IT zone"},{"swatch":"red","label":"OT zone"},{"line":"slate","label":"Authenticated"},{"line":"neutral","label":"Local wire"}]'
    :nodes: '[{"id":"server","label":"FlowFuse server","sub":"in IT infrastructure","accent":"indigo","col":2,"row":1},{"id":"r1","label":"Remote Instance","sub":"on OT equipment","accent":"slate","col":1,"row":2},{"id":"r2","label":"Remote Instance","sub":"on OT equipment","accent":"slate","col":2,"row":2},{"id":"r3","label":"Remote Instance","sub":"on OT equipment","accent":"slate","col":3,"row":2},{"id":"p1","label":"PLCs","sub":"Line A","col":1,"row":3},{"id":"p2","label":"PLCs","sub":"Line B","col":2,"row":3},{"id":"p3","label":"PLCs","sub":"Line C","col":3,"row":3}]'
    ---
    ::::

  The FlowFuse server lives up in the IT infrastructure; the Remote Instances live down in the OT environment on the equipment. The server deploys to and manages them across the IT/OT boundary, while each Remote Instance keeps running locally if the link drops.

  **Use it when** — IT owns and hosts the platform, but execution must sit next to the machines in OT.
  :::

  :::guide-tab{label="Edge · server in OT / DMZ"}
    ::::arch-diagram
    ---
    :edges: '[{"from":"itri","to":"corp","accent":"slate"},{"from":"itri","to":"server","label":"controlled uplink","accent":"slate"},{"from":"r1","to":"server","accent":"slate"},{"from":"r2","to":"server","accent":"slate"},{"from":"r3","to":"server","accent":"slate"},{"from":"r1","to":"p1"},{"from":"r2","to":"p2"},{"from":"r3","to":"p3"}]'
    :groups: '[{"id":"it","label":"IT · corporate network","accent":"green","nodes":["corp","itri"]},{"id":"dmz","label":"DMZ · firewall-segregated","accent":"neutral","nodes":["server"]},{"id":"ot","label":"OT network","accent":"red","nodes":["r1","r2","r3","p1","p2","p3"]}]'
    :legend: '[{"swatch":"green","label":"IT zone"},{"swatch":"neutral","label":"DMZ"},{"swatch":"red","label":"OT zone"},{"line":"slate","label":"Authenticated"},{"line":"neutral","label":"Local wire"}]'
    :nodes: '[{"id":"corp","label":"Corporate systems","sub":"MES / ERP / dashboards","accent":"neutral","col":2,"row":1},{"id":"itri","label":"Remote Instance","sub":"in IT","accent":"slate","col":2,"row":2},{"id":"server","label":"FlowFuse server","sub":"in the DMZ","accent":"indigo","col":2,"row":3},{"id":"r1","label":"Remote Instance","sub":"IPC · Area 1","accent":"slate","col":1,"row":4},{"id":"r2","label":"Remote Instance","sub":"IPC · Area 2","accent":"slate","col":2,"row":4},{"id":"r3","label":"Remote Instance","sub":"embedded · Area 3","accent":"slate","col":3,"row":4},{"id":"p1","label":"PLCs","col":1,"row":5},{"id":"p2","label":"PLCs","col":2,"row":5},{"id":"p3","label":"PLCs","col":3,"row":5}]'
    ---
    ::::

  The FlowFuse server sits inside the plant, firewall-segregated in a DMZ. It reaches corporate systems through a controlled uplink to a Remote Instance up in the IT network, and manages Remote Instances on IPCs and embedded hardware in the OT network below. Nothing reaches OT except through the firewalls.

  **Use it when** — Security policy keeps the platform inside the plant boundary, exposed only through a DMZ.
  :::

  :::guide-tab{label="Air-gapped"}
    ::::arch-diagram
    ---
    :edges: '[{"from":"net","to":"server","label":"blocked","dir":"none","dashed":true,"accent":"red"},{"from":"server","to":"inst","label":"deploys","accent":"slate"},{"from":"inst","to":"plc","label":"reads"}]'
    :groups: '[{"id":"ot","label":"OT network · no internet","accent":"red","nodes":["server","inst","plc"]}]'
    :legend: '[{"swatch":"red","label":"OT zone"},{"line":"slate","label":"Authenticated"},{"line":"neutral","label":"Local wire"},{"line":"red","dashed":true,"label":"Blocked"}]'
    :nodes: '[{"id":"net","label":"Internet","accent":"neutral","col":1,"row":1},{"id":"server","label":"FlowFuse","sub":"self-managed · on-site","accent":"indigo","col":1,"row":2},{"id":"inst","label":"Instances","sub":"site apps","accent":"indigo","col":1,"row":3},{"id":"plc","label":"PLCs","sub":"equipment","col":1,"row":4}]'
    ---
    ::::

  The DMZ pattern taken to its extreme: a self-managed FlowFuse runs on a server inside an isolated OT network with no internet at all. It manages that site's instances and devices entirely within the OT boundary — nothing goes in or out.

  **Use it when** — Site security policy forbids any internet traffic in or out of the OT network.
  :::

  :::guide-tab{label="Edge · hardware-saving"}
    ::::arch-diagram
    ---
    :edges: '[{"from":"server","to":"h1","accent":"slate"},{"from":"server","to":"h2","label":"runs","accent":"slate"},{"from":"server","to":"h3","accent":"slate"},{"from":"h1","to":"p1"},{"from":"h2","to":"p2","label":"talks to equipment"},{"from":"h3","to":"p3"}]'
    :groups: '[{"id":"ot","label":"OT · on-site, close to the equipment","accent":"red","nodes":["server","h1","h2","h3","p1","p2","p3"]}]'
    :legend: '[{"swatch":"red","label":"OT zone"},{"line":"slate","label":"Authenticated"},{"line":"neutral","label":"Local wire"}]'
    :nodes: '[{"id":"server","label":"FlowFuse server","sub":"on-site · near the line","accent":"indigo","col":2,"row":1},{"id":"h1","label":"Hosted Instance","sub":"does Line A''s work","accent":"indigo","col":1,"row":2},{"id":"h2","label":"Hosted Instance","sub":"does Line B''s work","accent":"indigo","col":2,"row":2},{"id":"h3","label":"Hosted Instance","sub":"does Line C''s work","accent":"indigo","col":3,"row":2},{"id":"p1","label":"PLCs","sub":"Line A","col":1,"row":3},{"id":"p2","label":"PLCs","sub":"Line B","col":2,"row":3},{"id":"p3","label":"PLCs","sub":"Line C","col":3,"row":3}]'
    ---
    ::::

  Instead of a Remote Instance on every device, deploy one FlowFuse server close to the line and run several Hosted Instances on it — each doing the work an edge device would have done, talking to its equipment directly. Fewer physical boxes to buy and maintain, same separation of concerns.

  **Use it when** — You want the edge workloads consolidated onto nearby server hardware to cut device count.
  :::
::
