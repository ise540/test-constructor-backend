import { Router } from "express";
import answerController from "../controllers/answerController";

const router = Router();

router.post('/submit', answerController.submitAnswers)
router.post('/:answerId', answerController.sendAnswer)
router.get('/:testId', answerController.getTestAnwers)

export default router;