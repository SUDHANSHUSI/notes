const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel=require('../../model/user.model')
const register = async (req, res) => {
    try {
      let { firstName,lastName, email, password,phoneNum,address,pincode,gender } = req.body;

      /////////////// All field required////////////////////////
      if(!firstName || !lastName || !email || !password || !phoneNum || !address || !pincode || !gender){
        return res.status(400).json({ message: "Enter valid data.." });
      }

      //////////// user Exist or not////////////////////////////////
      let existUser = await userModel.findOne({ email: email });
      if (existUser) {
        return res.status(400).json({ message: "User Already Exist." });
      }

      ///////////// validation in email and password../////////////////////////////
      var regx =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/])\S{8,}$/
      let emailRegx=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      let emailAuth=emailRegx.test(email);
      let passwordAuth = regx.test(password);
  
      if(!emailAuth){
        return res.json({
          message:"Enter Valid Email",
        });
      }
      if (!passwordAuth)
       return res.json({
          message:
            "Password Must Be A Minimum Of 8 Characters Including Number, Upper, Lower And One Special Character And Not Include Space",
        });
      
      password = await bcrypt.hash(password, 12);
  
      const newUser = new userModel({
        firstName,
        lastName,
        email: email,
        phoneNum,
        address,
        pincode,
        gender,
        password: password,
        role:'user'
      });
      const data = await newUser.save();
  
      return res.status(201).json({
        status: "Registration Success",
        newUser: data,
      });
    } catch (error) {
      console.log(error);
      if(error.code===11000){
          return res.status(404).json({success:false, message: "Email allready Exist.." });
      }else{
        console.log(error.message);
        return res.status(404).json({success:false, message: "Something went wrong." });
      }
    }
  };

  module.exports = {
    register,
  };
  