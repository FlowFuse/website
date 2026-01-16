---
navTitle: Organizational Structure
templateEngineOverride: njk,md
---

# Organizational Structure

This page provides an overview of FlowFuse's organizational structure and reporting relationships.

## Organization Chart

```mermaid
graph TD
    Board[Board of Directors]
{% for member in team | dictsortBy(false, 'order') %}{% set nodeId = member.name | replace(" ", "") | replace("'", "") | replace("-", "") %}{% set displayName = member.name | replace(" ", "<br/>") %}{% if not member.reports_to %}    {{ nodeId }}[{{ displayName }}<br/>{{ member.title }}]
    Board --> {{ nodeId }}
{% endif %}{% endfor %}
{% for member in team | dictsortBy(false, 'order') %}{% if member.reports_to %}{% set nodeId = member.name | replace(" ", "") | replace("'", "") | replace("-", "") %}{% set displayName = member.name | replace(" ", "<br/>") %}{% set managerId = member.reports_to | replace(" ", "") | replace("'", "") | replace("-", "") %}    {{ nodeId }}[{{ displayName }}<br/>{{ member.title }}]
    {{ managerId }} --> {{ nodeId }}
{% endif %}{% endfor %}
    classDef executive fill:#e1f5ff,stroke:#0066cc,stroke-width:2px
    classDef head fill:#fff4e6,stroke:#ff9800,stroke-width:2px
    classDef employee fill:#f5f5f5,stroke:#757575,stroke-width:1px
    classDef board fill:#ffebee,stroke:#d32f2f,stroke-width:2px

    class Board board
{% for member in team | dictsortBy(false, 'order') %}{% set nodeId = member.name | replace(" ", "") | replace("'", "") | replace("-", "") %}{% if not member.reports_to %}    class {{ nodeId }} executive
{% elif member.title == "CTO" or member.title == "Engineering Manager" or member.title == "Head of Customer Teams" or member.title == "Product Marketing Manager" %}    class {{ nodeId }} head
{% else %}    class {{ nodeId }} employee
{% endif %}{% endfor %}
```

## Reporting Structure

The organizational structure is automatically generated from team member data files located in `src/_data/team/`. Each team member's JSON file includes a `reports_to` field that indicates their direct manager.

### Executive Leadership

The CEO reports to the Board of Directors.

{% set ceo = null %}{% for member in team | dictsortBy(false, 'order') %}{% if not member.reports_to %}{% set ceo = member %}{% endif %}{% endfor %}
{% set directReports = [] %}{% for member in team | dictsortBy(false, 'order') %}{% if member.reports_to == ceo.name %}{% set directReports = (directReports.push(member), directReports) %}{% endif %}{% endfor %}
Direct reports to {{ ceo.name }} ({{ ceo.title }}):
{% for member in team | dictsortBy(false, 'order') %}{% if member.reports_to == ceo.name %}
- **{{ member.name }}** ({{ member.title }}){% endif %}{% endfor %}

{% for manager in team | dictsortBy(false, 'order') %}{% set hasReports = false %}{% for member in team %}{% if member.reports_to == manager.name %}{% set hasReports = true %}{% endif %}{% endfor %}{% if hasReports and manager.reports_to %}
### {{ manager.name }}'s Team

{{ manager.name }} ({{ manager.title }}) has the following direct reports:
{% for member in team | dictsortBy(false, 'order') %}{% if member.reports_to == manager.name %}
- {{ member.name }} - {{ member.title }}{% endif %}{% endfor %}
{% endif %}{% endfor %}
