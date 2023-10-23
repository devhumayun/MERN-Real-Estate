import express from 'express'
import {verifyToken} from '../utils/verifyToken.js';
import { createListing, deleteListing, getListingData, getListings, updateListing } from '../controller/listingController.js';

const router = express.Router();

// user route manage
router.post("/create", verifyToken, createListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.post("/update/:id", verifyToken, updateListing)
router.get("/get/:id", getListingData)
router.get("/get", getListings)


export default router