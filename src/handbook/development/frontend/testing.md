---
meta:
    title: Front-End Testing
---

# Front-End Testing

For our front-end we test on two fronts:

- [Unit Tests](#unit-tests) - Focusses on individual functional testing. Each function should be tested in complete isolation
- [E2E Integration Tests](#e2e-integration-tests) - Driven by automated testing framework, [Cypress](https://www.cypress.io/), this tests our front-end in it's entirety, including button clicks, navigations and API calls.

## Unit Tests

Not yet written

## E2E Integration Tests

### Foreword

*When running e2e tests locally, the NPM scripts are in the `flowforge` package.*
*Be sure to `cd` to `flowforge` before attempting to run them*

### Dependencies
Before running the e2e test suites locally you should make sure you have Docker installed and running locally.

### Running Locally

To run the E2E tests yourself, we need to first run our own local web server that the tests will run on.
For our testing purposes, we have a single server configured with multiple users, teams and projects.
To run this, open a terminal and run:

```bash
npm run cy:web-server
```

This accomplishes two things: 
- spins up two web servers, each configured differently
- spins up a SMPT server running in a docker container for each server 

```shell
Mailpit: Starting e-mail server...
Mailpit: Web UI available at http://localhost:8025/ with SMTP listening on port 1025
Mailpit: Starting e-mail server...
Mailpit: Web UI available at http://localhost:8026/ with SMTP listening on port 1026
OS Environment running at http://localhost:3001
EE Environment running at http://localhost:3002
```

Once this is up and running, you then have two options:

#### Run Tests via Terminal

```bash
npm run cy:run
```

This will execute all of the front-end E2E tests in the terminal and display the results. 
Typically, this is the command to run if you simply want to run all of the tests
When developing/debugging tests, opening the Cypress Application will likely be more useful.

#### Run Tests via Cypress Application

```bash
npm run cy:open
```

Opens the Cypress application. From here, you can run individual test files, and see the framework clicking through the UI as the tests are run. If you're developing or debugging your own tests, we recommend this. 

### Hints & Tips

If you're looking to write your own Cypress tests, then here are some tips that can help you get started:

#### beforeEach

If you explore some of the existing tests, you'll see that `beforeEach` is a very useful way of ensuring consistent behaviour across a group of tests, e.g. starting from the same point, or making sure a user is logged in.

#### Helper Functions

To make Cypress testing easier, we have created a collection of helper functions that can be called within any loop of the testing framework.

```js
cy.login(<username>, <password>)
```
This will log you into FlowFuse as the given user. The test users are defined in the [test environment](https://github.com/FlowFuse/flowfuse/blob/main/test/e2e/frontend/environments/standard.js).

```js
cy.home()
```
This will navigate the test to the homepage of the application, but more importantly it contains several `cy.wait()` calls to make sure the relevant API calls have completed before continuing.
It is recommended that you call this for every test that requires a login. 

#### Selecting Elements & Actions

It is recommended in the [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) to utilise `data-` attributes on HTML elements in order to ensure safe selection of objects that won't evolve/change over time.

Similarly, this is a best practices for [PostHog](https://posthog.com/) which we also use. As such, we have defined [our own best practice](./data-attributes.md) set of `data-` attributes to use.

When writing your own tests, where possible, you should do element selection via these custom data tags, e.g.,

```js
cy.get('a[data-nav="team-members"]').click()
```