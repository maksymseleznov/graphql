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

// app.use(function (req, res, next) {
//   console.log("HOST", req.headers.host, "[" + req.method + "]", req.originalUrl);
//   console.log("headers", req.headers);
//   console.log("body", req.body);
//   console.log("params", req.params);
//   console.log("query", req.query);
//   next();
// });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, *');
  next();
});

app.options('*', function(req, res, next){
  res.end();
})

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
