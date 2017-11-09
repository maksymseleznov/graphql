// server/index.js

import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

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
  endpointURL: '/graphql'
}));

app.listen(3000, () => console.log(`GraphQL Server is now running on http://localhost:${3000}/graphql`));
