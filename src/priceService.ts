import axios from 'axios';
import { Pool } from 'pg';
import Redis from 'ioredis';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

const redisClient = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
});

async function fetchCryptoPrices() {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
    return data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    return null;
  }
}

async function storePricesInDB(prices: any) {
  const query = 'INSERT INTO crypto_prices(symbol, price) VALUES($1, $2)';
  try {
    const client = await pool.connect();
    await client.query(query, ['bitcoin', prices.bitcoin.usd]);
    await client.query(query, ['ethereum', prices.ethereum.usd]);
    client.release();
  } catch (error) {
    console.error('Error storing prices in DB:', error);
  }
}

async function cachePrices(prices: any) {
  await redisClient.set('crypto_prices', JSON.stringify(prices), 'EX', 60);
}

async function getPricesFromCache() {
  const data = await redisClient.get('crypto_prices');
  return data ? JSON.parse(data) : null;
}

export { fetchCryptoPrices, storePricesInDB, cachePrices, getPricesFromCache };
