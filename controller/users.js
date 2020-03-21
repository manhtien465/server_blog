const Users = require('../scheme/users')
const JWT = require('jsonwebtoken');
var bcrypt =require("bcryptjs")
var Usergoogle = require('../scheme/usersgoole');
let UsersFacebook =require('../scheme/usersfacebook')
const config=require('config')
const key =require("../config/key")
signToken = users => {
  return JWT.sign({
    iss: 'CodeWorkr',
    sub: users._id,
    iat: new Date().getTime(), // current time
    exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
  }, key.jwt.JWT_SECRET);
}
module.exports={
    manageUsers: async (req,res,next)=>{
        Users.find()
        .sort({users:-1})
        .then(users =>res.json(users))
    },
    register:async(req,res,next)=>{
        const{username,password,email}=req.body
    if(!username||!password ||!email){
        return res.status(404).json({meg:"pls enter all fields"})
    }
    Users.findOne({email})
    .then(users=>{
        if (users) {
            return res.status(404).json({meg:"email have adready exist"})
        }
    })
    
    
        var newUsers =new Users({
           username,
            password,
            email,
        }
        )
        newUsers.save()
        const token = signToken(newUsers)
       res.status(200).json({token})
        
    },
    signIn:async(req,res,next)=>{ 
      console.log(req.user);
       const token=signToken(req.user)
       res.status(200).json({token})
  },
     UserGoogle:async(req,res,next)=>{
       console.log("ok");
       
        
       const token = signToken(req.user)
     res.status(200).json({token})
       
        
     },
     UserFacebook: async(req,res,next)=>{
       
      const token = signToken(req.user)
     res.status(200).json({token})
      
       
      },
      
     
}