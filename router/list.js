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
router.get("/distroy/:id",async(req,res)=>{
    let id = req.params.id;
    console.log(id)
    const deletepost = await postmodel.findByIdAndDelete({_id:id})
    let userdata = await usermodel.findOne({username:req.session.passport.user})
    userdata.posts.pop()
    console.log(userdata)
    console.log(deletepost)
    res.redirect("/profile")
})
router.get("/login",async(req,res)=>{
    res.render("login.ejs")
})

router.get("/profile",isloggedIn,async(req,res)=>{
    res.render("profile.ejs")
})
router.post("/register",async function(req,res,next){
    let {username,fullname,email} = req.body;
    let userdata = new usermodel({username,fullname,email})
    usermodel.register(userdata,req.body.password).then(()=>{
        passport.authenticate("local")(req,res,function(){
            res.render("profile")
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
router.post("/show",isloggedIn,async (req,res)=>{
    const {desc} = req.body;
    const userdata = await usermodel.findOne({username:req.session.passport.user}).populate("posts")
    const postdata = await postmodel.create({desc})
    userdata.posts.push(postdata._id)
    // console.log(userdata)
    await userdata.save()
    res.render("display.ejs",{userdata})
})

function isloggedIn(req,res,next){
    if(req.isAuthenticated()) return next()
    res.redirect("/login")
}

module.exports = router