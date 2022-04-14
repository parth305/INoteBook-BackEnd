const JWT=require("jsonwebtoken");
// const JWT_SECERET="thisissecerate";
const JWT_SECERET="thisissecerate";

let fetchuser=(req,res,next)=>{ 
    try{
    let token=req.header("token");

    if(!token){
        return res.status(401).json({error:"please enter token here",success:false,code:401})
    }
    let data=JWT.verify(token,JWT_SECERET);
    if(!data){
        return res.status(401).json({error:"go and create user first",success:false,code:401})
    }
    req.user={id:data.id}
    next();
}catch(error){
    return res.status(401).json({error:"some error occured",success:false,code:401});
}

}

module.exports=fetchuser