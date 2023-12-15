const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/user");
const app = express();
app.use(express.json());
app.use(cors())

app.post("/register",async (req,res)=>{

    const user = new User(req.body);
    const result = await user.save()
    res.send(result)
})



app.listen(5000)