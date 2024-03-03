require("dotenv").config()
const mongoose = require("mongoose")
const connectDb = ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("DB Connection Successfully")
    }).catch((err)=>{
        console.log("Erro while connect Database")
    })
}

module.exports = connectDb;