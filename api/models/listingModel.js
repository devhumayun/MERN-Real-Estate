import mongoose from "mongoose";

const listingSchema = mongoose.Schema({
    name: {
        type: String,
        requried: true
    },
    description:{
        type: String,
        requried: true
    },
    address:{
        type: String,
        requried: true
    },
    salePrice: {
        type: Number,
        requried: true
    },
    discountPrice: {
        type: Number,
        requried: true
    },
    bedrooms: {
        type: Number,
        requried: true
    },
    bathrooms: {
        type: Number,
        requried: true
    },
    furnished: {
        type: Boolean,
        requried: true
    },
    parking: {
        type: Boolean,
        requried: true
    },
    type: {
        type: String,
        requried: true
    },
    offer: {
        type: Boolean,
        requried: true
    },
    imageUrl: {
        type: Array,
        requried: true
    },
    userRef: {
        type: String,
        requried: true
    }
}, {
    timestamps : true
});


// export default listing model model
export default mongoose.model( 'Listing', listingSchema )