const mongoose=require("mongoose");

let NotesSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        default:"Genral"
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("Note",NotesSchema);