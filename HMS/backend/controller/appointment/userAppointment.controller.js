const appointmentModel = require("../../model/appointment.model");
const userModel = require("../../model/user.model");

/** User appointment
 *
 * @param {*} req
 * @param {*} res
 */
const userAppointment = async (req, res) => {
  try {
    let userId = req.userId;
    let data = await appointmentModel.find({ userId: userId });
    res.send(data);
  } catch (error) {
    console.error(error.message);
  }
};

/** Get all appointment
 *
 * @param {*} req
 * @param {*} res Appointment and Message
 */
const getAllAppointment = async (req, res) => {
  try {
    const appointment = await appointmentModel.find({});
    res.json({ appointment, message: "Fatch data successfully.." });
  } catch (error) {
    console.error(error.message);
    res.json({ message: "Error while fatching data.." });
  }
};

/** Update Appointment
 *
 * @param {*} req id
 * @param {*} res
 * @returns updated message
 */

const updateAppointment = async (req, res) => {
  try {
    const id = req.params.appointmentId;

    let appointment = await appointmentModel.find({ _id: id });

    let updateData = req.body;

    updateData1 = await appointmentModel.findByIdAndUpdate(id, updateData);
    if (updateData1) {
      res
        .status(200)
        .json({ status: "updateData", message: "Update Data Successfully" });
    } else {
      return res.status(404).json({ message: "Can not find data.." });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something Went Wrong.." });
  }
};



const deleteAppointment=async(req,res)=>{
  try {
    const id=req.params.appointmentId;
    // console.log(id)
    let userData=await appointmentModel.findByIdAndDelete(id);
    if(userData){
      res
          .status(200)
          .json({ status: "deleteData", message: "Delete Data Successfully" });
    }else{
      return res.json({status:false,message:'Can not find data..'})
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({ message: "Something Went Wrong.." });
  }
 
}

module.exports = {
  userAppointment,
  getAllAppointment,
  updateAppointment,
  deleteAppointment
};
