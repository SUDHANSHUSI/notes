const appointmentModel = require("../../model/appointment.model");
const userModel = require("../../model/user.model");

const makeAppointment =async(req, res) => {
  try {
    let {
      fName,
      lName,
      age,
      phone,
      date,
      department,
      doctorName,
      gender,
      appointmentType,
      bloodGroup,
    } = req.body;

    if (
      !fName ||
      !lName ||
      !age ||
      !phone ||
      !gender ||
      !date ||
      !department ||
      !doctorName ||
      !appointmentType ||
      !bloodGroup
    ) {
      return res.status(400).json({ message: "Enter valid data.." });
    }

    const appointment = new appointmentModel({
      fName,
      lName,
      age,
      phone,
      gender,
      date: date.toString(),
      department,
      doctorName,
      appointmentType,
      bloodGroup,
      userId: req.userId,
      canActiveAppointment: false,
    });

    try {
      const data = await appointment.save();
      await userModel.findByIdAndUpdate(
        req.userId,
        {
          $push: { appointment: appointment._id },
        },
        { new: true }
      );
      return res.status(201).json({
        status: true,
        message:
          "Your appointment booked.We will callback you before appointment.ThankYou.",
        newUser: data,
      });
    } catch (err) {
      console.error(err.message);

      res.status(500).send({ message: "Error while submitting appointment" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(404).json({
      status: false,
      message: "Enter valid data..++",
    });
  }
};

module.exports = {
  makeAppointment,
};

// aa code che? haaa
// aa angular cache su che
// node modules jevu j che?
haa