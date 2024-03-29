import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({

    fullname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    address: [{ details: { type: String }, for: { type: String } }],
    phoneNumber: [{ type: Number }],

}, {
    //createdA t
    //updatedAt
    timestamps: true,
});


UserSchema.methods.generateJwtToken = function() {
    return jwt.sign({ user: this._id.toString() }, "ZomatoAPP");
};

UserSchema.statics.findByEmailAndPhone = async(email, phoneNumber) => {
    //check whether email exit
    //if new signup return- null
    const checkUserByEmail = await UserModel.findOne({ email: email });
    const checkUserByPhone = await UserModel.findOne({ phoneNumber });

    if (checkUserByPhone || checkUserByEmail) {
        //return res.json({ error: "User already exits." });
        throw new Error("User Already Exist...!")
    }
    return false;
};

UserSchema.statics.findByEmailAndPassword = async(email, password) => {
    //check whether email exit(null or fullUser)
    const user = await UserModel.findOne({ email });
    if (!user) throw new Error("User does not exit..!!")

    //compare password
    const doesPasswordMatch = await bcrypt.compare(password, user.password);

    if (!doesPasswordMatch) throw new Error("Invalid Password 👎");

    return user;

}

UserSchema.pre("save", function(next) {
    const user = this;

    //password is modified(check for password)
    if (!user.isModified("password")) return next();

    //generate bcrypt salt
    bcrypt.genSalt(8, (error, salt) => {
        if (error) return next(error);

        //hash the passsw
        bcrypt.hash(user.password, salt, (error, hash) => {
            if (error) return next(error);

            //assigning hashed password
            user.password = hash;
            return next();
        });
    });
});


export const UserModel = mongoose.model("Users", UserSchema);