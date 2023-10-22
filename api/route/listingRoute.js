import express from 'express'
import {verifyToken} from '../utils/verifyToken.js';
import { createListing, deleteListing } from '../controller/listingController.js';

const router = express.Router();

// user route manage
router.post("/create", verifyToken, createListing)
router.delete("/delete/:id", verifyToken, deleteListing)


export default router