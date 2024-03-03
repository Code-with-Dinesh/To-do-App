const express = require("express");
const router = express.Router();
const usermodel = require("../models/user.js")
const postmodel = require("../models/post.js")
const localStategy = require("passport-local");
const passport = require("passport");
const path = require("path")
passport.use(new localStategy(usermodel.authenticate()))
router.get("/",async function(req,res){
    res.render("signin.ejs")
})

router.get("/login",async(req,res)=>{
    res.render("login.ejs")
})

router.get("/profile",isloggedIn,async(req,res)=>{
    res.send("This is profile page")
})
router.post("/register",async function(req,res,next){
    let {username,fullname,email} = req.body;
    let userdata = new usermodel({username,fullname,email})
    usermodel.register(userdata,req.body.password).then(()=>{
        passport.authenticate("local")(req,res,function(){
            res.redirect("/profile")
        })
    })
    
})

router.post("/login",passport.authenticate("local",{
    successRedirect:"/profile",
    failureRedirect:"/login",
}),function(req,res){})

router.get("/logout",function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err)
        }
        else{
            res.redirect("/")
        }
    })
})

function isloggedIn(req,res,next){
    if(req.isAuthenticated()) return next()
    res.redirect("/login")
}
module.exports = router