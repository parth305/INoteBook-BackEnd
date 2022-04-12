const Notes = require("../models/Notes")
const {  validationResult } = require('express-validator');

let getnote= async (req,res)=>{
    try{
    let note=await Notes.find({"user_id":req.user.id})
    res.status(200).json(note);
    }catch(error){
        res.status(401).json({error:"some error occured"});
    }
}

let addnote= async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
    let {title,description,tag}=req.body
    let note=new Notes({user_id:req.user.id,title,description,tag})
    let saved=await note.save();

    // console.log(saved);
    res.status(200).json({saved});
    }catch(error){
        res.status(401).json(error)
    }
}

let updatenote=async (req,res)=>{
    let {title,description,tags}=req.body

    let newnote={}
    try{
    if (title){newnote.title=title}
    if (description){newnote.description=description}
    if (tags){newnote.tags=tags}

    let note =await Notes.findOne({"_id":req.params.id})
    if (!note){return res.status(500).send("not found")}
    if (note.user_id!=req.user.id){return res.status(500).send("not allowed")}

    let updatednote= await Notes.findByIdAndUpdate(note.id,{$set:newnote},{new:true})
    // console.log(updatednote)

    res.send(updatednote)
    }catch(error){
        res.status(500).send("internal error occured")
    }
}

let deleatenote=async (req,res)=>{
    let id=req.params.id;
    try{
    let note =await Notes.findOne({"_id":id})

    if (!note){return res.status(500).send("not found")}

    if (note.user_id!=req.user.id){return res.status(401).send("not allowed")}

    note =await Notes.findByIdAndDelete(id)
    res.status(200).send({msg:"successfully deleted",note:note})
    }catch(error){
        res.status(401).send("internal server errror")
    }

}
module.exports={getnote,addnote,updatenote,deleatenote}