// app.js

import { Server } from 'http';

import express from 'express';

import { domain } from './config';

import vhost from './vhost';

// make one node, one vhost(domain, one {api:nodeRESTfulApi});

import nodeWWW from './node-www';
import nodeRESTfulApi from './node-restful-api';
import nodeGraphQLApi from './node-graphql-api';

/**********************************************************************************/

const app = express();

// vHosts

app.use(vhost(domain.www, nodeWWW));
app.use(vhost(domain.api, nodeRESTfulApi));
app.use(vhost(domain.graphql, nodeGraphQLApi));

// Debug

app.get('*', (req, res, next) => {
  res.status(200).json({ ok: 1 });
  next();
});

// app.use((req, res, next) => {
//   console.log(`HOST ${req.headers.host} [${req.method}] ${req.originalUrl}`);
//   next();
// });

/**********************************************************************************/

const server = new Server(app);

/**********************************************************************************/

// import socket from './socket';

// const socket = require('./socket')(server); // , { serveClient: false }

/**********************************************************************************/

export default server;