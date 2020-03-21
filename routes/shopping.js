var express = require('express');
var router = express.Router();
let Food = require('../food')
const auth =require("../middleware/auth")
var multer =require('multer')
var mongoose =require('mongoose')
const passport=require("passport")

const ShoppingController=require("../controller/shopping")
// const uri = "mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/xoay?retryWrites=true&w=majority";
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
router.route("/upload-img")
.post(upload.single("file"),ShoppingController.uploadImg)
router.route("/display")
.post(ShoppingController.display);
router.route("/displayfull")
.post(ShoppingController.displayfull);
router.route("/upload")
.post(ShoppingController.upload);
router.route("/delete/:id")
.delete(ShoppingController.delete)
module.exports = router;