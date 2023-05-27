const mongoose=require('mongoose')

const doctorSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    departmentId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Department"
    }]
})

module.exports=mongoose.model('Doctor',doctorSchema);