const express=require("express");
// const { default: mongoose } = require("mongoose");
const connecttomongoose=require("./db");
const app=express();

connecttomongoose();

// app.get("/",(req,res)=>{
//     res.send("hello parth")

    // const db = mongoose.connection.db;

    // finding from colelction
    // db.collection('people').find().toArray((err, result) => {
    //     console.log(result)
    // });

    //inerting data
    // var myobj = { name: "Com", address: "vyara" };
    // db.collection("people").insertOne(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    // });

// })
app.listen(80,()=>{
    console.log("app started");
})