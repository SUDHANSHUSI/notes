const express=require('express');
const jwt=require('jsonwebtoken');
const auth=(req,res,next)=>{
    let token=''
    try {
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(token){
            let user=jwt.verify(token,process.env.JWT_SECRETKEY);
           
            req.userId=user.id;
            if(!req.userId){
                return res.status(404).json({
                   message:"User Not Exist.."
                 })
               }
            
        }else{
         return  res.status(401).json({message:"Unauthorized User"})
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({message:"Unauthorized User"})
    }
    next()
}

module.exports=auth;