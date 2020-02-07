var mongoose =require('mongoose')
var Schema=mongoose.Schema;
var foodSchema= new Schema({
    title:{
         type:String,
         required:true,
         trim: true, index: true, unique :true 
    
    },
    subtitle:{
        type:String,
        required:true,
        trim: true, index: true, unique :true
   
   },
   content:{
    type:String,
    required:true,
    trim: true, index: true,unique :true 
}, 
 image:{
    type:String,
    required:true,
    

},
 
    
    day:{
        type:Date,
        default: Date.now
    },
    
},
{
    timestamps:true,
},
{
    collection: 'newfood'
},
);
module.exports= mongoose.model('food',foodSchema);