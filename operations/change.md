# Change Control

We have a simple change control process for flowforge.cloud

Any configuration is changed or new code deployment must go through the following steps.

The key points here are:
- This is a 2 person process, someone to implement and someone to review
- All changes are recorded 



```mermaid
flowchart TD
    A[Create issue in cloud project detailing the changes] -->  
    B[Issue assigned to implementer] --> 
    C[Second person adds approval comment] --> 
    D[Change made on Staging] --> 
    E[Second Person reviews staging and approves] --> 
    F[Change Made on Production] --> 
    G[Second Person reviews Prod and closes issue]
```
