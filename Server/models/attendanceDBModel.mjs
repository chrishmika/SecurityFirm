import mongoose from "mongoose";

const Schema = mongoose.Schema;

const attendanceDB = new Schema(
  {
    employID: {
      type: String,
      required: true,
    },
    employName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    workStatus: {
      type: String,
      required: true,
    },
    workplace: {
      type: String,
      required: true,
    },
    locationX: {
      type: Number,
      required: true,
    },
    locationY: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

attendanceDB.statics.markAttendance = async function (employID, employName, date, workStatus, workplace, locationX, locationY) {};
// Compound index to enforce uniqueness on date + status
// Create the index manually after schema definition

export const attendanceschemas = mongoose.model("attendanceschemas", attendanceDB);
