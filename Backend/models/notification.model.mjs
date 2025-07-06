import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    from: {
      type: mongoose.Schema.ObjectId,
      refPath: "fromModel",
    },
    fromModel: {
      type: String,
      requires: true,
      enum: ["Application", "User", "CompanyRequest", "Employee"], //change this as required notification types if there is only one type of notification delere the lines 11-18
    },
    type: {
      type: String,
      enum: ["application", "employee", "administration", "password", "companyRequest"], //new application ,new administration,new Employee or employee related,password change
    },
    description: {
      type: String,
    },
    read: {
      type: Boolean,
      default: false,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
