import { generateTokenAndSetCookie } from "../lib/utils/generateTokens.mjs";
import bcrypt from "bcryptjs";

import User from "../models/user.model.mjs";
import createNotification from "../lib/utils/createNotification.mjs";
import Employee from "../models/employee.model.mjs";
//singup 
export const signup = async (req, res) => {
  try {
    const { name, NIC, password, role } = req.body;

    const existingUser = await User.findOne({ NIC });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    if (password.length < 4)
      return res.status(400).json({ error: `password must be atleast 5 characters long` });

    //hashing passwod
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      NIC,
      name,
      role,
      password: hashPassword,
    });

    if (newUser) {
      await newUser.save();
      newUser.password = "";
      res.status(200).json(newUser);
    } else {
      return res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log(`error in signup controller ${error.message}`);
    res.status(500).json({ error: "internal server error on signup" });
  }
};

export const getme = async (req, res) => { 
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    return res.status(200).json(user);
  } catch (error) {
    console.log(`error in getme controller ${error.message}`);
    res.status(500).json({ error: "internal server error on getme" });
  }
};

export const login = async (req, res) => {
  try {
    let { NIC, nic, password } = req.body;
    
    // Handle both NIC and nic field names for compatibility
    const nicValue = NIC || nic;
    
    if (!nicValue || !password) {
      return res.status(400).json({ error: "NIC and password are required" });
    }

    const user = await User.findOne({ NIC: nicValue });
    if (!user) return res.status(404).json({ error: `Invalid User` });
    
    const validated = await bcrypt.compare(password, user.password);
    if (!validated) return res.status(404).json({ error: `Invalid Password` });
    
    const employee = await Employee.findOne({ NIC: nicValue });
    
    // Generate token - for React Native, return it in response body instead of cookie
    const token = generateTokenAndSetCookie(user._id, res);
    
    console.log(user);
    console.log(employee);
    
    // Prepare user response
    const userResponse = {
      _id: user._id,
      name: user.name,
      nic: user.NIC, // Map NIC to nic for frontend consistency
      role: user.role,
      empId: employee?.empId || "00000",
      employeID : employee?._id //new code added here 
    };
    
    // Return both token and user data for React Native
    res.status(200).json({
      success: true,
      token: token, // Include token in response body
      user: userResponse,
      message: "Login successful"
    });
  } catch (error) {
    console.log(`error in login controller ${error.message}`);
    res.status(500).json({ error: "internal server error on login" });
  }
};

export const forgetPassword = async (req, res) => {
  const { NIC, newPassword } = req.body;

  const user = await User.findOne({ NIC });
  if (!user) return res.status(404).json({ error: `Invalid user` });

  const validate = newPassword.length > 4;
  if (!validate) return res.status(404).json({ error: `password must have atleast 4 charactors` });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;

  await user.save();

  //create new Notification
  const admin = await User.findOne({ role: "admin" });
  createNotification(
    admin._id,
    req.user._id,
    "password",
    "Password was Changed By Admin under user forget password"
  );

  res.status(200).json({ message: `password updated sucessfull`, user });
};

export const changePassword = async (req, res) => {
  const { NIC, newPassword, oldPassword } = req.body;

  if (req.user.NIC != NIC) return res.status(400).json({ error: `NIC not matched with the user` });

  const user = await User.findOne({ NIC });
  if (!user) return res.status(404).json({ error: `invalid user` });

  const validateLength = newPassword.length > 4;
  if (!validateLength)
    return res.status(404).json({ error: `password must have atleast 4 charactors` });

  const validate = await bcrypt.compare(oldPassword, user.password);
  if (!validate) return res.status(404).json({ error: `Password not matched` });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  await user.save();

  //create new Notification
  const admin = await User.findOne({ role: "admin" });
  createNotification(admin._id, req.user._id, "password", "Password was Changed By user");

  res.status(200).json({ message: `password updated sucessfull`, user });
};

export const logout = async (req, res) => {
  try {
    console.log("im in logout backend");
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: `User logout Sucessfull` });
  } catch (error) {
    console.log(`error in logout controller ${error.message}`);
    res.status(500).json({ error: "internal server error on logout" });
  }
};
