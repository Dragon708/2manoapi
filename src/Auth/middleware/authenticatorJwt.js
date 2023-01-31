import Jwt  from "jsonwebtoken";

function authenticateToken(req,res,next) {
    const  authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).json({error : 'Null Token'})
    }
    Jwt.verify(token, process.env.SECRET,(error,user)=>{
        if(error)return res.status(403).json({error: 'No Esta Authorizado Para Esta Operacion '});
        req.user = user;
        next()
    })
}

export {authenticateToken};