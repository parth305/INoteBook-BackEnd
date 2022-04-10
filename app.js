const express=require("express");
const myroutes=require("./routecontrollers/myroutes")
const connecttomongoose=require("./db");
const app=express();

connecttomongoose();

app.use(express.json())
app.use("/api",myroutes)

app.listen(80,()=>{
    console.log("app started");
})