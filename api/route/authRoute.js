import express from 'express'
import { signUp } from '../controller/authController.js';

const router = express.Router();

// auth route manage
router.route('/signup').post(signUp)

export default router