import fastify from 'fastify';
import cors from '@fastify/cors';

import registerAuthRoute from '../route-handlers/auth';
import registerTransactionsRoute from '../route-handlers/transactions';
import registerCardsRoute from '../route-handlers/cards';
import registerGenerateRoute from '../route-handlers/generate';
import registerFiltersRoute from '../route-handlers/filters';
import registerAccountsRoute from '../route-handlers/account';

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
  registerAuthRoute,
  registerAccountsRoute,
  registerCardsRoute,
  registerTransactionsRoute,
  registerGenerateRoute,
  registerFiltersRoute,
].forEach(registerFn => registerFn(server));

export default server;