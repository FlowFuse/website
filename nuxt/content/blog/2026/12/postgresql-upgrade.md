---
title: 'Migrating from PostgreSQL v14 to v16'
metaTitle: 'Upgrade FlowFuse PostgreSQL 14 to 16 on Docker & Kubernetes'
subtitle: "PostgreSQL v14 is end of life. Here's how to upgrade."
authors:
  - ben-hardill
date: '2026-12-18'
description: Upgrade the PostgreSQL database behind self-hosted FlowFuse from v14 to v16 on Docker Compose or Kubernetes, with backup and rollback steps.
tags:
  - posts
  - flowfuse
  - how-to
  - kubernetes
  - docker
  - postgresql
  - postgres
tldr:
  - PostgreSQL v14 reached end of life in November 2026, so FlowFuse v3.4.0 moves self-hosted Docker Compose and Kubernetes installs to PostgreSQL v16.
  - Docker Compose installs upgrade the database in place with a one-off container. Kubernetes installs upgrade it automatically through v2.x of the Helm chart.
  - If something goes wrong, you can restore your database from the backup you take before starting, on Docker Compose or Kubernetes.
cta:
  type: contact
  title: Need a hand with your upgrade?
  description: Talk to our team about upgrading your self-hosted FlowFuse installation.
meta:
  faq:
    - question: "Why is FlowFuse moving from PostgreSQL 14 to 16?"
      answer: "PostgreSQL v14 reached the end of its supported life in November 2026. To keep the database supported, FlowFuse v3.4.0 ships PostgreSQL v16 for Docker Compose and Kubernetes installs."
    - question: "Do these steps apply if I use an external PostgreSQL database?"
      answer: "The steps assume the PostgreSQL database that comes with FlowFuse's Docker Compose and Helm installs. If your setup is different, for example you run your own database, you'll need to update the commands to match your environment."
    - question: "What if I'm running FlowFuse v2.10.0 or older?"
      answer: "Upgrade to v3.3.0 first using the [Docker Compose upgrade instructions](https://github.com/FlowFuse/docker-compose/blob/main/UPGRADE.md), then follow this guide to move to PostgreSQL v16."
    - question: "Can I roll back if the upgrade goes wrong?"
      answer: "Yes. Restore the database from the backup you take before upgrading. The [Restore from Backup](#restore-from-backup) section has the steps for Docker Compose and Kubernetes."
---

PostgreSQL v14 passed it's End Of Supported Life at the start of November 2026, to ensure on going support we are migrating our Docker Compose and Kubernetes installs to PostgreSQL v16.

As part of the FlowFuse v3.4.0 release we are shipping PostgreSQL v16, the following are the instructions for upgrading from any version greater than FlowFuse v2.10.0.

