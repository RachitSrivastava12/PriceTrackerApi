import express from 'express';
import { setupDatabase } from './databaseSetup';
import { fetchCryptoPrices, storePricesInDB, cachePrices, getPricesFromCache } from './priceService';
import { graphqlHTTP } from 'express-graphql';
import { schema } from './graphqlSchema';

const app = express();
const PORT = process.env.PORT || 4000;

// Initialize database
setupDatabase();

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true, // Enable GraphiQL for testing queries
  })
);

// Scheduled task to fetch and store crypto prices
setInterval(async () => {
  console.log('Fetching and storing crypto prices...');
  const prices = await fetchCryptoPrices();
  if (prices) {
    await storePricesInDB(prices);
    await cachePrices(prices);
  }
}, 60000); // Fetch prices every minute

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
