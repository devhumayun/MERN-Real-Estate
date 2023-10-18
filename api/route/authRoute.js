import express from 'express'
import { signIn, signUp } from '../controller/authController.js';

const router = express.Router();

// auth route manage
router.route('/sign-up').post(signUp)
router.route('/sign-in').post(signIn)


export default router