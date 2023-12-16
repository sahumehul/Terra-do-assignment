const express = require("express");
require("./db/config");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const cors = require("cors");
const User = require("./db/user");
const app = express();
app.use(express.json());
app.use(cors())

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

app.listen(5000)