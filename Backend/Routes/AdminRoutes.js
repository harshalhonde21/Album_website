import express from 'express';
import { login } from '../Controller/AdminController.js';

const router = express.Router();

router.post('/login', login);

export default router;
