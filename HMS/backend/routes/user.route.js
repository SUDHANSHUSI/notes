const express = require("express");
const { register } = require("../controller/user/register.controller");
const { login } = require("../controller/user/login.controller");
const userDetail = require("../controller/user/userDetail.controller");
const auth = require('../middleware/auth');
const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/user",auth,userDetail);

module.exports = userRouter;