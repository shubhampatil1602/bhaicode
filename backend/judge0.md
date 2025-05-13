### If you are using Apple Silicons (M1/M2/M3/...) and encounter the following error in your Docker app:

`Image may have poor performance or fail if run via emulation`

- Update your `docker-compose.yml` file to the following configuration:

```yml
x-logging: &default-logging
  logging:
    driver: json-file
    options:
      max-size: 100M

services:
  server:
    image: judge0/judge0:1.13.1
    platform: linux/x86_64
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    ports:
      - "2358:2358"
    privileged: true
    <<: *default-logging
    restart: always

  workers:
    image: judge0/judge0:1.13.1
    platform: linux/x86_64
    command: ["./scripts/workers"]
    volumes:
      - ./judge0.conf:/judge0.conf:ro
    privileged: true
    <<: *default-logging
    restart: always

  db:
    image: postgres:16.2
    platform: linux/arm64
    env_file: judge0.conf
    volumes:
      - data:/var/lib/postgresql/data/
    <<: *default-logging
    restart: always

  redis:
    image: redis:7.2.4
    platform: linux/arm64
    command:
      [
        "bash",
        "-c",
        'docker-entrypoint.sh --appendonly no --requirepass "$$REDIS_PASSWORD"',
      ]
    env_file: judge0.conf
    <<: *default-logging
    restart: always

volumes:
  data:
```

### Run the following commands after updating the file:

```bash
docker compose down --volumes
docker compose build --no-cache
docker compose up -d
```
