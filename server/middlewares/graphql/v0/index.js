
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import { makeExecutableSchema } from 'graphql-tools';

import * as Models from '../../../models';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const schema = makeExecutableSchema({ typeDefs, resolvers });

const verification = (req, res, next) => {

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
}

const graphql = graphqlExpress({
  context: {
    Models
  },
  schema,
});

const graphiql = graphiqlExpress({
  endpointURL: '/query',
  subscriptionsEndpoint: 'ws://graphql.domain:3000/subscription'
});

const end = (req, res, next) => {
  res.end();
};

export default { verification, graphql, graphiql, end }