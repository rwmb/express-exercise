import express from 'express';

import adviceRouter from './app/advice/router';

const router = express.Router();

router.get('/', (req, res) => res.send('ADVICE API IS ONLINE!'));

router.use('/advice', adviceRouter);

export default router;
