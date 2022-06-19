import { Router } from "express";
import UserController from '../controllers/user'

const router = Router();

router.post('/registration', UserController.registration)
router.post('/login', (req, res) => {res.json("ssds")})
router.post('/logout', (req, res) => {res.json("ssds")})
router.get('/refresh', (req, res) => {res.json("ssds")})
router.get('/activate/:link', (req, res) => {res.json("ssds")})
router.post('/password', (req, res) => {res.json("ssds")})

export default router;
