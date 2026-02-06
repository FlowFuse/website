---
navTitle: FF Tables
---

# Setting up a local FF Tables test environment

## Postgres instance

FlowFuse Tables relies on a local Postgres instance. The following command assumes you are on Linux.

1. Create a directory to hold the database files
2. Run the following Docker command (from within that new directory)

    ```
    docker run -p 5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -v `pwd`/db:/var/lib/postgresql/data postgres:17
    ```

    The port has been mapped to 5433 to ensure it doesn't clash with a different postgres instance

3. add the following to the end of your `etc/flowfuse.local.yml` file
    ```yaml
    tables:
      enabled: true
      driver:
        type: postgres-localfs
        options:
          database:
            user: root
            password: password
            host: localhost
            port: 5433
            database: postgres
            ssl: false
    ```
