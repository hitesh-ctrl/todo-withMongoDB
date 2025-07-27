const jwt = require("jsonwebtoken")
const JWT_SECRET = '123455'

const auth = (req,res,next)=>{
    const token = req.headers.token;
    jwt.verify(token,JWT_SECRET,(err,decoded)=>{
        if(err){
            res.status(403).send("Wrong creds bro");

        }
        else 
            req.userId=decoded.userId;
            next()
    })
}
module.exports = auth;