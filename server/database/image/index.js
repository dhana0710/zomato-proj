import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({

    images: [{
        location: { type: String, required: true },
    }, ],
}, {
    //createdA t
    //updatedAt
    timestamps: true,
});

export const ImageModel = mongoose.model("Images", ImageSchema);