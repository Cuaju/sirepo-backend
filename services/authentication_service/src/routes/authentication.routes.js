import { Router } from 'express';
import {
  login,
  loginByToken} from '../controllers/authentication.controller.js';

const router = Router();

router.post('/login', login);
router.post('/login/token', loginByToken);

export default router;