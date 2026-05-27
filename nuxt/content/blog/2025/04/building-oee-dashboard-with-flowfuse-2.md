---
title: 'Part 2: Building an OEE Dashboard with FlowFuse'
navTitle: 'Part 2: Building an OEE Dashboard with FlowFuse'
---

In [Part 1](/blog/2025/04/building-oee-dashboard-with-flowfuse-part-1/), we explored the fundamentals of OEE, outlined a basic design of the dashboard, and identified the key elements to include in the OEE dashboard. 
In this Part 2, we will focus on building the OEE dashboard interface using [FlowFuse Dashboard](https://dashboard.flowfuse.com/) (Node-RED Dashboard 2.0) and FlowFuse, utilizing simulated production and downtime data.

<!--more-->

## Getting Started

To simplify the development process, we will divide development into five key parts:

1. Collecting and configuring data
2. Preparing data for calculations
3. Calculating OEE and key metrics
4. Detailed breakdown of OEE data
5. Building the dashboard

Before we start, it is recommended to have a basic knowledge of Node-RED. For that, I recommend this free [Node-RED Fundamental Course](https://node-red-academy.learnworlds.com/course/node-red-getting-started).

Additionally, ensure that you organize flows into well-structured groups. To match my group organization, I have provided images of the flow for each section. Also, if a Link In node is present at the start, create the group starting from the Link In node and ending at the Link Out node.

### Prerequisites

Before you begin building the OEE Dashboard with FlowFuse, make sure you have the following:

- **Running FlowFuse Instance:** Make sure you have a FlowFuse instance set up and running. If you don't have an account, check out our [free trial](https://app.flowfuse.com/account/create) and learn how to create an instance in FlowFuse.
- **FlowFuse Dashboard:** Ensure you have [FlowFuse Dashboard](https://flows.nodered.org/node/@flowfuse/node-red-dashboard) (also known as Node-RED Dashboard 2.0 in the community) installed and properly configured on your instance.
- **SQLite Contrib Node:** Ensure you have [node-red-contrib-sqlite](https://flows.nodered.org/node/node-red-node-sqlite) installed.

### Preparing Simulated Data

Before building the dashboard, we need a data source for production and downtime metrics. This data will serve as input for OEE calculations. We will focus on connecting a real source in the next part, but for now, let's generate simulated data.



::render-flow
---
height: 300
flow: "W3siaWQiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwidHlwZSI6InRhYiIsImxhYmVsIjoiU2ltdWxhdGVkIERhdGEgR2VuZXJhdGlvbiIsImRpc2FibGVkIjpmYWxzZSwiaW5mbyI6IiIsImVudiI6W119LHsiaWQiOiIzZjIxMjZjM2MwMGI5ZTBkIiwidHlwZSI6Imdyb3VwIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyI4NTNmYjNhMzk1ZDgzM2JiIiwiYTk2ZmZkMTcxYmYxMTgyMyIsIjNkMzA5OTVhNDMyOWViNzEiLCIwZjQ2NmJhMmE4ODVlMjJhIiwiZjgyMjljNjUxNzA2YjE2MiIsIjJjZWViYzkzZDU0YWRiYTQiLCIwYzkyN2FiZDNiMTM5ZTk3IiwiODIyMjg1NWJjMzJlOTI0MCJdLCJ4IjoyNCwieSI6OTksInciOjExNDIsImgiOjE4Mn0seyJpZCI6IjA3YTNkNWI5MDc1ZmY4NDYiLCJ0eXBlIjoiZ3JvdXAiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsInN0eWxlIjp7InN0cm9rZSI6IiNiMmIzYmQiLCJzdHJva2Utb3BhY2l0eSI6IjEiLCJmaWxsIjoiI2YyZjNmYiIsImZpbGwtb3BhY2l0eSI6IjAuNSIsImxhYmVsIjp0cnVlLCJsYWJlbC1wb3NpdGlvbiI6Im53IiwiY29sb3IiOiIjMzIzMzNiIn0sIm5vZGVzIjpbImFhN2JkODY3ZmE3ZGFjYTUiLCIyMzRhZWY4YTk5OWNiOGQ5IiwiZDc2NDFjOTMyN2YyOTVmOCIsImMzZTk2YjczY2Q2ZWM1ODYiLCIxM2YyZTg1MWUzZjI4ZWM2IiwiOWE0NDQ2NTVjMDc2ZDVhNyIsImUxZmUxYjFhNGYxZWYyZTUiLCIyYmViNjhhYmM1ZGE5M2JjIiwiYjgzZDUxN2ZhZTNjN2JiZiIsIjUwZWJiYmZiMTU5YTNjYmUiLCI4ODczNzc0YWQzMzliNjdlIiwiNzdlMjJiMjBkMTg2MmM3ZSJdLCJ4IjotNiwieSI6Mjk5LCJ3IjoyMDkyLCJoIjoxNjJ9LHsiaWQiOiJjMDU1MGRiODdkNmZiOTQ3IiwidHlwZSI6Imdyb3VwIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJzdHlsZSI6eyJzdHJva2UiOiIjYjJiM2JkIiwic3Ryb2tlLW9wYWNpdHkiOiIxIiwiZmlsbCI6IiNmMmYzZmIiLCJmaWxsLW9wYWNpdHkiOiIwLjUiLCJsYWJlbCI6dHJ1ZSwibGFiZWwtcG9zaXRpb24iOiJudyIsImNvbG9yIjoiIzMyMzMzYiJ9LCJub2RlcyI6WyJiMWY3NzNmNGNjMjI2NmM2IiwiY2NlOTE5MjgwNzZhZGIyMyIsImQ4NTNhNTU0ZWNkMTUyYjEiLCI0NTYyOGZiMGNhMGE0NjcyIiwiMzZhZTYyN2FkNjk0ZmMwOSIsIjY5YWZkNDllMmNlYjE5MWIiLCI4MDhkYjU2MTJiYTFhZWRjIiwiNmRjZDY5YWNkNTk5MDc5MyJdLCJ4IjozNCwieSI6NDc5LCJ3IjoxMjAyLCJoIjoxNDJ9LHsiaWQiOiJhOTZmZmQxNzFiZjExODIzIiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiM2YyMTI2YzNjMDBiOWUwZCIsIm5hbWUiOiJDcmVhdGUgUHJvZHVjdGlvbkRhdGEgdGFibGUiLCJmaWVsZCI6InRvcGljIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0Ijoic3FsIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkNSRUFURSBUQUJMRSBJRiBOT1QgRVhJU1RTIFByb2R1Y3Rpb25EYXRhIChcbiAgICBpZCBJTlRFR0VSIFBSSU1BUlkgS0VZIEFVVE9JTkNSRU1FTlQsXG4gICAgdGltZXN0YW1wIERBVEVUSU1FIE5PVCBOVUxMLFxuICAgIGFyZWEgVkFSQ0hBUigyNTUpIE5PVCBOVUxMLFxuICAgIGxpbmUgVkFSQ0hBUigxMDApIE5PVCBOVUxMLCAgXG4gICAgbWFjaGluZV9uYW1lIFZBUkNIQVIoMjU1KSBOT1QgTlVMTCxcbiAgICBzaGlmdCBWQVJDSEFSKDUwKSBOT1QgTlVMTCxcbiAgICBzaGlmdF9kdXJhdGlvbiBERUNJTUFMKDUsMikgTk9UIE5VTEwsXG4gICAgZ29vZF91bml0cyBJTlQgTk9UIE5VTEwsXG4gICAgZGVmZWN0X3VuaXRzIElOVCBOT1QgTlVMTCxcbiAgICB0b3RhbF9wcm9kdWNlZF91bml0cyBJTlQgTk9UIE5VTEwsXG4gICAgY3ljbGVfdGltZSBERUNJTUFMKDUsMikgTk9UIE5VTEwsXG4gICAgaWRlYWxfY3ljbGVfdGltZSBERUNJTUFMKDUsMikgTk9UIE5VTEwsXG4gICAgdGFyZ2V0X291dHB1dCBJTlQgTk9UIE5VTEwgREVGQVVMVCAwLFxuICAgIG9wZXJhdGluZ190aW1lIElOVCBOT1QgTlVMTFxuKTtcbiIsIm91dHB1dCI6InN0ciIsIngiOjUwMCwieSI6MTQwLCJ3aXJlcyI6W1siODUzZmIzYTM5NWQ4MzNiYiJdXX0seyJpZCI6IjNkMzA5OTVhNDMyOWViNzEiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiM2YyMTI2YzNjMDBiOWUwZCIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6dHJ1ZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjE1MCwieSI6MTQwLCJ3aXJlcyI6W1siYTk2ZmZkMTcxYmYxMTgyMyJdXX0seyJpZCI6IjBmNDY2YmEyYTg4NWUyMmEiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIzZjIxMjZjM2MwMGI5ZTBkIiwibmFtZSI6ImRlYnVnIDEiLCJhY3RpdmUiOmZhbHNlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjEwNTAsInkiOjE0MCwid2lyZXMiOltdfSx7ImlkIjoiMmNlZWJjOTNkNTRhZGJhNCIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6IjNmMjEyNmMzYzAwYjllMGQiLCJuYW1lIjoiQ3JlYXRlIERvd250aW1lIHRhYmxlIiwiZmllbGQiOiJ0b3BpYyIsImZpZWxkVHlwZSI6Im1zZyIsImZvcm1hdCI6InNxbCIsInN5bnRheCI6Im11c3RhY2hlIiwidGVtcGxhdGUiOiJDUkVBVEUgVEFCTEUgSUYgTk9UIEVYSVNUUyBEb3dudGltZURhdGEgKFxuICAgIGlkIElOVEVHRVIgUFJJTUFSWSBLRVkgQVVUT0lOQ1JFTUVOVCxcbiAgICB0aW1lc3RhbXAgREFURVRJTUUgTk9UIE5VTEwsXG4gICAgYXJlYSBWQVJDSEFSKDI1NSkgTk9UIE5VTEwsXG4gICAgbGluZSBWQVJDSEFSKDEwMCkgTk9UIE5VTEwsICBcbiAgICBtYWNoaW5lX25hbWUgVkFSQ0hBUigyNTUpIE5PVCBOVUxMLFxuICAgIHNoaWZ0IFZBUkNIQVIoNTApIE5PVCBOVUxMLFxuICAgIGRvd250aW1lX3N0YXJ0IERBVEVUSU1FIE5PVCBOVUxMLFxuICAgIGRvd250aW1lX2VuZCBEQVRFVElNRSBOT1QgTlVMTCxcbiAgICBkb3dudGltZV9kdXJhdGlvbl9taW51dGVzIElOVEVHRVIgTk9UIE5VTEwsXG4gICAgZG93bnRpbWVfdHlwZSBWQVJDSEFSKDUwKSBOT1QgTlVMTCBDSEVDSyAoZG93bnRpbWVfdHlwZSBJTiAoJ1BsYW5uZWQnLCAnVW5wbGFubmVkJykpLFxuICAgIGRvd250aW1lX3JlYXNvbiBURVhUIE5PVCBOVUxMXG4pO1xuIiwib3V0cHV0Ijoic3RyIiwieCI6NDQwLCJ5IjoyNDAsIndpcmVzIjpbWyJmODIyOWM2NTE3MDZiMTYyIl1dfSx7ImlkIjoiMGM5MjdhYmQzYjEzOWU5NyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIzZjIxMjZjM2MwMGI5ZTBkIiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjp0cnVlLCJvbmNlRGVsYXkiOjAuMSwidG9waWMiOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwieCI6MTUwLCJ5IjoyNDAsIndpcmVzIjpbWyIyY2VlYmM5M2Q1NGFkYmE0Il1dfSx7ImlkIjoiODIyMjg1NWJjMzJlOTI0MCIsInR5cGUiOiJkZWJ1ZyIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6IjNmMjEyNmMzYzAwYjllMGQiLCJuYW1lIjoiZGVidWcgMiIsImFjdGl2ZSI6ZmFsc2UsInRvc2lkZWJhciI6dHJ1ZSwiY29uc29sZSI6ZmFsc2UsInRvc3RhdHVzIjpmYWxzZSwiY29tcGxldGUiOiJmYWxzZSIsInN0YXR1c1ZhbCI6IiIsInN0YXR1c1R5cGUiOiJhdXRvIiwieCI6MTA1MCwieSI6MjQwLCJ3aXJlcyI6W119LHsiaWQiOiIyMzRhZWY4YTk5OWNiOGQ5IiwidHlwZSI6InRlbXBsYXRlIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiMDdhM2Q1YjkwNzVmZjg0NiIsIm5hbWUiOiJJbnNlcnQgcHJvZHVjdGlvbiBkYXRhIHJlY29yZCIsImZpZWxkIjoidG9waWMiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IklOU0VSVCBJTlRPIFByb2R1Y3Rpb25EYXRhIChcbiAgICB0aW1lc3RhbXAsIFxuICAgIGFyZWEsIFxuICAgIGxpbmUsIFxuICAgIG1hY2hpbmVfbmFtZSwgXG4gICAgc2hpZnQsIFxuICAgIHNoaWZ0X2R1cmF0aW9uLCBcbiAgICBnb29kX3VuaXRzLCBcbiAgICBkZWZlY3RfdW5pdHMsIFxuICAgIHRvdGFsX3Byb2R1Y2VkX3VuaXRzLCBcbiAgICBjeWNsZV90aW1lLCBcbiAgICBpZGVhbF9jeWNsZV90aW1lLCAgXG4gICAgdGFyZ2V0X291dHB1dCxcbiAgICBvcGVyYXRpbmdfdGltZSAgXG4pIFxuVkFMVUVTIChcbiAgICAne3twYXlsb2FkLnRpbWVzdGFtcH19JywgXG4gICAgJ3t7cGF5bG9hZC5hcmVhfX0nLCBcbiAgICAne3twYXlsb2FkLmxpbmV9fScsIFxuICAgICd7e3BheWxvYWQubWFjaGluZV9uYW1lfX0nLCBcbiAgICAne3twYXlsb2FkLnNoaWZ0fX0nLCBcbiAgICAne3twYXlsb2FkLnNoaWZ0X2R1cmF0aW9ufX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5nb29kX3VuaXRzfX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5kZWZlY3RfdW5pdHN9fScsICBcbiAgICAne3twYXlsb2FkLnRvdGFsX3Byb2R1Y2VkX3VuaXRzfX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5jeWNsZV90aW1lfX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5pZGVhbF9jeWNsZV90aW1lfX0nLCAgXG4gICAgJ3t7cGF5bG9hZC50YXJnZXRfb3V0cHV0fX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5vcGVyYXRpbmdfdGltZX19JyAgXG4pO1xuIiwib3V0cHV0Ijoic3RyIiwieCI6MTU1MCwieSI6MzQwLCJ3aXJlcyI6W1siYWE3YmQ4NjdmYTdkYWNhNSJdXX0seyJpZCI6ImQ3NjQxYzkzMjdmMjk1ZjgiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibmFtZSI6ImRlYnVnIDMiLCJhY3RpdmUiOmZhbHNlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjE5NzAsInkiOjM0MCwid2lyZXMiOltdfSx7ImlkIjoiY2NlOTE5MjgwNzZhZGIyMyIsInR5cGUiOiJ0ZW1wbGF0ZSIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6ImMwNTUwZGI4N2Q2ZmI5NDciLCJuYW1lIjoiRHJvcCBkZW1vIGRvd250aW1lIGRhdGEiLCJmaWVsZCI6InRvcGljIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0Ijoic3FsIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkRyb3AgdGFibGUgRG93bnRpbWVEYXRhOyIsIm91dHB1dCI6InN0ciIsIngiOjQ4MCwieSI6NTgwLCJ3aXJlcyI6W1siYjFmNzczZjRjYzIyNjZjNiJdXX0seyJpZCI6ImQ4NTNhNTU0ZWNkMTUyYjEiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiYzA1NTBkYjg3ZDZmYjk0NyIsIm5hbWUiOiIiLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiIiLCJwYXlsb2FkVHlwZSI6ImRhdGUiLCJ4IjoxNTAsInkiOjU4MCwid2lyZXMiOltbImNjZTkxOTI4MDc2YWRiMjMiXV19LHsiaWQiOiI0NTYyOGZiMGNhMGE0NjcyIiwidHlwZSI6ImRlYnVnIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiYzA1NTBkYjg3ZDZmYjk0NyIsIm5hbWUiOiJkZWJ1ZyA1IiwiYWN0aXZlIjpmYWxzZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxMTIwLCJ5Ijo1ODAsIndpcmVzIjpbXX0seyJpZCI6ImMzZTk2YjczY2Q2ZWM1ODYiLCJ0eXBlIjoiaW5qZWN0IiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiMDdhM2Q1YjkwNzVmZjg0NiIsIm5hbWUiOiJDbGljayB0byBnZW5lcmF0ZSBhbmQgaW5zZXJ0IGRlbW8gZGF0YS4iLCJwcm9wcyI6W3sicCI6InBheWxvYWQifSx7InAiOiJ0b3BpYyIsInZ0Ijoic3RyIn1dLCJyZXBlYXQiOiIiLCJjcm9udGFiIjoiIiwib25jZSI6ZmFsc2UsIm9uY2VEZWxheSI6IjAuNSIsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjIzMCwieSI6MzgwLCJ3aXJlcyI6W1siMTNmMmU4NTFlM2YyOGVjNiJdXX0seyJpZCI6IjEzZjJlODUxZTNmMjhlYzYiLCJ0eXBlIjoiZnVuY3Rpb24iLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibmFtZSI6IkdlbmVyYXRlIHNpbXVsYXRlZCBwcm9kdWN0aW9uIGFuZCBkb3dudGltZSBkYXRhIiwiZnVuYyI6ImZ1bmN0aW9uIGdlbmVyYXRlUHJvZHVjdGlvbkRhdGEoKSB7XG4gICAgY29uc3QgYXJlYXMgPSB7XG4gICAgICAgIFwiUHJlc3NpbmdcIjogW1wiSHlkcmF1bGljIFByZXNzXCIsIFwiQ05DIFByZXNzIEJyYWtlXCIsIFwiU3RhbXBpbmcgUHJlc3NcIiwgXCJQb3dlciBQcmVzc1wiXSxcbiAgICAgICAgXCJBc3NlbWJseVwiOiBbXCJSb2JvdGljIEFybVwiLCBcIlNjcmV3IEluc2VydGlvbiBNYWNoaW5lXCIsIFwiUGljay1hbmQtUGxhY2UgTWFjaGluZVwiXSxcbiAgICAgICAgXCJQYWNrYWdpbmdcIjogW1wiQ2FydG9uIFNlYWxpbmcgTWFjaGluZVwiLCBcIlNocmluayBXcmFwcGluZyBNYWNoaW5lXCIsIFwiQm90dGxlIEZpbGxpbmcgYW5kIENhcHBpbmcgTWFjaGluZVwiLCBcIkZsb3cgV3JhcHBlclwiXVxuICAgIH07XG5cbiAgICBjb25zdCBzaGlmdHMgPSBbXCJTaGlmdCAxXCIsIFwiU2hpZnQgMlwiLCBcIlNoaWZ0IDNcIl07XG4gICAgY29uc3Qgc2hpZnRTdGFydFRpbWVzID0ge1xuICAgICAgICBcIlNoaWZ0IDFcIjogXCIwMDowMDowMFwiLFxuICAgICAgICBcIlNoaWZ0IDJcIjogXCIwODowMDowMFwiLFxuICAgICAgICBcIlNoaWZ0IDNcIjogXCIxNjowMDowMFwiXG4gICAgfTtcblxuICAgIGNvbnN0IHVuaXF1ZVNob3J0Q29kZXMgPSB7XG4gICAgICAgIFwiUHJlc3NpbmdcIjogW1wiSFBcIiwgXCJQQlwiLCBcIlNQXCIsIFwiUFBcIl0sXG4gICAgICAgIFwiQXNzZW1ibHlcIjogW1wiUkFcIiwgXCJTSU1cIiwgXCJQIGFuZCBQXCJdLFxuICAgICAgICBcIlBhY2thZ2luZ1wiOiBbXCJDU01cIiwgXCJTV01cIiwgXCJCRkNNXCIsIFwiRldcIl1cbiAgICB9O1xuXG4gICAgY29uc3QgZG93bnRpbWVUeXBlcyA9IFtcIlBsYW5uZWRcIiwgXCJVbnBsYW5uZWRcIl07XG4gICAgY29uc3QgcGxhbm5lZERvd250aW1lUmVhc29ucyA9IFtcbiAgICAgICAgXCJTY2hlZHVsZWQgTWFpbnRlbmFuY2VcIiwgXCJFcXVpcG1lbnQgVXBncmFkZXNcIiwgXCJTaGlmdCBDaGFuZ2VvdmVyXCIsXG4gICAgICAgIFwiVG9vbCBDaGFuZ2VvdmVyXCIsIFwiQ2FsaWJyYXRpb24gYW5kIFF1YWxpdHkgQ2hlY2tzXCIsIFwiQ2xlYW5pbmcgYW5kIFNhbml0YXRpb25cIiwgXCJQbGFubmVkIFBvd2VyIE91dGFnZVwiXG4gICAgXTtcbiAgICBjb25zdCB1bnBsYW5uZWREb3dudGltZVJlYXNvbnMgPSBbXG4gICAgICAgIFwiUG93ZXIgRmFpbHVyZVwiLCBcIk1hdGVyaWFsIFNob3J0YWdlXCIsIFwiVGVjaG5pY2FsIEZhdWx0XCIsIFwiT3BlcmF0b3IgVW5hdmFpbGFibGVcIlxuICAgIF07XG5cbiAgICBjb25zdCBkYXRhID0gW107XG4gICAgY29uc3QgZG93bnRpbWVEYXRhID0gW107XG4gICAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcblxuICAgIGNvbnN0IG5vcm1hbGl6ZVRpbWVzdGFtcCA9ICh0aW1lc3RhbXApID0+IHRpbWVzdGFtcC50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKS5qb2luKFwiIFwiKS5zbGljZSgwLCAxOSk7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGRhdGUuc2V0RGF0ZShub3cuZ2V0RGF0ZSgpIC0gaSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZERhdGUgPSBkYXRlLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuXG4gICAgICAgIHNoaWZ0cy5mb3JFYWNoKHNoaWZ0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaWZ0U3RhcnQgPSBzaGlmdFN0YXJ0VGltZXNbc2hpZnRdO1xuICAgICAgICAgICAgY29uc3Qgc2hpZnRUaW1lc3RhbXAgPSBuZXcgRGF0ZShgJHtmb3JtYXR0ZWREYXRlfVQke3NoaWZ0U3RhcnR9YCk7XG5cbiAgICAgICAgICAgIE9iamVjdC5lbnRyaWVzKGFyZWFzKS5mb3JFYWNoKChbYXJlYSwgbWFjaGluZXNdKSA9PiB7XG4gICAgICAgICAgICAgICAgbWFjaGluZXMuZm9yRWFjaCgoXywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmFuZG9tQ29kZSA9IHVuaXF1ZVNob3J0Q29kZXNbYXJlYV1bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5pcXVlU2hvcnRDb2Rlc1thcmVhXS5sZW5ndGgpXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdW5pcXVlSUQgPSBNYXRoLmZsb29yKDEwMDAwICsgTWF0aC5yYW5kb20oKSAqIDkwMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hvcnRNYWNoaW5lTmFtZSA9IGAke3JhbmRvbUNvZGV9LSR7dW5pcXVlSUR9YDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaGlmdER1cmF0aW9uID0gODtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRvdGFsRG93bnRpbWVNaW51dGVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRvd250aW1lRXZlbnRzID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gSW5jcmVhc2UgZG93bnRpbWUgZnJlcXVlbmN5ICh1cCB0byA0IGV2ZW50cyBwZXIgc2hpZnQpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bURvd250aW1lcyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDQpICsgMTtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBkID0gMDsgZCA8IG51bURvd250aW1lczsgZCsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNzUpIHsgIC8vIEluY3JlYXNlIHByb2JhYmlsaXR5IG9mIGRvd250aW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRvd250aW1lTWludXRlcyA9IE1hdGguZmxvb3IoNSArIE1hdGgucmFuZG9tKCkgKiAxMCk7IC8vIFNob3J0ZXIgZG93bnRpbWVzICg1LTE1IG1pbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxEb3dudGltZU1pbnV0ZXMgKz0gZG93bnRpbWVNaW51dGVzO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bnRpbWVTdGFydE1pbnV0ZXMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoc2hpZnREdXJhdGlvbiAqIDYwIC0gZG93bnRpbWVNaW51dGVzKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZG93bnRpbWVTdGFydCA9IG5ldyBEYXRlKHNoaWZ0VGltZXN0YW1wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dudGltZVN0YXJ0LnNldE1pbnV0ZXMoZG93bnRpbWVTdGFydC5nZXRNaW51dGVzKCkgKyBkb3dudGltZVN0YXJ0TWludXRlcyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkb3dudGltZUVuZCA9IG5ldyBEYXRlKGRvd250aW1lU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd250aW1lRW5kLnNldE1pbnV0ZXMoZG93bnRpbWVFbmQuZ2V0TWludXRlcygpICsgZG93bnRpbWVNaW51dGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRvd250aW1lVHlwZSA9IGRvd250aW1lVHlwZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZG93bnRpbWVUeXBlcy5sZW5ndGgpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkb3dudGltZVJlYXNvbiA9IGRvd250aW1lVHlwZSA9PT0gXCJQbGFubmVkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBwbGFubmVkRG93bnRpbWVSZWFzb25zW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHBsYW5uZWREb3dudGltZVJlYXNvbnMubGVuZ3RoKV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB1bnBsYW5uZWREb3dudGltZVJlYXNvbnNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdW5wbGFubmVkRG93bnRpbWVSZWFzb25zLmxlbmd0aCldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bnRpbWVFdmVudHMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbm9ybWFsaXplVGltZXN0YW1wKHNoaWZ0VGltZXN0YW1wKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJlYSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZV9uYW1lOiBzaG9ydE1hY2hpbmVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGlmdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bnRpbWVfc3RhcnQ6IG5vcm1hbGl6ZVRpbWVzdGFtcChkb3dudGltZVN0YXJ0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG93bnRpbWVfZW5kOiBub3JtYWxpemVUaW1lc3RhbXAoZG93bnRpbWVFbmQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3dudGltZV9kdXJhdGlvbl9taW51dGVzOiBkb3dudGltZU1pbnV0ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd250aW1lX3JlYXNvbjogZG93bnRpbWVSZWFzb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvd250aW1lX3R5cGU6IGRvd250aW1lVHlwZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogYExpbmUtJHtpbmRleCArIDF9YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3BlcmF0aW5nVGltZSA9IChzaGlmdER1cmF0aW9uICogNjAgLSB0b3RhbERvd250aW1lTWludXRlcykgKiA2MDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVmZmljaWVuY3kgPSBNYXRoLnJhbmRvbSgpICogMC4yICsgMC43NTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhcmdldE91dHB1dCA9IE1hdGguZmxvb3Iob3BlcmF0aW5nVGltZSAvIDMpIHx8IDE7XG4gICAgICAgICAgICAgICAgICAgIGxldCB0b3RhbFByb2R1Y2VkID0gTWF0aC5mbG9vcih0YXJnZXRPdXRwdXQgKiBlZmZpY2llbmN5KTtcbiAgICAgICAgICAgICAgICAgICAgdG90YWxQcm9kdWNlZCA9IE1hdGgubWluKHRvdGFsUHJvZHVjZWQsIHRhcmdldE91dHB1dCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZWN0UmF0ZSA9IE1hdGgucmFuZG9tKCkgKiAwLjAyICsgMC4wMTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGVmZWN0VW5pdHMgPSBNYXRoLmZsb29yKHRvdGFsUHJvZHVjZWQgKiBkZWZlY3RSYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ29vZFVuaXRzID0gdG90YWxQcm9kdWNlZCAtIGRlZmVjdFVuaXRzO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG5vcm1hbGl6ZVRpbWVzdGFtcChzaGlmdFRpbWVzdGFtcCksXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmVhLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFjaGluZV9uYW1lOiBzaG9ydE1hY2hpbmVOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpZnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlmdF9kdXJhdGlvbjogc2hpZnREdXJhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wZXJhdGluZ190aW1lOiBvcGVyYXRpbmdUaW1lIC0gdG90YWxEb3dudGltZU1pbnV0ZXMgKiA2MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdvb2RfdW5pdHM6IGdvb2RVbml0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmVjdF91bml0czogZGVmZWN0VW5pdHMsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3RhbF9wcm9kdWNlZF91bml0czogdG90YWxQcm9kdWNlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldF9vdXRwdXQ6IHRhcmdldE91dHB1dCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6IGBMaW5lLSR7aW5kZXggKyAxfWBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZG93bnRpbWVEYXRhLnB1c2goLi4uZG93bnRpbWVFdmVudHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICAgIHsgcGF5bG9hZDogZGF0YSB9LFxuICAgICAgICB7IHBheWxvYWQ6IGRvd250aW1lRGF0YSB9XG4gICAgXTtcbn1cblxuY29uc3QgcHJvZHVjdGlvbkRhdGFTZXQgPSBnZW5lcmF0ZVByb2R1Y3Rpb25EYXRhKCk7XG5cbnJldHVybiBbXG4gICAgeyBwYXlsb2FkOiBwcm9kdWN0aW9uRGF0YVNldFswXS5wYXlsb2FkIH0sXG4gICAgeyBwYXlsb2FkOiBwcm9kdWN0aW9uRGF0YVNldFsxXS5wYXlsb2FkIH1cbl07XG4iLCJvdXRwdXRzIjoyLCJ0aW1lb3V0IjowLCJub2VyciI6MCwiaW5pdGlhbGl6ZSI6IiIsImZpbmFsaXplIjoiIiwibGlicyI6W10sIngiOjY5MCwieSI6MzgwLCJ3aXJlcyI6W1siOWE0NDQ2NTVjMDc2ZDVhNyJdLFsiODg3Mzc3NGFkMzM5YjY3ZSJdXX0seyJpZCI6IjlhNDQ0NjU1YzA3NmQ1YTciLCJ0eXBlIjoic3BsaXQiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibmFtZSI6IiIsInNwbHQiOiJcXG4iLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6MSwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjoxMDYwLCJ5IjozNDAsIndpcmVzIjpbWyJlMWZlMWIxYTRmMWVmMmU1Il1dfSx7ImlkIjoiZTFmZTFiMWE0ZjFlZjJlNSIsInR5cGUiOiJkZWxheSIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6IjA3YTNkNWI5MDc1ZmY4NDYiLCJuYW1lIjoiMTAgbXNnL3MiLCJwYXVzZVR5cGUiOiJyYXRlIiwidGltZW91dCI6IjUiLCJ0aW1lb3V0VW5pdHMiOiJzZWNvbmRzIiwicmF0ZSI6IjEwIiwibmJSYXRlVW5pdHMiOiIxIiwicmF0ZVVuaXRzIjoic2Vjb25kIiwicmFuZG9tRmlyc3QiOiIxIiwicmFuZG9tTGFzdCI6IjUiLCJyYW5kb21Vbml0cyI6InNlY29uZHMiLCJkcm9wIjpmYWxzZSwiYWxsb3dyYXRlIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTI4MCwieSI6MzQwLCJ3aXJlcyI6W1siMjM0YWVmOGE5OTljYjhkOSJdXX0seyJpZCI6ImI4M2Q1MTdmYWUzYzdiYmYiLCJ0eXBlIjoidGVtcGxhdGUiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibmFtZSI6Ikluc2VydCBkb3dudGltZSBkYXRhIHJlY29yZCIsImZpZWxkIjoidG9waWMiLCJmaWVsZFR5cGUiOiJtc2ciLCJmb3JtYXQiOiJoYW5kbGViYXJzIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IklOU0VSVCBJTlRPIERvd250aW1lRGF0YSAoIHRpbWVzdGFtcCwgYXJlYSwgbGluZSwgbWFjaGluZV9uYW1lLCBzaGlmdCwgXG4gICAgZG93bnRpbWVfc3RhcnQsIGRvd250aW1lX2VuZCwgZG93bnRpbWVfZHVyYXRpb25fbWludXRlcywgXG4gICAgZG93bnRpbWVfdHlwZSwgZG93bnRpbWVfcmVhc29uXG4pICBcblZBTFVFUyAoXG4gICAgJ3t7cGF5bG9hZC50aW1lc3RhbXB9fScsICBcbiAgICAne3twYXlsb2FkLmFyZWF9fScsIFxuICAgICd7e3BheWxvYWQubGluZX19JywgXG4gICAgJ3t7cGF5bG9hZC5tYWNoaW5lX25hbWV9fScsIFxuICAgICd7e3BheWxvYWQuc2hpZnR9fScsIFxuICAgICd7e3BheWxvYWQuZG93bnRpbWVfc3RhcnR9fScsXG4gICAgJ3t7cGF5bG9hZC5kb3dudGltZV9lbmR9fScsICBcbiAgICB7e3BheWxvYWQuZG93bnRpbWVfZHVyYXRpb25fbWludXRlc319LCAgXG4gICAgJ3t7cGF5bG9hZC5kb3dudGltZV90eXBlfX0nLCAgXG4gICAgJ3t7cGF5bG9hZC5kb3dudGltZV9yZWFzb259fScgIFxuKTtcbiIsIm91dHB1dCI6InN0ciIsIngiOjE1NTAsInkiOjQyMCwid2lyZXMiOltbIjJiZWI2OGFiYzVkYTkzYmMiXV19LHsiaWQiOiI1MGViYmJmYjE1OWEzY2JlIiwidHlwZSI6ImRlYnVnIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiMDdhM2Q1YjkwNzVmZjg0NiIsIm5hbWUiOiJkZWJ1ZyA4IiwiYWN0aXZlIjpmYWxzZSwidG9zaWRlYmFyIjp0cnVlLCJjb25zb2xlIjpmYWxzZSwidG9zdGF0dXMiOmZhbHNlLCJjb21wbGV0ZSI6ImZhbHNlIiwic3RhdHVzVmFsIjoiIiwic3RhdHVzVHlwZSI6ImF1dG8iLCJ4IjoxOTcwLCJ5Ijo0MjAsIndpcmVzIjpbXX0seyJpZCI6Ijg4NzM3NzRhZDMzOWI2N2UiLCJ0eXBlIjoic3BsaXQiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibmFtZSI6IiIsInNwbHQiOiJcXG4iLCJzcGx0VHlwZSI6InN0ciIsImFycmF5U3BsdCI6MSwiYXJyYXlTcGx0VHlwZSI6ImxlbiIsInN0cmVhbSI6ZmFsc2UsImFkZG5hbWUiOiIiLCJ4IjoxMDYwLCJ5Ijo0MjAsIndpcmVzIjpbWyI3N2UyMmIyMGQxODYyYzdlIl1dfSx7ImlkIjoiNzdlMjJiMjBkMTg2MmM3ZSIsInR5cGUiOiJkZWxheSIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6IjA3YTNkNWI5MDc1ZmY4NDYiLCJuYW1lIjoiMTAgbXNnL3MiLCJwYXVzZVR5cGUiOiJyYXRlIiwidGltZW91dCI6IjUiLCJ0aW1lb3V0VW5pdHMiOiJzZWNvbmRzIiwicmF0ZSI6IjEwIiwibmJSYXRlVW5pdHMiOiIxIiwicmF0ZVVuaXRzIjoic2Vjb25kIiwicmFuZG9tRmlyc3QiOiIxIiwicmFuZG9tTGFzdCI6IjUiLCJyYW5kb21Vbml0cyI6InNlY29uZHMiLCJkcm9wIjpmYWxzZSwiYWxsb3dyYXRlIjpmYWxzZSwib3V0cHV0cyI6MSwieCI6MTI4MCwieSI6NDIwLCJ3aXJlcyI6W1siYjgzZDUxN2ZhZTNjN2JiZiJdXX0seyJpZCI6IjY5YWZkNDllMmNlYjE5MWIiLCJ0eXBlIjoidGVtcGxhdGUiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiJjMDU1MGRiODdkNmZiOTQ3IiwibmFtZSI6IkRyb3AgZGVtbyBwcm9kdWN0aW9uIGRhdGEiLCJmaWVsZCI6InRvcGljIiwiZmllbGRUeXBlIjoibXNnIiwiZm9ybWF0Ijoic3FsIiwic3ludGF4IjoibXVzdGFjaGUiLCJ0ZW1wbGF0ZSI6IkRyb3AgdGFibGUgUHJvZHVjdGlvbkRhdGE7Iiwib3V0cHV0Ijoic3RyIiwieCI6NDgwLCJ5Ijo1MjAsIndpcmVzIjpbWyIzNmFlNjI3YWQ2OTRmYzA5Il1dfSx7ImlkIjoiODA4ZGI1NjEyYmExYWVkYyIsInR5cGUiOiJpbmplY3QiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiJjMDU1MGRiODdkNmZiOTQ3IiwibmFtZSI6IiIsInByb3BzIjpbeyJwIjoicGF5bG9hZCJ9LHsicCI6InRvcGljIiwidnQiOiJzdHIifV0sInJlcGVhdCI6IiIsImNyb250YWIiOiIiLCJvbmNlIjpmYWxzZSwib25jZURlbGF5IjowLjEsInRvcGljIjoiIiwicGF5bG9hZCI6IiIsInBheWxvYWRUeXBlIjoiZGF0ZSIsIngiOjE1MCwieSI6NTIwLCJ3aXJlcyI6W1siNjlhZmQ0OWUyY2ViMTkxYiJdXX0seyJpZCI6IjZkY2Q2OWFjZDU5OTA3OTMiLCJ0eXBlIjoiZGVidWciLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiJjMDU1MGRiODdkNmZiOTQ3IiwibmFtZSI6ImRlYnVnIDQiLCJhY3RpdmUiOmZhbHNlLCJ0b3NpZGViYXIiOnRydWUsImNvbnNvbGUiOmZhbHNlLCJ0b3N0YXR1cyI6ZmFsc2UsImNvbXBsZXRlIjoiZmFsc2UiLCJzdGF0dXNWYWwiOiIiLCJzdGF0dXNUeXBlIjoiYXV0byIsIngiOjExMjAsInkiOjUyMCwid2lyZXMiOltdfSx7ImlkIjoiODUzZmIzYTM5NWQ4MzNiYiIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIzZjIxMjZjM2MwMGI5ZTBkIiwibXlkYiI6IjFhZTZkN2Y3ZmRiNjAxOTEiLCJzcWxxdWVyeSI6Im1zZy50b3BpYyIsInNxbCI6IiIsIm5hbWUiOiIiLCJ4Ijo3MjAsInkiOjE0MCwid2lyZXMiOltbIjBmNDY2YmEyYTg4NWUyMmEiXV19LHsiaWQiOiJmODIyOWM2NTE3MDZiMTYyIiwidHlwZSI6InNxbGl0ZSIsInoiOiJmYTcxNDdlMDRkNGQ1ZWMzIiwiZyI6IjNmMjEyNmMzYzAwYjllMGQiLCJteWRiIjoiMWFlNmQ3ZjdmZGI2MDE5MSIsInNxbHF1ZXJ5IjoibXNnLnRvcGljIiwic3FsIjoiIiwibmFtZSI6IiIsIngiOjcyMCwieSI6MjQwLCJ3aXJlcyI6W1siODIyMjg1NWJjMzJlOTI0MCJdXX0seyJpZCI6ImFhN2JkODY3ZmE3ZGFjYTUiLCJ0eXBlIjoic3FsaXRlIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiMDdhM2Q1YjkwNzVmZjg0NiIsIm15ZGIiOiIxYWU2ZDdmN2ZkYjYwMTkxIiwic3FscXVlcnkiOiJtc2cudG9waWMiLCJzcWwiOiIiLCJuYW1lIjoiIiwieCI6MTc4MCwieSI6MzQwLCJ3aXJlcyI6W1siZDc2NDFjOTMyN2YyOTVmOCJdXX0seyJpZCI6ImIxZjc3M2Y0Y2MyMjY2YzYiLCJ0eXBlIjoic3FsaXRlIiwieiI6ImZhNzE0N2UwNGQ0ZDVlYzMiLCJnIjoiYzA1NTBkYjg3ZDZmYjk0NyIsIm15ZGIiOiIxYWU2ZDdmN2ZkYjYwMTkxIiwic3FscXVlcnkiOiJtc2cudG9waWMiLCJzcWwiOiIiLCJuYW1lIjoiIiwieCI6NzMwLCJ5Ijo1ODAsIndpcmVzIjpbWyI0NTYyOGZiMGNhMGE0NjcyIl1dfSx7ImlkIjoiMmJlYjY4YWJjNWRhOTNiYyIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiIwN2EzZDViOTA3NWZmODQ2IiwibXlkYiI6IjFhZTZkN2Y3ZmRiNjAxOTEiLCJzcWxxdWVyeSI6Im1zZy50b3BpYyIsInNxbCI6IiIsIm5hbWUiOiIiLCJ4IjoxNzgwLCJ5Ijo0MjAsIndpcmVzIjpbWyI1MGViYmJmYjE1OWEzY2JlIl1dfSx7ImlkIjoiMzZhZTYyN2FkNjk0ZmMwOSIsInR5cGUiOiJzcWxpdGUiLCJ6IjoiZmE3MTQ3ZTA0ZDRkNWVjMyIsImciOiJjMDU1MGRiODdkNmZiOTQ3IiwibXlkYiI6IjFhZTZkN2Y3ZmRiNjAxOTEiLCJzcWxxdWVyeSI6Im1zZy50b3BpYyIsInNxbCI6IiIsIm5hbWUiOiIiLCJ4Ijo3MzAsInkiOjUyMCwid2lyZXMiOltbIjZkY2Q2OWFjZDU5OTA3OTMiXV19LHsiaWQiOiIxYWU2ZDdmN2ZkYjYwMTkxIiwidHlwZSI6InNxbGl0ZWRiIiwiZGIiOiJzcWxsaXRlIiwibW9kZSI6IlJXQyJ9XQ=="
---
::



1. Import the provided flow for data generation.

2. Click the **Deploy** button to activate the flow.

3. On deployment, it will create two SQLite tables: `ProductionData` and `DowntimeData`.

4. Find the **Inject node** labeled *Click to generate and insert demo data*.

5. Click the inject node to trigger data generation.

The flow will generate data with the following fields:

![Demo Production and Downtime data object](/blog/2025/04/images/demo-data-props.png){data-zoomable}
_Demo Production and Downtime data object_

### Collecting and Configuring Data

Once the simulated data is generated and stored in SQLite, the next step is to create a flow for configuration settings. These settings will be used across the entire flow, allowing the flow to be reused by simply modifying the settings. The configured data will then be collected for use in the OEE dashboard.

#### Adding flow to configure settings:

1. Click on the **"+"** to create a new flow.

2. Name the newly created flow to **OEE Dashboard for Line-1**.

3. Drag a **Change node** onto the canvas, double-click it, and add the following elements:
   - Set `flow.line` to `"Line-1"`
   - Set `flow.shift_duration` to `12`
   - Set `flow.shiftDuration24h` to `24`

4. Drag an **Inject node**, set it to trigger on deploy by enabling **Inject once after X seconds** (set delay to `0.1` seconds).

5. Click **Deploy** to apply changes.

In this flow, we are configuring the production line based on the demo data, specifically for **Line-1**, as we are building the OEE dashboard for this line. The settings define the shift duration for the last **X** hours used in OEE calculations and the total shift duration within a **24-hour** period.

![Flow to set basic configuration settings that will be used across the OEE dashboard flow for calculations.](/blog/2025/04/images/configuration-flow.png){data-zoomable}
_Flow to set basic configuration settings that will be used across the OEE dashboard flow for calculations._

#### Retrieving Data from SQLite:

1. Drag an **Inject node** and configure it to trigger at regular intervals.

2. Drag a **Change node** and add following elements:
   - Set `msg.params` to `{}`
   - Set `msg.params.$startTime` to `$moment($millis() - ($number($flowContext('shift_duration')) * 60 * 60 * 1000)).format('YYYY-MM-DD HH:mm:ss')`
   - Set `msg.params.$endTime` to `$moment($millis()).format('YYYY-MM-DD HH:mm:ss')`
   - Set `msg.params.$line` to `flow.line`
  
3. Drag an **SQLite node** and insert the following query:
   ```sql
   SELECT timestamp, machine_name, area, line, total_produced_units, good_units, defect_units, target_output
   FROM ProductionData
   WHERE timestamp BETWEEN $startTime AND $endTime AND line = $line;
   ```

4. Drag a Change node onto the canvas and set the following element to store the retrived production data result as new property:
   - Set `msg.payload` to `msg.productionData`

5. Connect the Inject node’s output to the input of the Change node that sets parameters. Then, connect the Change node’s output to the input of the SQLite node that retrieves production data. Finally, connect the SQLite node’s output to the input of last change node we added.

6. Drag another **SQLite node** and insert the following query:
   ```sql
   SELECT timestamp, machine_name, downtime_start, downtime_duration_minutes, downtime_reason
   FROM DowntimeData
   WHERE timestamp BETWEEN $startTime AND $endTime AND line = $line;
   ```

7. Drag a Change node onto the canvas and set the following element to store the retrived production data result as new property:
   - Set `msg.payload` to `msg.downtimeData`

8. Connect the SQLite node’s output to the input of last change node we added.

9.  Now, drag the Link Out node onto the canvas and connect it to the last Change node.

![Flow that retrives the data from the sqlite table](/blog/2025/04/images/sqlite-flow.png){data-zoomable}
_Flow that retrives the data from the sqlite table_

### Preparing Data for OEE Calculations

Now that we have a flow to retrieve production and downtime data, we can calculate key OEE metrics. The total number of good units, defective units, total produced units, target output, and downtime duration are summed across all production lines. Using these values, we can calculate availability, performance, and quality for the entire production system, which can then be used to calculate OEE.

1. Drag the **link in node** onto the canvas and connect it to the **link out node**.

2. Drag two **Change nodes** onto the canvas and connect them to the **Link In** node.
   - In the first Change node, set `msg.payload` to `production_data`.
   - In the second Change node, set `msg.payload` to `downtime_data`.

3. Drag a **Split node** onto the canvas and connect it to the first **Change node**, the one setting `production_data`. Configure the **Split node** so that `msg.payload` is assigned to `production_data`.

4. Drag three **Join nodes** onto the canvas and connect them to the **Split node** to sum individual data points. Configure each **Join node** with the following settings:
     - Mode: Reduce Sequence
     - Initial Value: 0
     - Fix-up Expression: `$A`
  
5. Set the reduce expressions as follows:
   - First Join Node: `$A + msg.payload.total_produced_units`
   - Second Join Node: `$A + msg.payload.good_units`
   - Third Join Node: `$A + msg.payload.target_output`

6. Drag three **Change nodes** onto the canvas and connect each to a **Join node**.
7. Configure these **Change nodes** to store the summed values using the following variables to flow context:
      - `total_produced_units`
      - `total_good_units`
      - `total_target_output`
  
8. Drag a **Switch node** onto the canvas and connect it to the **Change node** that sets the retrieved downtime data to `msg.payload`, for switch node set the Property to `msg.payload` and add the following conditions:
    -  is not empty.
    -  Otherwise.

9.  Drag a **Split node** onto the canvas and connect it to the first output of the **Switch node**.

10. Drag a **Join node** onto the canvas and connect it to the **Split node**.

11. Configure the **Join node** with the following settings:
    - Mode: Reduce Sequence
    - Initial Value: 0
    - Fix-up Expression: `$A`
    - Reduce Expression: `$A + payload.downtime_duration_minutes`

12. Drag a **Change node** onto the canvas and connect it to the **Join node**, Configure this **Change node** to store the total downtime duration in the flow context with following element:
    - Set `flow.total_downtime` to `msg.payload`

13. Drag another Change node onto the canvas and connect it to the second output of the Switch node, Set this Change node to store 0 in the flow context for total_downtime with following element:
   - Set `flow.total_downtime` to 0

14. Drag a **Link Out** node onto the canvas and connect it to any of the Change nodes that store the summed metrics in the flow context.

![Flow to prepare the data necessary to calculate OEE and all its three components.](/blog/2025/04/images/preparing-data-flow.png){data-zoomable}
_Flow to prepare the data necessary to calculate OEE and all its three components._

### Calculating OEE and Key Metrics

Now that we have all the necessary pieces, we can calculate the key metrics for OEE: Availability, Performance, and Quality and later OEE.

1. Drag a **Link In node**.

2. Drag a **Change node** and add element as following:
   - Set `msg.quality` to `($flowContext('total_good_units') / $flowContext('total_produced_units')) * 100` as JSONata expression.
   - Set `msg.availability` to `(($flowContext('shift_duration') - $flowContext('total_downtime')) / $flowContext('shift_duration')) * 100` as JSONata expression.
   - Set `msg.performance` to `($flowContext('total_produced_units') / $flowContext('target_output')) * 100` as JSONata expression.
   - Set `msg.oee` to `$round(((msg.availability / 100) * (msg.performance / 100) * (msg.quality / 100)) * 100, 2)` as JSONata expression.
   - Set `msg.quality`to `$round(msg.quality, 2)`
   - Set `msg.availability` to `$round(msg.availability, 2)`
   - Set `msg.performance` to `$round(msg.performance, 2)`
   - Set `msg.productionData` to JSONata expression:
   ```json
   [
   {
       "reason": "Total Good Units Produced",
       "units": $flowContext("total_good_units")
     },
     {
       "series": "Total Defective Units Produced",
       "units": $number($flowContext("total_produced_units")) - $number($flowContext("total_good_units"))
     }
   ]
   ```
3. Drag a **Link Out node** and connect it to the **Change node**.

4. Drag a separate **Link In** node for visualization and keep it in a separate flow. This will be the **Link In** node where all the calculated final data for visualization will be stored.

5. Connect **link out** node to this **link in** node.

![Flow that calculates availability, quality, performance, and OEE, and also prepares production data for visualization.](/blog/2025/04/images/calculate-oee-and-key-metrics.png){data-zoomable}
_Flow that calculates availability, quality, performance, and OEE, and also prepares production data for visualization._

### Detailed Breakdown of OEE Data

We have calculated the OEE and other key metrics. However, as discussed in the planning section of our previous article, we will also visualize recent downtime events, a downtime summary, the top underperforming machines (OEE-wise), and the OEE trend over the last 30 days on the dashboard.

Let’s do that.

1. Drag the **link in node** onto the canvas and connect it to the **link out node** that is part of the SQLite flow, which is also connected to the change node that sets the retrieved downtime result to `msg.payload`.

2. Drag a **change node** onto the canvas and set the following element: `Set msg.downtime_data to msg.payload`.

#### Downtime Summary

1. Drag a **function node** onto the canvas and add the following JavaScript to calculate the downtime summary:

```javascript
function calculateDowntimeByReason(downtimeData) {
   if (!Array.isArray(downtimeData) || downtimeData.length === 0) {
       return []; f
   }
   const summary = {};
   downtimeData.forEach(({ downtime_reason, downtime_duration_minutes }) => {
       summary[downtime_reason] = (summary[downtime_reason] || 0) + downtime_duration_minutes;
   });
   return Object.entries(summary).map(([reason, duration]) => ({
       downtime_reason: reason,
       downtime_duration_minutes: duration
   }));
}
msg.payload = calculateDowntimeByReason(msg.payload) || [];
return msg;
```

2. Drag a **change node** onto the canvas and set: 
   - Set `msg.payload` to `msg.downtimeSummary`.

3. Drag a **link out** node and connect it to the change node that sets `msg.downtime_data` to `msg.payload`.

4. Connect this **link out node** to the **link in node** that we added earlier to receive all the calculated metrics for visualization.

#### Recent Downtime

1. Drag a **Switch** node onto the canvas and set the property to **msg.payload**. Add the following condition:  
   - **is not empty**  
   - **otherwise**  

2. Drag a **Split** node onto the canvas and connect it to the **first output** of the **Switch** node.  

3. Drag a **Sort** node onto the canvas and connect it to the **Split** node. Set the sort to **"message sequence"**, key to **`msg.payload.downtime_start`**, and order to **"descending."** This will sort the downtime data from **most recent to oldest** based on its start time.  

4. Drag a **Join** node onto the canvas and set the mode to **automatic**, then connect it to the **Sort** node.  

5. Drag a **Change** node onto the canvas and set the following element:  
   - **Set `msg.recentDowntime` to `payload^(10)` as a JSONata expression.**  

6. Connect the **Change** node to the **Link Out** node that was added before.

#### Top Underperforming Machines

1. Drag a **Function** node onto the canvas and connect it to the **Link In** node that is receiving the **SQLite result**.  

2. Add the following **JavaScript** code to the **Function** node:  

```javascript
const productionData = msg.production_data;
const downtimeEvents = msg.downtime_data;
const shiftDuration = (flow.get('shift_duration') || 1) * 60; // Convert hours to minutes

// Group production data by machine (including area)
let machineData = {};
productionData.forEach(data => {
    if (!machineData[data.machine_name]) {
        machineData[data.machine_name] = {
            total_produced_units: 0,
            good_units: 0,
            target_output: 0,
            count: 0,
            area: data.area // Store area
        };
    }
    machineData[data.machine_name].total_produced_units += data.total_produced_units;
    machineData[data.machine_name].good_units += data.good_units;
    machineData[data.machine_name].target_output += data.target_output;
    machineData[data.machine_name].count += 1;
});

let oeeResults = Object.keys(machineData).map(machineName => {
    let data = machineData[machineName];

    let machineDowntime = downtimeEvents.filter(event => event.machine_name === machineName);

    function calculateOEE(data, downtime) {
        if (data.target_output === 0) {
            return { availability: 0, performance: 0, quality: 0, oee: 0 };
        }

        let totalDowntime = downtime.reduce((acc, event) =>
            typeof event.downtime_duration_minutes === 'number' ? acc + event.downtime_duration_minutes : acc
            , 0);

        let availability = (shiftDuration - totalDowntime) / shiftDuration;
        availability = Math.max(0, Math.min(1, availability));

        let performance = data.target_output > 0 ? data.total_produced_units / data.target_output : 0;
        let quality = data.total_produced_units > 0 ? data.good_units / data.total_produced_units : 0;

        let oee = availability * performance * quality;

        return {
            availability: parseFloat((availability * 100).toFixed(2)),
            performance: parseFloat((performance * 100).toFixed(2)),
            quality: parseFloat((quality * 100).toFixed(2)),
            oee: parseFloat((oee * 100).toFixed(2))
        };
    }

    let metrics = calculateOEE(data, machineDowntime);

    return {
        machine_name: machineName,
        area: data.area,
        oee: metrics.oee
    };
});

// Filter only machines with OEE < 85
msg.payload = oeeResults.filter(machine => machine.oee < 85);

return msg;
```

![Flow that prepares the Recent Downtime, Downtime Summary, and Top Underperforming Machines (OEE-wise)
](/blog/2025/04/images/downtime-events-summery-oee-machine-wise.png){data-zoomable}
_Flow that prepares the Recent Downtime, Downtime Summary, and Top Underperforming Machines (OEE-wise)_

#### OEE Trend for the Last 30 Days

Now, to calculate the OEE for the last 30 days, we need the complete production and downtime data for that period. However, the current SQLite flow retrieves only the last 12 hours. Therefore, we need another SQLite flow to retrieve data from the last 30 days.

##### Retrieving Production and Downtime Data for the Last 30 Days

1. Copy the existing **SQLite flow** from the **Inject node** to the **Change node** that sets the retrieved downtime result to `msg.payload`.
  
2. Click on the **Change node** that sets the parameters for the SQL query, keep only the element setting the line parameter, and remove the rest.  

3. Modify the first SQLite node's SQL query to the following: 

```sql
SELECT
    timestamp AS timestamp,
    machine_name AS machine_name,
    area AS area,
    line AS line,
    total_produced_units AS total_produced_units,
    good_units AS good_units,
    defect_units AS defect_units,
    target_output AS target_output
FROM ProductionData
WHERE line = $line
  AND timestamp >= datetime('now', '-30 days');
```

4. Modify the second SQLite node's SQL query to the following:  

```sql
SELECT
    timestamp AS timestamp,
    machine_name AS machine_name,
    downtime_start AS downtime_start,
    downtime_duration_minutes AS downtime_duration_minutes,
    downtime_reason AS downtime_reason
FROM DowntimeData
WHERE
    timestamp BETWEEN $startTime AND $endTime
    AND line = $line;
```

##### Calculating last 30d days OEE

1. Drag the **Link Out node** onto the canvas and connect it to the last **Change node** of the SQLite flow.  

2. Drag the **Link In node** onto the canvas and connect it to the last **Link Out node**.
  
3. Drag the **Function node** onto the canvas, add the following JavaScript, and connect the Function node to the **Link In node**: 
 
```javascript
let productionData = msg.production_data;
let downtimeData = msg.downtime_data;
let line = flow.get('line');
let shiftDuration = flow.get('shiftDuration24h') * 3600;

let groupedData = {};

productionData.forEach(entry => {
    if (entry.line === line) {
        let date = entry.timestamp.split(" ")[0];

        if (!groupedData[date]) {
            groupedData[date] = {
                totalShiftDuration: shiftDuration,
                totalGoodUnits: 0,
                totalProducedUnits: 0,
                totalDowntimeSeconds: 0,
                totalCycleTime: 0,
                cycleCount: 0,
                totalTargetOutput: 0,
                timestamp: entry.timestamp
            };
        }

        groupedData[date].totalGoodUnits += entry.good_units;
        groupedData[date].totalProducedUnits += entry.total_produced_units;
        groupedData[date].totalCycleTime += entry.cycle_time;
        groupedData[date].cycleCount++;
        groupedData[date].totalTargetOutput += entry.target_output;
    }
});

downtimeData.forEach(downtime => {
    if (downtime.line === line) {
        let date = downtime.timestamp.split(" ")[0];
        if (groupedData[date]) {
            groupedData[date].totalDowntimeSeconds += downtime.downtime_duration_minutes * 60;
        }
    }
});

let oeeResults = Object.entries(groupedData).map(([date, data]) => {
    let avgCycleTime = data.cycleCount > 0 ? data.totalCycleTime / data.cycleCount : 0;
    let availableTime = data.totalShiftDuration - data.totalDowntimeSeconds;
    let availability = availableTime / data.totalShiftDuration;
    let performance = data.totalTargetOutput > 0 ? data.totalProducedUnits / data.totalTargetOutput : 0;
    let quality = data.totalProducedUnits > 0 ? data.totalGoodUnits / data.totalProducedUnits : 0;
    let oee = (availability * performance * quality * 100).toFixed(2);

    return { date, availability, performance, quality, oee, timestamp: data.timestamp };
});

// Sort data by timestamp (oldest to most recent)
oeeResults.sort((a, b) => new Date(a.timestamp).valueOf() - new Date(b.timestamp).valueOf());
msg.payload = oeeResults;
return msg;
```

4. Drag the **Change node** onto the canvas and set `msg.payload` to `msg.oeeTrend`.

5. Drag the **Link Out node** onto the canvas and connect it to the **Change node**. 

6. Connect this **Link Out node** to the **Link In node** that was added earlier to receive all the calculated metrics for visualization.

![Flows that calculate the OEE for each day over the last 30 days](/blog/2025/04/images/oee-trend.png){data-zoomable}
_Flows that calculate the OEE for each day over the last 30 days._

### Building the OEE Dashboard  

Now that the key OEE metrics have been calculated and detailed insights into production performance have been gathered, it is time to bring everything together in a visually intuitive and interactive dashboard. The OEE dashboard will provide real-time visibility into availability, performance, and quality while also displaying recent downtime events, downtime summaries, underperforming machines, and historical OEE trends.  

Using FlowFuse Dashboard (Node-RED Dashboard 2.0), a clean and efficient interface will be designed, allowing operators and decision-makers to monitor production efficiency at a glance.  

1. Drag a Switch node onto the canvas, set the property to `msg.oee`, and add the condition:  
   - "Is not null".  

2. Connect it to the Link-In node that receives calculated metrics.  

3. Drag a Change node, set `msg.oee` to `msg.payload`, and connect it to a Gauge widget.  
   - Create a new Group on a new page named **Line-1**.  
   - Set the page layout to **Grid**, adjust the range from **0 to 100**, and label the gauge **OEE**.  
   - Choose **Half Gauge** as the type, set the style to **Rounded**, and adjust the width and height to **6** and **3** for both the group and the widget.  

4. Repeat these steps for `msg.quality`, `msg.availability`, and `msg.performance`, ensuring each has a separate Group with the correct label.  

5. Drag a Switch node for `msg.productionData` and connect it to a Change node setting `msg.productionData` to `msg.payload`:  
   - "Is not null".  

6. Repeat this step for `msg.downtimeSummary`, `msg.recentDowntime`, `msg.topUnderPerformingMachines`, and `msg.oeeTrend`, ensuring each has a separate Switch node and Change node.  

7. Drag a Bar Chart widget, create a new Group, set the width to **6** and height to **8** for both the group and widget, label it **Production Data**, group data by **Stacks**, and map **X to series** and **Y to units**. Connect it to the node setting `msg.productionData`.  

8. Duplicate the chart for **Downtime Summary**, mapping **X to downtime_reason** and **Y to downtime_duration_minutes**, and connect it to the node setting `msg.downtimeSummary` to `msg.payload`.  

9. Drag a Table widget, create a new Group, set width **6** and height **2** for both the group and widget, label it **Recent Downtime Events**, set max rows to **5**, and add columns with keys:  
   - `machine_name`  
   - `downtime_start`  
   - `downtime_duration_minutes`  
   - `downtime_reason`  

10. Connect it to the node setting `msg.recent_downtime` to `msg.payload`.  

11. Duplicate the table for **Top Underperforming Machines**, adding columns with keys:  
    - `machine_name`  
    - `area`  
    - `oee`  

12. Connect it to `msg.topUnderPerformingMachines`.  

13. Drag a Line Chart widget, create a new Group, set width **12** and height **5** for both the group and widget, label it **Daily OEE Trend Over 24 Hours**, set X-axis to **Timescale**, format **Y-l-d**, and map **X to `date`** and **Y to `oee`**. Connect it to the Change node setting `msg.oeeTrend` to `msg.payload`.  

14. Click **Deploy**.
15. Open the dashboard by clicking the Dashboard 2.0 button located at the top-right corner of the Dashboard 2.0 sidebar.

![OEE Dashboard UI flow](/blog/2025/04/images/oee-dashboard.png){data-zoomable}
_OEE Dashboard UI flow_

Your OEE dashboard is now set up and ready to use. It will visualize key metrics, including OEE, quality, availability, performance, production data, downtime events, and machine performance trends.  

![OEE Dashboard results without proper theming and styling](/blog/2025/04/images/oee-dashboard-without-style.png){data-zoomable}
_OEE Dashboard results without proper theming and styling._

![OEE Dashboard results without proper theming and styling](/blog/2025/04/images/oee-dashboard-without-style-2.png){data-zoomable}
_OEE Dashboard results without proper theming and styling_

However, the dashboard may not yet look exactly as it did in the previous design or intended layout. Some components may not align correctly with adjacent components in terms of width and height. Additionally, on different screens, you may notice layout inconsistencies, and the top header elements, such as the OEE Dashboard title and logo is missing.  

Do not worry—in the next part of this series, we will style the dashboard to match the original design. Later, we will demonstrate how to connect it to a real data source, scale it across your production lines, and explain how you can use this dashboard to improve production efficiency.

## What Next?

Part 3 of this series will follow soon. In the meantime, if you’re excited to quickly launch your OEE dashboard in your factory environment, don’t delay! [Register for a FlowFuse account](https://app.flowfuse.com/account/create) now and initiate your journey with our new effective, ready-made [OEE Dashboard Blueprint](/blueprints/manufacturing/oee-dashboard/).
