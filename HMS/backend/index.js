const express=require('express');
const mongoose=require('mongoose');
const userRouter = require('./routes/user.route');
require("dotenv").config();
const cors = require('cors');
const appointmentRouter = require('./routes/appointment.route');
const doctorRouter = require('./routes/doctor.route');
const departmentRouter = require('./routes/department.route');
const app=express();
const bodyParser = require('body-parser');

// mongo url
mongoose.connect(process.env.MONGO_URL);

// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// routes
app.use(userRouter);
app.use(appointmentRouter);
app.use('/hospital',doctorRouter);
app.use(departmentRouter)

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server listening on http://localhost:${process.env.PORT}`);
})