import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    disabilities: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
    },
    email: {
      type: String,
    },
    sex: {
      type: String,
      enum: ["Male", "Female", "Other", "Prefer not to say"],
      required: true,
    },
    military: {
      type: String,
      required: false,
    },
    NICCopy: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
    viewed: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "waiting",
      enum: ["accept", "reject", "waiting"],
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);
export default Application;
