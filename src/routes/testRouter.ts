import { Router } from 'express';
import TestController from '../controllers/testController';

const router = Router();

router.post('/', TestController.create);
router.get('/getAllTests', TestController.getAllTests);
router.get('/', TestController.getAllUserTests);
router.get('/completed', TestController.getAllComplited);
router.get('/:id', TestController.getById);
router.put('/', TestController.update);
router.delete('/:id', TestController.delete);
router.get('/completed/:id', TestController.getComplitedById);

export default router;
