const express=require('express');
const { allDepartment, addDepartment, getDepartment } = require('../controller/department/department.controller');

const departmentRouter=express.Router();

departmentRouter.get('/department',allDepartment);
departmentRouter.post('/department',addDepartment);
departmentRouter.get('/department/:departmentId',getDepartment);

module.exports=departmentRouter