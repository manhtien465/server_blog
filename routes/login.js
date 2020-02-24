var express = require('express');
var router = express.Router();
var bcrypt =require("bcryptjs")

var passportFacebook = require('../config/passport-setup');
const key =require("../config/key")
let Users = require('../scheme/users')
let UsersFacebook =require('../scheme/usersfacebook')
var multer =require('multer')
var mongoose =require('mongoose')
const config=require('config')
const Jwt =require("jsonwebtoken")
/* GET users listing. */

const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/images')
  },
  filename: function(req,file,cb){
    cb(null ,Date.now() + file.originalname) 
  }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
const upload=multer({
  storage:storage,
  limits:{fileSize:1000000},
  fileFilter: fileFilter
})

router.get('/', function(req, res, next) {
    Users.find()
    .sort({users:-1})
    .then(users =>res.json(users))
 
});
router.post("/adduser",upload.single("image"),(req,res)=>{
    const{username,passwork,email}=req.body
    if(!username||!passwork ||!email){
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
            passwork,
            email,
        }
        )
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUsers.passwork,salt,(err,hash)=>{
                if(err) throw err;
                newUsers.passwork=hash
                newUsers.save()
                 .then(users=>{
                     Jwt.sign(
                         {users},
                         config.get('JwtSecret'),
                         {expiresIn:3600},
                         (err,token)=>{
                             if(err) throw err;
                             res.json({
                                 token,users
                             })
                            })
                               
                         }
                     )
                     .catch(err=>{
                       res.json(err)
                     })
                      
            })
        })

})
router.post("/addusersfacebook",(req,res)=>{
  const{ email,username}=req.body
  UsersFacebook.findOne({email})
  .then(usersfacebook=>{
    if(!usersfacebook){
      var newUsersfacebook =new UsersFacebook({
         username,
         email,
     }
     )
     bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(newUsersfacebook.email,salt,(err,hash)=>{
          
          newUsersfacebook.email=hash
          newUsersfacebook.save()
           .then(usersfacebook=>{
               Jwt.sign(
                   {usersfacebook},
                   config.get('JwtSecret'),
                   {expiresIn:3600},
                   (err,token)=>{
                       if(err) throw err;
                       res.json({
                           token,usersfacebook
                       })
                      })
                         
                   }
               )
               .catch(err=>{
                 res.json(err)
               })
                
      })
  })
    }else{
      bcrypt.compare(email,usersfacebook.email)
        .then(isMatch=>{
          if(!isMatch) return res.status(400).json({mgs:"invalid credential"})
          Jwt.sign(
            {usersfacebook},
            config.get('JwtSecret'),
            {expiresIn:3600},
            (err,token)=>{
                if(err) throw err;
                res.json({
                    token,usersfacebook
                })
               })
               .catch(err=>{
                res.send(err)
        })
        })
    }
  })
})
router.get(
  "/google",
  passportFacebook.authenticate("google", { scope: ["profile", "email"] },(req,res,next)=>{
    err=>{
      console.log(err);
      
    }
  })
);
router.get(
  "/google/callback",
  passportFacebook.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });
module.exports = router;
