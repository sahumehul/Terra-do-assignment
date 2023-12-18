const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
console.log("reached auth")
    try {

        const token = req.headers.authorization // It will look for token in headers
        const verify = jwt.verify(token, "Terrado"); // verify token
        req.id = verify.id   // store user ref id
        console.log("auth sucess")
        next();
    }
    catch {
        res.status(400).json({
            message: "Authentication failed"
        }) // error
        console.log("auth failed");
    }

}

module.exports = auth;