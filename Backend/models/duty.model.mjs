import mongoose from "mongoose";

const dutySchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.ObjectId,
      ref: "Company",
      required: true,
    },
    year: {
      type: Number,
      default: 2025,
      min: 2025,
      required: true,
    },
    month: {
      type: String,
      required: true,
      enum: ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"],
    },
    duties: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          auto: true,
        },
        employee: {
          type: mongoose.Schema.ObjectId,
          ref: "Employee",
        },
        day: {
          type: Number,
          min: 1,
          max: 31,
          // required: true,
        },
        time: {
          type: String,
          // required: true,
        },
        shift: {
          type: Number,
          enum: [12, 24],
          // required: true,
        },
        checkIn: {
          type: Date,
        },
        checkOut: {
          type: Date,
        },
        ot: {
          type: Number,
        },
        remark: {
          type: String,
        },
        status: {
          type: String,
          default: "absent",
          enum: ["absent", "late", "present"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Duty = mongoose.model("Duty", dutySchema);
export default Duty;
