const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")
const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
      
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
})
userSchema.plugin(plm)
const user = mongoose.model("user",userSchema)
module.exports = user;