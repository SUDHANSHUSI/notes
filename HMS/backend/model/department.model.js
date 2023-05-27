const mongoose=require('mongoose')

const departmentSchema=new mongoose.Schema({
    departmentName:{
        type:String,
        required:true
    },
    shortDesc:{
        type:String,
        required:true
    },
    LongDesc:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    includeDoctors:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    }]
})

module.exports=mongoose.model("Department",departmentSchema);