const mongoose=require("mongoose");

let NotesSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ReactUser"
    },
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