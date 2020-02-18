var mongoose =require('mongoose')
var Schema=mongoose.Schema;
var Users= new Schema({
    username:{
         type:String,
         required:true,
         trim: true, index: true, unique :true 
    
    },
    passwork:{
        type:String,
        required:true,
        trim: true, index: true, unique :true
   
   },
   passworkagain:{
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
    collection: 'login'
},
);
module.exports= mongoose.model('users',Users);