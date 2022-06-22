import { Router } from 'express';
import UserController from '../controllers/user';
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
router.get('/refresh', (req, res) => {
  res.json('ssds');
});
router.get('/activate/:link', UserController.activate);
router.post('/password', (req, res) => {
  res.json('ssds');
});

export default router;
