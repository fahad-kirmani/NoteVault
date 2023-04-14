const jwt = require('jsonwebtoken');
const jwtSecret = "autheniNotebook"

const fetchuser = (req, res, next) =>{
    const token = req.header("auth-token")
    if(!token){
       return res.status(401).send({error: "empty token"});
    }
    try{
    const data = jwt.verify(token , jwtSecret);
    req.user = data.user
    next();
    }
    catch(err){
        return res.status(401).send({error: "Invalid token"});
    }
}


module.exports = fetchuser;