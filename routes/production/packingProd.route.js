import express from 'express';
const router = express.Router();

import { getPackingIn } from '../../controllers/prodpacking/PackingIn.js';

router.get('/packing-in/:date/:unit', getPackingIn);

export default router;
