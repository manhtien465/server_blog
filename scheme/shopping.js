
const mongoose =require("mongoose");
const Schema=mongoose.Schema
const ShoppingSchema= new Schema({
    img:{
        type:Array
    
    },
    discription:{
          type:String
    },
    price:{
        type:String,

    },
    city:{
        type:String
    }
},
{
collection:"shopping"    
})
ShoppingSchema.index({
    city:"text",
    discription:"text"
},{
    weights:{city:5,
    discription:1,}
})
const Shopping=mongoose.model("shopping",ShoppingSchema)
module.exports=Shopping