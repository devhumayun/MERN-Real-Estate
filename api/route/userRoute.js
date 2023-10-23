import express from 'express'
import { deleteUser, getLandlordUserInfo, userListing, userProfileUpdate } from '../controller/userController.js';
import {verifyToken} from '../utils/verifyToken.js';

const router = express.Router();

// user route manage
router.post("/update/:id", verifyToken, userProfileUpdate)
router.delete("/delete/:id", verifyToken, deleteUser)
router.get("/listing/:id", verifyToken, userListing)
router.get("/:id", verifyToken, getLandlordUserInfo)


export default router