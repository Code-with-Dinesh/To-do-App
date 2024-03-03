require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT;
const connectDb = require("./cofig/connection.js") 
const router = require("./router/list.js")
const postmodel = require("./models/post.js")
const usermodel = require("./models/user.js")
const session = require("express-session")
const passport = require("passport")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
const path = require("path")
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"Radha Krishan"
}))
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(usermodel.serializeUser())
passport.deserializeUser(usermodel.deserializeUser())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use("/",router)
app.listen(port,()=>{
    console.log(`All listen on port number ${port}`)
})
app.get("/",async function(req,res){
    res.render("signin")
})
connectDb();