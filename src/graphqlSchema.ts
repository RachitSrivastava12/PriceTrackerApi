import { buildSchema } from 'graphql';
import { getPricesFromCache } from './priceService';

type Prices = {
    [symbol: string]: { usd: number };
  };

const schema = buildSchema(`
  type CryptoPrice {
    symbol: String
    price: Float
  }

  type Query {
    getCachedPrices: [CryptoPrice]
  }
`);

const root = {
  getCachedPrices: async () => {
    const prices = await getPricesFromCache() as Prices;
    return prices
      ? Object.entries(prices).map(([symbol, data]) => ({ symbol, price: data.usd }))
      : [];
  },
};

export { schema, root };