If you are starting with version v2.10.0 or older please follow [these instructons](https://github.com/FlowFuse/docker-compose/blob/main/UPGRADE.md) to move to v3.3.0 first.

<!--more-->

::warning
**Action required if you self-host FlowFuse on Docker Compose or Kubernetes.** FlowFuse v3.4.0 moves the bundled database from PostgreSQL v14 to v16. Before you upgrade:

- Back up your database, and on Docker Compose your `docker-compose.yml` too.
- On Docker Compose, run the one-off database upgrade (step 2 under [Upgrade](#upgrade)) before you start the new stack.
- On Kubernetes, upgrade with v2.x of the Helm chart, which upgrades the database when it starts.
- On FlowFuse v2.10.0 or older on installed with Docker Compose, move to v3.3.0 first.
::

## Assumptions

Through out this document the following assumptions will be made

### Docker

- Docker Compose commands include the `-p flowfuse` option to set the project name. Your project name can be found by running `docker compose ls`
- The posgres service in the `docker-compose.yml` has not_ been edited (specifically the `POSTGRES_PASSWORD` and `POSTGRES_USER` environment variables)

### Kubernetes

- The FlowFuse helm chart was installed into the `flowfuse` namespace
- You are using the bundled PostgreSQL database, not an externally installed and configured install. Specifically the following Helm values are **not** set:
    - `postgresql.host`
    - `postgresql.auth.username`
    - `postgresql.auth.password`
    - `postgresql.auth.database`

If these your install is different then the commands will need to be updated to match your specific environment.

## Backup

Before starting any migration it is important to ensure a full backup of the database is performed.

The following commands will write a compressed database backup to a file called `flowfuse-db-backp-sql.bz2` in the current directory.

### Docker

```bash
docker exec -it flowfuse-postgres-1 pg_dump flowforge | bzip2 > flowfuse-db-backup-sql.bz2 
```

You should also take a copy of your current `docker-compose.yml` file

```bash
cp docker-compose.yml docker-compose-backup.yml
```

### Kubernetes

```bash
PGPASSWORD=`kubectl -n flowfuse get secrets flowfuse-secrets -o json | jq -r '.data."postgres-password"' | base64 -d`
kubectl -n flowfuse exec -it flowfuse-postgresql-0 -- /bin/sh -c "env PGPASSWORD=$PGPASSWORD pg_dump -U postgres flowforge" | bzip2 > flowfuse-db-backup-sql.bz2
```

## Upgrade

### Docker

Once the backup has completed the following steps need to be completed to upgrade the PostgreSQL instance. These instructions insert part 2 into the [normal upgrade instructions](https://flowfuse.com/docs/install/docker/#upgrade)

1. Stop the docker compose project
    ```bash
    docker compose -p flowfuse down --rmi all
    ```
2. Run the in place database upgrade
    ```bash
    docker run --rm -it --name pgupdate -v flowfuse_db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=password -e POSTGRES_USER=root -e PGAUTO_ONESHOT=yes pgautoupgrade/pgautoupgrade:16-trixie
    ```
3. Download the latest Docker Compose files
    ```bash
    curl -L -o docker-compose.yml https://github.com/FlowFuse/docker-compose/releases/latest/download/docker-compose.yml
    ```
4. Make sure the `.env` file is present and contains your installation-specific configuration. Download an example `.env` file if needed:
    ```bash
    curl -o .env.example https://raw.githubusercontent.com/FlowFuse/docker-compose/refs/heads/main/.env.example
    ```
5. Pull the latest version of the default stack container (and any other stacks you have configured)
   ```bash
   docker pull flowfuse/node-red:latest
   ```
6. Start the project depending on the TLS configuration:
    - automatic TLS:
        ```bash
        docker compose --profile autossl -p flowfuse up -d
        ```
    - any other scenario:
        ```bash
        docker compose -p flowfuse up -d
        ```


### Kubernetes

The Kubernetes upgrade is handled by the helm chart. Using v2.x.x of the helm chart will include an init container to the PostgreSQL subchart that will perform an inplace upgrade at startup (and no-op on subsequent restarts).

The usual Kubernetes [upgrade instructions](https://flowfuse.com/docs/install/kubernetes/#upgrade) should be followed.


## Restore from Backup

Should there be a problem the following instauctions can be used to revert to the previous FlowFuse version and PostgreSQL v14.

### Docker

1. Stop any running containers
    ```bash
    docker compose -p flowfuse down --rmi all
    ```
2. Delete PostgreSQL v16 database volume
   ```bash
   docker volume rm flowfuse_db
   ```
3. Bring up the containers but do not start them
    - automatic TLS:
        ```bash
        docker compose --profile autossl -p flowfuse up -d --no-start
        ```
    - any other scenario:
        ```bash
        docker compose -p flowfuse up -d --no-start
        ```
4. Manually start the PostgreSQL container
   ```bash
   docker start flowfuse-postgres-1
   ```
5. Restore the backup
   ```bash
   bzcat flowfuse-db-backup-sql.bz2 | docker exec -it flowfuse-postgres-1 pg_restore -c flowforge
   ```
6. Restart other containers
   ```bash
   docker compose -p flowfuse start
   ```

### Kubernetes

If the PostgreSQL  

1. Scale the FlowFuse Deployment to 0 instance
    ```bash
    kubectl -n flowfuse --replicas=0 deployment flowforge
    ```
2. Scale the FlowFuse FileServer to 0 instance
    ```bash
    kubectl -n flowfuse --replicas=0 deployment flowforge-file
    ```
3. Scale the Postgres server to 0 instance
    ```bash
    kubectl -n flwofuse --replicas=0 statefulsets flowfuse-postgresql
    ```
4. Run an Ubuntu pod as a Job to delete the corupt data
    ```bash
    kubectl -n flowfuse apply -f - <<EOF
    apiVersion: batch/v1
    kind: Job
    metadata:
      name: postgres-cleanup
    spec:
      template:
        containers:
        - name: ubuntu
            image: ubuntu
            command:
            - rm
            - -rf
            - /data/data/*
            volumeMounts:
            - mountPath: "/data"
                name: data
        volumes:
            - name: data
            persistentVolumeClaim:
                claimName: data-flowfuse-postgresql-0
        restartPolicy: Never
      backoffLimit: 1
   EOF 
   ```
5. Scale Postgres server to 1 instance
    ```bash
    kubectl -n flwofuse --replicas=1 statefulsets flowfuse-postgresql
    ```
6. Restore backup
    ```bash
    PGPASSWORD=`kubectl -n flowfuse get secrets flowfuse-secrets -o json | jq -r '.data."postgres-password"' | base64 -d`
    bzcat flowfuse-db-backup.sql.bz1 | kubectl -n flowfuse exec -it flowfuse-postgresql-0 -- /bin/sh -c "env PGPASSWORD=$PGPASSWORD pg_restore -U postgres flowforge"
    ```
7. Scale the FlowFuse Deployment to 1 instance
    ```bash
    kubectl -n flowfuse --replicas=1 deployment flowforge
    ```
8. Scale the FlowFuse FileServer to 1 instance
    ```bash
    kubectl -n flowfuse --replicas=1 deployment flowforge-file
    ```