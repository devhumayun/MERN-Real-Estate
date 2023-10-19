import express from 'express'
import { userProfileUpdate } from '../controller/userController.js';
import {verifyToken} from '../utils/verifyToken.js';
// import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// user route manage
router.post("/update/:id", verifyToken, userProfileUpdate)



export default router