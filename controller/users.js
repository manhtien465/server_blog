const Users = require("../scheme/users");
const JWT = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var Usergoogle = require("../scheme/usersgoole");
let UsersFacebook = require("../scheme/usersfacebook");
const config = require("config");
const key = require("../config/key");
const nodemailer=require('nodemailer')
const { sendConfirmationEmail,sendConfirmationEmailToChangepassword } = require("../misc/mailer");
signToken = users => {
  return JWT.sign(
    {
      iss: "xoaycodeeasy",
      sub: users._id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
    },
    key.jwt.JWT_SECRET
  );
};
module.exports = {
  manageUsers: async (req, res, next) => {
    Users.find()
      .sort({
        users: -1
      })
      .then(users => res.json(users));
  },
  register: async (req, res, next) => {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(404).json({
        meg: "pls enter all fields"
      });
    }
    Users.findOne({
      email
    }).then(users => {
      if (users) {
        return res.status(404).json({
          meg: "email have adready exist"
        });
      }
    });

    var newUsers = new Users({
      username,
      password,
      email
    });
    newUsers.save();

    sendConfirmationEmail(newUsers)
  
    res.status(200).json({
      mes: "please check your email"
    });
  },
  confirmEmail: async (req, res, next) => {
    const decode = JWT.verify(req.params.token, key.jwt.JWT_SECRET);
    var id = decode.sub;
    Users.findById(id,(err,doc)=>{
      if(err){
        console.log(err);
      }
      
      
      doc.active=true;
      doc.save()
    }
    );
    res.json({decode})
  },
  signIn: async (req, res, next) => {
    console.log(req.user);
    const token = signToken(req.user);
    res.status(200).json({
      token
    });
   
  },
  UserGoogle: async (req, res, next) => {
    console.log("ok");

    const token = signToken(req.user);
    res.status(200).json({
      token
    });
  },
  UserFacebook: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({
      token
    });
  },
  Forgotpass: async (req,res,next)=>{
    const {email}=req.body
     const  user= await Users.findOne({email})
      sendConfirmationEmailToChangepassword(user)
        res.json({mess:"we sent email,please check your email"})

  },
  Changepass:async(req,res,next)=>{
    const {newpassword,passwordConfirm}=req.body
    if(!newpassword==passwordConfirm){
      res.json({"mess":"passwordconfirm not correct"})
    }
    const decode = await JWT.verify(req.params.token, key.jwt.JWT_SECRET);
    var id = decode.sub;
    await Users.findById(id,(err,doc)=>{
      if(err){
        console.log(err);
      }
      
      
      doc.password=newpassword;
      doc.save()
    })
  }
  
};
