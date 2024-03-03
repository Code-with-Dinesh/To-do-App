const mongoose = require("mongoose")
const usermodel = require("./user.js")
const postSchema = mongoose.Schema({
    desc:{
        type:String,
        required:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    createAt:{
        type:  Date,
        default:Date.now()
    }
    
})
const Post = mongoose.model("Post",postSchema)
module.exports = Post