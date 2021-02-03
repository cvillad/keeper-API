const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const User = require("../models/User")

router.use(bodyParser.json());

router.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.post("/login", (req, res) => {
    const {email, password} = req.body;
    const user = new User({
        username: email, password
    });
    req.login(user, (err)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            console.log("User logged succesfully")
            res.send({success: "User logged succesfully"})
        }
    })
});

router.post("/register", (req, res)=>{
    const{firstName, lastName, email, password} = req.body;
    User.register({firstName, lastName, username: email, email}, password, (err, user)=>{
        if(err){
            console.log(err);
            res.send(err);
        }else{
            User.authenticate("username", "password", (err, result)=>{
                console.log({
                    success: "User registered successfully",
                    data: user
                })
                res.send({
                    success: "User registered successfully",
                    data: user
                })
            })
        }
    })
});

module.exports = router