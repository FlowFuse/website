---
eleventyNavigation:
  key: Keyboard Shortcuts
  order: 3
meta:
   title: Node-RED Keyboard Shortcuts
   description: A comprehensive list of keyboard shortcuts for Node-RED to enhance productivity and streamline workflow.
   keywords: node-red, node-red keyboard shortcuts
---

# Node-RED Keyboard Shortcuts

Using keyboard shortcuts in Node-RED helps you work faster by making it easier to navigate, edit, and manage your flows. Below is a list of Node-RED keyboard shortcuts:

### General Shortcuts

- **Ctrl + e / ⌘ + e**: Open the export dialog.
- **Ctrl + i / ⌘ + i**: Open the import dialog.
- **Ctrl + z / ⌘ + z**: Undo the last action.
- **Ctrl + y / ⌘ + y**: Redo the last undone action.
- **Ctrl + d / ⌘ + d**: Deploy flow.
- **Ctrl + Space / ⌘ + Space**: Open/Close sidebar.
- **Ctrl + p / ⌘ + p**: Open/Close node palette.
- **Ctrl + Shift + p / ⌘ + Shift + p**: Show action list.
- **Ctrl + Shift + l / ⌘ + Shift + l**: Show event log.
- **Alt + Shift + p / ⌥ + Shift + p**: Open Manage palette.
- **Shift + , / ⇧ + ,**: Open keyboard shortcuts settings.
- **Ctrl + Alt + r / ⌘ + ⌥ + r**: Show remote difference/Review changes.
- **Ctrl + g, then c / ⌘ + g, then c**: Open configuration nodes tab in the sidebar.
- **Ctrl + g, then i / ⌘ + g, then i**: Open information tab in the sidebar.
- **Ctrl + g, then h / ⌘ + g, then h**: Open help tab in the sidebar.
- **Ctrl + g, then d / ⌘ + g, then d**: Open debug panel in the sidebar.
- **Alt + Alt + l / ⌥ + ⌥ + l**: Clear the debug panel.
- **Ctrl + Enter / ⌘ + Enter**: Confirm edit tray.
- **Ctrl + Escape / ⌘ + Escape**: Cancel edit tray.

### Workspace

- **Ctrl + + / ⌘ + +**: Zoom in.
- **Ctrl + - / ⌘ + -**: Zoom out.
- **Ctrl + 0 / ⌘ + 0**: Reset zoom to 100%.
- **Ctrl + , / ⌘ + ,**: Customize view in user settings.
- **Shift + ↑ / ⇧ + ↑**: Move the view up by 10 grid spaces.
- **Shift + ↓ / ⇧ + ↓**: Move the view down by 10 grid spaces.
- **Shift + ← / ⇧ + ←**: Move the view left by 10 grid spaces.
- **Shift + → / ⇧ + →**: Move the view right by 10 grid spaces.
- **Ctrl + ↑  / ⌘ + ↑**: Scroll the workspace up.
- **Ctrl + ↓  / ⌘ + ↓**: Scroll the workspace down.
- **Ctrl + ←  / ⌘ + ←**: Scroll the workspace to the left.
- **Ctrl + →  / ⌘ + →**: Scroll the workspace to the right.

### Flow Tab

- **Alt + w / ⌥ + w**: Hide current flow.
- **Alt + Shift + w / ⌥ + ⇧ + w**: Show/reopen last hidden flow.
- **Alt + Shift + f / ⌥ + ⇧ + f**: Show list of flows to switch between.
- **Ctrl + [ / ⌘ + [**: Open previous flow tab.
- **Ctrl + ] / ⌘ + ]**: Open next flow tab.
- **Ctrl + Shift + → / ⌘ + Shift + →**: Go to next location.
- **Ctrl + Shift + ← / ⌘ + Shift + ←**: Go to previous location.

### Group

- **Ctrl + Shift + c / ⌘ + Shift + c**: Copy selected group style.
- **Ctrl + Shift + v / ⌘ + Shift + v**: Paste/apply copied group style to selected group.
- **Ctrl + Shift + g / ⌘ + Shift + g**: Add selected group(s) or node(s) to a new group.
- **Ctrl + Shift + u / ⌘ + Shift + u**: Ungroup group(s) or node(s) from the group.

### Node

- **Ctrl + Delete / ⌘ + Delete**: Delete selected node and reconnect previous and next connected nodes.
- **Enter / ⏎**: Open properties dialog of selected node.
- **Ctrl + f / ⌘ + f**: Search nodes within the flow.

### Wire

- **Alt + l, then l / ⌥ + l, then l**: Split selected wire(s) with link nodes.

### Selection

- **Ctrl + c / ⌘ + c**: Copy selection (node, group) to internal clipboard.
- **Ctrl + x / ⌘ + x**: Cut selection (node, group) to internal clipboard.
- **Ctrl + v / ⌘ + v**: Paste the copied/cut (node, group) on the flow.
- **Delete/BackSpace / Delete/⌫**: Delete selection (node, group, wire).
- **↑ / ↑**: Move the selection up by one nearest node.
- **↓ / ↓**: Move the selection down by one nearest node.
- **← / ←**: Move the selection left by one nearest node.
- **→ / →**: Move the selection right by one nearest node.
- **Ctrl + a / ⌘ + a**: Select all config nodes when in config tab.
- **Ctrl + a / ⌘ + a**: Select all nodes.
- **Escape / ⎋**: Select none.
- **Alt + s, then c / ⌥ + s, then c**: Select connected nodes.
- **Alt + s, then d / ⌥ + s, then d**: Select downstream nodes.
- **Alt + s, then u / ⌥ + s, then u**: Select upstream nodes.
- **Alt + a, then b / ⌥ + a, then b**: Align selected node(s) or group(s) to bottom.
- **Alt + a, then c / ⌥ + a, then c**: Align selected node(s) or group(s) to center.
- **Alt + a, then g / ⌥ + a, then g**: Align selected node(s) or group(s) to grid.
- **Alt + a, then l / ⌥ + a, then l**: Align selected node(s) or group(s) to left.
- **Alt + a, then m / ⌥ + a, then m**: Align selected node(s) or group(s) to middle.
- **Alt + a, then r / ⌥ + a, then r**: Align selected node(s) or group(s) to right.
- **Alt + a, then t / ⌥ + a, then t**: Align selected node(s) or group(s) to top.
- **Alt + a, then h / ⌥ + a, then h**: Distribute selected node or group(s) horizontally.
- **Alt + a, then v / ⌥ + a, then v**: Distribute selected node or group(s) vertically.

### Custom Keyboard Shortcuts

Node-RED lets you customize keyboard shortcuts to fit your workflow, making it easier to use the editor and speed up common tasks.

#### How to Set Custom Keyboard Shortcuts:

1. To set custom keyboard shortcuts, go to the keyboard settings in the user settings. Click `Shift + ?` or click the top-right menu icon and select "Settings." In the settings menu, switch to "Keyboard Settings."
2. In the Keyboard Settings, you will see actions with assigned shortcuts as well as those that are unassigned. To change or set shortcuts, click on "Unassigned" or the existing shortcut next to the action you want to modify.
3. Enter your preferred key combination for the action. Then, select the appropriate scope and click the check icon to save your changes. Your new shortcuts will now be active.