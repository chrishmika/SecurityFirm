import mongoose from "mongoose";

const Schema = mongoose.Schema;

const employeDB = new Schema({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // dob: {
  //   type: Date,
  //   required: true,
  // },
  // address: {
  //   type: String,
  //   required: true,
  // },
  // gender: {
  //   type: String,
  //   required: true,
  // },
  // nationality: {
  //   type: Boolean,
  //   required: true,
  // },
  // citizenship: {
  //   type: Boolean,
  //   required: true,
  // },
  // maritalStatus: {
  //   type: String,
  //   required: true,
  // },
  // disabilities: {
  //   type: String,
  //   required: true,
  // },
  // hasExperience: {
  //   type: Boolean,
  //   required: true,
  // },
  // experience: {
  //   type: Number,
  //   required: true,
  // },
  // handelingGuns: {
  //   type: Boolean,
  //   required: true,
  // },
  // idCard: {
  //   type: String,
  //   required: true,
  // },
  // cv: {
  //   type: String,
  //   required: true,
  // },
  // gsCertification: {
  //   type: String,
  //   required: true,
  // },
  // contact: {
  //   type: String,
  //   required: true,
  // },
  // email: {
  //   type: String,
  //   required: true,
  // },
  mobile: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
    unique: true,
  },
});

export const employeeschemas = mongoose.model("employeeschemas", employeDB);

//comented area needed to be uncomment ,,,commented for easy data entry
