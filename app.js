const express=require("express");
const connecttomongoose=require("./db");
const app=express();

connecttomongoose();
app.get("/",(req,res)=>{
    res.send("hello parth")

})
app.listen(80,()=>{
    console.log("app started");
})