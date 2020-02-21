var express = require('express');
var router = express.Router();
var bcrypt =require("bcryptjs")
let Users = require('../Users')
var multer =require('multer')
var mongoose =require('mongoose')
const config=require('config')
const Jwt =require("jsonwebtoken")
/* GET users listing. */
const auth= require("../middleware/auth")
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

router.get('/', auth, (req, res) => {
  Users.findById(req.users.id)
    .select('-password')
    .then(users => res.json(users));
});
router.post("/login",upload.single("image"),(req,res)=>{
    const{ passwork,email}=req.body
    if(!passwork ||!email){
        return res.status(404).json({meg:"pls enter all fields"})
    }
    Users.findOne({email})
    .then(users=>{
        if (!users) return res.status(404).json({meg:"users not does not exist"})
      
        
      
        bcrypt.compare(passwork,users.passwork)
        .then(isMatch=>{
          if(!isMatch) return res.status(400).json({mgs:"invalid credential"})
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
               .catch(err=>{
                res.send(err)
        })
        })
    })
   
})
    
        

module.exports = router;
