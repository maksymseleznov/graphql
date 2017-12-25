
import express from 'express';

import { bodyParserJson, enableCORS } from '../../../middlewares';

import { v0 as middlewareV0 } from '../../../middlewares/www';

/**********************************************************************************/

const router = express.Router();

// Config

router.use(bodyParserJson);
router.use(enableCORS);

/**********************************************************************************/

// Routers

router.get('/sign-in', middlewareV0.signIn);

router.get('/sign-out', middlewareV0.signOut);

router.post('/authentication', middlewareV0.authentication);

router.get('*', middlewareV0.loginRequired, middlewareV0.index);

/**********************************************************************************/

export default router;
