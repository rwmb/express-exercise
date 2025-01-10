import express from 'express';

import { getAndStoreAdvice } from './controller';

const router = express.Router({ mergeParams: true });

// TODO: Add auth middleware (depends on business logic)

router.post('/', getAndStoreAdvice); // TODO: Add access control middleware

export default router;
