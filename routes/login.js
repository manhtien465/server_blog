const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf =require('../passport');

var bcrypt =require("bcryptjs")
var Usergoogle = require('../scheme/usersgoole');

const key =require("../config/key")
const UserController=require("../controller/users")
const { validateBody, schemas } = require('../helpers/routerHelpers');
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
router.route("/manage-users")
.get(UserController.manageUsers)
router.route("/adduser")
.post(validateBody(schemas.authSchema),UserController.register)
router.route('/:token')
.get(UserController.confirmEmail)
router.route('/forgotpassword')
.post(UserController.Forgotpass)
router.route("/forgotpassword/verify/:token")
.post(UserController.Changepass)
router.route('/signin')
  .post(passport.authenticate('local',{session:false}),UserController.signIn);
router.route("/auth/google")
.post(passport.authenticate('googleToken',{session:false}),UserController.UserGoogle)
router.route("/auth/facebook")
.post(passport.authenticate('FacebookToken',{session:false}),UserController.UserFacebook)


module.exports = router;
