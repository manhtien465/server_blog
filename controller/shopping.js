const Shopping=require("../scheme/shopping")
const shoppingImg=require("../scheme/shoppingImg")
var multer =require('multer')
module.exports={
    uploadImg:async(req,res,next)=>{
        console.log(req.file);
        
         
         var newItem=new shoppingImg({
             
             img:req.file.path,
            

         })
         newItem.save()
         .then(item=>{
             res.json(item)
         })

    },display:async(req,res,next)=>{
        let order=req.body.order ?  req.body.order:"desc";
        let sortBy=req.body.sortBy ? req.body.sortBy:"_id";
        let limit=req.body.limit ? parseInt(req.body.limit):100;
        let skip=parseInt(req.body.skip)
        let findArgs={};
        let term=req.body.searchterm
        console.log(req.body.filters);
        
        for (let key in req.body.filters){

            if(req.body.filters[key].length >0){
                if (key ==="price"){

                }else{
                    findArgs[key]=req.body.filters[key]
                }
            }
        }
        if(term){
            
        Shopping.find(findArgs)
        .find({$text:{$search:term}})
       .sort([[sortBy,order]])
          .skip(skip)
          .limit(limit)
            .exec((err,shopping)=>{
                if(err) return res.json({success:false,err})
                res.json({success:true,shopping})
            })
        }else{
            Shopping.find(findArgs)
       .sort([[sortBy,order]])
          .skip(skip)
          .limit(limit)
            .exec((err,shopping)=>{
                if(err) return res.json({success:false,err})
                res.json({success:true,shopping})
            })
        }
      
    },
    displayfull:async(req,res,next)=>{
        
       Shopping.find()
            .exec((err,shopping)=>{
                if(err) return res.json({success:false,err})
                res.json({success:true,shopping})
            })
    },
    upload: async (req,res,next)=>{
   const {city,discription,price,img}=req.body
   var newItem =new Shopping({
       city,img,discription,price
   })
      await newItem.save()
      .then(item=>{
          res.status(200).json(item)
      })
      .catch(err=>{
          res.send(err)
      }   )
    },
    delete:async(req,res,next)=>{
       
         try{
shoppingImg.findById(req.params.id)
         .then(shoppingimg=>{
         shoppingimg.remove().then(()=>{
             res.json(shoppingimg)
         })
         })
         }catch(err){
        res.json(err)
         }
        
        
    }
}