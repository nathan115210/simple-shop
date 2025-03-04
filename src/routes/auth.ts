import express from 'express';
import authController from '../controllers/auth';

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

export default router;
