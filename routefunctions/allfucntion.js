const User = require("../models/User");
const { body, validationResult } = require('express-validator');

let login=(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    User.create({
        username: req.body.username,
        password: req.body.password,
        email:req.body.email
      }).then(user => res.json(user)).catch(err=>{
          console.log(err)
          res.json({message:"pelase enter uniq value",err:err.message})
        });
    // res.send("Login successful")
}

let note=(req,res)=>{
    res.send("notes sent")
}

module.exports={note,login}