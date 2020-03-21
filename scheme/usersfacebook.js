var mongoose =require('mongoose')
var Schema=mongoose.Schema;
var Usersfacebook= new Schema({
    id:{
         type:String,
         required:true,
         trim: true, index: true, unique :true 
    
    },
   
   email:{
    type:String,
    required:true,
    trim: true, index: true,unique :true 
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
    collection: 'Userfacebook'
},
);
module.exports= mongoose.model('usersfacebook',Usersfacebook);