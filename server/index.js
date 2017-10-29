// server/index.js
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import { Schema } from './data/schema';
import { Mocks } from './data/mocks';

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
});
const app = express();
const graphQLServer = createServer(app);

addMockFunctionsToSchema({
  schema: executableSchema,
  mocks: Mocks,
  preserveResolvers: true,
});

// `context` must be an object and can't be undefined when using connectors
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: executableSchema,
  context: {}, // at least(!) an empty object
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));


graphQLServer.listen(3000, () => console.log(`GraphQL Server is now running on http://localhost:${3000}/graphql`));
