const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://mehulmk9179:SQAGTBcrOXh8J5XW@cluster0.pbylivg.mongodb.net/terra_do?retryWrites=true&w=majority").then((res)=>{
    console.log("Connected to Db");
}).catch((err)=>{
    console.log(err);
})