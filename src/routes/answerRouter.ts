import { Router } from "express";

const router = Router();

router.post('/answer_id', (req, res) => {res.json("ssds")})
router.get('/:test_id', (req, res) => {res.json("ssds")})

export default router;