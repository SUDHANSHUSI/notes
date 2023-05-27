const mongoose = require("mongoose");

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNum: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    appointment:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Appointment'
    }],
    role:{
      type:String,
      enum:['user','admin','hospital'],
      default:'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userModel);

