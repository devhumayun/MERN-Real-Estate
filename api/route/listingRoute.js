import express from 'express'
import {verifyToken} from '../utils/verifyToken.js';
import { createListing } from '../controller/listingController.js';

const router = express.Router();

// user route manage
router.post("/create/:id", verifyToken, createListing)


export default router