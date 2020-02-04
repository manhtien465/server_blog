var express = require('express');
var router = express.Router();
let Food = require('../food')
var mongoose =require('mongoose')
/* GET users listing. */
router.get('/', function(req, res, next) {
    Food.find()
    .sort({food:-1})
    .then(food =>res.json(food))
 
});

router.post("/add",(req,res)=>{
  var newfood =new Food({
    title:req.body.title,
    subtitle:req.body.subtitle,
    content:req.body.content

})
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
