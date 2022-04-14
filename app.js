const express=require("express");
const myuserroutes=require("./routecontrollers/myuserroutes")
const mynoteroutes=require("./routecontrollers/mynoteroutes")
const cors=require("cors")

const connecttomongoose=require("./db");
const app=express();

connecttomongoose();

app.use(cors())
app.use(express.json())
app.use("/api/user",myuserroutes)
app.use("/api/notes",mynoteroutes)

app.listen(5055,()=>{
    console.log("app started");
})