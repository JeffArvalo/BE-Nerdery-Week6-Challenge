# My Store (GraphQL)

Express + GraphQL + Prisma (Postgres)

## Requirements

- **Node.js**: v18+ recommended
- **PostgreSQL** (local or remote)
- **npm** or **yarn**

## Libraries used

- `express` — HTTP server
- `apollo-server-express` — GraphQL server
- `prisma` & `@prisma/client` — ORM
- `class-validator` & `class-transformer` — input validation
- `uuid` — IDs & sample seeds
- `dotenv` — environment config
- `cors` — CORS middleware

## Project structure

- `prisma/` — Prisma schema + seed script
- `src/` — app source code
  - `resolvers/` — GraphQL typeDefs & resolvers
  - `services/` — business logic to access Prisma
  - `dtos/` — validation DTOs
  - `middleware/` — jwt & api-key helpers
  - `prisma.ts` — prisma client
  - `server.ts` — express + graphql server


## Data model

- **Client** — id, name, email
- **Product** — id, clientId, name, description, stock, price
- **ApiKey** — id, clientId, key, expiration

## Setup / Run

### 1. Clone repo & enter folder
```bash
git clone https://github.com/YOUR_USER/my-store.git
```

### 2. Install dependencies:

```bash
npm install
# or
yarn install
```

### 3. Create a .env file in the project root with:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### 4. Migrate Prisma schemas

```bash
npx prisma migrate dev
```


### 5. Generate Prisma schemas

```bash
npx prisma generate
```


### 6. Seed initial data

```bash
npm run prisma:seed
```

### 7. Start dev server

```bash
npm run dev
```

### Additional Notes: 

GraphQL queries require an API key in the request header, but the API key retrieval endpoint is public.