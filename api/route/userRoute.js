import express from 'express'
import { deleteUser, userProfileUpdate } from '../controller/userController.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();

// user route manage
router.post("/update/:id", verifyToken, userProfileUpdate)
router.delete("/delete/:id", verifyToken, deleteUser)



export default router