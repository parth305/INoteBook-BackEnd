const express=require("express");
const myuserroutes=require("./routecontrollers/myuserroutes")
const mynoteroutes=require("./routecontrollers/mynoteroutes")

const connecttomongoose=require("./db");
const app=express();

connecttomongoose();

app.use(express.json())
app.use("/api/user",myuserroutes)
app.use("/api/notes",mynoteroutes)

app.listen(80,()=>{
    console.log("app started");
})