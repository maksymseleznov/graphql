
import express from 'express';

import { bodyParserJson, enableCORS } from '../../../middlewares';

import { v0 as middlewareV0 } from '../../../middlewares/graphql';

/**********************************************************************************/

const router = express.Router();

// Config

router.use(bodyParserJson);
router.use(enableCORS);

/**********************************************************************************/

// Routers

router.use(middlewareV0.verification);

router.use('/query', middlewareV0.graphql);

router.use('/interface', middlewareV0.graphiql);

router.use('*', middlewareV0.end);

/**********************************************************************************/

export default router;





