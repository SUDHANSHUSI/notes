const userModel = require("../../model/user.model");

const userDetail=async (req,res)=>{
    try {
        let userId=req.userId;
        if(!userId){
         return res.status(404).json({
            message:"Invalid Token.."
          })
        }
        let user=await userModel.findById(userId);
        res.status(200).json({ 
          user,
        })
    } catch (error) {
        console.error(error.message);
    }
   
  }
  module.exports=userDetail