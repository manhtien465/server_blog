var mongoose =require('mongoose')
var Schema=mongoose.Schema;
var accountSchema= new Schema({
    username:{
         type:String,
         required:true,
    
    },
   passwork:{
        type:String,
        required:true,
   
   }
   
    
},
{
    timestamps:true,
}
);
module.exports= mongoose.model('account',accountSchema);