---
title: Custom Vuetify components for Dashboard 2.0
navTitle: Custom Vuetify components for Dashboard 2.0
---

Vuetify is a library of UI components using Vue. This saves the developers of
Dashboard 2.0 a lot of time, but it can also help you, the end-user. As Vuetify
is now included, it can be used to include _any_ of their components. So in this
post we're going to use a few of these to teach you how to use any of them.

<!--more-->

Let's install the [Dashboard 2.0 package](https://dashboard.flowfuse.com/getting-started.html) if you want to follow along. When that's done, let's figure
out how to build custom components on dashboards.

## Custom components

While going through the list of components on [Vuetify](https://vuetifyjs.com/en/components/)
there's several examples that aren't natively implemented in Dashboard 2.0.
One example we'll use in a dashboard in this post is the
[Progress circular](https://vuetifyjs.com/en/components/progress-circular/) to
build a count down timer.

The documentation explains which elements one can change, in this case the size and
width. Having set those to the values you'd want in your dashboard, the HTML is
generated for you, in my case it's:

```html
<v-progress-circular model-value="20" :size="128" :width="12"></v-progress-circular>
```

### Using the template node

Like the [template core node](/node-red/core-nodes/template), the dashboard package
comes with [a template node of its own](https://dashboard.flowfuse.com/nodes/widgets/ui-template.html).
If we take the HTML from the Vuetify docs pages and copy it in a template node
the spinner will show up on the dashboard.

!["Custom widget on Dashboard 2.0"](/blog/2023/10/images/custom-element-dashboard.png "Custom widget on Dashboard 2.0")

## Dynamic templates

While a custom element on a page is cool, and shows you can inject arbitrary HTML
on a Dashboard, it's even better if we could make the element dynamic. So let's
start with a first dynamic element. The quickest way to get that done is have
an [`Inject`](/node-red/core-nodes/inject) node output a random number every second.

So let's hook up an Inject, with `msg.payload`'s output being a JSONata expression 
`$round($random() * 100)` to generate a random number. And let's make sure it
sends a message every second.

Then we need to update the template node to the following snippet:

```html
<v-progress-circular v-model="msg.payload" :size="128" :width="12"></v-progress-circular>
```

The difference is subtle, but important. Instead of hard-coding the `model-value`
to 20, the tag has changed name and it's set to `msg.payload`. The latter makes
the value dynamic.

Changing `model-value` to `v-model` is due to leaking implementation details of
Dashboard 2.0. It uses VueJS to provide, among other features, easy updating of
components. If components are dynamic, _always use `v-model`_. This allows VueJS
to pick up changes made dynamically.

!["Progress spinner, random values"](/blog/2023/10/images/random-progress-element.gif "Progress spinner, random values")


### Finishing the count down timer

This is mostly a programmers job, but it's not hard, so let's get to it. A button
would be great to reset the timer, and for the sake of this post we can hardcode
the deadline to 1m from the button press.

When dragging in a button node, connect it to a [change](/node-red/core-nodes/change)
node. In the change node set the flow variable `flow.deadline` to the timestamp. The
Inject node from earlier needs updating to inject the `flow.deadline`. All that's
left is calculating how many seconds passed, and normalizing 60 seconds to the
range between 0-100.

The complete flow is:



::render-flow
---
height: 200
flow: "W3siaWQiOiJjZTliYjhmNzRlM2ZjOTM0IiwidHlwZSI6InVpLXRlbXBsYXRlIiwieiI6IjI0MDY1YTBhYWRiMzA1ZTMiLCJncm91cCI6IjhmYTc3MmE3MDlhZTMzMTYiLCJkYXNoYm9hcmQiOiJlNWEzZjRjZGIxMWU1ZTNiIiwicGFnZSI6IjViZWRmN2Y0OWQ1YTYwMzciLCJuYW1lIjoiUHJvZ3Jlc3Mgc3Bpbm5lciIsIm9yZGVyIjowLCJ3aWR0aCI6MCwiaGVpZ2h0IjowLCJmb3JtYXQiOiI8di1wcm9ncmVzcy1jaXJjdWxhciB2LW1vZGVsPVwibXNnLnBheWxvYWRcIiA6c2l6ZT1cIjEyOFwiIDp3aWR0aD1cIjEyXCI+PC92LXByb2dyZXNzLWNpcmN1bGFyPlxuIiwic3RvcmVPdXRNZXNzYWdlcyI6dHJ1ZSwiZndkSW5NZXNzYWdlcyI6dHJ1ZSwicmVzZW5kT25SZWZyZXNoIjp0cnVlLCJ0ZW1wbGF0ZVNjb3BlIjoibG9jYWwiLCJjbGFzc05hbWUiOiIiLCJ4Ijo4MTAsInkiOjgwLCJ3aXJlcyI6W1tdXX0seyJpZCI6IjhmM2U2NjMxNDE0YWEwOTYiLCJ0eXBlIjoiaW5qZWN0IiwieiI6IjI0MDY1YTBhYWRiMzA1ZTMiLCJuYW1lIjoiSW5qZWN0IGRlYWRsaW5lIiwicHJvcHMiOlt7InAiOiJwYXlsb2FkIn1dLCJyZXBlYXQiOiIxIiwiY3JvbnRhYiI6IiIsIm9uY2UiOnRydWUsIm9uY2VEZWxheSI6MC4xLCJ0b3BpYyI6IiIsInBheWxvYWQiOiJkZWFkbGluZSIsInBheWxvYWRUeXBlIjoiZmxvdyIsIngiOjE0MCwieSI6ODAsIndpcmVzIjpbWyIyOTNjZDZmOWQ3MjdmYTAyIl1dfSx7ImlkIjoiYmQ5MDMyNzE5ZDI0YTUzZCIsInR5cGUiOiJ1aS1idXR0b24iLCJ6IjoiMjQwNjVhMGFhZGIzMDVlMyIsImdyb3VwIjoiOGZhNzcyYTcwOWFlMzMxNiIsIm5hbWUiOiIiLCJsYWJlbCI6IlJlc2V0Iiwib3JkZXIiOjAsIndpZHRoIjowLCJoZWlnaHQiOjAsInBhc3N0aHJ1IjpmYWxzZSwidG9vbHRpcCI6IiIsImNvbG9yIjoiIiwiYmdjb2xvciI6IiIsImNsYXNzTmFtZSI6IiIsImljb24iOiIiLCJwYXlsb2FkIjoiIiwicGF5bG9hZFR5cGUiOiJkYXRlIiwidG9waWMiOiJkZWFkbGluZSIsInRvcGljVHlwZSI6Im1zZyIsIngiOjE3MCwieSI6MTQwLCJ3aXJlcyI6W1siNjFlZjgzZDhiMDZmZjYyNiJdXX0seyJpZCI6IjYxZWY4M2Q4YjA2ZmY2MjYiLCJ0eXBlIjoiY2hhbmdlIiwieiI6IjI0MDY1YTBhYWRiMzA1ZTMiLCJuYW1lIjoiIiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoiZGVhZGxpbmUiLCJwdCI6ImZsb3ciLCJ0byI6IiIsInRvdCI6ImRhdGUifV0sImFjdGlvbiI6IiIsInByb3BlcnR5IjoiIiwiZnJvbSI6IiIsInRvIjoiIiwicmVnIjpmYWxzZSwieCI6MzUwLCJ5IjoxNDAsIndpcmVzIjpbW11dfSx7ImlkIjoiMjkzY2Q2ZjlkNzI3ZmEwMiIsInR5cGUiOiJjaGFuZ2UiLCJ6IjoiMjQwNjVhMGFhZGIzMDVlMyIsIm5hbWUiOiJTZWNzIHNpbmNlIHJlc2V0IiwicnVsZXMiOlt7InQiOiJzZXQiLCJwIjoicGF5bG9hZCIsInB0IjoibXNnIiwidG8iOiIoJG1pbGxpcygpIC0gbXNnLnBheWxvYWQpLzEwMDAiLCJ0b3QiOiJqc29uYXRhIn1dLCJhY3Rpb24iOiIiLCJwcm9wZXJ0eSI6IiIsImZyb20iOiIiLCJ0byI6IiIsInJlZyI6ZmFsc2UsIngiOjM0MCwieSI6ODAsIndpcmVzIjpbWyI5NzQyZGE3ZTc0ZmQzY2QyIl1dfSx7ImlkIjoiOTc0MmRhN2U3NGZkM2NkMiIsInR5cGUiOiJyYW5nZSIsInoiOiIyNDA2NWEwYWFkYjMwNWUzIiwibWluaW4iOiIwIiwibWF4aW4iOiI2MCIsIm1pbm91dCI6IjAiLCJtYXhvdXQiOiIxMDAiLCJhY3Rpb24iOiJjbGFtcCIsInJvdW5kIjpmYWxzZSwicHJvcGVydHkiOiJwYXlsb2FkIiwibmFtZSI6IlNlY29uZHMgdG8gcGVyY2VudGFnZXMiLCJ4Ijo1NzAsInkiOjgwLCJ3aXJlcyI6W1siY2U5YmI4Zjc0ZTNmYzkzNCJdXX0seyJpZCI6IjhmYTc3MmE3MDlhZTMzMTYiLCJ0eXBlIjoidWktZ3JvdXAiLCJuYW1lIjoiR3JvdXAgTmFtZSIsInBhZ2UiOiI1YmVkZjdmNDlkNWE2MDM3Iiwid2lkdGgiOiI2IiwiaGVpZ2h0IjoiMSIsIm9yZGVyIjoiIiwiZGlzcCI6dHJ1ZX0seyJpZCI6ImU1YTNmNGNkYjExZTVlM2IiLCJ0eXBlIjoidWktYmFzZSIsIm5hbWUiOiJVSSBOYW1lIiwicGF0aCI6Ii9kYXNoYm9hcmQifSx7ImlkIjoiNWJlZGY3ZjQ5ZDVhNjAzNyIsInR5cGUiOiJ1aS1wYWdlIiwibmFtZSI6IlBhZ2UgTmFtZSIsInVpIjoiZTVhM2Y0Y2RiMTFlNWUzYiIsInBhdGgiOiIvIiwibGF5b3V0IjoiZ3JpZCIsInRoZW1lIjoiODI0MGZiZTdjMDliYzgxYyJ9LHsiaWQiOiI4MjQwZmJlN2MwOWJjODFjIiwidHlwZSI6InVpLXRoZW1lIiwibmFtZSI6IlRoZW1lIE5hbWUiLCJjb2xvcnMiOnsic3VyZmFjZSI6IiNmZmZmZmYiLCJwcmltYXJ5IjoiIzAwOTRjZSIsImJnUGFnZSI6IiNlZWVlZWUiLCJncm91cEJnIjoiI2ZmZmZmZiIsImdyb3VwT3V0bGluZSI6IiNjY2NjY2MifX1d"
---
::



