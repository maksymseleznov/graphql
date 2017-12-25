
import express from 'express';

import { bodyParserJson, enableCORS } from '../../../middlewares';

import { v1 as middlewareV1 } from '../../../middlewares/restful';

/**********************************************************************************/

const router = express.Router();

// Config

router.use(bodyParserJson);
router.use(enableCORS);

/**********************************************************************************/

// Routers
  
router.get('/', (req, res, next) => {
  res.json({ platform: "RESTful API", version: 1 });
});

router.get('/users', middlewareV1.users.LIST);
router.get('/users/:id', middlewareV1.users.GET);
router.post('/users', middlewareV1.users.POST);
router.put('/users/:id', middlewareV1.users.PUT);
router.delete('/users/:id', middlewareV1.users.DELETE);

/**********************************************************************************/

export default router;
