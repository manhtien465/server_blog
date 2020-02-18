const config =require("config");
const jwt =require("jsonwebtoken")
auth=(req,res,next)=>{

const token= req.header('x-auth-token')
try{
  // const token =req.headers.authorization.split(" ")[1];
    const decoded= jwt.verify(token,config.get("JwtSecret"))
    req.users= decoded

    next();
}
catch(e){
    res.status(400).json({mes:"sai rồi"})
}
//verify token

}

module.exports=auth;