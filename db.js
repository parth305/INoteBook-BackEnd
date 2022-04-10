const mongoose = require("mongoose");

const connecttomongoose = () => {
    // mongoose.connect("mongodb://localhost/bhyu",()=>{
        //console.log("connected to database")
    // });

    mongoose.connect('mongodb://localhost/bhyu').then(() => {
        console.log("connected to database");
    }).catch(err => console.log(err.message))
}

module.exports = connecttomongoose