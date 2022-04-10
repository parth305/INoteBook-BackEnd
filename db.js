const mongoose=require("mongoose");

const connecttomongoose=()=>{
    mongoose.connect("mongodb://localhost/bhyu",()=>{
        console.log("connected to database");
    })
}

module.exports=connecttomongoose