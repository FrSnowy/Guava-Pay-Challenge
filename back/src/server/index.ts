import fastify from 'fastify';
import registerTransactionsRoute from '../route-handlers/transactions';
import registerCardsRoute from '../route-handlers/cards';
import registerGenerateMockDataRoute from '../route-handlers/generateMockData';
import registerAuthHandler from '../route-handlers/auth';

const server = fastify();

[
  registerAuthHandler,
  registerCardsRoute,
  registerTransactionsRoute,
  registerGenerateMockDataRoute,
].forEach(registerFn => registerFn(server));

export default server;