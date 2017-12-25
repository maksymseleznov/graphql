// restful.js

import express from 'express';

import { 
    v0 as routerV0, 
    v1 as routerV1, 
} from '../routers/restful';

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

router.use('/v0', routerV0);
router.use('/v1', routerV1);

/**********************************************************************************/

export default router;