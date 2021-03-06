import { Router } from "express";
import TestController from "../controllers/testController";

const router = Router();

router.post('/', TestController.create)
router.get('/', TestController.getAll)
router.get('/:id', TestController.getById)
router.put('/', TestController.update)
router.delete('/:id', TestController.delete)
router.get('/completed', TestController.getAllComplited)
router.get('/completed/:id', TestController.getComplitedById)

export default router;