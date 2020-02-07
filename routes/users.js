var express = require('express');
var router = express.Router();
let Food = require('../food')
let login = require('../login')
var multer =require('multer')
var mongoose =require('mongoose')

/* GET users listing. */
const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./images')
  },
  filename: function(req,file,cb){
    cb(null ,Date.now() + file.originalname) 
  }
})
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
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
    Food.find()
    .sort({food:-1})
    .then(food =>res.json(food))
 
});
router.get('/login', function(req, res, next) {
    login.find()
    .sort({account:-1})
    .then(account =>res.json(account))
 
});
router.post("/login/add",(req,res)=>{
  
   
    var newaccount=new login({
    username:req.body.username,
      subtitle:req.body.username,
      
  
  })
  newaccount.save()
  .then(account=>{
      res.json(account)
  })
  .catch(err=>{
      res.send(err)
  })
  })
router.post("/add",upload.single("image"),(req,res)=>{
    console.log(req.file);
        var newfood =new Food({
            title:req.body.title,
            subtitle:req.body.subtitle,
            content:req.body.content,
            image:req.file.path
           
        
        }
        )
newfood.save()
.then(food=>{
    res.json(food)
})
.catch(err=>{
    res.send(err)
})
})

router.delete('/delete/:id', function(req, res, next) {
Food.findById(req.params.id) 
.then(foof=>food.remove().then(()=>{
    res.json({success:true})
}))  
.catch(err=> res.status(404).json({success:true}))
});
module.exports = router;
