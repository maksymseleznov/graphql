
import express from 'express';

import { bodyParserJson, enableCORS } from '../../../middlewares';

import { v0 as middlewareV0 } from '../../../middlewares/restful';

/**********************************************************************************/

const router = express.Router();

// Config

router.use(bodyParserJson);
router.use(enableCORS);

/**********************************************************************************/

// Routers
  
router.get('/', (req, res, next) => {
  res.json({ platform: "RESTful API", version: 0 });
});

router.get('/users', middlewareV0.users.LIST);
router.get('/users/:id', middlewareV0.users.GET);
router.post('/users', middlewareV0.users.POST);
router.put('/users/:id', middlewareV0.users.PUT);
router.delete('/users/:id', middlewareV0.users.DELETE);  

/**********************************************************************************/

export default router;
