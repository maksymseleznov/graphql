import { domain } from '../config';

import WWW from './www';
import RESTful from './restful';
import GraphQL from './graphql';

export default (req, res, next) => {

  const { www, restful, graphql } = domain;

  let host = req.headers.host.split(":")[0];

  switch (host) {
    case www:
      return WWW(req, res, next);
      break;
    case restful:
      return RESTful(req, res, next);
      break;
    case graphql:
      return GraphQL(req, res, next);
      break;
    default:
      next();
      break;
  }
};