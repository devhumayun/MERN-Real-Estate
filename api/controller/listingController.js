import Listing from "../models/listingModel.js"
import { createError } from "../utils/createError.js"

// create listing
export const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)

        res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

// delete listing
export const deleteListing = async (req, res, next) => {
    try {
        const id = req.params.id
        const listing = await Listing.findById(id)
        if(!listing){
            return next(createError(404, "Listing not found"))
        }

        if(req.user !== listing.userRef){
            return next(createError(400, "You can only delete your won listing"))
        }

        await Listing.findByIdAndDelete(id)

        res.status(200).json("Listing delete success")
    } catch (error) {
        next(error)
    }
}

// update listing
export const updateListing = async (req, res, next) => {
    try {
        const id = req.params.id
        const listing = await Listing.findById(id)
        if(!listing){
            return next(createError(404, "Listing not found"))
        }
        if(req.user != listing.userRef){
            return next(createError(404, "You can update your own listing"))
        }
        const updated = await Listing.findByIdAndUpdate(id, {
            ...req.body
        }, {
            new: true
        })
        res.status(200).json(updated)
    } catch (error) {
        next(error)
    }
}