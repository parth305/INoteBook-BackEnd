const JWT=require("jsonwebtoken");
const JWT_SECERET="thisissecerate";

let fetchuser=(req,res,next)=>{ 
    try{
    let token=req.header("token");

    if(!token){
        res.status(401).json({error:"please enter token "})
    }
    let data=JWT.verify(token,JWT_SECERET);
    if(!data){
        res.status(401).json({error:"go and create user first"})
    }
    req.user={id:data.id}
    next();
}catch(error){
    res.status(401).json({error:"some error occured"});
}

}

module.exports=fetchuser