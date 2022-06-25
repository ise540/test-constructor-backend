import { Router } from 'express';
import UserController from '../controllers/userController';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 6, max: 30 }),
  UserController.registration
);
router.post('/login', UserController.login);

router.post('/logout', UserController.logout);

router.post('/refresh', UserController.refresh);

router.get('/activate/:link', UserController.activate);

router.post('/password', UserController.resetPassword);

router.post('/password/:link', UserController.setNewPassword);


export default router;
