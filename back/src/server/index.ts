import fastify from 'fastify';
import cors from '@fastify/cors';

import registerTransactionsRoute from '../route-handlers/transactions';
import registerCardsRoute from '../route-handlers/cards';
import registerGenerateMockDataRoute from '../route-handlers/generateMockData';
import registerAuthHandler from '../route-handlers/auth';
import registerTransactionFiltersRoute from '../route-handlers/transactions-filters';

const server = fastify();

server.register(cors, {
  origin: (_, cb) => cb(null, true),
  /*
  
  origin: (origin, cb) => {
    const hostname = new URL(origin).hostname;
    if(hostname === "127.0.0.1" || hostname === "localhost"){
      cb(null, true)
      return
    }
    cb(new Error("Not allowed"), false)
  }
  */
});

[
  registerAuthHandler,
  registerCardsRoute,
  registerTransactionsRoute,
  registerTransactionFiltersRoute,
  registerGenerateMockDataRoute,
].forEach(registerFn => registerFn(server));

export default server;