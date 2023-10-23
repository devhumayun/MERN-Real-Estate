import Listing from "../models/listingModel.js";
import { createError } from "../utils/createError.js";

// create listing
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

// delete listing
export const deleteListing = async (req, res, next) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(createError(404, "Listing not found"));
    }

    if (req.user !== listing.userRef) {
      return next(createError(400, "You can only delete your won listing"));
    }

    await Listing.findByIdAndDelete(id);

    res.status(200).json("Listing delete success");
  } catch (error) {
    next(error);
  }
};

// update listing
export const updateListing = async (req, res, next) => {
  try {
    const id = req.params.id;
    const listing = await Listing.findById(id);
    if (!listing) {
      return next(createError(404, "Listing not found"));
    }
    if (req.user != listing.userRef) {
      return next(createError(404, "You can update your own listing"));
    }
    const updated = await Listing.findByIdAndUpdate(
      id,
      {
        ...req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// get listing data
export const getListingData = async (req, res, next) => {
  try {
    const listingInfo = await Listing.findById(req.params.id);
    if (!listingInfo) {
      return next(createError(404, "Listing not found"));
    }
    res.status(200).json(listingInfo);
  } catch (error) {
    next(error);
  }
};

/**
 * get and search listing
 */
export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === false) {
      offer = { $in: [true, false] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === false) {
      furnished = { $in: [true, false] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["rent", "sale"] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === false) {
      parking = { $in: [true, false] };
    }

    const searchTerm = req.query.searchTerm || "";
    const sort = req.query.sort || "createdAt";
    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      furnished,
      parking,
      type,
      offer,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
