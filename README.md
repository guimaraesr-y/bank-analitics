# 📊 Nubank Portfolio Processor

A **robust backend** to process bank statements, enrich transactions, and generate portfolio reports, built with NestJS/Node.js and an asynchronous pipeline using RabbitMQ, Redis, and PostgreSQL.

---

## 🏗️ Project Overview

* **Asynchronous Pipeline**: RabbitMQ for queues, dedicated workers for parsing, enrichment, and alerts.
* **Cache & Coordination**: Redis for caching frequent queries and distributed locks.
* **Database**: PostgreSQL for transaction persistence.
* **REST API**: NestJS consuming data from Postgres and exposing endpoints for frontend.

---

## 🚀 Prerequisites

* Docker
* Docker Compose
* Node.js 18+ (for local development without containers)

---

## 📁 Directory Structure

```plaintext
/bank-analytics/
├── docker-compose.yml
├── env/
│   ├── api.env
│   ├── parser_worker.env
│   ├── postgres.env
│   └── rabbitmq.env
├── services/
│   └── api/
│       └── (...)
└── workers/
    └── parser/
        └── (...)
```

---

## 🛠️ Installation & Usage

### 1. Configure Environment Variables

Create files in the `env/` folder with your credentials and connection URIs:

```ini
# env/api.env
DATABASE_URL=postgres://user:pass@postgres:5432/dbname
RABBITMQ_URL=amqp://user:pass@rabbitmq:5672
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret
```

```ini
# env/parser_worker.env
RABBITMQ_URL=amqp://user:pass@rabbitmq:5672
```

```ini
# env/postgres.env
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=dbname
```

```ini
# env/rabbitmq.env
RABBITMQ_DEFAULT_USER=user
RABBITMQ_DEFAULT_PASS=pass
```

### 2. Build and Run with Docker Compose

```bash
# From the project root directory:
docker-compose up --build -d

# View logs:
docker-compose logs -f api
docker-compose logs -f parser_worker
```

### 3. Local Development (Optional)

To develop without Docker:

```bash
# API service\ ncd services/api
npm install
npm run start:dev

# Parser worker
cd workers/parser
npm install
npm run start:dev
```

---

## 📦 Useful Commands

* `docker-compose up --build -d`  — Build images and start all services
* `docker-compose down`           — Stop and remove containers
* `docker-compose logs -f <service>` — Follow logs in real time
* `npm run build` (in each service) — Transpile TypeScript

---

## 🤝 Contributing

1. Fork this repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'feat: description'`)
4. Push to your branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📜 License

MIT © Ryan Guimarães
