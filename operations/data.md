# Data at FlowForge

At FlowForge we're trying to leverage data obtained to make better decisions.

### Data sources

Right now we're mostly using the Telemetry data from self-managed installs of
FlowForge. Later we'll likely add data from Stripe and Hubspot.

### Data warehouse

For now the data is imported manually into Big Query. In big query materialized
views are created - read; we're processing the data for more, derived, data.
As the data is then in the Google realm, it is available as a data source in Google
Sheets and [Data Studio](https://datastudio.google.com/).

### Source to sink

We've adopted Meltano to obtain and transfer the data. See also the
[FlowForge-Data](https://github.com/flowforge/flowforge-data) (Internal project)
on how we transfer the data. It's manually triggered for now.
