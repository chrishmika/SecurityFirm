import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user"], // Define allowed roles
    default: "user",
  },
});

//static login method for login existing account
userSchema.statics.login = async function (nic, password) {
  //validation
  if (!nic || !password) {
    throw Error("both nic and password in needed");
  }

  const user = await this.findOne({ nic });
  if (!user) {
    throw Error("user not found");
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(match);
  console.log(user.role);
  if (!match) {
    throw Error("incorrect password");
  }

  return user;
};

//static sign up method for create new employees
userSchema.statics.signup = async function (nic, password, role) {
  //validation
  if (!nic || !password || !role) {
    throw Error("All fields must be filers");
  }

  if (!validator.isLength(nic, { min: 5 })) {
    throw Error("NIC must be at least 5 characters long");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("password is not valid");
  }

  const exists = await this.findOne({ nic });

  if (exists) {
    throw Error("nic already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  console.log(hash);

  const user = await this.create({ nic, password: hash, role });
  return user;
};

export const usermodel = mongoose.model("usermodel", userSchema);
