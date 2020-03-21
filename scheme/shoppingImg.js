const mongoose =require("mongoose");
const Schema=mongoose.Schema
const ShoppingSchema= new Schema({
    img:{
        type:String
    
    },
    
},
{
collection:"shoppingImg"    
})
const ShoppingImg=mongoose.model("shoppingimg",ShoppingSchema)
module.exports=ShoppingImg