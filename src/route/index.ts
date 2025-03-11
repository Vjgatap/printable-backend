import express from 'express'
import fileRoute from './fileRoutes.ts'
import webhookRoute from './webhookRoutes.ts'
const router = express.Router();



router.use('/file', fileRoute);
router.use('/webhook', webhookRoute);

export default router;
