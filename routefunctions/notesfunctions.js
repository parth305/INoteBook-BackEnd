const Notes = require("../models/Notes")
const {  validationResult } = require('express-validator');

let getnote= async (req,res)=>{
    try{
    let note=await Notes.find({"user_id":req.user.id})
    return res.status(200).json({note:note,success:true,code:200});
    }catch(error){
        res.status(401).json({error:"some error occured",success:false,code:401});
    }
}

let addnote= async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg,success:false,code:400 });
    }
    try{
    let {title,description,tags}=req.body
    let note=new Notes({user_id:req.user.id,title,description,tags})
    console.log(note)
    let saved=await note.save();

    // console.log(saved);
    return res.status(200).json({note:saved,success:true,code:200});
    }catch(error){
        return res.status(401).json({error:error,success:false,code:401})
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
    if (!note){return res.status(500).json({error:"not found",success:false,code:500})}
    if (note.user_id!=req.user.id){return res.status(500).json({error:"not allowed",success:false,code:500})}

    let updatednote= await Notes.findByIdAndUpdate(note.id,{$set:newnote},{new:true})
    // console.log(updatednote)

    return res.status(200).json({note:updatednote,success:true,code:200})
    }catch(error){
        return res.status(500).json({error:"internal error occured",success:false,code:500})
    }
}

let deleatenote=async (req,res)=>{
    let id=req.params.id;
    try{
    let note =await Notes.findOne({"_id":id})

    if (!note){return res.status(500).json({error:"not found",success:false,code:500})}

    if (note.user_id!=req.user.id){return res.status(401).json({error:"not allowed",success:false,code:401})}

    note =await Notes.findByIdAndDelete(id)
    return res.status(200).json({msg:"successfully deleted",note:note,success:true,code:200})
    }catch(error){
        res.status(401).json({error:"internal server errror",success:false,code:401})
    }

}
module.exports={getnote,addnote,updatenote,deleatenote}