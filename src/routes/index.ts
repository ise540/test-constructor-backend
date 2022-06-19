import { Router } from 'express';
import answerRouter from './answerRouter';
//import testRouter from './testRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
//router.use('/test', testRouter);
router.use('/answer', answerRouter);

export default router;
