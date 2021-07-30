import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    foood: {
        type: mongoose.Types.ObjectId,
        ref: "Foods",
    },
    restaurant: {
        type: mongoose.Types.ObjectId,
        ref: "Restaurants",
    },
    User: {
        type: mongoose.Types.ObjectId,
        ref: "Users",
    },
    rating: {
        type: Number,
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    photos: [{
        type: mongoose.Types.ObjectId,
        ref: "Images",
    }],

}, {
    //createdA t
    //updatedAt
    timestamps: true,
});

export const ReviewModel = mongoose.model("Reviews", ReviewSchema);