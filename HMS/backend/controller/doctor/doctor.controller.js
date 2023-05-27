const express = require("express");
const doctorModel = require("../../model/doctor.model");
const departmentModel = require("../../model/department.model");

/**
 * Create doctor
 * @param {*} req Form data
 * @param {*} res Responce message
 * @returns
 */
const addDoctor = async (req, res) => {
  try {
    let departmentId = req.params.departmentId;
    let { name, email, phone, age, experience, gender } = req.body;

    /////////////// All field required////////////////////////
    if (!name || !email || !phone || !age || !experience || !gender) {
      return res.status(400).json({ message: "Enter valid data.." });
    }

    //////////// user Exist or not////////////////////////////////

    let existUser = await doctorModel.findOne({ name: name });
    if (existUser) {
      if (existUser.departmentId == departmentId) {
        return res.status(400).json({ message: "Doctor already exist." });
      }
    }
    ///////////// validation in email ../////////////////////////////

    let emailRegx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailAuth = emailRegx.test(email);

    if (!emailAuth) {
      return res.json({
        message: "Enter Valid Email",
      });
    }
    /////////////////////  create doctor ///////////////////////////
    const newUser = new doctorModel({
      name,
      email: email,
      phone,
      age,
      gender,
      experience,
      isActive: false,
      departmentId: departmentId,
    });
    const data = await newUser.save();

    /////////////////////// update dotor Id in department /////////////////////
    let department = await departmentModel.findById(departmentId);
    department.includeDoctors.push(newUser._id);
    department.save();

    return res.status(201).json({
      status: "Registration Success",
      newUser: data,
    });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor allready Exist.." });
    } else {
      console.log(error.message);
      return res
        .status(404)
        .json({ success: false, message: "Something went wrong." });
    }
  }
};

/**
 * Update the doctor data
 * @param {*} req Id
 * @param {*} res
 * @returns
 */
const updateDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    let doctor = await doctorModel.findById(doctorId);

    if (doctor) {
      let updateData = req.body;
      let updated = await doctorModel.findByIdAndUpdate(doctorId, updateData);

      if (updated) {
        res
          .status(200)
          .json({ status: "updateData", message: "Update Data Successfully" });
      } else {
        return res.status(404).json({ message: "Can not update data." });
      }
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something went wrong.." });
  }
};

/**
 * Get All Doctor
 * @param {*} req
 * @param {*} res
 * @returns  Doctor data..
 */
const allDoctor = async (req, res) => {
  try {
    let allDoctor = await doctorModel.find().populate("departmentId");
    if (allDoctor) {
      return res.status(200).json({
        status: "success",
        data: allDoctor,
      });
    } else {
      return res.status(404).json({ message: "Can not fetch data" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something went wrong.." });
  }
};

/**
 * get single doctor value
 * @param {*} req contain Id
 * @param {*} res doctor value
 * @returns
 */
const singleDoctor = async (req, res) => {
  try {
    let doctor = await doctorModel.findById(req.params.doctorId);
    if (doctor) {
      return res.status(200).json({
        status: "success",
        data: doctor,
      });
    } else {
      return res.status(404).json({ message: "Can not fetch data" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something went wrong.." });
  }
};

/**
 * Delete Doctor
 * @param {*} req Id
 * @param {*} res Success message
 * @returns
 */

const deleteDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    let doctor = await doctorModel.findById(doctorId);
    console.log(doctor);
    if (doctor) {
      await doctorModel.findOneAndDelete({ _id: doctorId });

      department = await departmentModel.findById(doctor.departmentId);
      let arr = [];
      department.includeDoctors.forEach((element) => {
        console.log("++++++++++++++++++++++++++++++++++" + element);
        if (element == doctorId) {
          department.includeDoctors.pop(element);
        }
      });
      await department.save();
      res
        .status(200)
        .json({ status: "success", message: "Delete successfully" });
    } else {
      res.status(404).json({ message: "Doctor not exists. " });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something Went Wrong.." });
  }
};

const getDoctorByDepartment = async(req, res) => {
  
  try {
    let departmentId = req.params.departmentId;
    let doctor=await doctorModel.find({departmentId:departmentId})
    // console.log(doctor)
    if (doctor) {
        res.status(200).json({
          message: "get doctor by department",
          data: doctor,
        });
      } else {
        res.status(400).json({
          message: "can not fetch data form department",
        });
      }
    
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something Went Wrong.." });
  }
};

module.exports = {
  addDoctor,
  updateDoctor,
  allDoctor,
  deleteDoctor,
  singleDoctor,
  getDoctorByDepartment,
};
