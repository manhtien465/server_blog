var express = require('express');
var router = express.Router();
let Food = require('../food')
const auth =require("../middleware/auth")
var multer =require('multer')
var mongoose =require('mongoose')
const uri = "mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/xoay?retryWrites=true&w=majority";
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
    Food.find()
    .sort({food:-1})
    .then(food =>res.json(food))
 
});


router.post("/add",auth,upload.single("image"),(req,res)=>{
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

router.delete('/delete/:id',auth, function(req, res, next) 
  {
    
    Food.findById(req.params.id)
    .then(food=>{
      food.remove().then(()=>{
        res.json(food)
      })
    })
    
  })
router.post('/edit',auth,upload.single("image"),function(req,res,next){
  var id =req.body.id
Food.findById(id,function(err,doc){
if(err){
  console.log(err)
  
}
doc.title=req.body.title;
doc.subtitle=req.body.subtitle;
doc.content=req.body.content;
doc.image=req.file.path;
doc.save()
})
})
module.exports = router;
