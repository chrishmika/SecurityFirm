import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  NIC: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "employee",
    enum: ["employee", "admin", "manager"],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
