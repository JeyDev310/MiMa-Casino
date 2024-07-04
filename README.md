<img src="https://static.asymptote.at/images/livepokerstudio/logo/livepokerstudio-logo-dark-256w@1.png" alt="Live Poker Studio™" width="180"/>


# Live Poker Studio™

Live Poker Studio™ is a complete Texas Hold'em No Limit online poker game server powered by Django/Channels, Redis, PostgreSQL and RabbitMQ. The server supports the integration and creation of classic automatic online games as well as live casino games that can be controlled by real game hosts.


## Run Locally (Client)

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn start
```


## Building (Client)

To build this project run

```bash
  yarn build
```

Please always build the project with `GENERATE_SOURCEMAP=false react-scripts build` or similar as you can see in `package.json` under `scripts/build`.


## Tech Stack

#### Backend

| Technology  | Version  |
| :---------- | :------- |
| `python3`   | `3.6.9`  |
| `celery`    | `4.4.4`  |
| `gunicorn`  | `19.9.0` |
| `daphne`    | `3.0.2`  |
| `redis`     | `7.0.2`  |
| `memcached` | `1.6.15` |
| `postgres`  | `14.2`   |
| `rabbitmq`  | `3.6.10` |
| `erlang`    | `24.3.3` |
| `nginx`     | `1.18.0` |


#### Frontend

| Technology | Version   |
| :--------- | :-------- |
| `react`    | `16.13.0` |
| `redux`    | `4.0.1`   |


#### Operating System

| Technology | Version   |
| :--------- | :-------- |
| `ubuntu`   | `18.04.6` |
