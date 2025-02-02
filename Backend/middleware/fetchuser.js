//  middle ware k function likhun ga 
const jwt = require('jsonwebtoken');
// fetchuser is afunction  request,response and next aik middleware leta next wla call hu ga
const JWT_SECRET= "your_secret_key";

const fetchuser=(req,res,next)=>{
    // get the user from JWT token and add id to request object token laun ga token header say laun ga
    const token=req.header('auth-token');
    // agr token majood nai hai tou access denied hu ga agr token na hu
    if(!token){
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next();

    } catch (error) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
}

module.exports=fetchuser;
