import express from 'express';
import { createUser, getUserById, getUsers } from '../controllers/user.controller';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
// @ts-ignore
router.get('/:userId', getUserById);

export default router;
