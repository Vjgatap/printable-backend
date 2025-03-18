import express from 'express'
import fileRouter from './fileRoutes.ts'
import webhookRouter from './webhookRoutes.ts'
import userRouter from './userRoutes.ts'
import orderRouter from './orderRoute.ts'
const router = express.Router();



router.use('/file', fileRouter);
router.use('/webhook', webhookRouter);
router.use('/user',userRouter)
router.use('/order',orderRouter)

export default router;
