// node-graphql-api.js

import express from 'express';
import bodyParser from 'body-parser';
// import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { makeExecutableSchema } from 'graphql-tools';
import { execute, subscribe } from 'graphql';

import * as Models from './models';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

/**********************************************************************************/

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, X-Token, Content-Length, X-Requested-With');
  next();
});

app.options('*', (req, res, next) => {
  res.end();
});

app.use((req, res, next) => {

  const token = req.headers['x-token'];

  if (1) {
  
    // const { user } = jwt.verify(token, SECRET);
  
    if (1) {

      // req.user = user;

      // res.set('Access-Control-Expose-Headers', 'x-token, x-refresh-token');
      // res.set('X-Token', "test2");

      next();      
    } else {
      res.status(401).json({})
    }
  } else {
    res.status(403).json({})
  }
});

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

export default app;





// const server = createServer(app);

// server.listen(3000, () => {
//   console.log(`GraphQL Server is now running on http://localhost:${3000}/graphql`)

//   new SubscriptionServer({
//     schema,
//     execute,
//     subscribe,

//     onConnect: () => console.log("connected")

//     // onConnect: (connectionParams, webSocket) => {
//     //   console.log("onConnect", connectionParams, webSocket)
//     // },
//     // onOperation: (message, params, webSocket) => {
//     //   console.log("onOperation", message, params, webSocket);
//     // },
//     // onOperationDone: (webSocket) => {
//     //   console.log("onOperationDone", webSocket);
//     // },
//     // onDisconnect: (webSocket) => {
//     //   // console.log("onDisconnect", webSocket);
//     // }

//   }, {
//     server,
//     path: '/subscriptions',
//   });
// });
