import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
    menus: [{
        name: { type: String, required: true },
        items: [{
            type: mongoose.Types.ObjectId,
            ref: "Foods",
        }, ],
    }, ],
    recommended: [{
        type: mongoose.Types.ObjectId,
        ref: "Foods",
        unique: true,
    }, ],

}, {
    //createdAt
    //updatedAt
    timestamps: true,
});

export const MenuModel = mongoose.model("Menu", MenuSchema);