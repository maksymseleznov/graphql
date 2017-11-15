// server/index.js

import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';
import { execute, subscribe } from 'graphql';

import * as Models from './models';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const app = express();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

app.use(bodyParser.json());

app.use('/graphql', graphqlExpress({
  context: {
    Models
  },
  schema,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: 'ws://localhost:3000/subscriptions'
}));

const server = createServer(app);

server.listen(3000, () => {
  console.log(`GraphQL Server is now running on http://localhost:${3000}/graphql`)

  new SubscriptionServer({
    schema,
    execute,
    subscribe,

    onConnect: () => console.log("connected")

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
    path: '/subscriptions',
  });
});
