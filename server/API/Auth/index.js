//Library
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import { UserModel } from "../../database/user";


const Router = express.Router();

/*
route   /signup
Des     Signup with email and password.
params  none
access  public
method  POST
*/

Router.post("/signup", async(req, res) => {
    try {
        const { email, password, fullname, phoneNumber } = req.body.credentials;
        //userDefineMethods 
        await UserModel.findByEmailAndPhone(email, phoneNumber);
        //save to DB
        const newUser = await UserModel.create(req.body.credentials);
        //generate JWT auth token
        const token = newUser.generateJwtToken();
        //return
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
})


/*
route   /signin
Des     Signin with email and password.
params  none
access  public
method  POST
*/
Router.post("/signin", async(req, res) => {
    try {
        //const { email, password, fullname, phoneNumber } = req.body.credentials;

        const { email, password } = req.body.credentials;
        //userDefineMethods 
        const user = await UserModel.findByEmailAndPassword(email, password);
        //generate JWT auth token
        const token = user.generateJwtToken();
        //return
        return res.status(200).json({ token, status: "success" });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});


/*
route   /google
Des     google Signin
params  none
access  public
method  get
*/

Router.get(
    "/google",
    passport.authenticate("google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
    })
);
/*
route   /google/callback
Des     google Signin callback
params  none
access  public
method  get
*/

Router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        return res.json({ token: req.session.passport.user.token });
    }
);




export default Router;