import Employee from "../models/employee.model.mjs";
import Duty from "../models/duty.model.mjs";
import Company from "../models/company.model.mjs";
import User from "../models/user.model.mjs";
import createNotification from "../lib/utils/createNotification.mjs";
import { v2 as cloudinary } from "cloudinary";
import { deleteCloudinary, uploadCloudinary } from "../middleware/uploadCloudinary.mjs";
import { log } from "console";
import bcrypt from "bcryptjs";

//it feels better to delete application data when the new entity is joined with company both from db and cloudinary not implimented yet that part

export const createEmployee = async (req, res) => {
  try {
    let newData = req.body;
    const NIC = newData.NIC;

    const existingEmployee = await Employee.findOne({ NIC });
    if (existingEmployee) return res.status(400).json({ error: `Employee already exist` });

    // if (newData.img) {
    //   const uploadedDocument = await cloudinary.uploader.upload(newData.img);
    //   newData.img = uploadedDocument.secure_url;
    // }

    // if (newData.cv) {
    //   const uploadedDocument = await cloudinary.uploader.upload(newData.cv);
    //   newData.cv = uploadedDocument.secure_url;
    // }

    // if (newData.gsCertificate) {
    //   const uploadedDocument = await cloudinary.uploader.upload(newData.gsCertificate);
    //   newData.gsCertificate = uploadedDocument.secure_url;
    // }

    // if (newData.NICCopy) {
    //   const uploadedDocument = await cloudinary.uploader.upload(newData.NICCopy);
    //   newData.NICCopy = uploadedDocument.secure_url;
    // }

    console.log("came1");

    //password is hashed
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newData.password || "123456", salt); //given password or 123456

    const newRequest = new Employee(newData);
    const newUser = new User({
      name: newData.name,
      NIC: newData.NIC,
      password: hashedPassword, //given password
      role: "employee",
    });

    console.log("came2");

    //new user added to database
    const newlyAdded = await newRequest.save();

    console.log(newlyAdded);

    //add that id to user
    newUser.empId = newlyAdded.empId;
    await newUser.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });
    createNotification(
      admin._id,
      newlyAdded._id,
      "Employee",
      "employee",
      `New Employee joined to company password ${newData.password}  id ${newlyAdded.empId}`
    );

    res.status(200).json({ message: `added successfull`, newRequest });
  } catch (error) {
    console.log(`error in createEmployee ${error.message}`);
    const msg = error?.message || JSON.stringify(error) || "Unknown error";
    console.log(msg);

    return res.status(500).json({ error: `internal server error on admin controller` });
  }
};

export const createCompany = async (req, res) => {
  try {
    const newData = req.body;
    const name = newData.name;

    const existingCompany = await Company.findOne({ name }); //need an effectie way to check this
    if (existingCompany) return res.status(400).json({ error: `Company already exist` });

    console.log(newData);
    //cloudinary function used
    if (newData.proposal) {
      newData.proposal = await uploadCloudinary(newData.proposal);
    }

    const newRequest = new Company(newData);
    console.log(newRequest);

    await newRequest.save();

    //create new Notification
    const admin = await User.findOne({ role: "admin" });
    createNotification(
      admin._id,
      newRequest._id,
      "Company",
      "company",
      "New Company joined with Us"
    );

    res.status(200).json({ message: `added successfull`, newRequest });
  } catch (error) {
    console.log(`error in createCompany ${error.message}`);
    return res.status(500).json({ error: `internal server error on admin controller` });
  }
};

//cloudinary function used
