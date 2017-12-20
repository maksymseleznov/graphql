// node-restful-api.js

import express from 'express';

const app = express();

// var middlewares = require('./middlewares');

/**********************************************************************************/
app.locals.pretty = true;
/**********************************************************************************/

// Config

// app.use(middlewares.bodyParserJson);
// app.use(middlewares.enableCORS);

/**********************************************************************************/

// Routers

// var apiV0 = require('./routers/api/api-v0');
// app.use('/v0', apiV0);

/**********************************************************************************/

// app.use(function (req, res, next) {
//   console.log("HOST", req.headers.host, "[" + req.method + "]", req.originalUrl);
//   console.log("headers", req.headers);
//   console.log("body", req.body);
//   console.log("params", req.params);
//   console.log("query", req.query);
//   next();
// });

export default app;