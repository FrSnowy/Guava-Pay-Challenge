import fastify from 'fastify';
import registerTransactionsRoute from '../route-handlers/transactions';
import registerCardsRoute from '../route-handlers/cards';

const server = fastify();

[
  registerCardsRoute,
  registerTransactionsRoute
].forEach(registerFn => registerFn(server));

export default server;