import { Router } from 'express';
import auth from '../middlewares/auth';
import answerRouter from './answerRouter';
import testRouter from './testRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/test', auth, testRouter);
router.use('/answer', auth, answerRouter);

export default router;
