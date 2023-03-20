---
meta:
  title: Front-End Services
---

## Services
The frontend contains two helper services that can be called anywhere in the UI. Each of the services control components built into the main `Platform.vue`.

<video width="500" controls>
  <source src="../../videos/ui-services-demo.mp4" type="video/mp4">
</video>
Here we see an example of a `Dialog` being used to confirmed deletion of a snapshot, followed by confirmation of the deletion via an `Alert`.

### Alerts
Alerts should be used to reinforce the completion of an action, or to alert a user that something has gone wrong.

The important piece to note here is that alerts should be for ***information only***, and should not require any actions on the user's part.

```js
import Alert from '@/services/alerts'

/*
 * msg       - The text to be displayed in the alert.
 * type      - 'info' | 'confirmation' | 'warning'
 * countdown - (optional) If provided, the alert will disappear
 *             after this duration (ms), defaults to 3000.
 */
Alert.emit(msg, type, countdown)
```

The service is built from the [ff-notification-toast](https://flowforge.github.io/forge-ui-components/#ff-notification-toast) forge-ui-component.

### Dialog
The Dialog service should be used when user confirmation is required, after an action has been taken. For example, if a user attempts to delete a resource, a confirmation Dialog should be shown to ensure this was not an accidental action.

```js
import Dialog from '@/services/dialog'

/*
 * msg      - {
 *               header: '<header title>',
 *               kind: 'danger` | `primary` | `secondary` | `tertiary',  (default = 'primary') 
 *               text: 'show this message in the dialog',
 *               html: 'instead of "text", you can provide html for more custom appearance and content',
 *               confirmLabel: '<confirm-label>'
 *            }
 * callback - function to run when the user confirms the dialog
 */
Dialog.show(msg, callback)
```

The service is built from the [ff-dialog](https://flowforge.github.io/forge-ui-components/#ff-dialog) forge-ui-component.

More complex `ff-dialog` instances, where you can use the component directly, can also be used for forms.