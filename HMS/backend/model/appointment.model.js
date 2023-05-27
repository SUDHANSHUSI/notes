const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  phone: { type: Number, required: true },
  date: { type: Date, required: true },
  gender: { type: String, required: true },
  department: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentType: { type: String, required: true },
  canActiveAppointment: { type: Boolean,default:false },
  userId: { type: String },
});

module.exports = mongoose.model("Appointment", appointmentSchema);

// fName: this.formBuilder.control('', [Validators.required]),
// lName: this.formBuilder.control('', [Validators.required]),
// age: this.formBuilder.control('', [Validators.required]),
// bloodGroup: this.formBuilder.control('A+'),
// gender: this.formBuilder.control('male', [Validators.required]),
// phone: this.formBuilder.control('', [Validators.required]),
// date: this.formBuilder.control('', [Validators.required]),
// department:this.formBuilder.control (''),
// doctorName:this.formBuilder.control (''),
// appointmentType: this.formBuilder.control ('')
