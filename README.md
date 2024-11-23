# Crypto Price Tracker

A backend application to fetch, store, and serve cryptocurrency prices (Bitcoin and Ethereum) using **TypeScript**, **PostgreSQL**, **Redis**, **GraphQL**, and **Express**.

## Features
- Fetches real-time prices from the [CoinGecko API](https://www.coingecko.com/en/api).
- Caches prices in Redis for faster retrieval.
- Stores prices in a PostgreSQL database for historical analysis.
- Exposes a GraphQL API to query cached prices.

## Prerequisites
1. [Node.js](https://nodejs.org/) v18 or higher.
2. [PostgreSQL](https://www.postgresql.org/) installed and running.
3. [Redis](https://redis.io/) installed and running.
4. `.env` file with the following:
   ```env
   DB_USER=postgres
   DB_PASSWORD=abcd
   DB_DATABASE=Tracker
   DB_HOST=localhost
   DB_PORT=5432
   REDIS_HOST=localhost
   REDIS_PORT=6379
   PORT=4000
Installation

    Clone the repository:

git clone <repo-url>
cd crypto-price-tracker

Install dependencies:

npm install

Start PostgreSQL and Redis locally.

Set up the database:

    npm run dev

Usage

    Start the server:

npm run dev

Access the GraphQL API at: http://localhost:4000/graphql

Test the getCachedPrices query:

    query {
      getCachedPrices {
        symbol
        price
      }
    }

Scripts

    npm run dev: Start the development server.
    npm run build: Compile TypeScript files.
    npm run start: Start the production server.

Project Structure

src/
├── app.ts              # Entry point of the application
├── databaseSetup.ts    # PostgreSQL setup
├── graphqlSchema.ts    # GraphQL schema and resolvers
├── priceService.ts     # Business logic for fetching, storing, and caching prices
└── redisClient.ts      # Redis client configuration

Testing the Setup

    Database: Check if the crypto_prices table is created and populated.
    Redis: Verify cache using redis-cli.
    GraphQL: Use GraphiQL at /graphql to test queries.

Dependencies

    Express
    GraphQL
    PostgreSQL
    Redis
    TypeScript

