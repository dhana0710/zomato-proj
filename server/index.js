//env variables
require("dotenv").config();

//libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
import googleAuthConfig from "./config/google.config";


//microservice router
import Auth from "./API/Auth";


//Database connectiom
import ConnectDB from "./database/connection";



const zomato = express();


//aplication middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport config

googleAuthConfig(passport);

//Application
zomato.use("/auth", Auth);

zomato.get("/", (req, res) => res.json({ message: "setup Scuccess .." }));

zomato.listen(4000, () => ConnectDB()
    .then(() => console.log("Server Running.🚀"))
    .catch(() => console.log("Server Running....🚀, but database connection fails"))
);