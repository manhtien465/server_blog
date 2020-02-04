var mongoose =require('mongoose')
var Schema=mongoose.Schema;
var foodSchema= new Schema({
    title:{
         type:String,
         required:true,
    
    },
    subtitle:{
        type:String,
        required:true,
   
   },
   content:{
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
}
);
module.exports= mongoose.model('food',foodSchema);