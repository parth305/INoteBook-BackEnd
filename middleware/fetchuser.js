const JWT=require("jsonwebtoken");
const User = require("../models/User");
// const JWT_SECERET="thisissecerate";
const JWT_SECERET="thisissecerate";
// User
let fetchuser=async (req,res,next)=>{ 
    try{
    let token=req.header("token");
        // console.log(token);
    if(!token){
        return res.status(401).json({error:"please login first",success:false,code:401})
    }
    let data=JWT.verify(token,JWT_SECERET);
    // console.log(data)
    if(!data){
        return res.status(401).json({error:"go and create user first",success:false,code:401})
    }
    let user=await User.findOne({"_id":data.id})
    if(!user){
        return res.status(400).json({error:"please login first",success:false,code:400});
    }
    req.user={id:data.id}
    next();
}catch(error){
    return res.status(401).json({error:"Please login first",success:false,code:401});
}

}

module.exports=fetchuser