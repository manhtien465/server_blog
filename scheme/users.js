var mongoose =require('mongoose')
var bcrypt =require("bcryptjs")
const randomstring =require("randomstring")
var Schema=mongoose.Schema;

var userSchema= new Schema({
    username:{
         type:String,
          unique :true 
    
    },
    password:{
        type:String,
         
   
   },
   
   email:{
    type:String,
    unique :true 
}, 
id:{
    type:String,
    unique :true 
} ,
secretToken:{
    type:String,
    unique :true 
} ,
active:{
    type:Boolean
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
userSchema.pre("save",async function(next){
try{
  
const salt=await bcrypt.genSalt(10)
 const passwordHash =await bcrypt.hash(this.password,salt)
 //tao secretToken de gui verifi email
 const secretToken=randomstring.generate()
this.secretToken=secretToken
//tao trang thai false (chua )
this.active=false;
 this.password=passwordHash
 next()
}catch(error){
next(error)
}
})
userSchema.methods.isValidPassword=async function(newPassword){
try{
  return await bcrypt.compare(newPassword,this.password)                 //phair cos return
}catch(error){
    throw new error
}
}
module.exports= mongoose.model('users',userSchema);