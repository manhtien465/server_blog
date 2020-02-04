var express = require('express');
var router = express.Router();
let food = require('../food')


router.get('/', function(req, res, next) {
  
  
   
res.render('index')
});
router.post('/posts', async (req, res,next) => {
    const newfood =new food({
        name:req.body.name,
        fooddis:req.body.fooddis
    })
    newfood.save((err)=>{
        if(err){
        res.json({
            resuilt:'failed',
            data:{},
            message:`error is:${err}`
        })}
        else{
            res.json({
                resuilt:'ok',
                data:{
                    name:req.body.name,
                    fooddis:req.body.fooddis,
                    message:"successful"
                }
            })
        }
    })
  })
module.exports = router;
