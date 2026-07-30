---
title: FlowFuse Expert Can Now Work With Your Tables
description: The Expert can now list your FlowFuse Tables databases, inspect table schemas, and query row data on your behalf, and Tables now works correctly with schemas other than public.
date: 2026-07-28 18:12:00
authors: andrea-palmieri
tags:
  - changelog
issues:
  - https://github.com/FlowFuse/flowfuse/issues/7989

---

FlowFuse Expert can now look up your FlowFuse Tables databases directly. Ask it to list the databases on your team, show you the tables in a database, describe a table's schema, or query a table's row data, and it calls the right tools and reports back, without you needing to open the Tables view yourself.

![The Expert listing the tables in a FlowFuse Tables database, grouped by schema](./images/chat.png){data-zoomable}
*Ask the Expert about your Tables databases and it calls the right tools and reports back*

Alongside this, FlowFuse Tables now correctly supports tables that live in a schema other than `public`. Previously, viewing data for a table outside the default schema could fail. Tables and their schema now show up correctly throughout the Tables UI: next to each table name in the list, and as `schema_name.table_name` (with a copy button) in the table detail view.

![The Tables explorer showing each table's schema next to its name, and the qualified schema.table name with a copy button in the header](./images/tables-view.png){data-zoomable}
*Tables and their schema now show up throughout the Tables UI*

This feature is available to all FlowFuse Cloud and Self Hosted users from v2.33.
