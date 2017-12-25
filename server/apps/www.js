// www.js

import express from 'express';

import { v0 as routerV0 } from '../routers/www';

import { bodyParserJson, enableCORS } from '../middlewares';

/**********************************************************************************/

const router = express.Router();

// Config

router.use(bodyParserJson);
router.use(enableCORS);

// router.use((req, res, next) => {
//   console.log("HOST", req.headers.host, "[" + req.method + "]", req.originalUrl);
//   next();
// });

/**********************************************************************************/

// Routers

router.use('/', routerV0);

/**********************************************************************************/

export default router;