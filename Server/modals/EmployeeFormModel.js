import mongoose from "mongoose";

const employeeFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  citizenship: {
    type: String,
    required: true,
  },
  maritalStatus: {
    type: String,
    required: true,
  },
  disabilities: {
    type: String,
    required: true,
  },
  hasExperience: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: false,
  },
  handlingGuns: {
    type: String,
    required: false,
  },
  idCardPath: {
    type: String,
    required: true,
    unique: true,
  },
  cvPath: {
    type: String,
    required: true,
    unique: true,
  },
  gsCertificationPath: {
    type: String,
    required: false,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
});

const EmployeeForm = mongoose.model("EmployeeForm", employeeFormSchema);

export default EmployeeForm;
