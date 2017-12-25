// app.js

import { Server } from 'http';

import express from 'express';

import apps from './apps';

/**********************************************************************************/

const app = express();

app.use(apps);

// Debug

app.get('*', (req, res, next) => {
  res.status(200).json({ ok: 1 });
  next();
});

app.use((req, res, next) => {
  console.log(`HOST ${req.headers.host} [${req.method}] ${req.originalUrl}`);
  next();
});

/**********************************************************************************/

const server = new Server(app);

/**********************************************************************************/

import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';
import { execute, subscribe } from 'graphql';

import typeDefs from './middlewares/graphql/v0/typeDefs';
import resolvers from './middlewares/graphql/v0/resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const webSocket = new SubscriptionServer({
  schema,
  execute,
  subscribe,

  onConnect: () => console.log("onConnect to WebSocket")

  // onConnect: (connectionParams, webSocket) => {
  //   console.log("onConnect", connectionParams, webSocket)
  // },
  // onOperation: (message, params, webSocket) => {
  //   console.log("onOperation", message, params, webSocket);
  // },
  // onOperationDone: (webSocket) => {
  //   console.log("onOperationDone", webSocket);
  // },
  // onDisconnect: (webSocket) => {
  //   // console.log("onDisconnect", webSocket);
  // }

}, {
  server,
  path: '/subscription',
});

/**********************************************************************************/

export default server;