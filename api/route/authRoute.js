import express from 'express'
import { signIn, signOut, signUp } from '../controller/authController.js';

const router = express.Router();

// auth route manage
router.route('/sign-up').post(signUp)
router.route('/sign-in').post(signIn)
router.route('/sign-out').get(signOut)


export default router