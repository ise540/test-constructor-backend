import { Router } from "express";
import answerController from "../controllers/answerController";

const router = Router();

router.post('/answer_id', answerController.sendAnswer)
router.get('/:testId', answerController.getTestAnwers)

export default router;