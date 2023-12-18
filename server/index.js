const express = require("express");
require("./db/config");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors");
const User = require("./db/user");
const Tasks = require("./db/addTask");
const auth = require("./db/auth")
const app = express();
app.use(express.json());
app.use(cors());


app.get("/gettasks",(req,res)=>{

    Tasks.find().then((result)=>{
        res.status(200).json({
            message : "Data fetched",
            data : result
        })
    }).catch((err)=>{
        res.status(400).json({
            message : "Something went wrong",
            data : err
        })
    })
})

app.post("/register", (req,res)=>{

    const { name,email, password } = req.body;
    bcrypt.hash(password, 10).then(hashPass => { // encrypting password  times with bcrypt
       
        const userData = new User({
            name,
            email,
            password: hashPass
        })
       
        // saving email and encrypted password to DB
        userData.save().then(result => {
            res.status(200).json({
                message: "User Created successfully!!",
                data: result,
            })
        }).catch(err => {
            // handle error if email is not found unique
            res.status(400).json({
                message: "Email already exist!!",
                errDesc: err
            })
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal Server Error!!"
        })
    })
})

app.post("/login", async (req, res) => {
   
    const loginCred = req.body;
    User.findOne({ email: loginCred.email }).then(user => {
        if (user) {  // will give response from DB

            // if user found then it will encrypt password and compare with DB password 
            bcrypt.compare(loginCred.password, user.password).then(response => {
                if (response) {  // password is correct then create web token
                    const jwtToken = jwt.sign({
                        email: user.email,
                        id: user._id,
                    },
                        "Terrado", {
                        expiresIn: "24h"
                    })
                    res.status(200).json({
                        message : "Login credential matched!!",
                        Token : jwtToken,
                        email: user.email,
                    })
                } else {
                    res.status(400).json({
                        message: "Email or password does not match!!"
                    })
                }
            })
        } else {
            res.status(400).json({
                message: "Email is not registered with us.."
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server Error!!"
        })
    })
})


app.post("/addtask",(req,res)=>{
    const taskData = new Tasks(req.body)

    taskData.save().then((response)=>{
        res.status(200).json({
            message : "Task added successfully",
            data : response
        })
    }).catch((err)=>{
        res.status(400).json({
            message : "Internal server error",
            data : err
        })
    })
})

app.put("/updatetask/:id",(req,res)=>{
    const id = req.params.id;
    const updatedData = req.body;
    Tasks.findByIdAndUpdate({_id:id},updatedData,{new:true}).then((response)=>{
        res.status(200).json({
            message : "Task Updated",
            data : response
        })
    }).catch((err)=>{
        res.status(400).json({
            message : "Something went wrong",
            data : err
        })
    })
})

app.delete("/delete/:id", (req, res) => {
    Tasks.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount) {
            res.status(200).json({
                message: "Deleted Successfully",
                data: response
            })
        } else {
            res.status(400).json({
                message: "Id not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error.."
        })
    })
})

app.listen(5000)