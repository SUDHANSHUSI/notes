// const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../model/user.model");

const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    let userExist = await userModel.findOne({ email: email });
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials.." });
    }

    let checkPassword = await bcrypt.compare(password, userExist.password);
    if (!checkPassword) {
      return res.status(404).json({ message: "Invalid Credentials.." });
    }

    let token = await jwt.sign(
      { id: userExist._id },
      process.env.JWT_SECRETKEY
    );
    // console.log(token);
    return res
      .status(200)
      .json({
        success: true,
        message: "LogIn successfully...+++",
        token: token,
        role:userExist.role,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something Went Wrong.." });
  }
};

module.exports = {
  login,
};
