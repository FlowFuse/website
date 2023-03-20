---
navTitle: Data Attributes
---

## Data Attributes

It is recommended in the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) to utilise `data-` attributes on HTML elements in order to ensure safe selection of objects that won't evolve/change over time.

Similarly, this is a best practices for [PostHog](https://posthog.com/) which we also use to track user behaviour across the application. As such, we have defined our own best practice set of `data-` attributes to use:

### data-nav

Tag elements that have a sole purpose of moving a user from one place to another. This is used for any navigation item in a side bar, tab or any of the primary navigation dropdown menus for switching team or user options

```html
<router-link to="admin/settings" data-nav="admin-settings">
    <nav-item label="Admin Settings"></nav-item>
</router-link>
```

### data-form

Identify particular form elements like text-input, textarea of dropdowns using this tag.

```html
<FormRow data-form="device-name" v-model="input.name">Name</FormRow>
```

### data-action
Used to identify buttons that do not navigate, but instead complete an action. This could include submitting a form, or opening a dialog, e.g.,

```html
<ff-button data-action="delete-project" kind="danger" @click="deleteProject()"></ff-button>
```  

### data-el
A catch all for everything else, an element that we're likely going to want to capture, but doesn't fit into any of the other categories, e.g.,

```html
<ff-data-table data-el="templates">...</ff-data-table>
```